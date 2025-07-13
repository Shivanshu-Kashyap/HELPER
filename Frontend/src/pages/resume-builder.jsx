"use client"

import { useState } from "react"
import { PlusIcon, MinusIcon, DownloadIcon, EyeIcon, UserIcon } from "lucide-react"

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
        description: "",
      },
    ],
    projects: [
      {
        name: "",
        technologies: "",
        duration: "",
        description: "",
      },
    ],
    skills: {
      programming: "",
      frontend: "",
      backend: "",
      devops: "",
      aiml: "",
    },
    coursework: "",
    leadership: "",
  })

  const [showPreview, setShowPreview] = useState(false)

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

  const updateSkills = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
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
    \\href{${personal.linkedin}}{\\raisebox{-0.2\\height}\\faLinkedin\\ \\underline{linkedin.com/in/yourprofile}} ~ 
    \\href{${personal.github}}{\\raisebox{-0.2\\height}\\faGithub\\ \\underline{github.com/yourprofile}}
    \\vspace{-8pt}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${education
  .map(
    (edu) => `    \\resumeSubheading
      {${edu.institution}}{${edu.duration}}
      {${edu.degree}}{\\textbf{${edu.gpa ? `GPA: ${edu.gpa}` : ""}}}`,
  )
  .join("\n")}
  \\resumeSubHeadingListEnd

%------RELEVANT COURSEWORK-------
\\section{Relevant Coursework}
    \\begin{multicols}{4}
        \\begin{itemize}[itemsep=-5pt, parsep=3pt]
${coursework
  .split(",")
  .map((course) => `            \\item\\small ${course.trim()}`)
  .join("\n")}
        \\end{itemize}
    \\end{multicols}
    \\vspace*{2.0\\multicolsep}

%-----------EXPERIENCE-----------
\\section{Experience}
    \\vspace{-5pt}
    \\resumeSubHeadingListStart
${experience
  .map(
    (exp) => `      \\resumeProjectHeading
          {\\textbf{${exp.company}} $|$ \\footnotesize\\emph{${exp.position}}}{${exp.duration}}
          \\resumeItemListStart
            \\resumeItem{${exp.description}}
          \\resumeItemListEnd
          \\vspace{-17pt}`,
  )
  .join("\n")}
    \\resumeSubHeadingListEnd
    \\vspace{-10pt}

%-----------PROJECTS-----------
\\section{Projects}
    \\vspace{-5pt}
    \\resumeSubHeadingListStart
${projects
  .map(
    (project) => `      \\resumeProjectHeading
          {\\textbf{${project.name}} $|$ \\footnotesize\\emph{${project.technologies}}}{${project.duration}}
          \\vspace{-13pt}
          \\resumeItemListStart
            \\resumeItem{${project.description}}
          \\resumeItemListEnd
          \\vspace{-15pt}`,
  )
  .join("\n")}
    \\resumeSubHeadingListEnd
    \\vspace{-10pt}

%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.2in, label={}]
    \\small{\\item{
     \\textbf{Programming Languages}{: ${skills.programming}} \\\\
     \\textbf{Frontend Technologies}{: ${skills.frontend}} \\\\
     \\textbf{Backend \\& Database}{: ${skills.backend}} \\\\
     \\textbf{DevOps \\& Tools}{: ${skills.devops}} \\\\
     \\textbf{AI/ML \\& Libraries}{: ${skills.aiml}} \\\\
    }}
 \\end{itemize}
 \\vspace{-10pt}

%-----------INVOLVEMENT---------------
\\section{Leadership \\& Extracurricular}
    \\resumeSubHeadingListStart
        \\resumeItemListStart
${leadership
  .split("\n")
  .map((item) => `            \\resumeItem{${item.trim()}}`)
  .join("\n")}
        \\resumeItemListEnd
    \\resumeSubHeadingListEnd

