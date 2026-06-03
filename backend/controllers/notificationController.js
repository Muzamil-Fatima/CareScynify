import {
  createNotification,
  getUserNotifications,
  markAsRead,
} from "../services/notification.service.js";

export const create = async (req, res) => {
  try {
    const notification = await createNotification(req.body);
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const notifications = await getUserNotifications(req.user.id);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markRead = async (req, res) => {
  try {
    const updated = await markAsRead(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};