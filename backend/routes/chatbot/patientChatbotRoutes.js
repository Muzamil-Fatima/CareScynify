import express from "express";
import { chatWithBot } from "../../controllers/chatbot/patientChatbotController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Patient Chatbot
router.post("/message", protect, chatWithBot);

export default router;