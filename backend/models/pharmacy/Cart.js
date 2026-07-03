import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
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
          min: 1,
          default: 1,
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
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
