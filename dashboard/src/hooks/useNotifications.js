import { useNotificationContext } from "../context/NotificationContext";

export const useNotifications = () => {
  const { state, dispatch } = useNotificationContext();

  const markAsRead = (id) => {
    dispatch({ type: "MARK_AS_READ", payload: id });
  };

  const toggleDrawer = () => {
    dispatch({ type: "TOGGLE_DRAWER" });
  };

  return {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    openDrawer: state.openDrawer,
    markAsRead,
    toggleDrawer,
    dispatch,
  };
};