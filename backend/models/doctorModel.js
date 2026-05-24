import mongoose from "mongoose";

const drSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Professional Details
    specialization: {
      type: String,
    },

    experience: {
      type: String,
      default: 0,
    },

    qualifications: {
      type: String,
    },

    licenseNo: {
      type: String,
      unique: true,
    },
   
    fee: {
      type: Number,
    },

    // Appointment Details
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

    drRoomNo: {
      type: Number,
    },

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
  { timestamps: true },
);

const Doctor = mongoose.model("Doctor", drSchema);
export default Doctor;
