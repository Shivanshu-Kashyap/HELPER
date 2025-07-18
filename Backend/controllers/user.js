import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { inngest } from "../inngest/client.js"

// Admin email - only this email can be admin
const ADMIN_EMAIL = "admin@helper.com" // Change this to your email

export const signup = async (req, res) => {
  const { email, password, role = "user", skills = [] } = req.body
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const hashed = await bcrypt.hash(password, 10)

    // Set role based on email and request
    let userRole = role
    if (email === ADMIN_EMAIL) {
      userRole = "admin"
    } else if (role === "admin") {
      // Prevent non-admin emails from becoming admin
      userRole = "user"
    }

    const user = await User.create({
      email,
      password: hashed,
      skills: Array.isArray(skills) ? skills : [],
      role: userRole,
    })

    // Fire inngest event
    await inngest.send({
      name: "user/signup",
      data: {
        email,
      },
    })

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)

    // Don't send password in response
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      skills: user.skills,
      createdAt: user.createdAt,
    }

    res.json({ user: userResponse, token })
  } catch (error) {
    res.status(500).json({ error: "Signup failed", details: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)

    // Don't send password in response
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      skills: user.skills,
      createdAt: user.createdAt,
    }

    res.json({ user: userResponse, token })
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ error: "Unauthorized" })

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Unauthorized" })
    })

    res.json({ message: "Logout successful" })
  } catch (error) {
    res.status(500).json({ error: "Logout failed", details: error.message })
  }
}

export const updateUser = async (req, res) => {
  const { skills = [], role, email } = req.body
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ error: "User not found" })

    // Prevent changing admin email's role
    if (email === ADMIN_EMAIL && role !== "admin") {
      return res.status(400).json({ error: "Cannot change admin role" })
    }

    await User.updateOne(
      { email },
      {
        skills: skills.length ? skills : user.skills,
        role: role || user.role,
      },
    )

    return res.json({ message: "User updated successfully" })
  } catch (error) {
    res.status(500).json({ error: "Update failed", details: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" })
    }

    const users = await User.find().select("-password")
    return res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users", details: error.message })
  }
}
