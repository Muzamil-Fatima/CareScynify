import mongoose from "mongoose";

const doctorPatientSchema = new mongoose.Schema(
  {
    // Doctor who added this patient
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },

    // Actual patient profile
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    createdByDoctor: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


// Same doctor cannot add same patient twice
doctorPatientSchema.index(
  {
    doctorId: 1,
    patientId: 1,
  },
  {
    unique: true,
  }
);


const DoctorPatient =
  mongoose.models.DoctorPatient ||
  mongoose.model("DoctorPatient", doctorPatientSchema);


export default DoctorPatient;