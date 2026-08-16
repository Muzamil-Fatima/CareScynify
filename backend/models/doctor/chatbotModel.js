import mongoose from "mongoose";

const ChatbotSchema = new mongoose.Schema(
  {
    // DOCTOR

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },

    // FILE INFORMATION

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Public URL used by frontend
    fileUrl: {
      type: String,
      required: true,
    },

    // Actual file location on server
    filePath: {
      type: String,
      required: true,
    },

    // Actual saved filename
    fileName: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      default: "application/pdf",
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    // PROCESSING STATUS

    status: {
      type: String,
      enum: ["Processing", "Completed", "Failed"],
      default: "Processing",
    },

    // DATES

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    processedAt: {
      type: Date,
    },

    // ERROR

    errorMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Chatbot = mongoose.model("Chatbot", ChatbotSchema);

export default Chatbot;
