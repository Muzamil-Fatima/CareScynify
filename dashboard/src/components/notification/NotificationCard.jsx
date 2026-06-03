import { useNotifications } from "../hooks/useNotifications";

export default function NotificationCard({ notification }) {
  const { markAsRead } = useNotifications();

  return (
    <div
      className={`p-3 border-b cursor-pointer ${
        notification.read ? "bg-white" : "bg-gray-100"
      }`}
      onClick={() => markAsRead(notification.id)}
    >
      <h4>{notification.title}</h4>
      <p className="text-sm text-gray-600">{notification.message}</p>
      <span className="text-xs">{notification.time}</span>
    </div>
  );
}