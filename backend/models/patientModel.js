import mongoose from "mongoose";
import generateCustomId from "../utils/generateCustomId.js";
const patientSchema = new mongoose.Schema(
  {
    patientCode: {
      type: String,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:null,
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
patientSchema.pre("save", async function () {
  if (!this.patientCode) {
    this.patientCode = await generateCustomId("PT");
  }
});
const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
