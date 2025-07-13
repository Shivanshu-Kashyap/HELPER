"use client"

import { Link, useNavigate } from "react-router-dom"
import { BrainCircuitIcon, MenuIcon, XIcon } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const token = localStorage.getItem("token")
  let user = localStorage.getItem("user")
  if (user) {
    user = JSON.parse(user)
  }
  const navigate = useNavigate()

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

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BrainCircuitIcon className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HELPER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {token &&
                navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-white/10"
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
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">Hi, {user?.email?.split("@")[0]}</span>
                {user && user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="text-yellow-400 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Admin
                  </Link>
                )}
                {user && user?.role === "moderator" && (
                  <Link
                    to="/moderator"
                    className="text-green-400 hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Moderator
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-red-500/20"
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
              className="text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-300"
            >
              {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/50 rounded-lg mt-2">
              {token &&
                navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

              <div className="border-t border-white/10 pt-4 mt-4">
                {!token ? (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-gray-300 px-3 py-2 text-sm">Hi, {user?.email?.split("@")[0]}</div>
                    {user && user?.role === "admin" && (
                      <Link
                        to="/admin"
                        className="text-yellow-400 hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    {user && user?.role === "moderator" && (
                      <Link
                        to="/moderator"
                        className="text-green-400 hover:text-green-300 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
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
                      className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 hover:bg-red-500/20 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
