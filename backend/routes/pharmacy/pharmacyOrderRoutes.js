import express from "express";

import {
  placeOrder,
  getPatientOrders,
  getAllOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/pharmacyOrderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(placeOrder)
  .get(getAllOrders);

router.get("/patient", getPatientOrders);

router
  .route("/:id")
  .get(getOrder);

router.patch("/:id/status", updateOrderStatus);

export default router;