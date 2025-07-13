import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    default: "TODO",
    enum: ["TODO", "IN_PROGRESS", "RESOLVED", "CLOSED"],
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  deadline: Date,
  helpfulNotes: String,
  relatedSkills: [String],
  solution: String, // Added solution field for moderator responses
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Ticket", ticketSchema)
