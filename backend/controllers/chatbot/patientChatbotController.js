// controllers/chatbotController.js

import {
  processChatbotMessage,
} from "../../services/ai/PatientChatbotServices.js";


// PATIENT CHATBOT

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    // Get logged-in patient
    const patientId = req.user?._id || req.user?.id;

    if (!patientId) {
      return res.status(401).json({
        success: false,
        message: "Patient authentication is required.",
      });
    }

    // Send message to chatbot service
    const result = await processChatbotMessage({
      message: message.trim(),
      patientId,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing your request.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};