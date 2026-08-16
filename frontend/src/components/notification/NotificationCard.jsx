import React from "react";
import { useNotifications } from "../../hooks/useNotifications";

const NotificationCard = ({ notification }) => {
  const { markAsRead } = useNotifications();

  return (
    <div
      className={`p-3 border-b cursor-pointer transition ${
        notification.isRead ? "bg-white" : "bg-gray-100"
      }`}
      onClick={() => {
        if (!notification.isRead) {
          markAsRead(notification._id);
        }
      }}
    >
      <h4 className="font-medium text-sm text-gray-800">
        {notification.title}
      </h4>

      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

      <span className="text-xs text-gray-400">
        {new Date(notification.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default NotificationCard;
