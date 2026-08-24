import express from "express";

import {
  createDirectSale,
  getDirectSales,
  getDirectSaleById,
  generateInvoice,
} from "../../controllers/pharmacy/directSaleController.js";

const router = express.Router();

// Create a direct sale
router.post("/", createDirectSale);

// Get all direct sales
router.get("/", getDirectSales);

// Get one direct sale
router.get("/:id", getDirectSaleById);

// Get invoice data for a direct sale
router.get("/:id/invoice", generateInvoice);

export default router;