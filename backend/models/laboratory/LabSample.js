import mongoose from "mongoose";
import generateCustomId from "../../utils/generateCustomId.js";
import Counter from "../Counter.js";

const labSampleSchema = new mongoose.Schema(
  {
    sampleId: {
      type: String,
    },

    laboratoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laboratory",
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabReport",
      default: null,
    },
    labPatientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabPatient",
      required: true,
    },
    tests: [
      {
        testId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "LabTest",
        },

        testName: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          default: 0,
        },

        status: {
          type: String,
          enum: ["Pending", "Processing", "Completed"],
          default: "Pending",
        },
      },
    ],

    priority: {
      type: String,
      enum: ["Normal", "High", "Urgent"],
      default: "Normal",
    },

    sampleStatus: {
      type: String,
      enum: ["Pending", "Collected", "Processing", "Completed", "Rejected"],
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

labSampleSchema.pre("validate", async function (next) {
  if (!this.sampleId) {
    const year = new Date().getFullYear().toString().slice(-2);

    const key = `SMP-${year}-${this.laboratoryId.toString()}`;

    const counter = await Counter.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true,
      },
    );

    this.sampleId = `SMP${year}${String(counter.seq).padStart(5, "0")}`;
  }
});

export const LabSample = mongoose.model("LabSample", labSampleSchema);
export default LabSample;
