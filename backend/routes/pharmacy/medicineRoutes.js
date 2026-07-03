import express from "express";

import {
  addMedicine,
  getMedicines,
  getMedicine,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicineController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(addMedicine)
  .get(getMedicines);

router
  .route("/:id")
  .get(getMedicine)
  .put(updateMedicine)
  .delete(deleteMedicine);

export default router;