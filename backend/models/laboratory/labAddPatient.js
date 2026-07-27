import mongoose from "mongoose";

const labPatientSchema = new mongoose.Schema(
  {
    // Laboratory
    laboratoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laboratory",
      required: true,
      index: true,
    },

    // Registered Patient (optional)
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
      index: true,
    },

    // Walk-in Patient Details
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    // Assigned Lab Test
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabTest",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "sample_collected",
        "processing",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    sampleCollectedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    resultFile: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate registration of the same mobile number for the same test in the same laboratory
labPatientSchema.index(
  {
    laboratoryId: 1,
    mobile: 1,
    testId: 1,
  },
  {
    unique: true,
  },
);

const LabPatient =
  mongoose.models.LabPatient || mongoose.model("LabPatient", labPatientSchema);

export default LabPatient;
