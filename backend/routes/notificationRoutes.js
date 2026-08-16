import express from "express";

import {
  create,
  getAll,
  markRead,
  markAllRead,
  remove,
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../controllers/notificationController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();


   // NOTIFICATION PREFERENCES


// Get logged-in user's notification preferences
router.get("/preferences", protect, getNotificationPreferences);

// Update logged-in user's notification preferences
router.put("/preferences", protect, updateNotificationPreferences);


   // NOTIFICATIONS


// Create notification
router.post("/", protect, create);

// Get logged-in user's notifications
router.get("/", protect, getAll);

// Mark one notification as read
router.patch("/:id/read", protect, markRead);

// Mark all notifications as read
router.patch("/read-all", protect, markAllRead);

// Delete notification
router.delete("/:id", protect, remove);

export default router;
