import express from "express";
import {
  getAllPharmacies,
  getPharmacyById,
} from "../../controllers/userSite/publicPharmacyController.js";


const router = express.Router();


router.get("/", getAllPharmacies);

router.get("/:id", getPharmacyById);


export default router;