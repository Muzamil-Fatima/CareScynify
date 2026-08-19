import mongoose from "mongoose";
import Counter from "../Counter.js";

const prescriptionSchema = new mongoose.Schema(
  {
    // CUSTOM PRESCRIPTION ID
    prescriptionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // PDF
    pdfUrl: {
      type: String,
      default: "",
    },
    // APPOINTMENT
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
      index: true,
    },
    // PATIENT USER
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // PATIENT
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    // DOCTOR
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    // WORKPLACE
    workplaceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    // MEDICAL CONTENT
    diagnosis: {
      type: String,
      default: "",
    },
    symptoms: {
      type: [String],
      default: [],
    },

    medicines: {
      type: [
        {
          medicine: { type: String, default: "" },
          dosage: { type: String, default: "" },
          frequency: { type: String, default: "" },
          duration: { type: String, default: "" },
          instructions: { type: String, default: "" },
        },
      ],
      default: [],
    },

    labTests: {
      type: [String],
      default: [],
    },

    advice: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["draft", "issued", "dispensed"],
      default: "issued",
    },
  },
  {
    timestamps: true,
    versionKey: false,

    // Force MongoDB collection name.
    collection: "prescriptions",
  },
);

// GENERATE CUSTOM PRESCRIPTION ID

prescriptionSchema.pre("validate", async function (next) {
  if (!this.prescriptionId) {
    const year = new Date().getFullYear().toString().slice(-2);

    const key = `PRS-${year}-${this.doctorId.toString()}`;

    const counter = await Counter.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true,
      },
    );

    this.prescriptionId = `PRS${year}${String(counter.seq).padStart(5, "0")}`;
  }
});

// MODEL

const Prescription =
  mongoose.models.Prescription ||
  mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
