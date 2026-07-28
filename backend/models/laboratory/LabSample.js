import mongoose from "mongoose";
import generateCustomId from "../../utils/generateCustomId.js";

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
      required: true,
    },

    patientName: {
      type: String,
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

    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabReport",
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

// Compound unique index: sampleId only needs to be unique per lab
labSampleSchema.index({ laboratoryId: 1, sampleId: 1 }, { unique: true });

// hook — runs on validate, BEFORE required-field validation would fire
labSampleSchema.pre("validate", async function (next) {
  if (!this.sampleId) {
    this.sampleId = await generateCustomId("SMP", this.laboratoryId);
  }
});

export const LabSample = mongoose.model("LabSample", labSampleSchema);
export default LabSample;
