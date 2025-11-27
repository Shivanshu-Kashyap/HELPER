"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PlusIcon, TicketIcon, UserIcon, CalendarIcon, SearchIcon, FilterIcon, Loader2 } from "lucide-react"

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" })
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

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
        fetchTickets()
        alert("✅ Ticket created successfully!")
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

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900/20 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Support Tickets</h1>
            <p className="text-zinc-400">Manage and track your support requests</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="group relative px-6 py-3 bg-orange-500 rounded-xl font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all duration-300 overflow-hidden"
          >
            <span className="relative flex items-center space-x-2">
              <PlusIcon className={`w-5 h-5 transition-transform duration-300 ${showForm ? "rotate-45" : ""}`} />
              <span>{showForm ? "Cancel" : "New Ticket"}</span>
            </span>
          </button>
        </div>

        {/* Create Ticket Form */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showForm ? "max-h-[800px] opacity-100 mb-12" : "max-h-0 opacity-0"}`}>
          <div className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Brief description of your issue"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Provide detailed information about your issue..."
                  rows={4}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loading ? "Creating..." : "Submit Ticket"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
            />
          </div>
          <button className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center space-x-2">
            <FilterIcon className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Tickets Grid */}
        {filteredTickets.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-white/5 border-dashed">
            <div className="bg-zinc-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <TicketIcon className="w-10 h-10 text-zinc-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tickets found</h3>
            <p className="text-zinc-400 max-w-md mx-auto">
              {searchTerm ? "Try adjusting your search terms" : "Create your first support ticket to get started with AI-powered assistance"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/tickets/${ticket._id}`}
                className="group bg-zinc-900/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-orange-500/30 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace("_", " ")}
                  </span>
                  {ticket.priority && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-1">
                  {ticket.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2 flex-grow">
                  {ticket.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <div className="flex items-center space-x-2 text-xs text-zinc-500">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-zinc-500">
                    <UserIcon className="w-4 h-4" />
                    <span className="truncate max-w-[100px]">
                      {user.role === "user" ? ticket.assignedTo?.email || "Unassigned" : ticket.createdBy?.email}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
