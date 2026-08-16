import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
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
    reminderSent: {
      type: Boolean,
      default: false,
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
    endTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["reserved", "confirmed", "cancelled", "pending", "completed"],
      default: "pending",
    },

    reservedUntil: Date,
  },
  { timestamps: true, versionKey: false },
);
appointmentSchema.index(
  {
    doctorId: 1,
    workplaceId: 1,
    appointmentDate: 1,
    appointmentTime: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: {
        $in: ["reserved", "pending", "confirmed"],
      },
    },
  },
);
export const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
