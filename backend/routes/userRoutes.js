import express from "express";
import {
  updateUserProfile,
  deleteLanguage,
  patchLanguage,
  addLanguage,
} from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.put("/profile", protect, upload.single("avatar"), updateUserProfile);
// --------------------------------------------------- Language
// // Update doctor languages
router.post("/languages", protect, addLanguage);
router.put("/languages/:id", protect, patchLanguage);
router.delete("/languages/:id", protect, deleteLanguage);
export default router;
