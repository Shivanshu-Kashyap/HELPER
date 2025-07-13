"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { MailIcon, LockIcon, BrainCircuitIcon } from "lucide-react"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/")
      } else {
        alert(data.error || data.message || "Login failed")
      }
    } catch (err) {
      alert("Something went wrong")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <BrainCircuitIcon className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HELPER
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full bg-white/10 border border-white/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-white font-medium mb-2">Demo Credentials:</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                <strong>Admin:</strong> admin@helper.com / password
              </p>
              <p>
                <strong>User:</strong> user@example.com / password
              </p>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-4">Access all HELPER features:</p>
          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <span>AI Tickets</span>
            <span>•</span>
            <span>Cold Emails</span>
            <span>•</span>
            <span>Resume Review</span>
            <span>•</span>
            <span>Resume Builder</span>
          </div>
        </div>
      </div>
    </div>
  )
}
