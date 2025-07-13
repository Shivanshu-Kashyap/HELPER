import { createAgent, gemini } from "@inngest/agent-kit"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

// Generate Cold Email or Cover Letter
export const generateEmail = async (req, res) => {
  try {
    const { jobInfo, userInfo, emailType } = req.body

    const emailAgent = createAgent({
      model: gemini({
        model: "gemini-1.5-flash-8b",
        apiKey: process.env.GEMINI_API_KEY,
      }),
      name: "Professional Email Generator",
      system: `You are an expert professional email and cover letter writer. Your job is to create compelling, personalized ${emailType === "cold-email" ? "cold emails" : "cover letters"} that help job seekers connect with potential employers.

IMPORTANT:
- Write in a professional, engaging tone
- Personalize the content based on the provided information
- Highlight relevant skills and experiences
- Keep it concise but impactful
- Include a clear call to action
- Format properly with appropriate spacing and structure

For cold emails: Focus on networking, expressing interest, and requesting informational interviews or opportunities.
For cover letters: Focus on the specific job application, matching qualifications, and expressing enthusiasm for the role.`,
    })

    const prompt = `Create a professional ${emailType === "cold-email" ? "cold email" : "cover letter"} based on the following information:

JOB INFORMATION:
- Company: ${jobInfo.companyName}
- Position: ${jobInfo.jobTitle}
- Job Description: ${jobInfo.jobDescription}
- Hiring Manager: ${jobInfo.hiringManagerName || "Hiring Manager"}
- Company Description: ${jobInfo.companyDescription || ""}
- Requirements: ${jobInfo.jobRequirements || ""}

USER INFORMATION:
- Name: ${userInfo.fullName}
- Email: ${userInfo.email}
- Phone: ${userInfo.phone || ""}
- Current Role: ${userInfo.currentRole || ""}
- Experience: ${userInfo.experience}
- Skills: ${userInfo.skills}
- Projects: ${userInfo.projects || ""}
- Achievements: ${userInfo.achievements || ""}
- LinkedIn: ${userInfo.linkedinUrl || ""}
- Portfolio: ${userInfo.portfolioUrl || ""}

Please create a ${emailType === "cold-email" ? "cold email" : "cover letter"} that is professional, personalized, and compelling. Make sure to:
1. Address the recipient appropriately
2. Show genuine interest in the company/role
3. Highlight relevant qualifications
4. Include specific examples from the user's background
5. End with a clear call to action
6. Keep it concise (300-500 words)`

    const response = await emailAgent.run(prompt)
    const content = response.output[0].content

    return res.status(200).json({
      success: true,
      content: content,
      type: emailType,
    })
  } catch (error) {
    console.error("Error generating email:", error.message)
    return res.status(500).json({
      success: false,
      message: "Failed to generate email content",
    })
  }
}

// Simple text extraction from PDF buffer
const extractTextFromPDF = async (buffer) => {
  try {
    // For now, we'll use a simple approach
    // In production, you might want to use a more robust PDF parser
    const text = buffer.toString("utf8")
    return text
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    return "Unable to extract text from PDF"
  }
}

// Analyze Resume and provide ATS score
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      })
    }

    const jobDetails = JSON.parse(req.body.jobDetails)

    // Extract text from PDF buffer
    const resumeText = await extractTextFromPDF(req.file.buffer)

    const resumeAgent = createAgent({
      model: gemini({
        model: "gemini-1.5-flash-8b",
        apiKey: process.env.GEMINI_API_KEY,
      }),
      name: "ATS Resume Analyzer",
      system: `You are an expert ATS (Applicant Tracking System) analyzer and career coach. Your job is to analyze resumes against job descriptions and provide detailed feedback.

IMPORTANT:
- Provide an ATS score from 1-100 based on keyword matching, formatting, and relevance
- Identify strengths in the resume
- Suggest specific improvements
- List missing keywords that should be included
- Give overall constructive feedback
- Respond with ONLY valid JSON in the specified format

The ATS score should consider:
- Keyword matching with job description (40%)
- Resume structure and formatting (20%)
- Relevant experience and skills (25%)
- Education and certifications (10%)
- Overall presentation (5%)`,
    })

    const prompt = `Analyze this resume against the job requirements and provide detailed feedback:

RESUME CONTENT:
${resumeText}

JOB DETAILS:
- Job Title: ${jobDetails.jobTitle}
- Company: ${jobDetails.companyName || ""}
- Job Description: ${jobDetails.jobDescription}
- Key Requirements: ${jobDetails.requirements || ""}

Please analyze the resume and respond with ONLY a JSON object in this exact format:
{
  "atsScore": 85,
  "strengths": ["Strong technical skills", "Relevant project experience"],
  "improvements": ["Add more quantified achievements", "Include missing keywords"],
  "missingKeywords": ["Python", "Machine Learning", "AWS"],
  "overallFeedback": "Detailed feedback about the resume..."
}`

    const response = await resumeAgent.run(prompt)
    const rawResponse = response.output[0].content

    try {
      // Try to parse JSON from the response
      const match = rawResponse.match(/```json\s*([\s\S]*?)\s*```/i)
      const jsonString = match ? match[1] : rawResponse.trim()
      const analysis = JSON.parse(jsonString)

      return res.status(200).json({
        success: true,
        analysis: analysis,
      })
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError.message)
      return res.status(500).json({
        success: false,
        message: "Failed to analyze resume. Please try again.",
      })
    }
  } catch (error) {
    console.error("Error analyzing resume:", error.message)
    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
    })
  }
}

// Generate PDF from LaTeX (simplified version)
export const generatePDF = async (req, res) => {
  try {
    const { latexCode, fileName } = req.body

    if (!latexCode) {
      return res.status(400).json({
        success: false,
        message: "LaTeX code is required",
      })
    }

    // For now, return the LaTeX code as a text file
    // In production, you would compile this to PDF using pdflatex
    res.setHeader("Content-Type", "text/plain")
    res.setHeader("Content-Disposition", `attachment; filename="${fileName || "resume"}.tex"`)
    res.send(latexCode)
  } catch (error) {
    console.error("Error generating PDF:", error.message)
    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF",
    })
  }
}
