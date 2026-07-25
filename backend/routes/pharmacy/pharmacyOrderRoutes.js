import express from "express";

import {
  placeOrder,
  getPatientOrders,
  getMyPharmacyOrders,
  updateOrderStatus,
  getOrder,
} from "../../controllers/pharmacy/pharmacyOrderController.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Place Order
router.post("/place", protect, placeOrder);

// Get Patient Orders
router.get("/my-orders", protect, getPatientOrders);

// Get Pharmacy Orders
router.get("/pharmacy-orders", protect, getMyPharmacyOrders);

// Update Order Status
router.put("/:id/status", protect, updateOrderStatus);

// Get Order Detail
router.get("/:id", protect, getOrder);

export default router;
