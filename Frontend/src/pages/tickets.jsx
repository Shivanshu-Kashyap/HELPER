"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PlusIcon, TicketIcon, UserIcon, CalendarIcon } from "lucide-react"

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" })
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      })
      
      if (!res.ok) {
        const data = await res.json()
        console.error("Failed to fetch tickets:", data.message)
        return
      }
      
      const data = await res.json()
      setTickets(data.tickets || [])
    } catch (err) {
      console.error("Failed to fetch tickets:", err)
      alert("❌ Error loading tickets. Please refresh the page.")
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Client-side validation
    if (form.title.trim().length < 5) {
      alert("Title must be at least 5 characters long")
      return
    }
    
    if (form.description.trim().length < 10) {
      alert("Description must be at least 10 characters long")
      return
    }
    
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setForm({ title: "", description: "" })
        setShowForm(false)
        fetchTickets() // Refresh list
        alert("✅ Ticket created successfully! Our AI is analyzing it now and will assign it to the right moderator.")
      } else {
        alert(data.message || "Failed to create ticket. Please try again.")
      }
    } catch (err) {
      alert("❌ Error creating ticket. Please check your connection and try again.")
      console.error(err)
    } finally {
      setLoading(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <TicketIcon className="w-6 h-6 text-blue-400" />
              <span className="text-white font-medium">AI Ticket System</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Support Tickets</h1>
          <p className="text-gray-300 text-lg">Create and manage your support tickets with AI assistance</p>
        </div>

        {/* Create Ticket Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <PlusIcon className="w-5 h-5" />
            <span>{showForm ? "Cancel" : "Create New Ticket"}</span>
          </button>
        </div>

        {/* Create Ticket Form */}
        {showForm && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Brief description of your issue"
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Provide detailed information about your issue..."
                  rows={4}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Ticket..." : "Submit Ticket"}
              </button>
            </form>
          </div>
        )}

        {/* Tickets List */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">
            {user.role === "admin" ? "All Tickets" : user.role === "moderator" ? "Assigned Tickets" : "Your Tickets"}
          </h2>

          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <TicketIcon className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">No tickets found</h3>
              <p className="text-gray-400">
                {user.role === "moderator"
                  ? "You don't have any assigned tickets yet"
                  : "Create your first support ticket to get started"}
              </p>
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
                        <div className="flex items-center space-x-1 text-gray-400">
                          <UserIcon className="w-4 h-4" />
                          <span>
                            {user.role === "user"
                              ? ticket.assignedTo?.email || "Unassigned"
                              : ticket.createdBy?.email || "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                        </div>
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
                    <div className="flex flex-wrap gap-2">
                      {ticket.relatedSkills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {ticket.relatedSkills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs border border-gray-500/30">
                          +{ticket.relatedSkills.length - 3} more
                        </span>
                      )}
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
