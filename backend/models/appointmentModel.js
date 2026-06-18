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

    appointmentType: {
      type: String,
      enum: ["online", "physical"],
      default: "online",
    },

    status: {
      type: String,
      enum: ["reserved", "confirmed", "cancelled", "pending"],
      default: "pending",
    },

    reservedUntil: Date,
  },
  { timestamps: true }
);
export const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;