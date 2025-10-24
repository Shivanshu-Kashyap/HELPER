"use client"

import { useState } from "react"
import { PlusIcon, MinusIcon, DownloadIcon, UserIcon, FileTextIcon, GithubIcon, ExternalLinkIcon, BoldIcon } from "lucide-react"

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("personal")
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: "",
      location: "",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
    },
    education: [
      {
        institution: "",
        degree: "",
        duration: "",
        gpa: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        duration: "",
        points: [""],
      },
    ],
    projects: [
      {
        name: "",
        technologies: "",
        duration: "",
        points: [""],
        githubLink: "",
        liveLink: "",
      },
    ],
    skills: [
      { title: "Programming Languages", items: "" },
      { title: "Frontend Technologies", items: "" },
      { title: "Backend & Database", items: "" },
      { title: "DevOps & Tools", items: "" },
      { title: "AI/ML & Libraries", items: "" },
    ],
    coursework: "",
    leadership: "",
  })

  const updatePersonal = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  const updateArrayField = (section, index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const addArrayItem = (section, template) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }))
  }

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }))
  }

  const updateSkills = (index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill)),
    }))
  }

  const addPoint = (section, itemIndex) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === itemIndex ? { ...item, points: [...item.points, ""] } : item
      ),
    }))
  }

  const removePoint = (section, itemIndex, pointIndex) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === itemIndex ? { ...item, points: item.points.filter((_, pi) => pi !== pointIndex) } : item
      ),
    }))
  }

  const updatePoint = (section, itemIndex, pointIndex, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === itemIndex
          ? { ...item, points: item.points.map((point, pi) => (pi === pointIndex ? value : point)) }
          : item
      ),
    }))
  }

  const updateTextField = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateLatexResume = () => {
    const { personal, education, experience, projects, skills, coursework, leadership } = resumeData

    // Helper function to convert **text** to \textbf{text}
    const convertBold = (text) => {
      return text.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}')
    }

    return `%-------------------------
% Resume in Latex
% Author : ${personal.fullName}
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & \\textbf{\\small #2} \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    {\\Huge \\scshape ${personal.fullName}} \\\\ \\vspace{1pt}
    ${personal.location} \\\\ \\vspace{1pt}
    \\small \\raisebox{-0.1\\height}\\faPhone\\ ${personal.phone} ~ \\href{mailto:${personal.email}}{\\raisebox{-0.2\\height}\\faEnvelope\\ \\underline{${personal.email}}} ~ 
    \\href{${personal.linkedin}}{\\raisebox{-0.2\\height}\\faLinkedin\\ \\underline{linkedin}} ~ 
    \\href{${personal.github}}{\\raisebox{-0.2\\height}\\faGithub\\ \\underline{github}}
    \\vspace{-8pt}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${education
  .filter(edu => edu.institution)
  .map(
    (edu) => `    \\resumeSubheading
      {${edu.institution}}{${edu.duration}}
      {${edu.degree}}{\\textbf{${edu.gpa ? `GPA: ${edu.gpa}` : ""}}}`,
  )
  .join("\n")}
  \\resumeSubHeadingListEnd

${coursework ? `%------RELEVANT COURSEWORK-------
\\section{Relevant Coursework}
    \\begin{multicols}{3}
        \\begin{itemize}[itemsep=-5pt, parsep=3pt]
${coursework
  .split(",")
  .filter(c => c.trim())
  .map((course) => `            \\item\\small ${course.trim()}`)
  .join("\n")}
        \\end{itemize}
    \\end{multicols}
    \\vspace*{2.0\\multicolsep}` : ''}

%-----------EXPERIENCE-----------
\\section{Experience}
    \\vspace{-5pt}
    \\resumeSubHeadingListStart
${experience
  .filter(exp => exp.company)
  .map(
    (exp) => `      \\resumeProjectHeading
          {\\textbf{${exp.company}} $|$ \\footnotesize\\emph{${exp.position}}}{${exp.duration}}
          \\resumeItemListStart
${exp.points.filter(p => p.trim()).map(point => `            \\resumeItem{${convertBold(point)}}`).join('\n')}
          \\resumeItemListEnd
          \\vspace{-13pt}`,
  )
  .join("\n")}
    \\resumeSubHeadingListEnd
    \\vspace{-10pt}

%-----------PROJECTS-----------
\\section{Projects}
    \\vspace{-5pt}
    \\resumeSubHeadingListStart
${projects
  .filter(project => project.name)
  .map(
    (project) => `      \\resumeProjectHeading
          {\\textbf{${project.name}} $|$ \\footnotesize\\emph{${project.technologies}}${project.githubLink ? ` $|$ \\href{${project.githubLink}}{\\raisebox{-0.1\\height}\\faGithub}` : ''}${project.liveLink ? ` $|$ \\href{${project.liveLink}}{\\raisebox{-0.1\\height}\\faExternalLink}` : ''}}{${project.duration}}
          \\resumeItemListStart
