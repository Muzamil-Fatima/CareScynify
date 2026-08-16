import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // User who will receive the notification
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // User who triggered the notification
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Notification category
    type: {
      type: String,
      enum: [
        "APPOINTMENT_BOOKED",
        "APPOINTMENT_CONFIRMED",
        "APPOINTMENT_CANCELLED",
        "APPOINTMENT_REMINDER",
        "VIDEO_CONSULTATION",
        "LAB_TEST_BOOKED",
        "LAB_TEST_PROCESSING",
        "LAB_REPORT_READY",
        "PHARMACY_ORDER_PLACED",
        "PHARMACY_ORDER_UPDATED",
        "PHARMACY_ORDER_DELIVERED",
        "PRESCRIPTION_ADDED",
        "REVIEW_RECEIVED",
        "SYSTEM",
      ],
      required: true,
    },

    // Notification heading
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Notification message
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Related document ID
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    // Related document type
    relatedType: {
      type: String,
      enum: [
        "Appointment",
        "LabTest",
        "LabReport",
        "Order",
        "Prescription",
        "Review",
        "System",
        null,
      ],
      default: null,
    },

    // Read/unread status
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
