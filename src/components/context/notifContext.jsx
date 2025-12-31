import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const NotifContext = createContext(null);

const STORAGE_KEY = "notifications";

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export const NotifProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const initial = safeParse(raw, []);
    return Array.isArray(initial) ? initial : [];
  });

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const notifCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const openNotif = () => setIsNotifOpen(true);
  const closeNotif = () => setIsNotifOpen(false);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearNotif = () => setNotifications([]);
  const addNotif = (payload) => {
    const id = payload.id || `n-${Date.now()}`;
    const item = {
      id,
      title: payload.title || "Notification",
      message: payload.message || "",
      createdAt: payload.createdAt || new Date().toISOString(),
      read: !!payload.read,
    };
    setNotifications((prev) => [item, ...prev]);
  };

  const value = {
    notifications,
    notifCount,
    isNotifOpen,
    openNotif,
    closeNotif,
    markAsRead,
    markAllRead,
    removeNotif,
    clearNotif,
    addNotif,
  };

  return <NotifContext.Provider value={value}>{children}</NotifContext.Provider>;
};

export const useNotif = () => {
  const ctx = useContext(NotifContext);
  if (!ctx) throw new Error("useNotif must be used within NotifProvider");
  return ctx;
};