${project.points.filter(p => p.trim()).map(point => `            \\resumeItem{${convertBold(point)}}`).join('\n')}
          \\resumeItemListEnd
          \\vspace{-13pt}`,
  )
  .join("\n")}
    \\resumeSubHeadingListEnd
    \\vspace{-10pt}

%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skills
  .filter(skill => skill.items.trim())
  .map(skill => `     \\textbf{${skill.title}:} ${skill.items} \\\\`)
  .join('\n')}
    }}
 \\end{itemize}
 \\vspace{-16pt}

${leadership ? `%-----------INVOLVEMENT---------------
\\section{Leadership \\& Extracurricular}
    \\resumeSubHeadingListStart
        \\resumeItemListStart
${leadership
  .split("\n")
  .filter(item => item.trim())
  .map((item) => `            \\resumeItem{${convertBold(item.trim())}}`)
  .join("\n")}
        \\resumeItemListEnd
    \\resumeSubHeadingListEnd` : ''}

\\end{document}`
  }

  const downloadLatex = () => {
    try {
      const latexCode = generateLatexResume()
      const blob = new Blob([latexCode], { type: "text/plain" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Resume_${resumeData.personal.fullName.replace(/\s+/g, "_") || 'MyResume'}.tex`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading LaTeX:", error)
      alert("Failed to download LaTeX file")
    }
  }

  const downloadPDF = async () => {
    try {
      const latexCode = generateLatexResume()
      const token = localStorage.getItem("token")

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ai/generate-pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ latexCode, fileName: `Resume_${resumeData.personal.fullName.replace(/\s+/g, "_")}` }),
      })

      if (response.ok) {
        const contentType = response.headers.get("content-type")
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        
        // Check if it's a PDF or fallback to tex
        if (contentType && contentType.includes("pdf")) {
          a.download = `Resume_${resumeData.personal.fullName.replace(/\s+/g, "_") || 'MyResume'}.pdf`
        } else {
          a.download = `Resume_${resumeData.personal.fullName.replace(/\s+/g, "_") || 'MyResume'}.tex`
        }
        
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert("PDF generation not available. Use 'Download LaTeX' instead.")
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("PDF generation failed. Please use 'Download LaTeX' option.")
    }
  }

  const sections = [
    { id: "personal", name: "Personal Info", icon: <UserIcon className="w-4 h-4" /> },
    { id: "education", name: "Education", icon: <FileTextIcon className="w-4 h-4" /> },
    { id: "experience", name: "Experience", icon: <FileTextIcon className="w-4 h-4" /> },
    { id: "projects", name: "Projects", icon: <FileTextIcon className="w-4 h-4" /> },
    { id: "skills", name: "Skills", icon: <FileTextIcon className="w-4 h-4" /> },
    { id: "coursework", name: "Coursework", icon: <FileTextIcon className="w-4 h-4" /> },
    { id: "leadership", name: "Leadership", icon: <FileTextIcon className="w-4 h-4" /> },
  ]

  // Resume Preview Component
  const ResumePreview = () => (
    <div className="bg-white rounded-lg shadow-2xl p-8 text-black text-sm overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)", fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold mb-2">{resumeData.personal.fullName || "YOUR NAME"}</h1>
        <div className="text-sm space-y-1">
          {resumeData.personal.location && <p>{resumeData.personal.location}</p>}
          <p>
            {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
            {resumeData.personal.phone && resumeData.personal.email && <span> | </span>}
            {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
          </p>
          {(resumeData.personal.linkedin || resumeData.personal.github) && (
            <p>
              {resumeData.personal.linkedin && <span className="text-blue-600">LinkedIn</span>}
              {resumeData.personal.linkedin && resumeData.personal.github && <span> | </span>}
              {resumeData.personal.github && <span className="text-blue-600">GitHub</span>}
            </p>
          )}
        </div>
      </div>

      {/* Education */}
      {resumeData.education.some((edu) => edu.institution) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase">Education</h2>
          {resumeData.education.map(
            (edu, index) =>
              edu.institution && (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <strong className="text-base">{edu.institution}</strong>
                    <span className="text-sm font-semibold">{edu.duration}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <em>{edu.degree}</em>
                    {edu.gpa && <span className="font-semibold">GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Coursework */}
      {resumeData.coursework && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase">Relevant Coursework</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {resumeData.coursework.split(",").map((course, index) => (
              <div key={index} className="text-sm">• {course.trim()}</div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.some((exp) => exp.company) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase">Experience</h2>
          {resumeData.experience.map(
            (exp, index) =>
              exp.company && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <strong className="text-base">{exp.company}</strong>
                      <span className="text-sm"> | </span>
                      <em>{exp.position}</em>
                    </div>
                    <span className="text-sm font-semibold">{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-inside ml-2 text-sm">
                      <li>{exp.description}</li>
                    </ul>
                  )}
                </div>
              ),
          )}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects.some((project) => project.name) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase">Projects</h2>
          {resumeData.projects.map(
            (project, index) =>
              project.name && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <strong className="text-base">{project.name}</strong>
                      {project.technologies && (
                        <>
                          <span className="text-sm"> | </span>
                          <em className="text-sm">{project.technologies}</em>
                        </>
                      )}
                    </div>
                    {project.duration && <span className="text-sm font-semibold">{project.duration}</span>}
                  </div>
                  {project.description && (
                    <ul className="list-disc list-inside ml-2 text-sm">
                      <li>{project.description}</li>
                    </ul>
                  )}
                </div>
              ),
          )}
        </div>
      )}

      {/* Skills */}
      {Object.values(resumeData.skills).some((skill) => skill) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase">Technical Skills</h2>
          <div className="space-y-1 text-sm">
            {resumeData.skills.programming && (
              <p>
                <strong>Programming Languages:</strong> {resumeData.skills.programming}
              </p>
            )}
            {resumeData.skills.frontend && (
              <p>
                <strong>Frontend Technologies:</strong> {resumeData.skills.frontend}
              </p>
            )}
            {resumeData.skills.backend && (
              <p>
                <strong>Backend & Database:</strong> {resumeData.skills.backend}
              </p>
            )}
            {resumeData.skills.devops && (
              <p>
                <strong>DevOps & Tools:</strong> {resumeData.skills.devops}
              </p>
            )}
            {resumeData.skills.aiml && (
              <p>
                <strong>AI/ML & Libraries:</strong> {resumeData.skills.aiml}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Leadership */}
      {resumeData.leadership && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase">Leadership & Extracurricular</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {resumeData.leadership.split("\n").filter(item => item.trim()).map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <UserIcon className="w-6 h-6 text-orange-400" />
              <span className="text-white font-medium">Resume Builder</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Professional Resume Builder</h1>
          <p className="text-gray-300 text-lg">Build your resume with our LaTeX-powered template system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {section.icon}
                    <span className="text-sm">{section.name}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6">
                <button
                  onClick={downloadResume}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <div className="text-center text-xs text-gray-400 mt-2">
                  LaTeX format (.tex)
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Resume Editor</h2>
                <div className="text-sm text-orange-300 bg-orange-500/20 px-3 py-1 rounded-full">
                  {sections.find(s => s.id === activeSection)?.name}
                </div>
              </div>

              {/* Personal Information */}
              {activeSection === "personal" && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={resumeData.personal.fullName}
                        onChange={(e) => updatePersonal("fullName", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Location *</label>
                      <input
                        type="text"
                        value={resumeData.personal.location}
                        onChange={(e) => updatePersonal("location", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="City, State-ZIP"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={resumeData.personal.phone}
                        onChange={(e) => updatePersonal("phone", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="+1-234-567-8900"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={resumeData.personal.email}
                        onChange={(e) => updatePersonal("email", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        value={resumeData.personal.linkedin}
                        onChange={(e) => updatePersonal("linkedin", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">GitHub URL</label>
                      <input
                        type="url"
                        value={resumeData.personal.github}
                        onChange={(e) => updatePersonal("github", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="https://github.com/yourprofile"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Education */}
              {activeSection === "education" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Education</h3>
                    <button
                      onClick={() => addArrayItem("education", { institution: "", degree: "", duration: "", gpa: "" })}
                      className="flex items-center space-x-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-2 rounded-lg hover:bg-orange-500/30 transition-all duration-300 text-sm"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-md font-semibold text-white">Entry {index + 1}</h4>
                          {resumeData.education.length > 1 && (
                            <button
                              onClick={() => removeArrayItem("education", index)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-300"
                            >
                              <MinusIcon className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Institution *</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateArrayField("education", index, "institution", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="University Name"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Degree *</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateArrayField("education", index, "degree", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="B.Tech. in Computer Science"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Duration *</label>
                            <input
                              type="text"
                              value={edu.duration}
                              onChange={(e) => updateArrayField("education", index, "duration", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="Aug 2020 - May 2024"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">GPA/CPI</label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => updateArrayField("education", index, "gpa", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="3.8/4.0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {activeSection === "experience" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Experience</h3>
                    <button
                      onClick={() => addArrayItem("experience", { company: "", position: "", duration: "", description: "" })}
                      className="flex items-center space-x-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-2 rounded-lg hover:bg-orange-500/30 transition-all duration-300 text-sm"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-md font-semibold text-white">Entry {index + 1}</h4>
                          {resumeData.experience.length > 1 && (
                            <button
                              onClick={() => removeArrayItem("experience", index)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-300"
                            >
                              <MinusIcon className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Company *</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateArrayField("experience", index, "company", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="Company Name"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Position *</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) => updateArrayField("experience", index, "position", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="Software Engineer"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Duration *</label>
                            <input
                              type="text"
                              value={exp.duration}
                              onChange={(e) => updateArrayField("experience", index, "duration", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="Jan 2024 - Present"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Description *</label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateArrayField("experience", index, "description", e.target.value)}
                              rows={3}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
                              placeholder="Describe your role and achievements..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {activeSection === "projects" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Projects</h3>
                    <button
                      onClick={() => addArrayItem("projects", { name: "", technologies: "", duration: "", description: "" })}
                      className="flex items-center space-x-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-2 rounded-lg hover:bg-orange-500/30 transition-all duration-300 text-sm"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-md font-semibold text-white">Entry {index + 1}</h4>
                          {resumeData.projects.length > 1 && (
                            <button
                              onClick={() => removeArrayItem("projects", index)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-300"
                            >
                              <MinusIcon className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Project Name *</label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => updateArrayField("projects", index, "name", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="Project Name"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Technologies *</label>
                            <input
                              type="text"
                              value={project.technologies}
                              onChange={(e) => updateArrayField("projects", index, "technologies", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="React, Node.js, MongoDB"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Duration</label>
                            <input
                              type="text"
                              value={project.duration}
                              onChange={(e) => updateArrayField("projects", index, "duration", e.target.value)}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                              placeholder="Jan 2024"
                            />
                          </div>

                          <div>
                            <label className="block text-white text-sm font-medium mb-1">Description *</label>
                            <textarea
                              value={project.description}
                              onChange={(e) => updateArrayField("projects", index, "description", e.target.value)}
                              rows={3}
                              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
                              placeholder="Describe your project..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {activeSection === "skills" && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Programming Languages</label>
                      <input
                        type="text"
                        value={resumeData.skills.programming}
                        onChange={(e) => updateSkills("programming", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="Python, JavaScript, Java, C++"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Frontend Technologies</label>
                      <input
                        type="text"
                        value={resumeData.skills.frontend}
                        onChange={(e) => updateSkills("frontend", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="React, Next.js, Tailwind CSS"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Backend & Database</label>
                      <input
                        type="text"
                        value={resumeData.skills.backend}
                        onChange={(e) => updateSkills("backend", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="Node.js, Express, MongoDB, PostgreSQL"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">DevOps & Tools</label>
                      <input
                        type="text"
                        value={resumeData.skills.devops}
                        onChange={(e) => updateSkills("devops", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="Git, Docker, AWS, CI/CD"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">AI/ML & Libraries</label>
                      <input
                        type="text"
                        value={resumeData.skills.aiml}
                        onChange={(e) => updateSkills("aiml", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="TensorFlow, PyTorch, NumPy, Pandas"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Coursework */}
              {activeSection === "coursework" && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Relevant Coursework</h3>
                  <div>
                    <label className="block text-white font-medium mb-2">Courses (comma-separated)</label>
                    <textarea
                      value={resumeData.coursework}
                      onChange={(e) => updateTextField("coursework", e.target.value)}
                      rows={5}
                      className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
                      placeholder="Data Structures, Algorithms, Database Management, Machine Learning"
                    />
                  </div>
                </div>
              )}

              {/* Leadership */}
              {activeSection === "leadership" && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Leadership & Extracurricular</h3>
                  <div>
                    <label className="block text-white font-medium mb-2">Activities & Achievements (one per line)</label>
                    <textarea
                      value={resumeData.leadership}
                      onChange={(e) => updateTextField("leadership", e.target.value)}
                      rows={8}
                      className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
                      placeholder="Team Lead for college coding club&#10;Organized tech workshop with 200+ attendees&#10;Won first place in hackathon"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Live Preview</h3>
                <div className="text-xs text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                  Updates in real-time
                </div>
              </div>
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
