"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { BrainCircuitIcon, MenuIcon, XIcon } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const token = localStorage.getItem("token")
  let user = localStorage.getItem("user")
  if (user) {
    user = JSON.parse(user)
  }
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const navItems = [
    { name: "AI Tickets", path: "/tickets" },
    { name: "Cold Email", path: "/cold-email" },
    { name: "Resume Review", path: "/resume-review" },
    { name: "Resume Builder", path: "/resume-builder" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            {/* <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <BrainCircuitIcon className="w-8 h-8 text-blue-400 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
            </div> */}
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              HELPER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {token &&
                navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive(item.path)
                        ? "bg-white/10 text-white shadow-inner"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 hover:bg-white/5"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm font-medium">
                  Hi, <span className="text-blue-400">{user?.email?.split("@")[0]}</span>
                </span>
                {user && user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-yellow-400 hover:text-yellow-300 px-3 py-1 rounded-full text-xs font-bold border border-yellow-400/30 hover:bg-yellow-400/10 transition-all duration-300"
                  >
                    ADMIN
                  </Link>
                )}
                {user && user?.role === "moderator" && (
                  <Link
                    to="/moderator"
                    className="text-green-400 hover:text-green-300 px-3 py-1 rounded-full text-xs font-bold border border-green-400/30 hover:bg-green-400/10 transition-all duration-300"
                  >
                    MOD
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 hover:bg-red-500/10 hover:text-red-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg transition-colors duration-300 hover:bg-white/5"
            >
              {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/10 mt-2 mb-4 shadow-xl">
            {token &&
              navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${isActive(item.path)
                      ? "bg-blue-600/20 text-blue-400"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

            <div className="border-t border-white/10 pt-4 mt-2 space-y-2">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 text-sm text-gray-400">
                    Signed in as <span className="text-white font-medium">{user?.email}</span>
                  </div>
                  {user && user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 rounded-xl text-base font-medium text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  {user && user?.role === "moderator" && (
                    <Link
                      to="/moderator"
                      className="block px-4 py-3 rounded-xl text-base font-medium text-green-400 hover:bg-green-400/10 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Moderator Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-500/10 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
