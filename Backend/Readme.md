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

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:


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


### Built with ❤️ using Node.js and Express
