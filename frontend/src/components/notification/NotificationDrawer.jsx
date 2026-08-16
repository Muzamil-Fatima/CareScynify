import React from "react";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationCard from "./NotificationCard";

const NotificationDrawer = () => {
  const { openDrawer, toggleDrawer, notifications, loading, unreadCount } =
    useNotifications();

  if (!openDrawer) return null;

  return (
    <div
      className="
        absolute
        top-full
        right-0
        mt-3
        w-95
        max-w-[calc(100vw-2rem)]
        bg-white
        rounded-2xl
        shadow-2xl
        border
        border-gray-100
        z-100
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Notifications
            </h2>

            <p className="text-xs text-gray-500 mt-0.5">
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }`
                : "You're all caught up"}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleDrawer}
            className="
              w-8
              h-8
              flex
              items-center
              justify-center
              rounded-full
              text-gray-400
              hover:text-gray-700
              hover:bg-gray-100
              transition
            "
            aria-label="Close notifications"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-h-120 overflow-y-auto">
        {loading ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-6 h-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin" />

            <p className="text-sm text-gray-500 mt-3">
              Loading notifications...
            </p>
          </div>
        ) : notifications.length > 0 ? (
          notifications
            .slice(0, 10)
            .map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
              />
            ))
        ) : (
          <div className="py-12 px-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              🔔
            </div>

            <h3 className="mt-3 text-sm font-semibold text-gray-700">
              No notifications
            </h3>

            <p className="mt-1 text-xs text-gray-500">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDrawer;
