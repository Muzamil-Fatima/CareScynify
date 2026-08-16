import express from "express";

import {
  uploadChatbot,
  getChatbot,
  deleteChatbot,
  updateChatbotStatus,
  chatWithDoctorBot,
} from "../../controllers/chatbot/doctorChatbotController.js";

import { protect } from "../../middleware/auth.js";
import upload from "../../middleware/upload.js";

const router = express.Router();


// DOCTOR CHATBOT DOCUMENTS


// Upload PDF
router.post("/documents", protect, upload.single("file"), uploadChatbot);

// Get doctor's PDFs
router.get("/documents", protect, getChatbot);

// Delete doctor's PDF
router.delete("/documents/:id", protect, deleteChatbot);

// Update document processing status
router.put("/documents/:id/status", protect, updateChatbotStatus);


// DOCTOR CHATBOT


// Ask question to doctor's chatbot
router.post("/chat", protect, chatWithDoctorBot);

export default router;
