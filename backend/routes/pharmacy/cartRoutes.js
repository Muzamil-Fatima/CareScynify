import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../controllers/pharmacy/cartController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Get logged-in patient's cart
router.get("/", protect, getCart);

// Add medicine to cart
router.post("/add", protect, addToCart);

// Update quantity of a cart item
router.put("/update/:medicineId", protect, updateCartItem);

// Remove a medicine from cart
router.delete("/remove/:medicineId", protect, removeCartItem);

// Clear entire cart
router.delete("/clear", protect, clearCart);

export default router;