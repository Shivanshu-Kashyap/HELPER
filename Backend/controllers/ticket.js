import { inngest } from "../inngest/client.js"
import Ticket from "../models/ticket.js"

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" })
    }

    const newTicket = await Ticket.create({
      title,
      description,
      createdBy: req.user._id.toString(),
    })

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: newTicket._id.toString(),
        title,
        description,
        createdBy: req.user._id.toString(),
      },
    })

    return res.status(201).json({
      message: "Ticket created and processing started",
      ticket: newTicket,
    })
  } catch (error) {
    console.error("Error creating ticket", error.message)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const getTickets = async (req, res) => {
  try {
    const user = req.user
    let tickets = []

    if (user.role === "admin") {
      // Admin can see all tickets
      tickets = await Ticket.find({})
        .populate("createdBy", ["email", "_id"])
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 })
    } else if (user.role === "moderator") {
      // Moderator can see tickets assigned to them
      tickets = await Ticket.find({ assignedTo: user._id })
        .populate("createdBy", ["email", "_id"])
        .sort({ createdAt: -1 })
    } else {
      // Users can only see their own tickets
      tickets = await Ticket.find({ createdBy: user._id })
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 })
    }

    return res.status(200).json({ tickets })
  } catch (error) {
    console.error("Error fetching tickets", error.message)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const getTicket = async (req, res) => {
  try {
    const user = req.user
    let ticket

    if (user.role === "admin") {
      // Admin can see any ticket
      ticket = await Ticket.findById(req.params.id)
        .populate("createdBy", ["email", "_id"])
        .populate("assignedTo", ["email", "_id"])
    } else if (user.role === "moderator") {
      // Moderator can see tickets assigned to them
      ticket = await Ticket.findOne({
        _id: req.params.id,
        assignedTo: user._id,
      })
        .populate("createdBy", ["email", "_id"])
        .populate("assignedTo", ["email", "_id"])
    } else {
      // Users can only see their own tickets
      ticket = await Ticket.findOne({
        createdBy: user._id,
        _id: req.params.id,
      }).populate("assignedTo", ["email", "_id"])
    }

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    return res.status(200).json({ ticket })
  } catch (error) {
    console.error("Error fetching ticket", error.message)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export const updateTicketStatus = async (req, res) => {
  try {
    const { status, solution } = req.body
    const user = req.user

    // Only moderators and admins can update tickets
    if (user.role === "user") {
      return res.status(403).json({ message: "Forbidden" })
    }

    let ticket
    if (user.role === "admin") {
      ticket = await Ticket.findById(req.params.id)
    } else {
      // Moderator can only update tickets assigned to them
      ticket = await Ticket.findOne({
        _id: req.params.id,
        assignedTo: user._id,
      })
    }

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    const updateData = { status }
    if (solution) {
      updateData.solution = solution
    }

    await Ticket.findByIdAndUpdate(req.params.id, updateData)

    return res.status(200).json({ message: "Ticket updated successfully" })
  } catch (error) {
    console.error("Error updating ticket", error.message)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
