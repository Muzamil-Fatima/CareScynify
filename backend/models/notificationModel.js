import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    type: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    relatedType: {
      type: String,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    channels: {
      type: [String],
      enum: ["in_app", "email"],
      default: ["in_app"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("Notification", notificationSchema);
