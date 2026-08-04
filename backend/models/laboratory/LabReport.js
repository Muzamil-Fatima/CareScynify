import mongoose from "mongoose";
import generateCustomId from "../../utils/generateCustomId.js";
import Counter from "../Counter.js";
const labReportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
    },
    labPatientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabPatient",
      default: null,
    },
    laboratoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laboratory",
      required: true,
    },
    pdfUrl: {
      type: String,
      default: "",
    },
    sampleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabSample",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },
    reportStatus: {
      type: String,
      enum: ["Draft", "Verified"],
      default: "Draft",
    },

    results: [
      {
        testName: String,
        parameter: String,
        value: String,
        unit: String,
        referenceRange: String,
        remarks: String,
      },
    ],

    overallRemarks: String,

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);
labReportSchema.pre("validate", async function () {
  if (!this.reportId) {
    const year = new Date().getFullYear().toString().slice(-2);

    const key = `RPT-${year}-${this.laboratoryId.toString()}`;

    const counter = await Counter.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true,
      },
    );

    this.reportId = `RPT-${year}-${String(counter.seq).padStart(5, "0")}`;
  }
});
export const LabReport = mongoose.model("LabReport", labReportSchema);
export default LabReport;
