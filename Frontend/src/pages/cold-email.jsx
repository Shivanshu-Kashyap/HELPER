"use client"

import { useState } from "react"
import { DownloadIcon, MailIcon, BrainCircuitIcon, LoaderIcon } from "lucide-react"

export default function ColdEmailGenerator() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const [jobInfo, setJobInfo] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
    companyDescription: "",
    hiringManagerName: "",
    jobRequirements: "",
  })

  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentRole: "",
    experience: "",
    skills: "",
    projects: "",
    achievements: "",
    linkedinUrl: "",
    portfolioUrl: "",
  })

  const [emailType, setEmailType] = useState("cold-email")

  const handleJobInfoChange = (e) => {
    setJobInfo({ ...jobInfo, [e.target.name]: e.target.value })
  }

  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const generateContent = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ai/generate-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobInfo,
          userInfo,
          emailType,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setGeneratedContent(data.content)
        setStep(4)
      } else {
        alert(data.message || "Failed to generate content")
      }
    } catch (error) {
      console.error("Error generating content:", error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const downloadContent = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${emailType === "cold-email" ? "Cold_Email" : "Cover_Letter"}_${userInfo.fullName.replace(/\s+/g, "_")}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const resetForm = () => {
    setStep(1)
    setJobInfo({
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      companyDescription: "",
      hiringManagerName: "",
      jobRequirements: "",
    })
    setUserInfo({
      fullName: "",
      email: "",
      phone: "",
      currentRole: "",
      experience: "",
      skills: "",
      projects: "",
      achievements: "",
      linkedinUrl: "",
      portfolioUrl: "",
    })
    setGeneratedContent("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <MailIcon className="w-6 h-6 text-green-400" />
              <span className="text-white font-medium">AI Email Generator</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Cold Email & Cover Letter Generator</h1>
          <p className="text-gray-300 text-lg">Generate personalized cold emails and cover letters using AI</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNum ? "bg-green-500 text-white" : "bg-white/20 text-gray-400"
                }`}
              >
                {stepNum}
              </div>
            ))}
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Email Type Selection */}
        {step === 1 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Content Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setEmailType("cold-email")}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  emailType === "cold-email"
                    ? "border-green-500 bg-green-500/20"
                    : "border-white/30 hover:border-white/50"
                }`}
              >
                <MailIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Cold Email</h3>
                <p className="text-gray-300">Reach out to potential employers or networking contacts</p>
              </button>

              <button
                onClick={() => setEmailType("cover-letter")}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  emailType === "cover-letter"
                    ? "border-green-500 bg-green-500/20"
                    : "border-white/30 hover:border-white/50"
                }`}
              >
                <BrainCircuitIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Cover Letter</h3>
                <p className="text-gray-300">Professional cover letter for job applications</p>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Job Information */}
        {step === 2 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Job Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={jobInfo.companyName}
                  onChange={handleJobInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., Google, Microsoft"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={jobInfo.jobTitle}
                  onChange={handleJobInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., Software Engineer, Product Manager"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Hiring Manager Name</label>
                <input
                  type="text"
                  name="hiringManagerName"
                  value={jobInfo.hiringManagerName}
                  onChange={handleJobInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., John Smith (optional)"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Company Description</label>
                <input
                  type="text"
                  name="companyDescription"
                  value={jobInfo.companyDescription}
                  onChange={handleJobInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="Brief company description"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Job Description *</label>
              <textarea
                name="jobDescription"
                value={jobInfo.jobDescription}
                onChange={handleJobInfoChange}
                rows={4}
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="Paste the job description here..."
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Key Requirements</label>
              <textarea
                name="jobRequirements"
                value={jobInfo.jobRequirements}
                onChange={handleJobInfoChange}
                rows={3}
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="Key skills and requirements for the role..."
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!jobInfo.companyName || !jobInfo.jobTitle || !jobInfo.jobDescription}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: User Information */}
        {step === 3 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleUserInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Current Role</label>
                <input
                  type="text"
                  name="currentRole"
                  value={userInfo.currentRole}
                  onChange={handleUserInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., Software Developer, Student"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={userInfo.linkedinUrl}
                  onChange={handleUserInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Portfolio URL</label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={userInfo.portfolioUrl}
                  onChange={handleUserInfoChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Experience *</label>
              <textarea
                name="experience"
                value={userInfo.experience}
                onChange={handleUserInfoChange}
                rows={3}
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="Brief overview of your work experience..."
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Skills *</label>
              <textarea
                name="skills"
                value={userInfo.skills}
                onChange={handleUserInfoChange}
                rows={3}
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="List your relevant skills (comma-separated)..."
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Projects</label>
              <textarea
                name="projects"
                value={userInfo.projects}
                onChange={handleUserInfoChange}
                rows={3}
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="Describe your relevant projects..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Achievements</label>
              <textarea
                name="achievements"
                value={userInfo.achievements}
                onChange={handleUserInfoChange}
                rows={3}
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                placeholder="Notable achievements, awards, certifications..."
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={generateContent}
                disabled={!userInfo.fullName || !userInfo.email || !userInfo.experience || !userInfo.skills || loading}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <span>Generate {emailType === "cold-email" ? "Email" : "Cover Letter"}</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Generated Content */}
        {step === 4 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Generated {emailType === "cold-email" ? "Cold Email" : "Cover Letter"}
            </h2>

            <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/20">
              <pre className="whitespace-pre-wrap text-gray-200 font-mono text-sm leading-relaxed">
                {generatedContent}
              </pre>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 border border-white/30 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Generate Another
              </button>
              <button
                onClick={downloadContent}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
