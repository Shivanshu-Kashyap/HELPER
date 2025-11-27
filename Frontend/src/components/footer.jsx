import { Link } from "react-router-dom"
import { BrainCircuitIcon, GithubIcon, TwitterIcon, LinkedinIcon, MailIcon } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                                <BrainCircuitIcon className="w-8 h-8 text-blue-400 relative z-10" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                                HELPER
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering your career journey with AI-driven tools. Build resumes, generate emails, and track your applications with ease.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <TwitterIcon className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <GithubIcon className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <LinkedinIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/resume-builder" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                                    Resume Builder
                                </Link>
                            </li>
                            <li>
                                <Link to="/resume-review" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                                    Resume Review
                                </Link>
                            </li>
                            <li>
                                <Link to="/cold-email" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                                    Cold Email Generator
                                </Link>
                            </li>
                            <li>
                                <Link to="/tickets" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                                    AI Tickets
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                                    Help Center
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-slate-400 text-sm">
                                <MailIcon className="w-4 h-4 text-blue-400" />
                                <span>support@helper.ai</span>
                            </li>
                            <li className="text-slate-400 text-sm">
                                123 AI Boulevard<br />
                                Tech City, TC 90210
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} HELPER. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm">
                        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
                        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
