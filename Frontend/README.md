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

## 📁 Project Structure

\`\`\`
frontend/
├── public/               # Static assets
│   ├── index.html       # HTML template
│   └── favicon.ico      # App icon
├── src/
│   ├── components/      # Reusable components
│   │   ├── navbar.jsx   # Navigation component
│   │   └── check-auth.jsx # Authentication wrapper
│   ├── pages/           # Page components
│   │   ├── home.jsx     # Landing page
│   │   ├── login.jsx    # Login page
│   │   ├── signup.jsx   # Registration page
│   │   ├── tickets.jsx  # Ticket management
│   │   ├── ticket.jsx   # Ticket details
│   │   ├── cold-email.jsx # Email generator
│   │   ├── resume-review.jsx # Resume analyzer
│   │   ├── resume-builder.jsx # Resume builder
│   │   ├── admin.jsx    # Admin panel
│   │   └── moderator.jsx # Moderator panel
│   ├── index.css        # Global styles
│   └── main.jsx         # App entry point
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── vercel.json          # Vercel deployment config
\`\`\`

## 🛠️ Installation

1. **Clone the repository:**
\`\`\`bash
git clone https://github.com/yourusername/helper-app.git
cd helper-app/frontend
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
VITE_SERVER_URL=http://localhost:3000/api
\`\`\`

4. **Start the development server:**
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:5173`

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

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
      }
    },
  },
  plugins: [],
}
\`\`\`

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

## 🧪 Testing

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] Forms submit properly
- [ ] File uploads function
- [ ] Responsive design works
- [ ] Error handling displays

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Manual Deployment
\`\`\`bash
npm run build
# Upload dist/ folder to your hosting provider
\`\`\`

### Environment Setup
\`\`\`bash
# Vercel CLI
vercel env add VITE_SERVER_URL production
\`\`\`

## 🔧 Development

### Available Scripts
\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
\`\`\`

### Code Style Guidelines
- Use functional components with hooks
- Follow React best practices
- Use Tailwind for styling
- Keep components small and focused
- Handle loading and error states

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check for unused imports
   - Verify all dependencies are installed
   - Ensure environment variables are set

2. **API Connection Issues**
   - Verify VITE_SERVER_URL is correct
   - Check CORS configuration on backend
   - Ensure backend is running

3. **Styling Issues**
   - Rebuild Tailwind CSS
   - Check for conflicting styles
   - Verify Tailwind configuration

4. **Routing Problems**
   - Check React Router setup
   - Verify route paths
   - Ensure proper navigation

### Performance Optimization
- ✅ Code splitting with Vite
- ✅ Lazy loading for routes
- ✅ Optimized images
- ✅ Minimal bundle size

## 📝 Contributing

1. Follow React best practices
2. Use TypeScript for new features (future)
3. Add proper error boundaries
4. Test on multiple devices
5. Update documentation

## 🔄 Future Enhancements

- [ ] TypeScript migration
- [ ] Unit testing with Jest
- [ ] E2E testing with Cypress
- [ ] PWA capabilities
- [ ] Offline support
- [ ] Real-time updates
- [ ] Advanced animations

## 📞 Support

For frontend-specific issues:
- Check browser console for errors
- Verify network requests in DevTools
- Test in different browsers
- Check responsive design

## 🔄 Changelog

### v1.0.0
- Initial React application
- All core pages implemented
- Responsive design
- Authentication system
- AI tool integrations
- Admin and moderator panels

---

Built with ❤️ using React and Tailwind CSS
