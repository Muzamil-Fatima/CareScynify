import mongoose from "mongoose";
import Medicine from "../pharmacy/Medicine.js";
import Counter from "../Counter.js";
const PrescriptionSchema = new mongoose.Schema(
  {
    prescriptionId: {
      type: String,
      index: true,
    },
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

  { timestamps: true, versionKey: false },
);
PrescriptionSchema.index({ doctorId: 1, prescriptionId: 1 }, { unique: true });
PrescriptionSchema.pre("validate", async function (next) {
  if (!this.prescriptionId) {
    const year = new Date().getFullYear().toString().slice(-2);

    const key = `RX-${year}-${this.doctorId.toString()}`;

    const counter = await Counter.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true,
      },
    );

    this.prescriptionId = `RX${year}${String(counter.seq).padStart(5, "0")}`;
  }
});

const Prescription = mongoose.model("Prescription", PrescriptionSchema);
export default Prescription;
