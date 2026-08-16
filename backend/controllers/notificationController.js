import User from "../models/User.js";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService.js";

/*  CREATE NOTIFICATION */

export const create = async (req, res) => {
  try {
    const notification = await createNotification(req.body);

    return res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Create Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create notification",
    });
  }
};

/*  GET USER NOTIFICATIONS */

export const getAll = async (req, res) => {
  try {
    const notifications = await getUserNotifications(req.userId);

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get notifications",
    });
  }
};

/*  MARK ONE NOTIFICATION AS READ */

export const markRead = async (req, res) => {
  try {
    const updated = await markAsRead(req.params.id, req.userId);

    return res.status(200).json({
      success: true,
      notification: updated,
    });
  } catch (error) {
    console.error("Mark Notification Read Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to mark notification as read",
    });
  }
};

/* MARK ALL NOTIFICATIONS AS READ */

export const markAllRead = async (req, res) => {
  try {
    await markAllAsRead(req.userId);

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark All Notifications Read Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to mark all notifications as read",
    });
  }
};

/* DELETE NOTIFICATION */

export const remove = async (req, res) => {
  try {
    await deleteNotification(req.params.id, req.userId);

    return res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete notification",
    });
  }
};

/* GET NOTIFICATION PREFERENCES */

export const getNotificationPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "notificationSettings role",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      role: user.role,
      notificationSettings: user.notificationSettings || {},
    });
  } catch (error) {
    console.error("Get Notification Preferences Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get notification preferences",
    });
  }
};

/*  UPDATE NOTIFICATION PREFERENCES */
export const updateNotificationPreferences = async (req, res) => {
  try {
    const { notificationSettings } = req.body;

    // Validate request body
    if (
      !notificationSettings ||
      typeof notificationSettings !== "object" ||
      Array.isArray(notificationSettings)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid notification settings",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Convert object to Mongoose Map
    user.notificationSettings = new Map(
      Object.entries(notificationSettings).map(([key, value]) => [
        key,
        {
          system: Boolean(value?.system),
          email: Boolean(value?.email),
        },
      ]),
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Notification preferences updated successfully",
      notificationSettings: Object.fromEntries(user.notificationSettings),
    });
  } catch (error) {
    console.error("Update Notification Preferences Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update notification preferences",
    });
  }
};
