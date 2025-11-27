"use client"

import { useState } from "react"
import { PlusIcon, MinusIcon, DownloadIcon, UserIcon, FileTextIcon, GithubIcon, ExternalLinkIcon, FileCodeIcon, SparklesIcon, ChevronRightIcon, Trash2Icon, GripVerticalIcon } from "lucide-react"

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

  const convertBoldToHtml = (text) => {
    // Convert **text** to <strong>text</strong>
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return part
    })
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
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            {resumeData.coursework.split(",").filter(c => c.trim()).map((course, index) => (
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
                  {exp.points && exp.points.some(p => p.trim()) && (
                    <ul className="list-disc list-inside ml-2 text-sm space-y-1">
                      {exp.points.filter(p => p.trim()).map((point, pi) => (
                        <li key={pi}>{convertBoldToHtml(point)}</li>
                      ))}
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
                    <div className="flex items-center gap-2">
                      <strong className="text-base">{project.name}</strong>
                      {project.technologies && (
                        <>
                          <span className="text-sm">|</span>
                          <em className="text-sm">{project.technologies}</em>
                        </>
                      )}
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          <ExternalLinkIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    {project.duration && <span className="text-sm font-semibold">{project.duration}</span>}
                  </div>
                  {project.points && project.points.some(p => p.trim()) && (
                    <ul className="list-disc list-inside ml-2 text-sm space-y-1">
                      {project.points.filter(p => p.trim()).map((point, pi) => (
                        <li key={pi}>{convertBoldToHtml(point)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ),
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.some((skill) => skill.items) && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase">Technical Skills</h2>
          <ul className="space-y-1 text-sm list-none">
            {resumeData.skills.filter(skill => skill.items.trim()).map((skill, index) => (
              <li key={index}>
                <strong>{skill.title}:</strong> {skill.items}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Leadership */}
      {resumeData.leadership && (
        <div className="mb-5">
          <h2 className="text-lg font-bold border-b-2 border-black mb-3 uppercase">Leadership & Extracurricular</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {resumeData.leadership.split("\n").filter(item => item.trim()).map((item, index) => (
              <li key={index}>{convertBoldToHtml(item.trim())}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-900/20 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-orange-500/20">
            <SparklesIcon className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 font-medium text-sm">Professional Resume Builder</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Dream Resume</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Create a professional, ATS-friendly resume in minutes with our LaTeX-powered builder.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-xl sticky top-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeSection === section.id
                        ? "bg-orange-500/20 text-orange-300 border border-orange-500/30 shadow-lg shadow-orange-500/10"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <div className={`transition-transform duration-300 ${activeSection === section.id ? "scale-110" : "group-hover:scale-110"}`}>
                      {section.icon}
                    </div>
                    <span className="font-medium text-sm">{section.name}</span>
                    {activeSection === section.id && (
                      <ChevronRightIcon className="w-4 h-4 ml-auto opacity-50" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={downloadLatex}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-800 text-white px-4 py-3 rounded-xl hover:bg-slate-700 transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <FileCodeIcon className="w-4 h-4" />
                  <span className="font-medium text-sm">Export LaTeX</span>
                </button>

                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 font-medium text-sm"
                >
                  <DownloadIcon className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl min-h-[600px]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  {sections.find(s => s.id === activeSection)?.icon}
                  <span className="ml-3">{sections.find(s => s.id === activeSection)?.name}</span>
                </h2>
                <div className="text-xs font-medium text-orange-300 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  Editing
                </div>
              </div>

              {/* Personal Information */}
              {activeSection === "personal" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={resumeData.personal.fullName}
                        onChange={(e) => updatePersonal("fullName", e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Location *</label>
                      <input
                        type="text"
                        value={resumeData.personal.location}
                        onChange={(e) => updatePersonal("location", e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300"
                        placeholder="City, State"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={resumeData.personal.phone}
                        onChange={(e) => updatePersonal("phone", e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300"
                        placeholder="+1 234 567 8900"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={resumeData.personal.email}
                        onChange={(e) => updatePersonal("email", e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        value={resumeData.personal.linkedin}
                        onChange={(e) => updatePersonal("linkedin", e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">GitHub URL</label>
                      <input
                        type="url"
                        value={resumeData.personal.github}
                        onChange={(e) => updatePersonal("github", e.target.value)}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Education */}
              {activeSection === "education" && (
                <div className="animate-fade-in">
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={() => addArrayItem("education", { institution: "", degree: "", duration: "", gpa: "" })}
                      className="flex items-center space-x-2 bg-orange-500/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-xl hover:bg-orange-500/20 transition-all duration-300 text-sm font-medium"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Education</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="p-6 bg-slate-800/30 rounded-2xl border border-white/5 relative group">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          {resumeData.education.length > 1 && (
                            <button
                              onClick={() => removeArrayItem("education", index)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-2"
                            >
                              <Trash2Icon className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-slate-400 text-xs font-medium mb-1.5">Institution</label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => updateArrayField("education", index, "institution", e.target.value)}
                              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                              placeholder="University Name"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateArrayField("education", index, "degree", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="Degree"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">Duration</label>
                              <input
                                type="text"
                                value={edu.duration}
                                onChange={(e) => updateArrayField("education", index, "duration", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="Year"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-400 text-xs font-medium mb-1.5">GPA</label>
                            <input
                              type="text"
                              value={edu.gpa}
                              onChange={(e) => updateArrayField("education", index, "gpa", e.target.value)}
                              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                              placeholder="GPA"
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
                <div className="animate-fade-in">
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={() => addArrayItem("experience", { company: "", position: "", duration: "", points: [""] })}
                      className="flex items-center space-x-2 bg-orange-500/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-xl hover:bg-orange-500/20 transition-all duration-300 text-sm font-medium"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="p-6 bg-slate-800/30 rounded-2xl border border-white/5 relative group">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          {resumeData.experience.length > 1 && (
                            <button
                              onClick={() => removeArrayItem("experience", index)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-2"
                            >
                              <Trash2Icon className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">Company</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateArrayField("experience", index, "company", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="Company Name"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">Position</label>
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => updateArrayField("experience", index, "position", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="Job Title"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-400 text-xs font-medium mb-1.5">Duration</label>
                            <input
                              type="text"
                              value={exp.duration}
                              onChange={(e) => updateArrayField("experience", index, "duration", e.target.value)}
                              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                              placeholder="Duration"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-slate-400 text-xs font-medium">Description Points</label>
                              <button
                                onClick={() => addPoint("experience", index)}
                                className="text-orange-400 hover:text-orange-300 transition-colors text-xs flex items-center"
                              >
                                <PlusIcon className="w-3 h-3 mr-1" /> Add Point
                              </button>
                            </div>
                            <div className="space-y-2">
                              {exp.points.map((point, pointIndex) => (
                                <div key={pointIndex} className="flex gap-2 items-start">
                                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0"></div>
                                  <input
                                    type="text"
                                    value={point}
                                    onChange={(e) => updatePoint("experience", index, pointIndex, e.target.value)}
                                    className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                    placeholder="Description point (use **text** for bold)"
                                  />
                                  {exp.points.length > 1 && (
                                    <button
                                      onClick={() => removePoint("experience", index, pointIndex)}
                                      className="text-slate-600 hover:text-red-400 transition-colors mt-2"
                                    >
                                      <MinusIcon className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {activeSection === "projects" && (
                <div className="animate-fade-in">
                  <div className="flex justify-end mb-6">
                    <button
                      onClick={() => addArrayItem("projects", { name: "", technologies: "", duration: "", points: [""], githubLink: "", liveLink: "" })}
                      className="flex items-center space-x-2 bg-orange-500/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-xl hover:bg-orange-500/20 transition-all duration-300 text-sm font-medium"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="p-6 bg-slate-800/30 rounded-2xl border border-white/5 relative group">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          {resumeData.projects.length > 1 && (
                            <button
                              onClick={() => removeArrayItem("projects", index)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-2"
                            >
                              <Trash2Icon className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">Project Name</label>
                              <input
                                type="text"
                                value={project.name}
                                onChange={(e) => updateArrayField("projects", index, "name", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="Project Name"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">Technologies</label>
                              <input
                                type="text"
                                value={project.technologies}
                                onChange={(e) => updateArrayField("projects", index, "technologies", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="Tech Stack"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">Duration</label>
                              <input
                                type="text"
                                value={project.duration}
                                onChange={(e) => updateArrayField("projects", index, "duration", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="Duration"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">GitHub</label>
                              <input
                                type="url"
                                value={project.githubLink}
                                onChange={(e) => updateArrayField("projects", index, "githubLink", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="URL"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-400 text-xs font-medium mb-1.5">Live Link</label>
                              <input
                                type="url"
                                value={project.liveLink}
                                onChange={(e) => updateArrayField("projects", index, "liveLink", e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                placeholder="URL"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-slate-400 text-xs font-medium">Description Points</label>
                              <button
                                onClick={() => addPoint("projects", index)}
                                className="text-orange-400 hover:text-orange-300 transition-colors text-xs flex items-center"
                              >
                                <PlusIcon className="w-3 h-3 mr-1" /> Add Point
                              </button>
                            </div>
                            <div className="space-y-2">
                              {project.points.map((point, pointIndex) => (
                                <div key={pointIndex} className="flex gap-2 items-start">
                                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0"></div>
                                  <input
                                    type="text"
                                    value={point}
                                    onChange={(e) => updatePoint("projects", index, pointIndex, e.target.value)}
                                    className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                                    placeholder="Description point (use **text** for bold)"
                                  />
                                  {project.points.length > 1 && (
                                    <button
                                      onClick={() => removePoint("projects", index, pointIndex)}
                                      className="text-slate-600 hover:text-red-400 transition-colors mt-2"
                                    >
                                      <MinusIcon className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {activeSection === "skills" && (
                <div className="animate-fade-in space-y-6">
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
                    <p className="text-orange-300 text-sm flex items-start">
                      <SparklesIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      Customize your skill categories. Add items separated by commas.
                    </p>
                  </div>

                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="p-6 bg-slate-800/30 rounded-2xl border border-white/5">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-slate-400 text-xs font-medium mb-1.5">Category Title</label>
                          <input
                            type="text"
                            value={skill.title}
                            onChange={(e) => updateSkills(index, "title", e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                            placeholder="Category"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 text-xs font-medium mb-1.5">Skills</label>
                          <input
                            type="text"
                            value={skill.items}
                            onChange={(e) => updateSkills(index, "items", e.target.value)}
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:border-orange-500 focus:outline-none transition-colors"
                            placeholder="Comma separated skills"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Coursework */}
              {activeSection === "coursework" && (
                <div className="animate-fade-in">
                  <div className="bg-slate-800/30 rounded-2xl border border-white/5 p-6">
                    <label className="block text-slate-400 text-sm font-medium mb-2">Relevant Coursework</label>
                    <textarea
                      value={resumeData.coursework}
                      onChange={(e) => updateTextField("coursework", e.target.value)}
                      rows={6}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Data Structures, Algorithms, Database Management..."
                    />
                    <p className="text-slate-500 text-xs mt-2">Separate courses with commas.</p>
                  </div>
                </div>
              )}

              {/* Leadership */}
              {activeSection === "leadership" && (
                <div className="animate-fade-in">
                  <div className="bg-slate-800/30 rounded-2xl border border-white/5 p-6">
                    <label className="block text-slate-400 text-sm font-medium mb-2">Leadership & Extracurricular</label>
                    <textarea
                      value={resumeData.leadership}
                      onChange={(e) => updateTextField("leadership", e.target.value)}
                      rows={8}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="**Team Lead** for college coding club..."
                    />
                    <p className="text-slate-500 text-xs mt-2">One activity per line. Use **text** for bold.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <FileTextIcon className="w-5 h-5 mr-2 text-orange-400" />
                    Live Preview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Auto-updating</span>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
