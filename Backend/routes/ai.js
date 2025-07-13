import express from "express"
import { authenticate } from "../middlewares/auth.js"
import { generateEmail, analyzeResume, generatePDF } from "../controllers/ai.js"
import multer from "multer"

const router = express.Router()

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true)
    } else {
      cb(new Error("Only PDF files are allowed"), false)
    }
  },
})

router.post("/generate-email", authenticate, generateEmail)
router.post("/analyze-resume", authenticate, upload.single("resume"), analyzeResume)
router.post("/generate-pdf", authenticate, generatePDF)

export default router
