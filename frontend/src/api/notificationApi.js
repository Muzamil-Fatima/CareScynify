import { api } from "./axios";

//  GET USER NOTIFICATIONS

export const getNotifications = async () => {
  const { data } = await api.get("/api/notifications");
  return data;
};

//  MARK ONE NOTIFICATION AS READ

export const markNotificationAsRead = async (notificationId) => {
  const { data } = await api.patch(`/api/notifications/${notificationId}/read`);
  return data;
};

//  MARK ALL NOTIFICATIONS AS READ

export const markAllNotificationsAsRead = async () => {
  const { data } = await api.patch("/api/notifications/read-all");
  return data;
};

//  DELETE NOTIFICATION

export const deleteNotification = async (notificationId) => {
  const { data } = await api.delete(`/api/notifications/${notificationId}`);
  return data;
};

//  GET NOTIFICATION PREFERENCES

export const getNotificationPreferences = async () => {
  const { data } = await api.get("/api/notifications/preferences");
  return data;
};

//  UPDATE NOTIFICATION PREFERENCES

export const updateNotificationPreferences = async (notificationSettings) => {
  const { data } = await api.put("/api/notifications/preferences", {
    notificationSettings,
  });
  return data;
};