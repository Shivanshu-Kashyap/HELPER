import { Link } from "react-router-dom"
import { TicketIcon, MailIcon, FileTextIcon, UserIcon, ArrowRightIcon, BrainCircuitIcon, StarIcon } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      id: "ai-tickets",
      title: "AI Ticket System",
      description:
        "Smart ticket management with AI-powered categorization, priority assignment, and skill-based moderator matching.",
      icon: <TicketIcon className="w-8 h-8" />,
      link: "/tickets",
      color: "from-blue-500 to-blue-600",
      features: [
        "Automatic ticket categorization",
        "Smart priority assignment",
        "Skill-based moderator matching",
        "AI-generated helpful notes",
      ],
    },
    {
      id: "cold-email",
      title: "Cold Email & Cover Letter Generator",
      description:
        "Generate personalized cold emails and cover letters tailored to specific job opportunities using AI.",
      icon: <MailIcon className="w-8 h-8" />,
      link: "/cold-email",
      color: "from-green-500 to-green-600",
      features: [
        "Personalized content generation",
        "Job-specific customization",
        "Professional templates",
        "Downloadable formats",
      ],
    },
    {
      id: "resume-review",
      title: "Resume Review & ATS Score",
      description: "Get your resume analyzed with ATS scoring and detailed improvement suggestions.",
      icon: <FileTextIcon className="w-8 h-8" />,
      link: "/resume-review",
      color: "from-purple-500 to-purple-600",
      features: ["ATS score (1-100)", "Detailed analysis", "Improvement suggestions", "Job-specific feedback"],
    },
    {
      id: "resume-builder",
      title: "Resume Builder",
      description: "Build professional resumes with our LaTeX-powered template system and live preview.",
      icon: <UserIcon className="w-8 h-8" />,
      link: "/resume-builder",
      color: "from-orange-500 to-orange-600",
      features: ["Professional LaTeX templates", "Live preview", "Easy form-based input", "PDF download"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <BrainCircuitIcon className="w-6 h-6 text-blue-400" />
                <span className="text-white font-medium">AI-Powered Solutions</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">HELPER</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your AI-powered assistant for tickets, emails, resumes, and career growth. Streamline your workflow with
              intelligent automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tickets"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful AI Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our suite of AI-powered tools designed to enhance your productivity and career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              ></div>

              <div className="relative">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-6`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>

                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>

                <ul className="space-y-2 mb-8">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <StarIcon className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={feature.link}
                  className={`inline-flex items-center space-x-2 bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                >
                  <span>Try Now</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Tickets Processed", value: "10K+" },
              { label: "Resumes Generated", value: "5K+" },
              { label: "ATS Score Avg", value: "85%" },
              { label: "User Satisfaction", value: "98%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to boost your productivity?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using HELPER to streamline their workflow and advance their careers.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <span>Start Free Today</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
