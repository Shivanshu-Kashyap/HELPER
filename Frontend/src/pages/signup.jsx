"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
    skills: "",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const skillsArray = form.skills
        ? form.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : []

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role,
          skills: skillsArray,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/")
      } else {
        alert(data.error || "Signup failed")
      }
    } catch (err) {
      alert("Something went wrong")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 w-full max-w-md">
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-300">Join HELPER today</p>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="user" className="bg-slate-800">
                User
              </option>
              <option value="moderator" className="bg-slate-800">
                Moderator
              </option>
            </select>
          </div>

          {form.role === "moderator" && (
            <div>
              <label className="block text-white font-medium mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                placeholder="e.g., React, Node.js, Python, MongoDB"
                className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                value={form.skills}
                onChange={handleChange}
              />
              <p className="text-gray-400 text-sm mt-1">Add your technical skills to get relevant ticket assignments</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}
