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
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-zinc-400">Join the future of productivity</p>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-300 ml-1">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${form.role === 'user' ? 'bg-orange-500/10 border-orange-500' : 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={form.role === 'user'}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <UserIcon className={`w-6 h-6 mb-2 ${form.role === 'user' ? 'text-orange-500' : 'text-zinc-500'}`} />
                  <span className={`text-sm font-medium ${form.role === 'user' ? 'text-white' : 'text-zinc-400'}`}>User</span>
                </label>

                <label className={`relative flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all duration-300 ${form.role === 'moderator' ? 'bg-amber-500/10 border-amber-500' : 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="moderator"
                    checked={form.role === 'moderator'}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />
                  <BriefcaseIcon className={`w-6 h-6 mb-2 ${form.role === 'moderator' ? 'text-amber-500' : 'text-zinc-500'}`} />
                  <span className={`text-sm font-medium ${form.role === 'moderator' ? 'text-white' : 'text-zinc-400'}`}>Moderator</span>
                </label>
              </div>
            </div>

            {form.role === "moderator" && (
              <div className="space-y-2 animate-fade-in">
                <label className="block text-sm font-medium text-zinc-300 ml-1">Skills</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <CodeIcon className="h-5 w-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, Python..."
                    className="block w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-all duration-300"
                    value={form.skills}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-zinc-500 ml-1">Comma-separated list of your technical skills</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-300"
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
