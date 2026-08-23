import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8001";

// PROCESS DOCTOR PDF

export const processDoctorDocument = async ({ doctorId, filePath }) => {
  try {
    if (!doctorId) {
      throw new Error("Doctor ID is required");
    }

    if (!filePath) {
      throw new Error("PDF file path is missing");
    }

    console.log("==============================================");
    console.log("SENDING PDF TO AI SERVICE");
    console.log("Doctor ID:", doctorId);
    console.log("PDF PATH:", filePath);
    console.log("AI SERVICE:", AI_SERVICE_URL);
    console.log("==============================================");

    
    // CREATE MULTIPART FORM
    

    const formData = new FormData();

    formData.append("doctorId", String(doctorId));

    formData.append("file", fs.createReadStream(filePath));

    
    // SEND PDF TO PYTHON AI SERVICE
    

    const response = await axios.post(
      `${AI_SERVICE_URL}/process-document`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },

        maxContentLength: Infinity,
        maxBodyLength: Infinity,

        // timeout: 600000,
        timeout:900000,
      },
    );

    console.log("==============================================");
    console.log("AI SERVICE SUCCESS");
    console.log("Response:", response.data);
    console.log("==============================================");

    return response.data;
  } catch (error) {
    // ---------------------------------------------------
    // TEMP DEBUG - RAW ERROR OBJECT
    // ---------------------------------------------------

    console.error("==============================================");
    console.error("RAW ERROR OBJECT (debug)");
    console.error("error.code:", error.code);
    console.error("error.errno:", error.errno);
    console.error("error.address:", error.address);
    console.error("error.port:", error.port);
    console.error("error.message:", error.message);
    console.error("Full error:", error);
    console.error("==============================================");

    console.error("==============================================");
    console.error("AI DOCUMENT PROCESSING ERROR");
    console.error("Message:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("==============================================");

    const detail = error.response?.data?.detail;

    throw new Error(
      typeof detail === "string"
        ? detail
        : error.response?.data?.message ||
            error.message ||
            "Failed to process document with AI service",
    );
  }
};

// ASK DOCTOR MEDIBOT
export const askDoctorChatbot = async ({ doctorId, question }) => {
  try {
    if (!doctorId) {
      throw new Error("Doctor ID is required");
    }

    if (!question || !question.trim()) {
      throw new Error("Question is required");
    }

    console.log("==============================================");
    
    console.log("SENDING CHAT REQUEST TO AI");
    console.log("Doctor ID:", doctorId);
    console.log("Question:", question);
    console.log("==============================================");

    const response = await axios.post(
      `${AI_SERVICE_URL}/chat`,
      {
        doctorId: String(doctorId),
        question: question.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },

        // Chat request timeout
        timeout: 120000,
        // timeout: 190000,
      },
    );

    console.log("==============================================");
    console.log("AI CHAT SUCCESS");
    console.log("Response:", response.data);
    console.log("==============================================");

    return response.data;
  } catch (error) {
    console.error("==============================================");
    console.error("AI CHATBOT ERROR");
    console.error("Message:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("==============================================");

    throw new Error(
      error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Failed to get response from MediBot",
    );
  }
};
