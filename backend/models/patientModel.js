import mongoose from "mongoose";

// Patient Schema
const patientSchema = new mongoose.Schema(
  {
    // Link to the User account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //   Basic info
    age: { type: Number },
    phone: { type: String },
    address: { type: String },
    //   Medical info
    allergies: [{ type: String }],
    medications: [{ type: String }],
    // Emergency contact

    emergencyContact: { name: { type: String }, phone: { type: String } },
    status: { type: String, enum: ["Active", "Finished"], default: "Active" },
  },
  { timestamps: true },
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
