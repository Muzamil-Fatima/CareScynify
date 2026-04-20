import mongoose, { model } from "mongoose";
const reportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: String,
  testType: String,
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedByRole: {
    type: String,
    enum: ["patient", "lab", "doctor"],
    required: true,
  },
  uploadedByRole: {
    type: String,
    enum: ["patient", "lab", "doctor"],
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notes: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Report", reportSchema);
