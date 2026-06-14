import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    workplaceId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["reserved", "confirmed", "cancelled"],
      default: "confirmed",
    },

    reservedUntil: Date,
  },
  { timestamps: true }
);

/* 🔥 PREVENT DOUBLE BOOKING (CRITICAL FIX) */
appointmentSchema.index(
  { doctorId: 1, appointmentDate: 1, appointmentTime: 1 },
  { unique: true }
);

export default mongoose.model("Appointment", appointmentSchema);