import Doctor from "../../models/doctor/doctorModel.js";
import Chatbot from "../../models/doctor/chatbotModel.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import {
  processDoctorDocument,
  askDoctorChatbot,
} from "../../services/ai/chatbotService.js";


// FILE SYSTEM SETUP


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uploads/chatbot folder
const chatbotUploadDir = path.join(__dirname, "../../uploads/chatbot");


// CONSTANTS


const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB


// GET DOCTOR FROM LOGGED-IN USER


const getDoctorFromUser = async (userId) => {
  const doctor = await Doctor.findOne({
    userId,
  });

  if (!doctor) {
    throw new Error("Doctor profile not found");
  }

  return doctor;
};


// CREATE CHATBOT UPLOAD DIRECTORY


const ensureUploadDirectory = async (doctorId) => {
  const doctorUploadDir = path.join(chatbotUploadDir, doctorId.toString());

  await fs.mkdir(doctorUploadDir, {
    recursive: true,
  });

  return doctorUploadDir;
};


// CREATE SAFE FILE NAME


const createSafeFileName = (originalName) => {
  const extension = path.extname(originalName).toLowerCase();

  const baseName = path
    .basename(originalName, extension)
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .replace(/_+/g, "_")
    .substring(0, 100);

  const uniquePart = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

  return `${uniquePart}-${baseName}${extension}`;
};


// DELETE LOCAL FILE


const deleteLocalFile = async (filePath) => {
  if (!filePath) {
    return;
  }

  try {
    await fs.unlink(filePath);

    console.log("Local chatbot file deleted:", filePath);
  } catch (error) {
    // File may already be deleted
    if (error.code !== "ENOENT") {
      console.error("Local file delete error:", error.message);
    }
  }
};


// UPLOAD CHATBOT PDF


export const uploadChatbot = async (req, res) => {
  let uploadedFilePath = null;
  let document = null;

  try {
    
    // GET LOGGED-IN DOCTOR
    

    const doctor = await getDoctorFromUser(req.userId);

    
    // VALIDATE FILE
    

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded",
      });
    }

    
    // VALIDATE PDF TYPE
    

    const isPdf =
      req.file.mimetype === "application/pdf" ||
      req.file.originalname?.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    
    // VALIDATE FILE SIZE
    

    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(413).json({
        success: false,
        message: "PDF file size cannot exceed 50 MB",
      });
    }

    console.log(
      `Chatbot PDF received: ${(req.file.size / (1024 * 1024)).toFixed(2)} MB`,
    );

    
    // CREATE DOCTOR UPLOAD DIRECTORY
    

    const doctorUploadDir = await ensureUploadDirectory(doctor._id);

    
    // CREATE UNIQUE FILE NAME
    

    const fileName = createSafeFileName(req.file.originalname);

    uploadedFilePath = path.join(doctorUploadDir, fileName);

    
    // SAVE PDF TO SERVER
    

    await fs.writeFile(uploadedFilePath, req.file.buffer);

    console.log("Chatbot PDF saved:", uploadedFilePath);

    
    // CREATE RELATIVE FILE URL
    

    const relativeFileUrl = `/uploads/chatbot/${doctor._id}/${fileName}`;

    
    // SAVE DOCUMENT IN DATABASE
    

    document = await Chatbot.create({
      doctorId: doctor._id,

      title: req.file.originalname,

      fileUrl: relativeFileUrl,

      filePath: uploadedFilePath,

      fileName,

      mimeType: req.file.mimetype,

      fileSize: req.file.size,

      status: "Processing",

      errorMessage: "",
    });

    
    // SEND RESPONSE IMMEDIATELY
    

    res.status(201).json({
      success: true,

      message: "Chatbot document uploaded successfully",

      document,
    });

    
    // AI PROCESSING
    

    try {
      console.log(`Starting AI processing for: ${req.file.originalname}`);

      await processDoctorDocument({
        doctorId: doctor._id.toString(),

        filePath: uploadedFilePath,
      });

      
      // AI PROCESSING SUCCESS
      

      await Chatbot.findByIdAndUpdate(document._id, {
        status: "Completed",

        processedAt: new Date(),

        errorMessage: "",
      });

      console.log(`AI processing completed: ${req.file.originalname}`);
    } catch (aiError) {
      
      // AI PROCESSING FAILED
      

      console.error("AI document processing error:", aiError);

      await Chatbot.findByIdAndUpdate(document._id, {
        status: "Failed",

        errorMessage:
          aiError?.message || "Failed to process document with AI service",
      });
    }
  } catch (error) {
    
    // DELETE FILE IF DATABASE SAVE FAILED
    

    if (uploadedFilePath) {
      await deleteLocalFile(uploadedFilePath);
    }

    
    // MULTER FILE SIZE ERROR
    

    if (error?.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "PDF file size cannot exceed 50 MB",
      });
    }

    
    // MULTER FILE TYPE ERROR
    

    if (error?.message === "Only PDF files are allowed") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    
    // RESPONSE
    

    console.error("Upload chatbot document error:", error);

    return res.status(500).json({
      success: false,

      message: error?.message || "Failed to upload chatbot document",
    });
  }
};


