import mongoose from "mongoose";

const drSchema = new mongoose.Schema(
  {
  // personal information
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  // Professional Details
    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    qualifications: {
      type: String,
    },

    licenseNo: {
      type: String,
      unique: true,
      required: true,
    },

    fee: {
      type: Number,
      required: true,
    },
  //   dr appointment details
    availableDays: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],

    consultationTime: {
      type: String,
    },

    roomNo: {
      type: String,
    },
AppointmentDuration: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "on_leave"],
      default: "active",
    },

    note: {
      type: String,
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", drSchema);
export default Doctor;