import mongoose from "mongoose";

const pharmacyOrderSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      default: null,
    },

    items: [
      {
        medicineId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Online"],
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Ready",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const PharmacyOrder =
  mongoose.models.PharmacyOrder ||
  mongoose.model("PharmacyOrder", pharmacyOrderSchema);
export default PharmacyOrder;
