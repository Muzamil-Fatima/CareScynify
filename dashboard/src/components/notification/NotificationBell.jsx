import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useNotifications } from "../../hooks/useNotifications";
import NotificationBadge from "./NotificationBadge";

const NotificationBell = () => {
  const { unreadCount, toggleDrawer } = useNotifications();

  return (
    <button
      type="button"
      onClick={toggleDrawer}
      className="
        relative
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-full
        text-slate-600
        hover:text-purple-600
        hover:bg-purple-50
        transition-all
        duration-200
      "
      aria-label="Notifications"
    >
      <NotificationsNoneOutlinedIcon fontSize="medium" />

      <NotificationBadge count={unreadCount} />
    </button>
  );
};

export default NotificationBell;