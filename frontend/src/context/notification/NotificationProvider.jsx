import React, { useEffect, useReducer } from "react";
import { io } from "socket.io-client";

import NotificationContext from "./NotificationContext";

import {
  getNotifications,
  markNotificationAsRead,
} from "../../api/notificationApi";

import { useAuth } from "../../hooks/useAuth";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  openDrawer: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_NOTIFICATIONS": {
      const notifications = action.payload || [];

      return {
        ...state,
        notifications,
        unreadCount: notifications.filter(
          (notification) => !notification.isRead,
        ).length,
        loading: false,
      };
    }

    case "ADD_NOTIFICATION": {
      const newNotification = action.payload;

      const alreadyExists = state.notifications.some(
        (notification) => notification._id === newNotification._id,
      );

      if (alreadyExists) {
        return state;
      }

      return {
        ...state,
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }

    case "MARK_AS_READ": {
      const notification = state.notifications.find(
        (item) => item._id === action.payload,
      );

      if (!notification || notification.isRead) {
        return state;
      }

      return {
        ...state,
        notifications: state.notifications.map((item) =>
          item._id === action.payload
            ? {
                ...item,
                isRead: true,
              }
            : item,
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    }

    case "TOGGLE_DRAWER":
      return {
        ...state,
        openDrawer: !state.openDrawer,
      };

    case "CLOSE_DRAWER":
      return {
        ...state,
        openDrawer: false,
      };

    default:
      return state;
  }
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { user } = useAuth();

  // LOAD EXISTING NOTIFICATIONS

  useEffect(() => {
    if (!user?._id) return;

    const loadNotifications = async () => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: true,
        });

        const data = await getNotifications();

        dispatch({
          type: "SET_NOTIFICATIONS",
          payload: data?.notifications || [],
        });
      } catch (error) {
        console.error("Failed to load notifications:", error);

        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    };

    loadNotifications();
  }, [user?._id]);

  // REAL-TIME SOCKET NOTIFICATIONS

  useEffect(() => {
    if (!user?._id) return;

    const socketUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

    const socket = io(socketUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Notification socket connected:", socket.id);

      // Join user's private notification room
      socket.emit("join-user", user._id);
    });

    socket.on("notification", (notification) => {
      console.log("🔔 New notification received:", notification);

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: notification,
      });
    });

    socket.on("connect_error", (error) => {
      console.error("Notification socket connection error:", error.message);
    });

    return () => {
      socket.off("connect");
      socket.off("notification");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [user?._id]);

  // MARK AS READ

  const markAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);

      dispatch({
        type: "MARK_AS_READ",
        payload: notificationId,
      });
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // DRAWER

  const toggleDrawer = () => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });
  };

  const closeDrawer = () => {
    dispatch({
      type: "CLOSE_DRAWER",
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        state,
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        loading: state.loading,
        openDrawer: state.openDrawer,
        markAsRead,
        toggleDrawer,
        closeDrawer,
        dispatch,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
