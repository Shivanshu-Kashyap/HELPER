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
        return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20"
      case "IN_PROGRESS":
        return "text-orange-400 bg-orange-400/10 border-orange-400/20"
      case "RESOLVED":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
      case "CLOSED":
        return "text-zinc-500 bg-zinc-500/10 border-zinc-500/20"
      default:
        return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      case "medium":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20"
      case "low":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20"
      default:
        return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-zinc-400 text-lg">Loading assigned tickets...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900/20 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-500/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-orange-500/20">
            <UserIcon className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 font-medium text-sm">Moderator Panel</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Your Assigned Tickets</h1>
          <p className="text-zinc-400 text-lg">Manage and resolve support tickets assigned to you</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Assigned</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="bg-zinc-800 p-3 rounded-lg">
                <ClockIcon className="w-6 h-6 text-zinc-400" />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Pending</p>
                <p className="text-3xl font-bold text-zinc-300">{stats.pending}</p>
              </div>
              <div className="bg-zinc-800 p-3 rounded-lg">
                <AlertCircleIcon className="w-6 h-6 text-zinc-400" />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-orange-400">{stats.inProgress}</p>
              </div>
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <ClockIcon className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Resolved</p>
                <p className="text-3xl font-bold text-emerald-400">{stats.resolved}</p>
              </div>
              <div className="bg-emerald-500/20 p-3 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Assigned Tickets</h2>

          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <UserIcon className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No tickets assigned yet</h3>
              <p className="text-zinc-500">You'll see tickets here when they're assigned to you based on your skills</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Link
                  key={ticket._id}
                  to={`/tickets/${ticket._id}`}
                  className="block bg-zinc-900/50 rounded-xl p-6 border border-white/5 hover:border-orange-500/30 transition-all duration-300 hover:bg-zinc-800/50 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">{ticket.title}</h3>
                      <p className="text-zinc-400 mb-3 line-clamp-2">{ticket.description}</p>

                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-zinc-500">Created by: {ticket.createdBy?.email || "Unknown"}</span>
                        <span className="text-zinc-500">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace("_", " ")}
                      </span>

                      {ticket.priority && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(ticket.priority)}`}
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
                          className="px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-xs border border-zinc-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {ticket.helpfulNotes && (
                    <div className="bg-orange-900/10 rounded-lg p-3 border border-orange-500/10">
                      <p className="text-zinc-300 text-sm">
                        <strong className="text-orange-400">AI Notes:</strong> {ticket.helpfulNotes.substring(0, 150)}...
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
