import { useNotifications } from "../hooks/useNotifications";
import NotificationCard from "./NotificationCard";

export default function NotificationDrawer() {
  const { openDrawer, toggleDrawer, notifications } = useNotifications();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform ${
        openDrawer ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between">
        <h2>Notifications</h2>
        <button onClick={toggleDrawer}>✖</button>
      </div>

      <div className="overflow-y-auto h-full">
        {notifications.slice(0, 10).map((n) => (
          <NotificationCard key={n.id} notification={n} />
        ))}
      </div>

      <div className="p-3 border-t">
        <a href="/notifications">View All</a>
      </div>
    </div>
  );
}