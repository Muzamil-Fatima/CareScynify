import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Personal Info
    dob: Date,
    cnic: String,
    gender: { type: String, enum: ["male", "female", "other"] },
    bloodGroup: String,
    address: String,

    // Medical Info
    allergies: [String],
    medications: [String],

    medicalHistory: {
      diseases: [String],
      surgeries: [String],
      familyHistory: String,
      smoking: String,
      alcohol: String,
    },

    // Emergency Contact
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },

    // Optional enhancements
    chronicDiseases: [String],
    notes: String,

    status: {
      type: String,
      enum: ["active", "inactive", "deceased"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;