// GET DOCTOR CHATBOT DOCUMENTS


export const getChatbot = async (req, res) => {
  try {
    const doctor = await getDoctorFromUser(req.userId);

    const documents = await Chatbot.find({
      doctorId: doctor._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    console.error("Get chatbot documents error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get chatbot documents",
    });
  }
};


// GET CHATBOT DOCUMENT URL


export const getChatbotDocumentUrl = async (req, res) => {
  try {
    const doctor = await getDoctorFromUser(req.userId);

    const { id } = req.params;

    const document = await Chatbot.findOne({
      _id: id,
      doctorId: doctor._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Chatbot document not found",
      });
    }

    
    // CHECK FILE PATH
    

    if (!document.filePath) {
      return res.status(404).json({
        success: false,
        message: "Chatbot file not found",
      });
    }

    
    // CHECK FILE EXISTS
    

    try {
      await fs.access(document.filePath);
    } catch {
      return res.status(404).json({
        success: false,
        message: "Chatbot file no longer exists on server",
      });
    }

    
    // RETURN FILE URL
    

    return res.status(200).json({
      success: true,
      fileUrl: document.fileUrl,
    });
  } catch (error) {
    console.error("Get chatbot document URL error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get document URL",
    });
  }
};


// DELETE CHATBOT DOCUMENT


export const deleteChatbot = async (req, res) => {
  try {
    const doctor = await getDoctorFromUser(req.userId);

    const { id } = req.params;

    const document = await Chatbot.findOne({
      _id: id,
      doctorId: doctor._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Chatbot document not found",
      });
    }

    
    // DELETE LOCAL FILE
    

    if (document.filePath) {
      await deleteLocalFile(document.filePath);
    }

    
    // DELETE DATABASE RECORD
    

    await Chatbot.findByIdAndDelete(document._id);

    return res.status(200).json({
      success: true,
      message: "Chatbot document deleted successfully",
    });
  } catch (error) {
    console.error("Delete chatbot document error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete chatbot document",
    });
  }
};


// UPDATE DOCUMENT STATUS


export const updateChatbotStatus = async (req, res) => {
  try {
    const doctor = await getDoctorFromUser(req.userId);

    const { id } = req.params;

    const { status, errorMessage } = req.body;

    const allowedStatuses = ["Processing", "Completed", "Failed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document status",
      });
    }

    const document = await Chatbot.findOne({
      _id: id,
      doctorId: doctor._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Chatbot document not found",
      });
    }

    document.status = status;

    
    // COMPLETED
    

    if (status === "Completed") {
      document.processedAt = new Date();

      document.errorMessage = "";
    }

    
    // FAILED
    

    if (status === "Failed") {
      document.errorMessage = errorMessage || "Processing failed";
    }

    
    // PROCESSING
    

    if (status === "Processing") {
      document.errorMessage = "";

      document.processedAt = undefined;
    }

    await document.save();

    return res.status(200).json({
      success: true,
      message: "Document status updated",
      document,
    });
  } catch (error) {
    console.error("Update chatbot document status error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update document status",
    });
  }
};


// CHAT WITH DOCTOR MEDIBOT


export const chatWithDoctorBot = async (req, res) => {
  try {
    const doctor = await getDoctorFromUser(req.userId);

    const { question } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const response = await askDoctorChatbot({
      doctorId: doctor._id.toString(),

      question: question.trim(),
    });

    return res.status(200).json({
      success: true,

      answer: response?.answer || "I could not generate an answer.",
    });
  } catch (error) {
    console.error("Doctor chatbot error:", error);

    return res.status(500).json({
      success: false,

      message: error.message || "Failed to get chatbot response",
    });
  }
};
