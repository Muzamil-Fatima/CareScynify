import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: String,
    message: String,

    type: {
      type: String,
      enum: ["appointment", "emergency", "payment", "message", "system"],
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    channels: {
      type: [String], // ["push", "email", "whatsapp"]
      default: ["push"],
    },

    read: {
      type: Boolean,
      default: false,
    },

    metadata: {
      appointmentId: String,
      patientId: String,
    },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model("Notification", notificationSchema);
