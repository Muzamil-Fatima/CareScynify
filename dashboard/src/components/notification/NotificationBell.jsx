import { useNotifications } from "../hooks/useNotifications";

export default function NotificationBell() {
  const { unreadCount, toggleDrawer } = useNotifications();

  return (
    <div className="relative cursor-pointer" onClick={toggleDrawer}>
      🔔

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
}