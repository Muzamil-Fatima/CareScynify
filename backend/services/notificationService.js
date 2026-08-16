
import Notification from "../models/notification.js";
import sendEmail from "./emailService.js";
import User from "../models/User.js";
import { getIO } from "../config/socket.js";

console.log(
  "NOTIFICATION TYPE ENUM:",
  Notification.schema.path("type").enumValues
);


// CREATE NOTIFICATION


export const createNotification = async ({
  recipient,
  sender = null,
  type,
  title,
  message,
  relatedId = null,
  relatedType = null,
}) => {
  try {
    // Get recipient
    const user = await User.findById(recipient).select(
      "email notificationSettings"
    );

    if (!user) {
      throw new Error("Recipient user not found");
    }

    
    // GET USER PREFERENCE
    

    const preference = user.notificationSettings?.get
      ? user.notificationSettings.get(type)
      : user.notificationSettings?.[type];

    const systemEnabled = preference?.system ?? true;
    const emailEnabled = preference?.email ?? true;

    
    // CREATE IN-APP NOTIFICATION
    

    let notification = null;

    if (systemEnabled) {
      notification = await Notification.create({
        recipient,
        sender,
        type,
        title,
        message,
        relatedId,
        relatedType,
        isRead: false,

        channels: emailEnabled
          ? ["in_app", "email"]
          : ["in_app"],
      });

      
      // REAL-TIME SOCKET NOTIFICATION
      

      try {
        const io = getIO();

        io.to(`user:${recipient.toString()}`).emit(
          "notification",
          notification
        );
      } catch (socketError) {
        console.error(
          "Notification socket emit error:",
          socketError.message
        );
      }
    }

    
    // SEND EMAIL
    

    if (emailEnabled && user.email) {
      await sendEmail({
        to: user.email,
        subject: title,
        text: message,
      });
    }

    return notification;
  } catch (error) {
    console.error("Create Notification Error:", error);
    throw error;
  }
};


// GET USER NOTIFICATIONS


export const getUserNotifications = async (userId) => {
  return await Notification.find({
    recipient: userId,
  })
    .sort({ createdAt: -1 })
    .lean();
};


// MARK ONE NOTIFICATION AS READ


export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: notificationId,
      recipient: userId,
    },
    {
      isRead: true,
    },
    {
      new: true,
    }
  );

  if (!notification) {
    throw new Error("Notification not found");
  }

  return notification;
};


// MARK ALL NOTIFICATIONS AS READ


export const markAllAsRead = async (userId) => {
  await Notification.updateMany(
    {
      recipient: userId,
      isRead: false,
    },
    {
      isRead: true,
    }
  );
};


// DELETE NOTIFICATION


export const deleteNotification = async (
  notificationId,
  userId
) => {
  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    recipient: userId,
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return notification;
};