"use client"

import { useState } from "react"
import { UploadIcon, FileTextIcon, StarIcon, TrendingUpIcon, AlertCircleIcon, CheckCircleIcon, Loader2, SparklesIcon, ArrowRightIcon } from "lucide-react"

export default function ResumeReview() {
  const [file, setFile] = useState(null)
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    requirements: "",
  })
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const handleJobDetailsChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value })
  }

  const analyzeResume = async () => {
    if (!file || !jobDetails.jobTitle || !jobDetails.jobDescription) {
      alert("Please upload a resume and provide job details")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("jobDetails", JSON.stringify(jobDetails))

      const token = localStorage.getItem("token")
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ai/analyze-resume`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()
      if (response.ok) {
        setAnalysis(data.analysis)
      } else {
        alert(data.message || "Failed to analyze resume")
      }
    } catch (error) {
      console.error("Error analyzing resume:", error)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400"
    if (score >= 60) return "text-amber-400"
    return "text-rose-400"
  }

  const getScoreGradient = (score) => {
    if (score >= 80) return "from-emerald-500 to-teal-500"
    if (score >= 60) return "from-amber-500 to-orange-500"
    return "from-rose-500 to-red-500"
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-purple-500/20">
            <SparklesIcon className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 font-medium text-sm">AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Resume Review & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ATS Score</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Get detailed feedback, identify missing keywords, and optimize your resume for applicant tracking systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Upload Section */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
                  <UploadIcon className="w-5 h-5 text-purple-400" />
                </div>
                Upload Resume
              </h2>

              <div className="mb-6">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="resume-upload" />
                <label
                  htmlFor="resume-upload"
                  className={`group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${file
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-700 hover:border-purple-500/50 hover:bg-slate-800/50"
                    }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${file ? "bg-purple-500 text-white" : "bg-slate-800 text-slate-400 group-hover:bg-purple-500/20 group-hover:text-purple-400"
                    }`}>
                    {file ? <CheckCircleIcon className="w-6 h-6" /> : <UploadIcon className="w-6 h-6" />}
                  </div>
                  <span className={`font-medium ${file ? "text-purple-300" : "text-slate-400 group-hover:text-slate-300"}`}>
                    {file ? file.name : "Click to upload PDF"}
                  </span>
                  {!file && <span className="text-slate-500 text-sm mt-1">Maximum size 5MB</span>}
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={jobDetails.jobTitle}
                    onChange={handleJobDetailsChange}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={jobDetails.companyName}
                    onChange={handleJobDetailsChange}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                    placeholder="e.g., Tech Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Job Description *</label>
                  <textarea
                    name="jobDescription"
                    value={jobDetails.jobDescription}
                    onChange={handleJobDetailsChange}
                    rows={4}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                    placeholder="Paste the full job description here..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Key Requirements</label>
                  <textarea
                    name="requirements"
                    value={jobDetails.requirements}
                    onChange={handleJobDetailsChange}
                    rows={3}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                    placeholder="Specific skills or qualifications..."
                  />
                </div>
              </div>

              <button
                onClick={analyzeResume}
                disabled={loading || !file || !jobDetails.jobTitle || !jobDetails.jobDescription}
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5 mr-2" />
                      Analyze Resume
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl h-full min-h-[600px]">
              {!analysis ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <FileTextIcon className="w-10 h-10 text-slate-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Ready to Analyze</h3>
                  <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                    Upload your resume and job details to get a comprehensive analysis, ATS score, and actionable improvement tips.
                  </p>
                </div>
              ) : (
                <div className="space-y-8 animate-fade-in">
                  {/* ATS Score Card */}
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5 flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative w-40 h-40 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="transparent"
                          className="text-slate-700"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={440}
                          strokeDashoffset={440 - (440 * analysis.atsScore) / 100}
                          className={`transition-all duration-1000 ease-out ${analysis.atsScore >= 80 ? "text-emerald-500" : analysis.atsScore >= 60 ? "text-amber-500" : "text-rose-500"
                            }`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                          {analysis.atsScore}
                        </span>
                        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mt-1">ATS Score</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {analysis.atsScore >= 80 ? "Excellent Match!" : analysis.atsScore >= 60 ? "Good Potential" : "Needs Improvement"}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {analysis.atsScore >= 80
                          ? "Your resume is well-optimized for this role. You have a high chance of passing the ATS screening."
                          : analysis.atsScore >= 60
                            ? "Your resume is on the right track but could use some keyword optimization to rank higher."
                            : "Your resume needs significant optimization to pass ATS filters. Focus on adding missing keywords."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    {analysis.strengths && analysis.strengths.length > 0 && (
                      <div className="bg-emerald-900/10 rounded-2xl p-6 border border-emerald-500/20">
                        <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center">
                          <CheckCircleIcon className="w-5 h-5 mr-2" />
                          Strengths
                        </h4>
                        <ul className="space-y-3">
                          {analysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start text-slate-300 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-3 flex-shrink-0"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {analysis.improvements && analysis.improvements.length > 0 && (
                      <div className="bg-amber-900/10 rounded-2xl p-6 border border-amber-500/20">
                        <h4 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
                          <TrendingUpIcon className="w-5 h-5 mr-2" />
                          Improvements
                        </h4>
                        <ul className="space-y-3">
                          {analysis.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start text-slate-300 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 mr-3 flex-shrink-0"></div>
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Missing Keywords */}
                  {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
                    <div className="bg-rose-900/10 rounded-2xl p-6 border border-rose-500/20">
                      <h4 className="text-lg font-bold text-rose-400 mb-4 flex items-center">
                        <AlertCircleIcon className="w-5 h-5 mr-2" />
                        Missing Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingKeywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-rose-500/10 text-rose-300 rounded-lg text-sm border border-rose-500/20 font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Overall Feedback */}
                  {analysis.overallFeedback && (
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                      <h4 className="text-lg font-bold text-white mb-3">Overall Feedback</h4>
                      <p className="text-slate-300 leading-relaxed text-sm">{analysis.overallFeedback}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
