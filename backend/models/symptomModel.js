import mongoose from "mongoose";

const SymptomAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    result: {
      conditions: [{ type: String }],
      severity: { type: String, required: true },
      specialist: { type: String },
      homeCare: [{ type: String }],
      emergencySigns: [{ type: String }],
    },
  },
  { timestamps: true },
);

const SymptomAnalysis = mongoose.model(
  "SymptomAnalysis",
  SymptomAnalysisSchema,
);
export default SymptomAnalysis;
