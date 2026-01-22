import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { socket } from "../socket";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 🔹 Fetch all
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notification", authConfig);
      setNotifications(res.data);
    } catch (err) {
      console.error("Fetch notifications error:", err);
    }
  };

  // 🔹 Mark single as read
  const markAsRead = async (notifId) => {
    try {
      await api.put(`/notification/read/${notifId}`, {}, authConfig);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notifId ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  // 🔹 Mark all as read
  const markAllAsRead = async () => {
    try {
      await api.put("/notification/read-all", {}, authConfig);

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error("Read all error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on("new_notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => socket.off("new_notification");
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
