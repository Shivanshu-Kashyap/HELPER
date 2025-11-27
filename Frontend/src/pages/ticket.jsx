"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { ArrowLeftIcon, UserIcon, CalendarIcon, CheckCircleIcon, AlertCircleIcon, SparklesIcon, MessageSquareIcon, ClockIcon } from "lucide-react"

export default function TicketDetailsPage() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [solution, setSolution] = useState("")
  const [status, setStatus] = useState("")

  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    fetchTicket()
  }, [id])

  const fetchTicket = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (res.ok) {
        setTicket(data.ticket)
        setStatus(data.ticket.status)
        setSolution(data.ticket.solution || "")
      } else {
        alert(data.message || "Failed to fetch ticket details")
        console.error("Failed to fetch ticket:", data.message)
      }
    } catch (err) {
      console.error(err)
      alert("❌ Error loading ticket. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const updateTicket = async () => {
    if (!status) {
      alert("Please select a status")
      return
    }

    if (status === "RESOLVED" && !solution.trim()) {
      const confirmEmpty = window.confirm(
        "You're marking this ticket as RESOLVED without providing a solution. Are you sure?"
      )
      if (!confirmEmpty) return
    }

    setUpdating(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
          solution: solution.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        alert("✅ Ticket updated successfully!")
        fetchTicket()
      } else {
        alert(data.message || "Failed to update ticket. Please try again.")
      }
    } catch (err) {
      console.error(err)
      alert("❌ Error updating ticket. Please check your connection and try again.")
    } finally {
      setUpdating(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "TODO":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "IN_PROGRESS":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      case "RESOLVED":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
      case "CLOSED":
        return "text-slate-400 bg-slate-400/10 border-slate-400/20"
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      case "medium":
        return "text-orange-400 bg-orange-400/10 border-orange-400/20"
      case "low":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-slate-400 text-lg">Loading ticket details...</div>
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Ticket Not Found</h2>
          <Link to="/tickets" className="text-blue-400 hover:text-blue-300">Return to Tickets</Link>
        </div>
      </div>
    )
  }

  const canEdit = user.role === "admin" || (user.role === "moderator" && ticket.assignedTo?._id === user._id)

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Link to="/tickets" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Tickets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Ticket Header Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace("_", " ")}
                </span>
                {ticket.priority && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.toUpperCase()} PRIORITY
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-6 leading-tight">{ticket.title}</h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed">{ticket.description}</p>
              </div>

              <div className="flex items-center space-x-6 mt-8 pt-6 border-t border-white/5 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-4 h-4" />
                  <span>{ticket.createdBy?.email || "Unknown User"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* AI Analysis Card */}
            {ticket.helpfulNotes && (
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <SparklesIcon className="w-24 h-24 text-blue-400" />
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <SparklesIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Analysis</h3>
                </div>

                <div className="prose prose-invert max-w-none text-slate-300 bg-slate-900/50 rounded-xl p-6 border border-white/5">
                  <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Solution Section */}
            {(ticket.solution || canEdit) && (
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Resolution</h3>
                </div>

                {canEdit ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">Solution Details</label>
                      <textarea
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        rows={6}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                        placeholder="Provide a detailed solution for this ticket..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-800/30 p-4 rounded-xl border border-white/5">
                      <div className="w-full sm:w-auto">
                        <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full sm:w-48 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="TODO">To Do</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                      </div>

                      <button
                        onClick={updateTicket}
                        disabled={updating}
                        className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating ? "Updating..." : "Update Ticket"}
                      </button>
                    </div>
                  </div>
                ) : ticket.solution ? (
                  <div className="bg-emerald-900/10 rounded-xl p-6 border border-emerald-500/20">
                    <div className="prose prose-invert max-w-none text-slate-300">
                      <ReactMarkdown>{ticket.solution}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500 bg-slate-800/30 rounded-xl border border-white/5 border-dashed">
                    <ClockIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No solution provided yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Assignment</h3>
              <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {ticket.assignedTo?.email?.[0].toUpperCase() || "?"}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {ticket.assignedTo?.email || "Unassigned"}
                  </div>
                  <div className="text-xs text-slate-400">
                    {ticket.assignedTo ? "Moderator" : "No moderator assigned"}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            {ticket.relatedSkills && ticket.relatedSkills.length > 0 && (
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4">Related Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.relatedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
