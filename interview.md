# HELPER — Interview & Deep Technical Walkthrough

This document is a comprehensive reference for interviews and deep-dive conversations about the HELPER project (AI Career Automation Platform). It explains the architecture, backend internals, data flows, how Inngest is used for background processing, and how the four main tools (AI Ticket System, Cold Email & Cover Letter Generator, ATS Resume Scoring, and Resume Builder) work end-to-end.

Use this during interviews to explain design decisions, trade-offs, and implementation details. Where repository-specific file paths are relevant, they are referenced (for example `Backend/controllers/ticket.js`).

--

## Quick project summary (elevator pitch)

HELPER is an AI-driven productivity suite for job seekers and support teams. It combines a React + Vite frontend with a Node.js + Express backend and MongoDB, integrating Google Gemini (via an agent kit) for natural-language tasks and Inngest for event-driven background processing. The product delivers:
- An AI Ticket System for automatic categorization and moderator matching
- Cold Email & Cover Letter generation tailored to job descriptions
- ATS resume scoring and detailed feedback
- A LaTeX-backed Resume Builder with live preview and PDF export

Tech highlights: MERN stack, JWT-based RBAC, Inngest for asynchronous workflows, Gemini for NLP generation and classification, Nodemailer for emails, Multer & pdf-parse for uploads.

## Contract: what this document describes

- Inputs: repository source (Frontend and Backend), environment variables (API keys, DB), user inputs (forms, uploads)
- Outputs: generated documents (PDFs, emails), notifications, tickets stored/updated in DB, background jobs executed via Inngest
- Error modes: AI failures (timeouts / invalid responses), email delivery errors, DB errors, auth failures
- Success criteria: deterministic API behavior, persisted data in MongoDB, background tasks executed reliably by Inngest, user-facing features working in the UI

Edge cases considered: empty/invalid inputs, large uploads, concurrency on resume generation, rate limits on Gemini API, failed background jobs, and retry/error handling.

Assumptions
- This doc infers behavior from the repository structure and filenames (see `Backend/`, `Frontend/`). If any code differs from these assumptions, mention it and we can update the document.

--

## High-level architecture

- Frontend: React + Vite (src/). Responsible for UI, input validation, display of generated content, and calling backend REST APIs.
- Backend: Express app (`Backend/index.js`) exposing REST endpoints (routes in `Backend/routes/`) and implementations in `Backend/controllers/`.
- Database: MongoDB via Mongoose models in `Backend/models/` (e.g., `ticket.js`, `user.js`).
- Authentication: JWT tokens (middleware in `Backend/middlewares/auth.js`) with role checks for `user`, `moderator`, `admin`.
- AI: Google Gemini integration through `Backend/utils/ai.js` and the `inngest` folder for event-driven agents.
- Background jobs & eventing: Inngest functions live in `Backend/inngest/functions/` and the client config in `Backend/inngest/client.js`.
- Email: Nodemailer wrapper in `Backend/utils/mailer.js`.
- File handling: Multer for uploads and `pdf-parse` (or similar) in controllers when parsing resumes.

Diagram (text)

Frontend (React) -> Backend API (Express) -> MongoDB
                                -> Inngest (background jobs) -> Gemini API
                                -> Gemini API (sync calls for small tasks)
                                -> Nodemailer (email delivery)

--

## Repository map (important files)

- `Backend/index.js` — server entrypoint and middleware registration.
- `Backend/routes/*.js` — route definitions for `ticket`, `user`, and `ai` endpoints.
- `Backend/controllers/*.js` — controllers implementing business logic.
- `Backend/models/*.js` — Mongoose models (schema definitions) for tickets and users.
- `Backend/middlewares/auth.js` — JWT verification and role-based access control.
- `Backend/utils/ai.js` — code that interacts with Google Gemini API (generation, classification, embeddings if any).
- `Backend/utils/mailer.js` — Nodemailer setup and wrappers.
- `Backend/inngest/*` — Inngest client and serverless functions for async workflows (e.g., `on-signup`, `on-ticket-create`).

## Detailed component walkthroughs

### 1) Authentication & Users

Files: `Backend/controllers/user.js`, `Backend/models/user.js`, `Backend/middlewares/auth.js`

Purpose
- Authenticate users, issue JSON Web Tokens, and enforce role-based access control.

Flow
- Signup/Login endpoints validate credentials and create or verify users in MongoDB.
- On success, the server issues a JWT signed with a secret (stored in `.env`) which encodes the user id and role.
- `auth` middleware verifies the token on protected routes, populates `req.user`, and optional role checks block unauthorized actions.

