import mongoose from "mongoose";
import generateCustomId from "../utils/generateCustomId.js";
import Counter from "./Counter.js";
const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
    },
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
appointmentSchema.pre("validate", async function (next) {
  if (!this.appointmentId) {
    const year = new Date().getFullYear().toString().slice(-2);

    const key = `APT-${year}-${this.doctorId.toString()}`;

    const counter = await Counter.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      {
        new: true,
        upsert: true,
      },
    );

    this.appointmentId = `APT${year}${String(counter.seq).padStart(5, "0")}`;
  }
});
export const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
