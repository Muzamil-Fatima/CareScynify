import { useNotifications } from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";

export default function NotificationsPage() {
  const { notifications } = useNotifications();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Notifications</h1>

      <div className="bg-white shadow rounded">
        {notifications.map((n) => (
          <NotificationCard key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
}