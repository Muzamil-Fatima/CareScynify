import mongoose from "mongoose";

// define the schema
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
    //    grouping helps in UI/admin panel
    module: {
      type: String,
      enum: ["patient", "appointment", "lab", "doctor", "setting"],
      required: true,
    },
  },
  { timestamps: true },
);
