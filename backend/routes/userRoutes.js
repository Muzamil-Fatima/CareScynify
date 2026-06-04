import express from "express";
import {
  updateUserProfile,
  deleteLanguage,
  updateLanguage,
  addLanguage,
  getUserProfile,
} from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.put("/profile", protect, upload.single("avatar"), updateUserProfile);
router.get("/profile", protect, getUserProfile);
// --------------------------------------------------- Language
// // Update doctor languages
router.post("/languages", protect, addLanguage);
router.put("/languages/:id", protect, updateLanguage);
router.delete("/languages/:id", protect, deleteLanguage);
export default router;
