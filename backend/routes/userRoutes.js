import express from "express";
import { updateUserProfile } from "../controllers/userController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.put(
  "/profile",
  protect,
  upload.single("avatar"),
  updateUserProfile
);

export default router;