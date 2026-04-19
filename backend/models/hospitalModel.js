import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, required: true },

    hospitalAddress: { type: String, required: true },

    hospitalOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subscriptionPlan: {
      type: String,
      enum: ["basic", "standard", "premium"],
      default: "basic",
    },

    staff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;