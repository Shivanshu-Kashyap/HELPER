"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ClockIcon, CheckCircleIcon, AlertCircleIcon, UserIcon } from "lucide-react"

export default function ModeratorPanel() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  })

  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      })
      
      if (!res.ok) {
        const data = await res.json()
        console.error("Failed to fetch tickets:", data.message)
        setLoading(false)
        return
      }
      
      const data = await res.json()
      if (res.ok) {
        setTickets(data.tickets || [])
        calculateStats(data.tickets || [])
      }
    } catch (err) {
      console.error("Failed to fetch tickets:", err)
      alert("❌ Error loading assigned tickets. Please refresh the page.")
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (ticketList) => {
    const stats = {
      total: ticketList.length,
      pending: ticketList.filter((t) => t.status === "TODO").length,
      inProgress: ticketList.filter((t) => t.status === "IN_PROGRESS").length,
      resolved: ticketList.filter((t) => t.status === "RESOLVED").length,
    }
    setStats(stats)
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
        <div className="text-white text-xl">Loading your assigned tickets...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <UserIcon className="w-6 h-6 text-blue-400" />
              <span className="text-white font-medium">Moderator Panel</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Your Assigned Tickets</h1>
          <p className="text-gray-300 text-lg">Manage and resolve support tickets assigned to you</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Assigned</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <ClockIcon className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <AlertCircleIcon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <ClockIcon className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Resolved</p>
                <p className="text-3xl font-bold text-green-400">{stats.resolved}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Assigned Tickets</h2>

          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">No tickets assigned yet</h3>
              <p className="text-gray-400">You'll see tickets here when they're assigned to you based on your skills</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Link
                  key={ticket._id}
                  to={`/tickets/${ticket._id}`}
                  className="block bg-white/5 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{ticket.title}</h3>
                      <p className="text-gray-300 mb-3 line-clamp-2">{ticket.description}</p>

                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">Created by: {ticket.createdBy?.email || "Unknown"}</span>
                        <span className="text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace("_", " ")}
                      </span>

                      {ticket.priority && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}
                        >
                          {ticket.priority.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  {ticket.relatedSkills && ticket.relatedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {ticket.relatedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {ticket.helpfulNotes && (
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <p className="text-gray-300 text-sm">
                        <strong className="text-white">AI Notes:</strong> {ticket.helpfulNotes.substring(0, 150)}...
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
