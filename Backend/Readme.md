# HELPER Backend API

This is the backend API for the HELPER AI-powered productivity suite. Built with Node.js, Express, and MongoDB.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with role-based access control
- **AI Integration** with Google Gemini API
- **Background Jobs** with Inngest
- **Email Service** with Nodemailer
- **File Upload** support with Multer
- **CORS** configured for cross-origin requests

## 📁 Project Structure

\`\`\`
backend/
├── controllers/           # Route controllers
│   ├── ai.js             # AI-related operations
│   ├── ticket.js         # Ticket management
│   └── user.js           # User authentication
├── models/               # Database models
│   ├── ticket.js         # Ticket schema
│   └── user.js           # User schema
├── routes/               # API routes
│   ├── ai.js             # AI endpoints
│   ├── ticket.js         # Ticket endpoints
│   └── user.js           # Auth endpoints
├── middlewares/          # Custom middlewares
│   └── auth.js           # Authentication middleware
├── inngest/              # Background jobs
│   ├── client.js         # Inngest client
│   └── functions/        # Job functions
├── utils/                # Utility functions
│   └── mailer.js         # Email utilities
├── index.js              # Server entry point
└── package.json          # Dependencies
\`\`\`

## 🛠️ Installation

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/yourusername/helper-app.git
cd helper-app/backend
\`\`\`

2. **Install dependencies:**
\`\`\`bash
npm install
\`\`\`

3. **Setup environment variables:**
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` with your configuration:
\`\`\`env
MONGO_URI=mongodb://localhost:27017/helper
JWT_SECRET=your-super-secure-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
MAILTRAP_SMTP_HOST=smtp.mailtrap.io
MAILTRAP_SMTP_PORT=587
MAILTRAP_SMTP_USER=your-mailtrap-user
MAILTRAP_SMTP_PASS=your-mailtrap-password
PORT=3000
NODE_ENV=development
\`\`\`

4. **Start the development server:**
\`\`\`bash
npm run dev
\`\`\`

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Authentication
\`\`\`
POST /api/auth/signup     # User registration
POST /api/auth/login      # User login
POST /api/auth/logout     # User logout
\`\`\`

### Tickets
\`\`\`
GET    /api/tickets       # Get user tickets
POST   /api/tickets       # Create new ticket
GET    /api/tickets/:id   # Get specific ticket
PUT    /api/tickets/:id   # Update ticket status
\`\`\`

### AI Services
\`\`\`
POST /api/ai/generate-email    # Generate cold email/cover letter
POST /api/ai/analyze-resume    # Analyze resume and get ATS score
POST /api/ai/generate-pdf      # Generate PDF from LaTeX
\`\`\`

### Health Check
\`\`\`
GET /health               # Server health status
\`\`\`

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

### User Roles
- **User**: Can create and view own tickets
- **Moderator**: Can view assigned tickets and update their status
- **Admin**: Full access to all tickets and user management

## 🤖 AI Integration

### Google Gemini API
The backend integrates with Google Gemini AI for:
- **Email Generation**: Personalized cold emails and cover letters
- **Resume Analysis**: ATS scoring and improvement suggestions
- **Ticket Processing**: Automatic categorization and priority assignment

### Inngest Background Jobs
- **User Signup**: Send welcome email
- **Ticket Creation**: AI processing and moderator assignment

## 📧 Email Service

Uses Nodemailer with Mailtrap for email functionality:
- Welcome emails for new users
- Ticket notifications
- Password reset (future feature)

## 🗄️ Database Models

### User Model
\`\`\`javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'moderator', 'admin']),
  skills: [String],
  createdAt: Date
}
\`\`\`

### Ticket Model
\`\`\`javascript
{
  title: String (required),
  description: String (required),
  status: String (enum: ['TODO', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
  priority: String (enum: ['low', 'medium', 'high']),
  createdBy: ObjectId (ref: User),
  assignedTo: ObjectId (ref: User),
  relatedSkills: [String],
  helpfulNotes: String,
  solution: String,
  createdAt: Date
}
\`\`\`

## 🚀 Deployment

### Production Environment Variables
\`\`\`env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/helper
JWT_SECRET=your-production-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-frontend-domain.com
\`\`\`

### Using PM2 (Recommended)
\`\`\`bash
npm install -g pm2
pm2 start index.js --name "helper-backend"
pm2 startup
pm2 save
\`\`\`

### Docker (Optional)
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
\`\`\`

## 🧪 Testing

### Manual Testing
Use tools like Postman or curl to test endpoints:

\`\`\`bash
# Health check
curl http://localhost:3000/health

# User signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create ticket (requires auth token)
curl -X POST http://localhost:3000/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Issue","description":"This is a test ticket"}'
\`\`\`

## 🔧 Development

### Available Scripts
\`\`\`bash
npm run dev        # Start development server with nodemon
npm start          # Start production server
npm run inngest-dev # Start Inngest development server
\`\`\`

### Code Structure Guidelines
- Use ES6 modules (`import/export`)
- Follow RESTful API conventions
- Implement proper error handling
- Use middleware for common functionality
- Keep controllers thin, models fat

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Ensure network access for MongoDB Atlas

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure proper Authorization header format

3. **CORS Errors**
   - Update CORS configuration in `index.js`
   - Add frontend URL to allowed origins

4. **File Upload Issues**
   - Check multer configuration
   - Verify file size limits
   - Ensure proper file type validation

### Logging
The application logs important events and errors. In production, consider using a logging service like Winston or Morgan.

## 📝 Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include JSDoc comments for functions
4. Test your changes thoroughly
5. Update documentation as needed

## 📞 Support

For backend-specific issues:
- Check server logs: `pm2 logs helper-backend`
- Monitor server status: `pm2 status`
- Review error messages in console

## 🔄 Changelog

### v1.0.0
- Initial backend implementation
- User authentication system
- Ticket management system
- AI integration with Gemini
- Email service integration
- Background job processing

---

Built with ❤️ using Node.js and Express