Security notes
- Tokens use a secret stored in environment variables and should have reasonable expiry.
- Passwords must be hashed (bcrypt) before storage — confirm `user` model uses hashing. If not present, adding bcrypt and hashing before save is essential.
- Protect sensitive endpoints using role checks (e.g., only moderators or admins can assign tickets).

### 2) AI utilities (Gemini)

File: `Backend/utils/ai.js`, `Backend/controllers/ai.js`

Purpose
- Provide a thin wrapper around the Google Gemini (or other) API for: generation (cold emails, cover letters), classification (ticket category/priority), and scoring (ATS heuristics assisted by AI).

How it is used
- Synchronous lightweight tasks: endpoints call `ai.js` directly to generate short content (e.g., cover letter) when user requests.
- Heavy or long-running tasks: the API request enqueues an Inngest event and the background function calls Gemini (so the HTTP handler returns quickly).

Typical ai.js responsibilities
- Format prompts consistently and safely (sanitize inputs).
- Implement retries and backoff for transient errors.
- Convert Gemini responses into normalized JSON structures the rest of the system expects.
- Enforce usage limits or batching to prevent API rate-limit exhaustion.

Prompt engineering considerations
- Keep prompts minimal but include examples and constraints (length, style, required sections).
- For classification tasks (ticket category, priority), prefer few-shot examples and ask for structured JSON to make parsing deterministic.

### 3) Inngest — event-driven background processing

Files: `Backend/inngest/client.js`, `Backend/inngest/functions/*.js` (for example `on-signup.js`, `on-ticket-create.js`)

Why Inngest
- Offload long-running or rate-limited tasks from HTTP request cycles.
- Provide robust retries, observability, and scheduling for background jobs.

How it works (conceptual)
- The Express app emits an event (calls the Inngest client) when something occurs — for example a ticket is created or a user signs up.
- Inngest receives that event and invokes a matching serverless function (one of the files in `functions/`). Those functions contain the business logic to run asynchronously: call Gemini, send emails, enrich the DB, notify moderators, etc.
- Inngest manages retries, logs, and failure handling. It can be configured with backoff policies and dead-letter handling.

Example: Ticket create flow with Inngest
1. User posts a new ticket via `POST /api/tickets`.
2. Backend controller saves the ticket in MongoDB (status: `new`) and immediately acknowledges the client.
3. The controller emits an Inngest event `ticket.created` including ticket id and body.
4. `on-ticket-create.js` receives the event. It:
   - Calls `ai.js` to classify the ticket (category, priority).
   - Calls `ai.js` to generate moderator notes or suggested first responses.
   - Assigns the ticket to a moderator (simple algorithm or skill-based matching).
   - Updates the ticket document with classification, priority, assigned moderator, and notes.
   - Optionally sends notifications via email using `mailer.js`.

Benefits
- Fast HTTP responses, robust retries, centralized background logic, and the ability to instrument or replay events.

### 4) Ticket System (AI-assisted)

Files: `Backend/controllers/ticket.js`, `Backend/models/ticket.js`, `Backend/inngest/functions/on-ticket-create.js`

User-facing behavior
- Users create tickets (title, description, attachments).
- Moderators view a queue prioritized by AI-determined priority and category.

Backend logic and flows
- Create: store raw ticket data and file metadata (if attachments) in MongoDB. Save an initial `status: new`.
- Enqueue/emit: call Inngest to process classification and assignment.
- Background work: use Gemini to determine category and priority with a structured output prompt (e.g., JSON with fields `category`, `priority`, `confidence`).
- Assignment: the background job uses a simple matching algorithm:
  - Check moderator skills (tags in the user model).
  - Rank moderators by skill match and load (open tickets).
  - Assign the top-ranked moderator and update the ticket doc.
- Moderator notes: AI generates suggested notes and possibly draft replies. These are stored as part of the ticket so moderators can edit.

Data model (simplified)
```
Ticket {
  _id,
  title,
  description,
  userId,
  attachments: [{ filename, path, mimetype }],
  category,
  priority,
  assigneeId,
  status, // new, open, closed
  aiNotes: [{ text, createdAt }]
}
```

Edge cases and considerations
- Uploaded files need virus scanning / size limits.
- AI classification should include a confidence score so human moderators can reclassify when low confidence.
- Race conditions: ensure assignment uses atomic DB updates (findOneAndUpdate with conditional filtering) to avoid double-assigning.

### 5) Cold Email & Cover Letter Generator

Files: `Backend/controllers/ai.js`, frontend pages `Frontend/src/pages/cold-email.jsx` and `signup.jsx` (for any related flows)

