import { sendWhatsApp } from "./whatsapp.service.js";
import { sendEmail } from "./email.service.js";
import { sendPush } from "./push.service.js";

export const sendNotification = async (user, notification) => {
  const { channels, title, message } = notification;

  try {
    // PUSH NOTIFICATION
    if (channels.includes("push")) {
      await sendPush(user.fcmToken, {
        title,
        message,
      });
    }

    // EMAIL NOTIFICATION
    if (channels.includes("email")) {
      await sendEmail(user.email, {
        subject: title,
        message,
      });
    }

    // WHATSAPP NOTIFICATION
    if (channels.includes("whatsapp")) {
      await sendWhatsApp(user.phone, message);
    }

    return true;
  } catch (error) {
    console.error("Notification Error:", error);
    return false;
  }
};