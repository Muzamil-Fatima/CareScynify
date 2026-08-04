import mongoose from "mongoose";

const SymptomAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    symptoms: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      conditions: [{ type: String, trim: true }],
      severity: { type: String, required: true },
      specialist: { type: String, trim: true },
      homeCare: [{ type: String, trim: true }],
      emergencySigns: [{ type: String, trim: true }],
    },
  },
  { timestamps: true, versionKey: false },
);

const SymptomAnalysis = mongoose.model(
  "SymptomAnalysis",
  SymptomAnalysisSchema,
);
export default SymptomAnalysis;
