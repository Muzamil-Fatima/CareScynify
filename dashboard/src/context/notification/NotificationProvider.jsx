import { useReducer } from "react";
import NotificationContext from "./NotificationContext";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  openDrawer: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter(
          (notification) => !notification.read
        ).length,
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };

    case "MARK_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };

    case "TOGGLE_DRAWER":
      return {
        ...state,
        openDrawer: !state.openDrawer,
      };

    default:
      return state;
  }
}

export default function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
}