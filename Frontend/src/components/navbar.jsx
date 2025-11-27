"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { BrainCircuitIcon, MenuIcon, XIcon, ChevronRightIcon } from "lucide-react"
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
        ? "bg-black/80 backdrop-blur-xl border-white/10"
        : "bg-transparent border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* <div className="bg-white/10 p-2 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
              <BrainCircuitIcon className="w-6 h-6 text-white group-hover:text-orange-500 transition-colors duration-300" />
            </div> */}
            <span className="text-xl font-bold text-white tracking-tight">
              HELPER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {token &&
                navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium transition-colors duration-300 ${isActive(item.path)
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 flex items-center"
                >
                  Get Started
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                    {user?.email?.[0].toUpperCase()}
                  </div>
                  <span className="text-zinc-300 text-sm font-medium hidden lg:block">
                    {user?.email?.split("@")[0]}
                  </span>
                </div>

                {user && user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-amber-400 hover:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30 px-2 py-1 rounded hover:bg-amber-500/10 transition-all"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="text-zinc-400 hover:text-white text-sm font-medium transition-colors duration-300"
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
              className="text-zinc-400 hover:text-white p-2 transition-colors duration-300"
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
          <div className="py-4 space-y-2 border-t border-white/10 bg-black/95 backdrop-blur-xl">
            {token &&
              navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-300 ${isActive(item.path)
                    ? "text-orange-500 bg-orange-500/10 border-l-2 border-orange-500"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

            <div className="pt-4 mt-2 border-t border-white/10 space-y-3 px-4">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center py-3 text-zinc-400 hover:text-white font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left py-3 text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