User flow
- A user fills a form with personal info and a job description or company details.
- Frontend posts the form to an AI endpoint (`/api/ai/generate-email` or similar).
- Backend constructs a prompt and calls `ai.js` to request a generated email or cover letter.
- The response is returned to the user, with options to edit, copy, or download.

Implementation details
- Prompt design: include user's name, experience bullets, tone requirements, and length constraints.
- Deterministic output: ask Gemini to respond in JSON with `subject` and `body` to make parsing simple.
- Post-processing: sanitize HTML or text, and offer export options (plain text or downloadable file).

Background processing vs sync
- Most single-generation requests can be synchronous (fast LLM response). If generation includes attachments or long jobs (e.g., multiple variants), consider enqueuing with Inngest and notifying the user once done.

Email sending
- If users request to send a generated cold email, the server uses `mailer.js` (Nodemailer) to deliver. For testing, Mailtrap or similar is configured in `.env`.

Privacy and safety
- Never log full user resumes or PII in production logs.
- Rate-limit generation endpoints to avoid abuse and cost spikes.

### 6) ATS Resume Scoring and Feedback

Files: `Backend/controllers/ai.js`, possible scoring helper functions in `utils`.

Goal
- Provide a numeric ATS-like score (1–100) and actionable feedback: strengths, weaknesses, missing keywords, and suggested rewrites.

How it's implemented (two complementary approaches)

1) Heuristic + keywords (fast, deterministic)
- Extract job description keywords (common nouns, skill tokens).
- Parse the uploaded resume (text extracted with `pdf-parse` after a Multer upload) to find matches.
- Compute a baseline score from coverage, keyword density, section presence (summary, education, experience), and formatting hints.

2) Model-assisted scoring (Gemini)
- Use a structured prompt that supplies the resume text and the job description and asks Gemini to provide a JSON response:
  - `score`: integer 1–100
  - `breakdown`: list of sections with scores
  - `advice`: list of suggested edits
- The backend may combine heuristic score and model score to produce the final ATS score.

Data flow example
1. User uploads resume and supplies job description.
2. Controller saves the file, extracts text, and performs heuristic analysis.
3. Controller calls Gemini with a prompt for a model-based score and explanation.
4. Merge results and return a report to the frontend.

Performance & cost considerations
- Sending full resume text to Gemini is costly for very long documents. Use summarization or chunked prompts and request structured JSON.
- Cache results for repeated requests with the same resume+JD pair.

### 7) Resume Builder (LaTeX → PDF, Live Preview)

Files: frontend pages `Frontend/src/pages/resume-builder.jsx`, backend may include an endpoint for PDF generation.

Goal
- Provide a form-driven UI to collect structured resume data and produce an ATS-friendly PDF using LaTeX templates.

Frontend flow
- The user fills multiple form sections (contact, summary, experience, education, skills).
- The UI shows a live preview by rendering either an HTML preview or requesting a preview generation endpoint.

Backend flow for final PDF
1. User hits a `generate PDF` endpoint with JSON payload representing resume fields.
2. Backend selects a LaTeX template and fills it using template substitution (e.g., simple string replacements or a templating library like Mustache for safety).
3. Backend runs a LaTeX compile step (e.g., using `pdflatex`) or uses a pre-built LaTeX-to-PDF library. Alternatively, server-side HTML → PDF (Puppeteer) can produce high-quality PDFs without LaTeX dependencies.
4. The resulting PDF is returned to the client or stored and a download link is provided.

Implementation details and trade-offs
- LaTeX approach advantages: precise typesetting and professional templates. Disadvantages: requires system-level dependencies (TeX distribution) or Dockerized workers.
- HTML-to-PDF (Puppeteer) advantage: easier to run on serverless or containers without TeX. Slightly less precise but often acceptable for resumes.
- Live preview is typically implemented client-side by rendering the preview HTML, which avoids repeated server-side compilation.

Security and sandboxing
- If using LaTeX on the server, protect against malicious LaTeX input (disallow arbitrary raw commands). Use safe templating and whitelist only expected fields.

PDF generation at scale
- Offload PDF compilation to background workers (Inngest) if compilation is slow or if heavy concurrency is expected.

--

## Background job examples (pseudocode summaries)

on-ticket-create.js
- Receives event { ticketId }
- Lookup ticket document
- Call ai.classifyTicket(ticket.text) -> { category, priority, confidence }
- If confidence < threshold -> flag for human review
- Assign moderator based on skills
- Update ticket in DB and send notification via mailer

on-signup.js
- Receives event { userId }
- Send welcome email via `mailer.js`
- Warm up user profile: optionally call Gemini to generate profile summary or skills tags for search

--

## Observability and error handling

