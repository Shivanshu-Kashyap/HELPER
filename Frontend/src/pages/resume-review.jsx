"use client"

import { useState } from "react"
import { UploadIcon, FileTextIcon, StarIcon, TrendingUpIcon, AlertCircleIcon, CheckCircleIcon } from "lucide-react"

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
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreGradient = (score) => {
    if (score >= 80) return "from-green-500 to-green-600"
    if (score >= 60) return "from-yellow-500 to-yellow-600"
    return "from-red-500 to-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <FileTextIcon className="w-6 h-6 text-purple-400" />
              <span className="text-white font-medium">AI Resume Analyzer</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Resume Review & ATS Score</h1>
          <p className="text-gray-300 text-lg">Get detailed analysis and ATS scoring for your resume</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Upload Resume</h2>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Resume (PDF only)</label>
              <div className="relative">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="resume-upload" />
                <label
                  htmlFor="resume-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-purple-500 transition-colors duration-300"
                >
                  <UploadIcon className="w-8 h-8 text-purple-400 mb-2" />
                  <span className="text-white">{file ? file.name : "Click to upload your resume"}</span>
                  <span className="text-gray-400 text-sm">PDF files only</span>
                </label>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Job Title *</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={jobDetails.jobTitle}
                  onChange={handleJobDetailsChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g., Software Engineer, Data Scientist"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={jobDetails.companyName}
                  onChange={handleJobDetailsChange}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="e.g., Google, Microsoft"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Job Description *</label>
                <textarea
                  name="jobDescription"
                  value={jobDetails.jobDescription}
                  onChange={handleJobDetailsChange}
                  rows={4}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="Paste the job description here..."
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Key Requirements</label>
                <textarea
                  name="requirements"
                  value={jobDetails.requirements}
                  onChange={handleJobDetailsChange}
                  rows={3}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="List key skills and requirements..."
                />
              </div>
            </div>

            <button
              onClick={analyzeResume}
              disabled={loading || !file || !jobDetails.jobTitle || !jobDetails.jobDescription}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <TrendingUpIcon className="w-5 h-5" />
                  <span>Analyze Resume</span>
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {!analysis ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FileTextIcon className="w-16 h-16 text-purple-400 mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">Upload your resume to get started</h3>
                <p className="text-gray-400">
                  We'll analyze your resume and provide detailed feedback with ATS scoring
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* ATS Score */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">ATS Score</h3>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-white/10"></div>
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${getScoreGradient(analysis.atsScore)}`}
                      style={{
                        background: `conic-gradient(from 0deg, ${analysis.atsScore >= 80 ? "#10b981" : analysis.atsScore >= 60 ? "#f59e0b" : "#ef4444"} ${(analysis.atsScore / 100) * 360}deg, transparent 0deg)`,
                      }}
                    ></div>
                    <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                        {analysis.atsScore}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    {analysis.atsScore >= 80 ? "Excellent" : analysis.atsScore >= 60 ? "Good" : "Needs Improvement"}
                  </p>
                </div>

                {/* Strengths */}
                {analysis.strengths && analysis.strengths.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <StarIcon className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Areas for Improvement */}
                {analysis.improvements && analysis.improvements.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <AlertCircleIcon className="w-5 h-5 text-yellow-400 mr-2" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {analysis.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <TrendingUpIcon className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Keywords Analysis */}
                {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overall Feedback */}
                {analysis.overallFeedback && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Overall Feedback</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{analysis.overallFeedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
