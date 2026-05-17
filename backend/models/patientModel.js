import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // PERSONAL INFO
  

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    // MEDICAL INFO
    allergies: {
      type: [String],
      default: [],
    },

    medications: {
      type: [String],
      default: [],
    },

    medicalHistory: {
      diseases: {
        type: [String],
        default: [],
      },

      surgeries: {
        type: [String],
        default: [],
      },

      familyHistory: {
        type: String,
        default: "",
      },

      smoking: {
        type: String,
        default: "",
      },

      alcohol: {
        type: String,
        default: "",
      },
    },

    // EMERGENCY CONTACT
    emergencyContact: {
      name: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      relation: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },
    },

    // OPTIONAL FIELDS
    chronicDiseases: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      default: "",
    },

    // STATUS
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
