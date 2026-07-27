import mongoose from "mongoose";

const operatingHourSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    open: {
      type: String,
      default: "09:00",
    },
    close: {
      type: String,
      default: "21:00",
    },
    closed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const laboratorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic Information
    labName: {
      type: String,
      trim: true,
    },

    ownerName: {
      type: String,
      trim: true,
    },

    registrationNumber: {
      type: String,
      trim: true,
    },

    licenseNumber: {
      type: String,
      trim: true,
    },

    taxNumber: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    // Contact Information
    alternatePhone: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },

    supportPhone: {
      type: String,
      default: "",
    },

    // Address
    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    province: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "Pakistan",
    },

    postalCode: {
      type: String,
      default: "",
    },

    mapLink: {
      type: String,
      default: "",
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    // Laboratory Details
    labType: {
      type: String,
      enum: [
        "Diagnostic",
        "Clinical",
        "Pathology",
        "Radiology",
        "Research",
      ],
      default: "Diagnostic",
    },

    operatingHours: [operatingHourSchema],

    // Services
    homeSampleCollection: {
      type: Boolean,
      default: false,
    },

    onlineReports: {
      type: Boolean,
      default: false,
    },

    emergencyTesting: {
      type: Boolean,
      default: false,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    onlineBooking: {
      type: Boolean,
      default: false,
    },

    digitalReports: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const Laboratory= mongoose.model("Laboratory", laboratorySchema);
export default Laboratory;