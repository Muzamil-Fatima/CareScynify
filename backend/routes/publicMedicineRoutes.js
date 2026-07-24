import express from "express";
import {
    getAllMedicines,
    getMedicineById
} from "../controllers/userSite/publicMedicineController.js";
const router = express.Router();

router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);
export default router;
