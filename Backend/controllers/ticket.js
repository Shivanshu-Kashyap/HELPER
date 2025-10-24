import { inngest } from "../inngest/client.js"
import Ticket from "../models/ticket.js"

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body
    
    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" })
    }

    // Validate title length
    if (title.trim().length < 5) {
      return res.status(400).json({ message: "Title must be at least 5 characters long" })
    }

    // Validate description length
    if (description.trim().length < 10) {
      return res.status(400).json({ message: "Description must be at least 10 characters long" })
    }

    // Validate user exists
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User authentication required" })
    }

    const newTicket = await Ticket.create({
      title: title.trim(),
      description: description.trim(),
      createdBy: req.user._id.toString(),
      status: "TODO",
    })

    // Send event to Inngest for AI processing
    try {
      await inngest.send({
        name: "ticket/created",
        data: {
          ticketId: newTicket._id.toString(),
          title: newTicket.title,
          description: newTicket.description,
          createdBy: req.user._id.toString(),
        },
      })
      console.log(`✅ Ticket ${newTicket._id} sent to Inngest for processing`)
    } catch (inngestError) {
      console.error("❌ Failed to send event to Inngest:", inngestError.message)
      // Don't fail the request if Inngest fails - ticket is still created
      // The ticket will remain in TODO status and can be manually processed
    }

    return res.status(201).json({
      message: "Ticket created successfully. AI analysis in progress...",
      ticket: newTicket,
    })
  } catch (error) {
    console.error("❌ Error creating ticket:", error.message)
    return res.status(500).json({ message: "Failed to create ticket. Please try again." })
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

    // Validate status if provided
    if (status && !["TODO", "IN_PROGRESS", "RESOLVED", "CLOSED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" })
    }

    // Only moderators and admins can update tickets
    if (user.role === "user") {
      return res.status(403).json({ message: "Only moderators and admins can update tickets" })
    }

    let ticket
    if (user.role === "admin") {
      // Admin can update any ticket
      ticket = await Ticket.findById(req.params.id)
    } else if (user.role === "moderator") {
      // Moderator can only update tickets assigned to them
      ticket = await Ticket.findOne({
        _id: req.params.id,
        assignedTo: user._id,
      })
    }

    if (!ticket) {
      return res.status(404).json({ 
        message: user.role === "moderator" 
          ? "Ticket not found or not assigned to you" 
          : "Ticket not found" 
      })
    }

    // Prepare update data
    const updateData = {}
    
    if (status) {
      updateData.status = status
    }
    
    if (solution !== undefined && solution !== null) {
      updateData.solution = solution.trim()
    }

    // Ensure at least one field is being updated
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No updates provided" })
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("createdBy", ["email", "_id"])
      .populate("assignedTo", ["email", "_id"])

    console.log(`✅ Ticket ${req.params.id} updated by ${user.email}`)

    return res.status(200).json({ 
      message: "Ticket updated successfully",
      ticket: updatedTicket 
    })
  } catch (error) {
    console.error("❌ Error updating ticket:", error.message)
    return res.status(500).json({ message: "Failed to update ticket" })
  }
}