\\end{document}`
  }

  const downloadResume = async () => {
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
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `Resume_${resumeData.personal.fullName.replace(/\s+/g, "_")}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert("Failed to generate PDF")
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Something went wrong")
    }
  }

  const sections = [
    { id: "personal", name: "Personal Info", icon: <UserIcon className="w-4 h-4" /> },
    { id: "education", name: "Education", icon: <UserIcon className="w-4 h-4" /> },
    { id: "experience", name: "Experience", icon: <UserIcon className="w-4 h-4" /> },
    { id: "projects", name: "Projects", icon: <UserIcon className="w-4 h-4" /> },
    { id: "skills", name: "Skills", icon: <UserIcon className="w-4 h-4" /> },
    { id: "coursework", name: "Coursework", icon: <UserIcon className="w-4 h-4" /> },
    { id: "leadership", name: "Leadership", icon: <UserIcon className="w-4 h-4" /> },
  ]

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
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
                    <span>{section.name}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-3 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>{showPreview ? "Hide" : "Show"} Preview</span>
                </button>

                <button
                  onClick={downloadResume}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`${showPreview ? "lg:col-span-2" : "lg:col-span-3"}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {/* Personal Information */}
              {activeSection === "personal" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={resumeData.personal.fullName}
                        onChange={(e) => updatePersonal("fullName", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="John Doe"
                        required
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
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={resumeData.personal.phone}
                        onChange={(e) => updatePersonal("phone", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="+91-9695016176"
                        required
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
                        required
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
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Education</h2>
                    <button
                      onClick={() => addArrayItem("education", { institution: "", degree: "", duration: "", gpa: "" })}
                      className="flex items-center space-x-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 rounded-lg hover:bg-orange-500/30 transition-all duration-300"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Education</span>
                    </button>
                  </div>

                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-6 p-6 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Education {index + 1}</h3>
                        {resumeData.education.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("education", index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300"
                          >
                            <MinusIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Institution *</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateArrayField("education", index, "institution", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="University Name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-2">Degree *</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateArrayField("education", index, "degree", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="B.Tech. in Computer Science"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-2">Duration *</label>
                          <input
                            type="text"
                            value={edu.duration}
                            onChange={(e) => updateArrayField("education", index, "duration", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="Oct 2022 -- June 2026"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-2">GPA/CPI</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateArrayField("education", index, "gpa", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="8.07"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience */}
              {activeSection === "experience" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Experience</h2>
                    <button
                      onClick={() =>
                        addArrayItem("experience", { company: "", position: "", duration: "", description: "" })
                      }
                      className="flex items-center space-x-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 rounded-lg hover:bg-orange-500/30 transition-all duration-300"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-6 p-6 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Experience {index + 1}</h3>
                        {resumeData.experience.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("experience", index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300"
                          >
                            <MinusIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Company *</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateArrayField("experience", index, "company", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="Company Name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-2">Position *</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => updateArrayField("experience", index, "position", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="Software Engineer"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-white font-medium mb-2">Duration *</label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => updateArrayField("experience", index, "duration", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="May 2025 -- Present"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Description *</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateArrayField("experience", index, "description", e.target.value)}
                          rows={4}
                          className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          placeholder="Describe your role and achievements..."
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {activeSection === "projects" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Projects</h2>
                    <button
                      onClick={() =>
                        addArrayItem("projects", { name: "", technologies: "", duration: "", description: "" })
                      }
                      className="flex items-center space-x-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 px-4 py-2 rounded-lg hover:bg-orange-500/30 transition-all duration-300"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {resumeData.projects.map((project, index) => (
                    <div key={index} className="mb-6 p-6 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Project {index + 1}</h3>
                        {resumeData.projects.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("projects", index)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-300"
                          >
                            <MinusIcon className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Project Name *</label>
                          <input
                            type="text"
                            value={project.name}
                            onChange={(e) => updateArrayField("projects", index, "name", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="Project Name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-2">Technologies *</label>
                          <input
                            type="text"
                            value={project.technologies}
                            onChange={(e) => updateArrayField("projects", index, "technologies", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="React, Node.js, MongoDB"
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-white font-medium mb-2">Duration</label>
                          <input
                            type="text"
                            value={project.duration}
                            onChange={(e) => updateArrayField("projects", index, "duration", e.target.value)}
                            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                            placeholder="Jan 2025"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Description *</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateArrayField("projects", index, "description", e.target.value)}
                          rows={4}
                          className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                          placeholder="Describe your project and achievements..."
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {activeSection === "skills" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Technical Skills</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Programming Languages</label>
                      <input
                        type="text"
                        value={resumeData.skills.programming}
                        onChange={(e) => updateSkills("programming", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="Python, JavaScript, TypeScript, Java, C"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Frontend Technologies</label>
                      <input
                        type="text"
                        value={resumeData.skills.frontend}
                        onChange={(e) => updateSkills("frontend", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="React.js, Next.js, Tailwind CSS, HTML5, CSS3"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Backend & Database</label>
                      <input
                        type="text"
                        value={resumeData.skills.backend}
                        onChange={(e) => updateSkills("backend", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="Node.js, Express, MongoDB, PostgreSQL, Firebase"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">DevOps & Tools</label>
                      <input
                        type="text"
                        value={resumeData.skills.devops}
                        onChange={(e) => updateSkills("devops", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="Git/GitHub, Docker, AWS, Vercel, VS Code"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">AI/ML & Libraries</label>
                      <input
                        type="text"
                        value={resumeData.skills.aiml}
                        onChange={(e) => updateSkills("aiml", e.target.value)}
                        className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                        placeholder="TensorFlow, PyTorch, NumPy, Pandas, Scikit-learn"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Coursework */}
              {activeSection === "coursework" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Relevant Coursework</h2>
                  <div>
                    <label className="block text-white font-medium mb-2">Courses (comma-separated)</label>
                    <textarea
                      value={resumeData.coursework}
                      onChange={(e) => updateTextField("coursework", e.target.value)}
                      rows={4}
                      className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                      placeholder="Data Structures, Algorithms, Database Management, Machine Learning, Web Development, Operating Systems"
                    />
                  </div>
                </div>
              )}

              {/* Leadership */}
              {activeSection === "leadership" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Leadership & Extracurricular</h2>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Activities & Achievements (one per line)
                    </label>
                    <textarea
                      value={resumeData.leadership}
                      onChange={(e) => updateTextField("leadership", e.target.value)}
                      rows={6}
                      className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                      placeholder="Achieved AIR 21,367 in IIT JEE Advanced among 1 million aspirants.
Smart India Hackathon, Rajasthan Police Hackathon, Scale+91
Solved 150+ DSA questions on LeetCode, Codechef, GeeksForGeeks.
Event Management Leadership: Successfully orchestrated logistics for 5 high-profile technical workshops."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-8">
                <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
                <div className="bg-white rounded-lg p-4 text-black text-xs font-mono max-h-96 overflow-y-auto">
                  <div className="text-center mb-4">
                    <h1 className="text-lg font-bold">{resumeData.personal.fullName || "Your Name"}</h1>
                    <p className="text-sm">{resumeData.personal.location || "Location"}</p>
                    <p className="text-sm">
                      {resumeData.personal.phone || "Phone"} | {resumeData.personal.email || "Email"}
                    </p>
                  </div>

                  {resumeData.education.some((edu) => edu.institution) && (
                    <div className="mb-4">
                      <h2 className="font-bold border-b border-black mb-2">EDUCATION</h2>
                      {resumeData.education.map(
                        (edu, index) =>
                          edu.institution && (
                            <div key={index} className="mb-2">
                              <div className="flex justify-between">
                                <strong>{edu.institution}</strong>
                                <span>{edu.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <em>{edu.degree}</em>
                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                              </div>
                            </div>
                          ),
                      )}
                    </div>
                  )}

                  {resumeData.experience.some((exp) => exp.company) && (
                    <div className="mb-4">
                      <h2 className="font-bold border-b border-black mb-2">EXPERIENCE</h2>
                      {resumeData.experience.map(
                        (exp, index) =>
                          exp.company && (
                            <div key={index} className="mb-2">
                              <div className="flex justify-between">
                                <strong>{exp.company}</strong>
                                <span>{exp.duration}</span>
                              </div>
                              <em>{exp.position}</em>
                              {exp.description && (
                                <p className="text-xs mt-1">{exp.description.substring(0, 100)}...</p>
                              )}
                            </div>
                          ),
                      )}
                    </div>
                  )}

                  {resumeData.projects.some((project) => project.name) && (
                    <div className="mb-4">
                      <h2 className="font-bold border-b border-black mb-2">PROJECTS</h2>
                      {resumeData.projects.map(
                        (project, index) =>
                          project.name && (
                            <div key={index} className="mb-2">
                              <div className="flex justify-between">
                                <strong>{project.name}</strong>
                                <span>{project.duration}</span>
                              </div>
                              <em>{project.technologies}</em>
                              {project.description && (
                                <p className="text-xs mt-1">{project.description.substring(0, 100)}...</p>
                              )}
                            </div>
                          ),
                      )}
                    </div>
                  )}

                  {Object.values(resumeData.skills).some((skill) => skill) && (
                    <div className="mb-4">
                      <h2 className="font-bold border-b border-black mb-2">TECHNICAL SKILLS</h2>
                      {resumeData.skills.programming && (
                        <p>
                          <strong>Programming:</strong> {resumeData.skills.programming}
                        </p>
                      )}
                      {resumeData.skills.frontend && (
                        <p>
                          <strong>Frontend:</strong> {resumeData.skills.frontend}
                        </p>
                      )}
                      {resumeData.skills.backend && (
                        <p>
                          <strong>Backend:</strong> {resumeData.skills.backend}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
