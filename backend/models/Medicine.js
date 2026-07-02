import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
      trim: true,
    },

    dosage: {
      type: String,
      trim: true,
      default: "",
    },

    frequency: {
      type: String,
      trim: true,
      default: "",
    },

    duration: {
      type: String,
      trim: true,
      default: "",
    },

    instructions: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

export default MedicineSchema;