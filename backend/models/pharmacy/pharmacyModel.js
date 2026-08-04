import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic Information
    pharmacyName: {
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

    // Contact
    alternatePhone: String,
    website: String,

    // Location
    address: String,
    city: String,
    province: String,
    postalCode: String,

    latitude: Number,
    longitude: Number,

    // Pharmacy Details
    pharmacyType: {
      type: String,
      enum: ["Retail", "Hospital", "Online", "Clinic", "Wholesale"],
      default: "Retail",
    },

    operatingHours: [
      {
        day: String,
        open: String,
        close: String,
        closed: {
          type: Boolean,
          default: false,
        },
      },
    ],

    description: String,

    logo: String,
    coverImage: String,

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    country: {
      type: String,
      trim: true,
    },
    mapLink: {
      type: String,
      trim: true,
    },

    emergencyService: {
      type: Boolean,
      default: false,
    },

    homeDelivery: {
      type: Boolean,
      default: false,
    },

    onlineConsultationSupport: {
      type: Boolean,
      default: false,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    acceptPrescription: {
      type: Boolean,
      default: true,
    },

    cashOnDelivery: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Pharmacy =
  mongoose.models.Pharmacy || mongoose.model("Pharmacy", pharmacySchema);
export default Pharmacy;
