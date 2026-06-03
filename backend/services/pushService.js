import admin from "firebase-admin";

// Initialize Firebase (run once in app.js)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const sendPush = async (fcmToken, payload) => {
  if (!fcmToken) return;

  const message = {
    token: fcmToken,
    notification: {
      title: payload.title,
      body: payload.message,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Push sent:", response);
    return response;
  } catch (err) {
    console.error("Push Error:", err);
  }
};