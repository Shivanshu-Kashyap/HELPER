import { Link } from "react-router-dom"
import { TicketIcon, MailIcon, FileTextIcon, UserIcon, ArrowRightIcon, BrainCircuitIcon, StarIcon, CheckCircleIcon } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      id: "ai-tickets",
      title: "AI Ticket System",
      description:
        "Smart ticket management with AI-powered categorization, priority assignment, and skill-based moderator matching.",
      icon: <TicketIcon className="w-8 h-8" />,
      link: "/tickets",
      color: "from-blue-500 to-indigo-600",
      features: [
        "Automatic categorization",
        "Smart priority assignment",
        "Skill-based matching",
        "AI helpful notes",
      ],
    },
    {
      id: "cold-email",
      title: "Cold Email Generator",
      description:
        "Generate personalized cold emails and cover letters tailored to specific job opportunities using AI.",
      icon: <MailIcon className="w-8 h-8" />,
      link: "/cold-email",
      color: "from-emerald-500 to-teal-600",
      features: [
        "Personalized content",
        "Job-specific customization",
        "Professional templates",
        "Instant download",
      ],
    },
    {
      id: "resume-review",
      title: "Resume Review",
      description: "Get your resume analyzed with ATS scoring and detailed improvement suggestions.",
      icon: <FileTextIcon className="w-8 h-8" />,
      link: "/resume-review",
      color: "from-violet-500 to-purple-600",
      features: ["ATS score analysis", "Detailed feedback", "Improvement tips", "Keyword optimization"],
    },
    {
      id: "resume-builder",
      title: "Resume Builder",
      description: "Build professional resumes with our LaTeX-powered template system and live preview.",
      icon: <UserIcon className="w-8 h-8" />,
      link: "/resume-builder",
      color: "from-orange-500 to-red-600",
      features: ["LaTeX templates", "Live preview", "Easy form input", "PDF export"],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm text-blue-200 font-medium">AI-Powered Productivity Suite</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-slide-up">
            <span className="block text-white mb-2">Supercharge your</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Workflow with AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Your all-in-one assistant for intelligent ticket management, career growth, and automated content generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/tickets"
              className="group relative px-8 py-4 bg-blue-600 rounded-full font-semibold text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:bg-blue-500 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get Started Free
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300">
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 py-24 bg-slate-900/50 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Tools</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to excel in your career and manage tasks efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-500`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 mb-8 leading-relaxed h-20">
                    {feature.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-300">
                        <CheckCircleIcon className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={feature.link}
                    className="inline-flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors"
                  >
                    Try {feature.title}
                    <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Tickets Processed", value: "10K+", color: "text-blue-400" },
              { label: "Resumes Created", value: "5K+", color: "text-purple-400" },
              { label: "Success Rate", value: "99%", color: "text-emerald-400" },
              { label: "Active Users", value: "2K+", color: "text-pink-400" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-30"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of professionals who are saving time and advancing their careers with HELPER.
            </p>

            <Link
              to="/signup"
              className="relative z-10 inline-flex items-center px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors duration-300"
            >
              Get Started Now
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
