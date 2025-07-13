"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"

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
        alert(data.message || "Failed to fetch ticket")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const updateTicket = async () => {
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
        alert("Ticket updated successfully")
        fetchTicket() // Refresh ticket data
      } else {
        alert(data.message || "Failed to update ticket")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setUpdating(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "TODO":
        return "text-yellow-400 bg-yellow-400/20"
      case "IN_PROGRESS":
        return "text-blue-400 bg-blue-400/20"
      case "RESOLVED":
        return "text-green-400 bg-green-400/20"
      case "CLOSED":
        return "text-gray-400 bg-gray-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-400/20"
      case "medium":
        return "text-yellow-400 bg-yellow-400/20"
      case "low":
        return "text-green-400 bg-green-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading ticket details...</div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Ticket not found</div>
      </div>
    )
  }

  const canEdit = user.role === "admin" || (user.role === "moderator" && ticket.assignedTo?._id === user._id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-4">{ticket.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace("_", " ")}
                </span>
                {ticket.priority && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.toUpperCase()} PRIORITY
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-300 leading-relaxed">{ticket.description}</p>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Ticket Information</h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-2">
                  <p className="text-gray-300">
                    <strong className="text-white">Created by:</strong> {ticket.createdBy?.email || "Unknown"}
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-white">Created at:</strong> {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                  {ticket.assignedTo && (
                    <p className="text-gray-300">
                      <strong className="text-white">Assigned to:</strong> {ticket.assignedTo.email}
                    </p>
                  )}
                </div>
              </div>

              {ticket.relatedSkills && ticket.relatedSkills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Related Skills</h3>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {ticket.relatedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Notes */}
            {ticket.helpfulNotes && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">AI Generated Notes</h3>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="prose prose-invert max-w-none text-gray-300">
                    <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {/* Solution */}
            {(ticket.solution || canEdit) && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Solution</h3>
                {canEdit ? (
                  <div className="space-y-4">
                    <textarea
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      rows={6}
                      className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="Provide a detailed solution for this ticket..."
                    />
                    <div className="flex items-center space-x-4">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="TODO" className="bg-slate-800">
                          To Do
                        </option>
                        <option value="IN_PROGRESS" className="bg-slate-800">
                          In Progress
                        </option>
                        <option value="RESOLVED" className="bg-slate-800">
                          Resolved
                        </option>
                        <option value="CLOSED" className="bg-slate-800">
                          Closed
                        </option>
                      </select>
                      <button
                        onClick={updateTicket}
                        disabled={updating}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating ? "Updating..." : "Update Ticket"}
                      </button>
                    </div>
                  </div>
                ) : ticket.solution ? (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="prose prose-invert max-w-none text-gray-300">
                      <ReactMarkdown>{ticket.solution}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-gray-400 italic">No solution provided yet</p>
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
