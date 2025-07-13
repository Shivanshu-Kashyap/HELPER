# HELPER Frontend

This is the frontend application for HELPER, an AI-powered productivity suite. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern React 18** with hooks and functional components
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **React Router** for client-side routing
- **Responsive Design** that works on all devices
- **Dark Theme** with gradient backgrounds
- **Component-based Architecture** for maintainability

## 🎨 Pages Overview

### 🏠 Home Page (`/`)
- Hero section with app introduction
- Feature showcase with cards
- Statistics section
- Call-to-action sections

### 🔐 Authentication
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration with role selection

### 🎫 Ticket System
- **Tickets** (`/tickets`) - List and create tickets
- **Ticket Details** (`/tickets/:id`) - View and manage individual tickets

### 📧 AI Tools
- **Cold Email Generator** (`/cold-email`) - Generate personalized emails
- **Resume Review** (`/resume-review`) - Analyze resumes with ATS scoring
- **Resume Builder** (`/resume-builder`) - Build professional resumes

### 👥 Admin Panels
- **Admin Panel** (`/admin`) - User and system management
- **Moderator Panel** (`/moderator`) - Assigned ticket management

## 🎨 Styling

### Tailwind CSS
The app uses Tailwind CSS for styling with a custom configuration:

### Design System
- **Colors**: Slate, Blue, Purple, Green, Orange gradients
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent padding and margins
- **Components**: Glass-morphism effects with backdrop blur

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Flexible grid layouts
- Touch-friendly interactions

## 🔧 Components

### Navigation (`components/navbar.jsx`)
- Responsive navigation bar
- User authentication status
- Role-based menu items
- Mobile hamburger menu

### Authentication Guard (`components/check-auth.jsx`)
- Route protection
- Automatic redirects
- Token validation
- Role-based access control

## 🚀 Building for Production

1. **Build the application:**
\`\`\`bash
npm run build
\`\`\`

2. **Preview the build:**
\`\`\`bash
npm run preview
\`\`\`

3. **Deploy to Vercel:**
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## 🌐 Environment Variables

### Development
\`\`\`env
VITE_SERVER_URL=http://localhost:3000/api
\`\`\`

### Production
\`\`\`env
VITE_SERVER_URL=https://your-backend-domain.com/api
\`\`\`

## 📱 Features by Page

### Home Page
- ✅ Hero section with animations
- ✅ Feature cards with hover effects
- ✅ Statistics display
- ✅ Responsive design

### Authentication
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Auto-redirect after login

### Ticket System
- ✅ Create new tickets
- ✅ View ticket list
- ✅ Status badges
- ✅ Priority indicators
- ✅ Role-based filtering

### AI Tools
- ✅ Multi-step forms
- ✅ File upload support
- ✅ Real-time preview
- ✅ Download functionality
- ✅ Progress indicators

## 🔐 Authentication Flow

1. **Login/Signup** - User provides credentials
2. **Token Storage** - JWT stored in localStorage
3. **Route Protection** - CheckAuth component validates access
4. **API Requests** - Token included in Authorization header
5. **Auto-logout** - Invalid tokens trigger logout

## 📊 State Management

The app uses React's built-in state management:
- **useState** for component state
- **useEffect** for side effects
- **localStorage** for persistence
- **Context** (future enhancement)


## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push


Built with ❤️ using React and Tailwind CSS
