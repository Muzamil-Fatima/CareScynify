import mongoose from "mongoose";

const directSaleItemSchema = new mongoose.Schema(
  {
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },

    medicineName: {
      type: String,
      required: true,
      trim: true,
    },

    batchNumber: {
      type: String,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const directSaleSchema = new mongoose.Schema(
  {
    pharmacyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
      index: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    items: {
      type: [directSaleItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return Array.isArray(items) && items.length > 0;
        },
        message: "At least one medicine is required for a direct sale.",
      },
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "JazzCash", "Easypaisa", "Other"],
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      default: "Paid",
    },

    customerName: {
      type: String,
      trim: true,
      default: "Walk-in Customer",
    },

    customerPhone: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    saleDate: {
      type: Date,
      default: Date.now,
      index: true,
    },

    status: {
      type: String,
      enum: ["Completed", "Cancelled"],
      default: "Completed",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const DirectSale =
  mongoose.models.DirectSale || mongoose.model("DirectSale", directSaleSchema);

export default DirectSale;
