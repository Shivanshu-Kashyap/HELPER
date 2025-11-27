"use client"

import { useState } from "react"
import { DownloadIcon, MailIcon, BrainCircuitIcon, Loader2, SparklesIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from "lucide-react"

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
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900/20 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-orange-500/20">
            <SparklesIcon className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 font-medium text-sm">AI-Powered Outreach</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Cold Email & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Cover Letter</span> Generator
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Craft personalized, high-converting outreach messages in seconds using advanced AI.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -translate-y-1/2 rounded-full z-0"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
          <div className="relative z-10 flex justify-between">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-4 transition-all duration-500 ${step >= stepNum
                  ? "bg-black border-orange-500 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                  : "bg-zinc-900 border-zinc-700 text-zinc-500"
                  }`}
              >
                {step > stepNum ? <CheckCircleIcon className="w-5 h-5" /> : <span className="font-bold">{stepNum}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl transition-all duration-500">

          {/* Step 1: Email Type Selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">What would you like to create?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setEmailType("cold-email")}
                  className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${emailType === "cold-email"
                    ? "border-orange-500 bg-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-orange-500/50 hover:bg-zinc-800"
                    }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${emailType === "cold-email" ? "bg-orange-500 text-white" : "bg-zinc-700 text-zinc-400 group-hover:bg-orange-500/20 group-hover:text-orange-400"
                    }`}>
                    <MailIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Cold Email</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Perfect for networking, sales outreach, or contacting recruiters directly. Short, punchy, and persuasive.
                  </p>
                </button>

                <button
                  onClick={() => setEmailType("cover-letter")}
                  className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${emailType === "cover-letter"
                    ? "border-orange-500 bg-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.15)]"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-orange-500/50 hover:bg-zinc-800"
                    }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${emailType === "cover-letter" ? "bg-orange-500 text-white" : "bg-zinc-700 text-zinc-400 group-hover:bg-orange-500/20 group-hover:text-orange-400"
                    }`}>
                    <BrainCircuitIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Cover Letter</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Professional, detailed letter for job applications. Highlights your experience and fit for the role.
                  </p>
                </button>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="group relative px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative flex items-center">
                    Continue <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Job Information */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Target Role Details</h2>
                <p className="text-zinc-400">Tell us about the position you're applying for</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={jobInfo.companyName}
                    onChange={handleJobInfoChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                    placeholder="e.g., Google"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={jobInfo.jobTitle}
                    onChange={handleJobInfoChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Hiring Manager (Optional)</label>
                  <input
                    type="text"
                    name="hiringManagerName"
                    value={jobInfo.hiringManagerName}
                    onChange={handleJobInfoChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                    placeholder="e.g., Sarah Connor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Company Description</label>
                  <input
                    type="text"
                    name="companyDescription"
                    value={jobInfo.companyDescription}
                    onChange={handleJobInfoChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                    placeholder="Briefly describe what they do"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Job Description *</label>
                <textarea
                  name="jobDescription"
                  value={jobInfo.jobDescription}
                  onChange={handleJobInfoChange}
                  rows={4}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  placeholder="Paste the full job description here..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Key Requirements</label>
                <textarea
                  name="jobRequirements"
                  value={jobInfo.jobRequirements}
                  onChange={handleJobInfoChange}
                  rows={3}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  placeholder="List specific skills or requirements to highlight..."
                />
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-zinc-400 hover:text-white font-medium transition-colors flex items-center"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!jobInfo.companyName || !jobInfo.jobTitle || !jobInfo.jobDescription}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Continue <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: User Information */}
          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Your Profile</h2>
                <p className="text-zinc-400">Help AI understand your background</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={userInfo.fullName}
                    onChange={handleUserInfoChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Current Role</label>
                  <input
                    type="text"
                    name="currentRole"
                    value={userInfo.currentRole}
                    onChange={handleUserInfoChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                    placeholder="e.g., Software Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={userInfo.linkedinUrl}
                    onChange={handleUserInfoChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Experience Summary *</label>
                <textarea
                  name="experience"
                  value={userInfo.experience}
                  onChange={handleUserInfoChange}
                  rows={3}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  placeholder="Briefly summarize your relevant experience..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Key Skills *</label>
                <textarea
                  name="skills"
                  value={userInfo.skills}
                  onChange={handleUserInfoChange}
                  rows={2}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  placeholder="React, Node.js, Python, etc."
                  required
                />
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 text-zinc-400 hover:text-white font-medium transition-colors flex items-center"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
                </button>
                <button
                  onClick={generateContent}
                  disabled={!userInfo.fullName || !userInfo.email || !userInfo.experience || !userInfo.skills || loading}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate <SparklesIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Generated Content */}
          {step === 4 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 mb-4">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white">Content Generated!</h2>
                <p className="text-zinc-400">Here is your personalized {emailType === "cold-email" ? "cold email" : "cover letter"}</p>
              </div>

              <div className="bg-zinc-800/50 rounded-xl p-6 mb-8 border border-white/10 overflow-hidden relative group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedContent)}
                    className="px-3 py-1 bg-zinc-700 text-xs text-white rounded hover:bg-zinc-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <pre className="whitespace-pre-wrap text-zinc-300 font-sans text-sm leading-relaxed">
                  {generatedContent}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border border-zinc-600 text-white rounded-xl font-semibold hover:bg-white/5 transition-all duration-300"
                >
                  Create Another
                </button>
                <button
                  onClick={downloadContent}
                  className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all duration-300 flex items-center justify-center"
                >
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Download Text File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
