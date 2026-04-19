import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    module: {
      type: String,
      enum: ["patient", "appointment", "lab", "doctor", "setting"],
      required: true,
    },
  },
  { timestamps: true }
);

const Permission = mongoose.models.Permission || mongoose.model("Permission", permissionSchema);

export default Permission;