"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { MailIcon, LockIcon, BrainCircuitIcon, ArrowRightIcon, Loader2, UserIcon, CodeIcon, BriefcaseIcon } from "lucide-react"

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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <BrainCircuitIcon className="w-10 h-10 text-blue-400 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              HELPER
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400">Join the future of productivity</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="block w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  className="block w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300 ml-1">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${form.role === 'user' ? 'bg-blue-600/20 border-blue-500' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={form.role === 'user'}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <UserIcon className={`w-6 h-6 mb-2 ${form.role === 'user' ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${form.role === 'user' ? 'text-white' : 'text-slate-400'}`}>User</span>
                </label>

                <label className={`relative flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${form.role === 'moderator' ? 'bg-purple-600/20 border-purple-500' : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="moderator"
                    checked={form.role === 'moderator'}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <BriefcaseIcon className={`w-6 h-6 mb-2 ${form.role === 'moderator' ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span className={`text-sm font-medium ${form.role === 'moderator' ? 'text-white' : 'text-slate-400'}`}>Moderator</span>
                </label>
              </div>
            </div>

            {form.role === "moderator" && (
              <div className="space-y-2 animate-fade-in">
                <label className="block text-sm font-medium text-slate-300 ml-1">Skills</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CodeIcon className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, Python..."
                    className="block w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
                    value={form.skills}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-slate-500 ml-1">Comma-separated list of your technical skills</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Sign Up
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
