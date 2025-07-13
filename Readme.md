# HELPER - AI-Powered Productivity Suite

![HELPER Logo](https://via.placeholder.com/800x200/1e293b/60a5fa?text=HELPER+-+AI+Productivity+Suite)

HELPER is a comprehensive AI-powered platform that provides four essential tools for career growth and productivity. Built with modern web technologies and powered by Google Gemini AI.

## 🚀 Live Demo

- **Frontend**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend API**: [https://your-backend-domain.com](https://your-backend-domain.com)

## 📋 Features

### 🎫 AI Ticket System
- **Automatic Categorization**: AI analyzes and categorizes support tickets
- **Smart Priority Assignment**: Intelligent priority setting based on content analysis
- **Skill-based Moderator Matching**: Automatic assignment to most qualified moderators
- **AI-generated Notes**: Helpful context and solutions for moderators
- **Role-based Access Control**: User, Moderator, and Admin roles

### 📧 Cold Email & Cover Letter Generator
- **Personalized Content**: AI generates tailored emails and cover letters
- **Job-specific Customization**: Content adapted to specific job requirements
- **Professional Templates**: Industry-standard formatting and structure
- **Downloadable Formats**: Easy export for immediate use

### 📄 Resume Review & ATS Score
- **ATS Scoring**: Comprehensive 1-100 scoring system
- **Detailed Analysis**: Strengths, weaknesses, and improvement suggestions
- **Keyword Optimization**: Missing keyword identification
- **Job-specific Feedback**: Tailored advice based on target position

### 👤 Resume Builder
- **LaTeX Templates**: Professional, ATS-friendly resume templates
- **Live Preview**: Real-time preview as you build
- **Form-based Input**: No coding required - just fill out forms
- **PDF Generation**: High-quality PDF output

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Background Jobs**: Inngest for event-driven processing
- **AI Integration**: Google Gemini API via Inngest Agent Kit
- **Email**: Nodemailer with Mailtrap
- **File Processing**: Multer for uploads, pdf-parse for text extraction

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)

### Deployment
- **Frontend**: Vercel
- **Backend**: Hostinger VPS with PM2
- **Database**: MongoDB Atlas
- **Domain**: Custom domain with SSL

## 📁 Project Structure

\`\`\`
helper/
├── backend/                 # Backend API
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middlewares/       # Custom middlewares
│   ├── inngest/           # Background job functions
│   ├── utils/             # Utility functions
│   └── index.js           # Server entry point
├── frontend/               # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── main.jsx       # App entry point
│   └── public/            # Static assets
└── README.md              # This file
\`\`\`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key
- Mailtrap account (for email testing)

### Local Development

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/yourusername/helper-app.git
cd helper-app
\`\`\`

2. **Setup Backend:**
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
\`\`\`

3. **Setup Frontend:**
\`\`\`bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
\`\`\`

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## 🔧 Environment Variables

### Backend (.env)
\`\`\`env
MONGO_URI=mongodb://localhost:27017/helper
JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
MAILTRAP_SMTP_HOST=smtp.mailtrap.io
MAILTRAP_SMTP_PORT=587
MAILTRAP_SMTP_USER=your-mailtrap-user
MAILTRAP_SMTP_PASS=your-mailtrap-password
PORT=3000
\`\`\`

### Frontend (.env)
\`\`\`env
VITE_SERVER_URL=http://localhost:3000/api
\`\`\`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Ticket Endpoints
- `GET /api/tickets` - Get user tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/:id` - Get specific ticket
- `PUT /api/tickets/:id` - Update ticket status

### AI Endpoints
- `POST /api/ai/generate-email` - Generate cold email/cover letter
- `POST /api/ai/analyze-resume` - Analyze resume and get ATS score
- `POST /api/ai/generate-pdf` - Generate PDF from LaTeX

## 🧪 Testing

### Demo Credentials
- **User**: user@example.com / password
- **Moderator**: moderator@example.com / password

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **SHIVANSHU KASHYAP** - *Initial work* - [YourGitHub](https://github.com/Shivanshu-Kashyap)

## 🙏 Acknowledgments

- Google Gemini AI for powering the AI features
- Inngest for background job processing
- Tailwind CSS for the beautiful UI
- React and Node.js communities

## 📞 Support

For support, email support@helper.com or create an issue in this repository.

## 🔄 Changelog

### v1.0.0 (2024-01-XX)
- Initial release
- AI Ticket System
- Cold Email Generator
- Resume Review & ATS Score
- Resume Builder
- User authentication and authorization
- Role-based access control

---

Made with ❤️ by the HELPER team
