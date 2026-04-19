import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    clinicName: {
      type: String,
      required: true,
    },

    clinicLocation: {
      type: String,
      required: true,
    },

    clinicTimings: {
      type: String,
      required: true,
    },

    clinicAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    staff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Clinic = mongoose.model("Clinic", clinicSchema);
export default Clinic;