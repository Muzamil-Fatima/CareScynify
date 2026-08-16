import React from "react";

import { useNotifications } from "../hooks/useNotifications";
import NotificationCard from "./NotificationCard";

const NotificationList = () => {
  const { notifications } = useNotifications();

  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <p className="text-sm text-gray-500">No notifications yet.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {notifications.map((notification) => (
        <NotificationCard key={notification._id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;
