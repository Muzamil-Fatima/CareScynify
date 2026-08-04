import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Other",
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Failed"], // Added enums for better data integrity
      default: "Pending",
    },
    doctor: {
      type: String,
      default: "Pending AI",
    },
    fileUrl: {
      type: String, // Cloudinary URL
      required: true,
    },
    mimeType: {
      type: String, // e.g., "application/pdf" or "image/jpeg"
      required: true, // Passing this on upload ensures Gemini reads it correctly
    },
    explanation: {
      type: String, // Will hold the full AI breakdown and summary
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model("Report", reportSchema);
