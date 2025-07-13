import { inngest } from "../client.js"
import User from "../../models/user.js"
import { NonRetriableError } from "inngest"
import { sendMail } from "../../utils/mailer.js"

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data
      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email })
        if (!userObject) {
          throw new NonRetriableError("User no longer exists in our database")
        }
        return userObject
      })

      await step.run("send-welcome-email", async () => {
        const subject = `Welcome to HELPER`
        const message = `Hi,

Thanks for signing up for HELPER! We're glad to have you onboard.

You now have access to our AI-powered productivity suite:
- AI Ticket System
- Cold Email & Cover Letter Generator  
- Resume Review & ATS Score
- Resume Builder

Get started by visiting your dashboard.

Best regards,
The HELPER Team`
        await sendMail(user.email, subject, message)
      })

      return { success: true }
    } catch (error) {
      console.error("❌ Error running step", error.message)
      return { success: false }
    }
  },
)
