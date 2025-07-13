import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CheckAuth from "./components/check-auth.jsx"
import Navbar from "./components/navbar.jsx"
import HomePage from "./pages/home.jsx"
import Tickets from "./pages/tickets.jsx"
import TicketDetailsPage from "./pages/ticket.jsx"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import Admin from "./pages/admin.jsx"
import ModeratorPanel from "./pages/moderator.jsx"
import ColdEmailGenerator from "./pages/cold-email.jsx"
import ResumeReview from "./pages/resume-review.jsx"
import ResumeBuilder from "./pages/resume-builder.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tickets"
          element={
            <CheckAuth protected={true}>
              <Tickets />
            </CheckAuth>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <CheckAuth protected={true}>
              <TicketDetailsPage />
            </CheckAuth>
          }
        />
        <Route
          path="/moderator"
          element={
            <CheckAuth protected={true}>
              <ModeratorPanel />
            </CheckAuth>
          }
        />
        <Route
          path="/cold-email"
          element={
            <CheckAuth protected={true}>
              <ColdEmailGenerator />
            </CheckAuth>
          }
        />
        <Route
          path="/resume-review"
          element={
            <CheckAuth protected={true}>
              <ResumeReview />
            </CheckAuth>
          }
        />
        <Route
          path="/resume-builder"
          element={
            <CheckAuth protected={true}>
              <ResumeBuilder />
            </CheckAuth>
          }
        />
        <Route
          path="/login"
          element={
            <CheckAuth protected={false}>
              <Login />
            </CheckAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <CheckAuth protected={false}>
              <Signup />
            </CheckAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <CheckAuth protected={true}>
              <Admin />
            </CheckAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
