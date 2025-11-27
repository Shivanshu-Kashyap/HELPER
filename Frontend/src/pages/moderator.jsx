"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ClockIcon, CheckCircleIcon, AlertCircleIcon, UserIcon, SparklesIcon, ArrowRightIcon, TicketIcon } from "lucide-react"

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
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-white/10 rounded-full px-3 py-1 mb-6 animate-fade-in">
            <span className="text-xs text-orange-400 font-medium tracking-wide uppercase flex items-center gap-1">
              <UserIcon className="w-3 h-3" />
              Moderator Panel
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            Your Assigned <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Tickets</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Manage and resolve support tickets efficiently with AI assistance.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-orange-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-zinc-800/50 p-3 rounded-xl group-hover:bg-orange-500/10 transition-colors">
                <TicketIcon className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-sm text-zinc-500">Assigned tickets</div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-orange-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-zinc-800/50 p-3 rounded-xl group-hover:bg-orange-500/10 transition-colors">
                <AlertCircleIcon className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Pending</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.pending}</div>
            <div className="text-sm text-zinc-500">Action required</div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-orange-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-zinc-800/50 p-3 rounded-xl group-hover:bg-orange-500/10 transition-colors">
                <ClockIcon className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">In Progress</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.inProgress}</div>
            <div className="text-sm text-zinc-500">Working on</div>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-orange-500/30 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-zinc-800/50 p-3 rounded-xl group-hover:bg-orange-500/10 transition-colors">
                <CheckCircleIcon className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Resolved</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stats.resolved}</div>
            <div className="text-sm text-zinc-500">Completed</div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Assigned Tickets</h2>
            <div className="text-sm text-zinc-500">{tickets.length} tickets found</div>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-zinc-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TicketIcon className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tickets assigned</h3>
              <p className="text-zinc-500 max-w-sm mx-auto">
                You're all caught up! Tickets will appear here when they are assigned to you.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {tickets.map((ticket) => (
                <Link
                  key={ticket._id}
                  to={`/tickets/${ticket._id}`}
                  className="block p-6 hover:bg-white/5 transition-colors duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                        {ticket.title}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                        {ticket.description}
                      </p>

                      <div className="flex items-center flex-wrap gap-4 text-xs text-zinc-500">
                        <span className="flex items-center">
                          <UserIcon className="w-3 h-3 mr-1" />
                          {ticket.createdBy?.email || "Unknown"}
                        </span>
                        <span className="flex items-center">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace("_", " ")}
                      </span>
                      {ticket.priority && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(ticket.priority)}`}>
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
                          className="px-2 py-1 bg-zinc-800/50 text-zinc-400 rounded text-xs border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {ticket.helpfulNotes && (
                    <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20 mt-2">
                      <p className="text-zinc-300 text-sm flex gap-2">
                        <SparklesIcon className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-orange-400">AI Insight:</strong> {ticket.helpfulNotes.substring(0, 150)}...
                        </span>
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
