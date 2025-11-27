import { Link } from "react-router-dom"
import { TicketIcon, MailIcon, FileTextIcon, UserIcon, ArrowRightIcon, BrainCircuitIcon, StarIcon, CheckCircleIcon, SparklesIcon } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      id: "ai-tickets",
      title: "AI Ticket System",
      description:
        "Smart ticket management with AI-powered categorization, priority assignment, and skill-based moderator matching.",
      icon: <TicketIcon className="w-6 h-6" />,
      link: "/tickets",
      color: "text-orange-500",
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
      icon: <MailIcon className="w-6 h-6" />,
      link: "/cold-email",
      color: "text-amber-500",
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
      icon: <FileTextIcon className="w-6 h-6" />,
      link: "/resume-review",
      color: "text-orange-400",
      features: ["ATS score analysis", "Detailed feedback", "Improvement tips", "Keyword optimization"],
    },
    {
      id: "resume-builder",
      title: "Resume Builder",
      description: "Build professional resumes with our LaTeX-powered template system and live preview.",
      icon: <UserIcon className="w-6 h-6" />,
      link: "/resume-builder",
      color: "text-amber-400",
      features: ["LaTeX templates", "Live preview", "Easy form input", "PDF export"],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-orange-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-white/10 rounded-full px-3 py-1 mb-8 animate-fade-in">
            <span className="text-xs text-orange-400 font-medium tracking-wide uppercase flex items-center gap-1">
              <SparklesIcon className="w-3 h-3" />
              AI-Powered Productivity Suite
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-slide-up">
            The AI Agent for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Your Career Growth
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Automate repetitive tasks, build professional resumes, and manage your workflow with intelligent AI agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/signup"
              className="group relative px-8 py-4 bg-orange-500 rounded-lg font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Get Started Free
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-lg font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 py-32 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools</h2>
              <p className="text-zinc-400 text-lg max-w-xl">
                Everything you need to excel in your career and manage tasks efficiently.
              </p>
            </div>
            <Link to="/tickets" className="hidden md:flex items-center text-orange-500 hover:text-orange-400 font-medium transition-colors mt-4 md:mt-0">
              View all features <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative bg-zinc-900/40 rounded-2xl p-8 border border-white/5 hover:border-orange-500/30 transition-all duration-300 hover:bg-zinc-900/60"
              >
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-zinc-800/50 mb-6 ${feature.color}`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>

                  <p className="text-zinc-400 mb-8 leading-relaxed h-16">
                    {feature.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        <CheckCircleIcon className={`w-4 h-4 mr-2 flex-shrink-0 ${feature.color}`} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link
                    to={feature.link}
                    className={`inline-flex items-center font-medium ${feature.color} hover:opacity-80 transition-opacity`}
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
      <div className="relative z-10 py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Tickets Processed", value: "10K+" },
              { label: "Resumes Created", value: "5K+" },
              { label: "Success Rate", value: "99%" },
              { label: "Active Users", value: "2K+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{stat.value}</div>
                <div className="text-zinc-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who are saving time and advancing their careers with HELPER.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-zinc-200 transition-colors duration-300"
          >
            Get Started Now
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
