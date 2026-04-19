import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
  {
    // 👤 Who the test is for
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //  Who requested the test
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    //  Which hospital/clinic this belongs to
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },

    //  Test details
    testName: {
      type: String,
      required: true,
    },

    testType: {
      type: String,
      enum: ["blood", "urine", "xray", "mri", "ct_scan", "other"],
      default: "other",
    },

    //  Result
    result: {
      type: String,
    },

    reportFile: {
      type: String, // PDF/image URL
    },

    //  Status tracking
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

    //  Cost
    price: {
      type: Number,
    },

    // Notes
    notes: {
      type: String,
    },

    //  Lab technician (optional future use)
    labTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Lab = mongoose.model("Lab", labSchema);
export default Lab;
