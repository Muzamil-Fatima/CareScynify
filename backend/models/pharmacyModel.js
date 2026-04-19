import mongoose from "mongoose";

const pharmacyInventorySchema = new mongoose.Schema(
  {
    //  Which pharmacy this stock belongs to
    pharmacyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization", // pharmacy type organization
      required: true,
    },

    //  Medicine details
    medicineName: {
      type: String,
      required: true,
    },

    genericName: {
      type: String,
    },

    category: {
      type: String,
      enum: ["tablet", "capsule", "syrup", "injection", "cream", "drops", "other"],
      default: "tablet",
    },

    //  Stock management
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },

    minStockLevel: {
      type: Number,
      default: 10,
    },

    unitPrice: {
      type: Number,
      required: true,
    },

    //  Manufacturer info
    manufacturer: {
      type: String,
    },

    batchNumber: {
      type: String,
    },

    expiryDate: {
      type: Date,
    },

    // Status
    status: {
      type: String,
      enum: ["available", "low_stock", "out_of_stock"],
      default: "available",
    },

    //  Extra notes
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const PharmacyInventory = mongoose.model(
  "PharmacyInventory",
  pharmacyInventorySchema
);

export default PharmacyInventory;