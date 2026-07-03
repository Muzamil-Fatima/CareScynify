import mongoose from "mongoose";
import Medicine  from "./pharmacy/Medicine.js";
const PrescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    workplaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workplace",
      required: true,
    },

    diagnosis: {
      type: String,
      trim: true,
      default: "",
    },

    symptoms: {
      type: [String],
      default: [],
    },

    // medicines: {
    //   type: [Medicine],
    //   default: [],
    // },

    labTests: {
      type: [String],
      default: [],
    },

    advice: {
      type: String,
      trim: true,
      default: "",
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "issued", "dispensed"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);
const Prescription = mongoose.models.Prescription || mongoose.model("Prescription", PrescriptionSchema);
export default Prescription;