- Logging: controllers should log structured events (request id, user id, action). Avoid logging full PII or resume content.
- Metrics: instrument counts and latencies for AI calls, DB ops, and Inngest functions.
- Retries: Inngest handles retry policies for background jobs; the `ai.js` wrapper should handle transient errors with exponential backoff.
- Alerts: configure alerts for high failure rates, increased latencies, or quota exhaustion on Gemini API.

## Data privacy and compliance

- Treat uploaded resumes and generated content as PII. In production, use encryption at rest, limited retention, and clear user controls for deletion.
- Mask or obfuscate personal data in logs.
- Add consent screens when sending emails or using third-party AI services where data may be retained.

## Deployment and environment

Frontend: Vercel (see `Frontend/vercel.json`) — build step uses Vite.
Backend: Render or a containerized provider. Ensure environment variables are configured (MongoDB URI, JWT secret, Gemini credentials, Inngest keys, Mailer creds).

Environment variables (typical)
- MONGO_URI
- JWT_SECRET
- GEMINI_API_KEY (or agent credentials)
- INNGEST_CLIENT_KEY / INNGEST_API_KEY
- MAILER_HOST, MAILER_USER, MAILER_PASS

CI/CD notes
- Protect secrets in the deployment provider; do not commit `.env` files.

--

## Common interview questions & suggested concise answers

Q: Why did you choose Inngest instead of a task queue like Bull or a cron job?
A: Inngest provides event-driven serverless functions with built-in retries, observability, and is well-suited for tying into LLM agent kits. It reduces backend complexity for long-running tasks and provides a clear event→handler mapping. For heavy synchronous throughput or tight control over concurrency, a dedicated queue (Bull/Redis) would be appropriate, but Inngest accelerates development and observability.

Q: How do you handle AI failures and rate limits?
A: Implement retries with exponential backoff in `ai.js`, offload retries for long jobs to Inngest which manages backoff and dead-letter policies, provide graceful degradation in the UI, and add rate limits and quotas per user to prevent abuse.

Q: How do you ensure the resume PDF is ATS-friendly?
A: Choose templates with linear reading order, avoid complex layouts (tables, images) for main content, include required sections (contact, experience, education, skills), and validate the generated PDF by running a local parser to check textual content ordering. The ATS scoring module enforces these heuristics.

Q: What are the main security threats and mitigations?
A: Threats: leaked API keys, malicious uploads, XSS in user-generated content, SSRF from template rendering, SQL/NoSQL injections. Mitigations: store secrets in vaults, validate and sanitize uploads, use CSP and escape user content, whitelist allowed template fields for LaTeX or HTML rendering, and use parameterized DB operations.

Q: How does the skill-based moderator matching algorithm work?
A: Moderators have skill tags. The algorithm computes an overlap score between ticket-required skill tokens (from AI classification) and moderator tags, subtracts a load penalty (# open tickets), and picks the highest-ranked moderator. Use atomic DB updates to avoid race conditions.

Q: How would you scale the PDF generation service?
A: Move PDF compilation into an autoscaled worker pool (containerized), cache common assets/templates, use a message queue (or Inngest) to schedule compilation jobs, and return signed URLs once PDFs are ready. Prefer HTML→PDF for easier containerization unless LaTeX is strictly required.

--

## Local development checklist (quick)

1. Copy `.env.example` to `.env` and set values (MONGO_URI, JWT_SECRET, GEMINI_API_KEY, MAILER creds, INNGEST keys).
2. Backend: run `npm install` in `Backend/` then `npm run dev` (or `node index.js`).
3. Frontend: run `npm install` in `Frontend/` then `npm run dev`.
4. Create test users and optionally a Mailtrap inbox for email testing.
5. Monitor logs and Inngest dashboard for background job executions.

## Next steps and possible improvements (good talking points)

- Add role-based rate limiting and tenant quotas.
- Add resumable upload handling and virus scanning.
- Add a formal test suite for Inngest functions (unit & integration).
- Improve prompt templates and store them as versioned assets to A/B test prompts and measure quality.
- Add analytics for which generated emails/resumes lead to successful outcomes.

--

## Appendix: concise code pointers

- To find Inngest event handlers: `Backend/inngest/functions/`.
- To review AI prompt code: `Backend/utils/ai.js` and `Backend/controllers/ai.js`.
- To see ticket business rules: `Backend/controllers/ticket.js` and `Backend/inngest/functions/on-ticket-create.js`.

If you'd like, I can:
- Generate a visual architecture diagram (Mermaid) and add it to this README.
- Create unit tests for one Inngest function (example `on-ticket-create`).
- Implement missing security improvements (password hashing, input validation) if they are not present in the repo.

--

End of file.
