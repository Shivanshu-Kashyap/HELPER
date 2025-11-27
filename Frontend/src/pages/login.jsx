import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { MailIcon, LockIcon, BrainCircuitIcon, ArrowRightIcon, Loader2 } from "lucide-react"

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
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to access your AI workspace</p>
        </div>

        {/* Login Form */}
        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-8 border border-white/5 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
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
              <div className="flex justify-between items-center ml-1">
                <label className="block text-sm font-medium text-zinc-300">Password</label>
                <a href="#" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-all duration-300"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-300"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-zinc-900/50 rounded-xl border border-white/5">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Demo Credentials</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => setForm({ email: "admin@helper.com", password: "password" })}>
                <span className="text-zinc-300">Admin</span>
                <span className="text-zinc-500 group-hover:text-orange-400 transition-colors">admin@helper.com</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => setForm({ email: "user@example.com", password: "password" })}>
                <span className="text-zinc-300">User</span>
                <span className="text-zinc-500 group-hover:text-orange-400 transition-colors">user@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
