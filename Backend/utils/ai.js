import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  try {
    const supportAgent = createAgent({
      model: gemini({
        model: "gemini-1.5-flash-8b",
        apiKey: process.env.GEMINI_API_KEY,
      }),
      name: "AI Ticket Triage Assistant",
      system: `You are an expert AI assistant that processes technical support tickets. 

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links for human moderators.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
    });

    const response =
      await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
Analyze the following support ticket and provide a JSON object with:

- summary: A short 1-2 sentence summary of the issue.
- priority: One of "low", "medium", or "high".
- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
"summary": "Short summary of the ticket",
"priority": "high",
"helpfulNotes": "Here are useful tips...",
"relatedSkills": ["React", "Node.js"]
}

---

Ticket information:

- Title: ${ticket.title}
- Description: ${ticket.description}`);

    const raw = response.output[0].content;

    // Try multiple parsing strategies
    try {
      // Strategy 1: Try to extract JSON from markdown code block
      const markdownMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (markdownMatch) {
        const parsed = JSON.parse(markdownMatch[1].trim());
        console.log("✅ Successfully parsed JSON from markdown block");
        return validateTicketAnalysis(parsed);
      }
    } catch (e) {
      console.log("❌ Failed to parse JSON from markdown block:", e.message);
    }

    try {
      // Strategy 2: Try to find JSON object in the text
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log("✅ Successfully parsed JSON from text");
        return validateTicketAnalysis(parsed);
      }
    } catch (e) {
      console.log("❌ Failed to parse JSON from text:", e.message);
    }

    try {
      // Strategy 3: Try to parse the raw response directly
      const parsed = JSON.parse(raw.trim());
      console.log("✅ Successfully parsed raw JSON");
      return validateTicketAnalysis(parsed);
    } catch (e) {
      console.log("❌ Failed to parse raw JSON:", e.message);
    }

    // All parsing strategies failed
    console.error("❌ All JSON parsing strategies failed. Raw response:", raw.substring(0, 200));
    return null;

  } catch (error) {
    console.error("❌ Error in analyzeTicket:", error.message);
    return null;
  }
};

// Validate and sanitize the parsed response
const validateTicketAnalysis = (data) => {
  // Ensure all required fields exist with fallbacks
  const validated = {
    summary: data.summary || "Unable to generate summary",
    priority: ["low", "medium", "high"].includes(data.priority) ? data.priority : "medium",
    helpfulNotes: data.helpfulNotes || "No additional notes available",
    relatedSkills: Array.isArray(data.relatedSkills) ? data.relatedSkills : [],
  };

  // Ensure relatedSkills is not empty
  if (validated.relatedSkills.length === 0) {
    validated.relatedSkills = ["General Support"];
  }

  return validated;
};

export default analyzeTicket;