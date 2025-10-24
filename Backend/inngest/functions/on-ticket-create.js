import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";
import analyzeTicket from "../../utils/ai.js";

export const onTicketCreated = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      // Step 1: Fetch ticket from DB
      const ticket = await step.run("fetch-ticket", async () => {
        const ticketObject = await Ticket.findById(ticketId);
        if (!ticketObject) {
          throw new NonRetriableError("Ticket not found");
        }
        console.log(`✅ Fetched ticket: ${ticketObject.title}`);
        return ticketObject;
      });

      // Step 2: Update ticket status to TODO
      await step.run("update-ticket-status-todo", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, { status: "TODO" });
        console.log(`✅ Updated ticket ${ticket._id} status to TODO`);
      });

      // Step 3: AI Processing
      const aiResponse = await step.run("ai-analysis", async () => {
        console.log(`🤖 Starting AI analysis for ticket ${ticket._id}`);
        const analysis = await analyzeTicket(ticket);
        
        if (!analysis) {
          console.warn(`⚠️ AI analysis failed for ticket ${ticket._id}, using fallback values`);
          // Return fallback values if AI fails
          return {
            priority: "medium",
            helpfulNotes: "AI analysis failed. Please review manually.",
            relatedSkills: ["General Support"],
            summary: ticket.description.substring(0, 100),
          };
        }
        
        console.log(`✅ AI analysis completed for ticket ${ticket._id}:`, {
          priority: analysis.priority,
          skillsCount: analysis.relatedSkills.length,
        });
        return analysis;
      });

      // Step 4: Update ticket with AI insights
      const relatedSkills = await step.run("update-ticket-with-ai-insights", async () => {
        const updateData = {
          priority: aiResponse.priority,
          helpfulNotes: aiResponse.helpfulNotes,
          status: "IN_PROGRESS",
          relatedSkills: aiResponse.relatedSkills,
        };

        await Ticket.findByIdAndUpdate(ticket._id, updateData);
        console.log(`✅ Updated ticket ${ticket._id} with AI insights`);
        return aiResponse.relatedSkills;
      });

      // Step 5: Assign moderator based on skills
      const moderator = await step.run("assign-moderator", async () => {
        console.log(`🔍 Looking for moderator with skills: ${relatedSkills.join(", ")}`);
        
        // Try to find moderator with matching skills
        let assignedUser = null;
        
        if (relatedSkills.length > 0 && !relatedSkills.includes("General Support")) {
          assignedUser = await User.findOne({
            role: "moderator",
            skills: {
              $elemMatch: {
                $regex: relatedSkills.join("|"),
                $options: "i",
              },
            },
          });
        }

        // Fallback: Find any moderator
        if (!assignedUser) {
          console.log("⚠️ No moderator with matching skills found, looking for any moderator");
          assignedUser = await User.findOne({ role: "moderator" });
        }

        // Fallback: Assign to admin
        if (!assignedUser) {
          console.log("⚠️ No moderator found, assigning to admin");
          assignedUser = await User.findOne({ role: "admin" });
        }

        if (assignedUser) {
          await Ticket.findByIdAndUpdate(ticket._id, {
            assignedTo: assignedUser._id,
          });
          console.log(`✅ Assigned ticket ${ticket._id} to ${assignedUser.email}`);
        } else {
          console.warn(`⚠️ No moderator or admin found to assign ticket ${ticket._id}`);
        }

        return assignedUser;
      });

      // Step 6: Send email notification
      await step.run("send-email-notification", async () => {
        if (moderator) {
          try {
            const finalTicket = await Ticket.findById(ticket._id);
            await sendMail(
              moderator.email,
              "New Ticket Assigned to You",
              `Hello,\n\nA new support ticket has been assigned to you:\n\nTitle: ${finalTicket.title}\nPriority: ${finalTicket.priority}\nRelated Skills: ${finalTicket.relatedSkills.join(", ")}\n\nPlease review and resolve it at your earliest convenience.\n\nBest regards,\nSupport Team`
            );
            console.log(`✅ Email sent to ${moderator.email} for ticket ${ticket._id}`);
          } catch (emailError) {
            console.error(`❌ Failed to send email to ${moderator.email}:`, emailError.message);
            // Don't fail the entire flow if email fails
          }
        } else {
          console.warn(`⚠️ No moderator assigned, skipping email notification for ticket ${ticket._id}`);
        }
      });

      console.log(`✅ Successfully processed ticket ${ticket._id}`);
      return { success: true, ticketId: ticket._id.toString() };
    } catch (err) {
      console.error(`❌ Error processing ticket ${event.data.ticketId}:`, err.message);
      
      // Try to update ticket status to indicate processing failed
      try {
        await Ticket.findByIdAndUpdate(event.data.ticketId, {
          status: "TODO",
          helpfulNotes: "Automated processing failed. Manual review required.",
        });
      } catch (updateError) {
        console.error("❌ Failed to update ticket after error:", updateError.message);
      }
      
      return { success: false, error: err.message };
    }
  }
);