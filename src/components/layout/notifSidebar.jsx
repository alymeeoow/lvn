// components/layout/notifSidebar.jsx
import React, { useEffect } from "react";
import { FiBell, FiX, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { useNotif } from "../context/notifContext";
import "../../assets/styles/cart.css"; // reuse the same sidebar styles

const NotifSidebar = () => {
  const {
    notifications,
    notifCount,
    isNotifOpen,
    closeNotif,
    markAsRead,
    markAllRead,
    removeNotif,
    clearNotif,
  } = useNotif();

  // Disable body scroll when notif is open (same pattern as cart)
  useEffect(() => {
    if (!isNotifOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;

    const originalOverflow = body.style.overflow;
    const originalPosition = body.style.position;
    const originalTop = body.style.top;
    const originalWidth = body.style.width;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.dataset.scrollY = scrollY.toString();

    return () => {
      body.style.overflow = originalOverflow;
      body.style.position = originalPosition;
      body.style.top = originalTop;
      body.style.width = originalWidth;

      const savedScrollY = parseInt(body.dataset.scrollY || "0", 10);
      window.scrollTo(0, savedScrollY);
      delete body.dataset.scrollY;
    };
  }, [isNotifOpen]);

  return (
    <>
      {/* Overlay */}
      <div className={`cart-overlay ${isNotifOpen ? "active" : ""}`} onClick={closeNotif} />

      {/* Sidebar (reuse cart-sidebar classes) */}
      <div className={`cart-sidebar ${isNotifOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <FiBell className="cart-header-icon" />
            <h2>Notifications</h2>
            <span className="cart-item-count">({notifCount} unread)</span>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {notifications.length > 0 && (
              <>
                <button
                  className="clear-cart-btn"
                  onClick={markAllRead}
                  style={{ padding: "8px 10px" }}
                  title="Mark all as read"
                >
                  <FiCheckCircle /> Mark all
                </button>

                <button className="clear-cart-btn" onClick={clearNotif} title="Clear all">
                  <FiTrash2 /> Clear
                </button>
              </>
            )}

            <button className="cart-close-btn" onClick={closeNotif} aria-label="Close notifications">
              <FiX />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="cart-content">
          {notifications.length === 0 ? (
            <div className="empty-cart">
              <FiBell className="empty-cart-icon" />
              <h3>No notifications</h3>
              <p>Any updates on your bookings will appear here</p>
              <button className="continue-shopping-btn" onClick={closeNotif}>
                Close
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="cart-item"
                  style={{
                    alignItems: "flex-start",
                    opacity: n.read ? 0.7 : 1,
                  }}
                >
                  <div className="cart-item-details" style={{ flex: 1 }}>
                    <h4 className="cart-item-name" style={{ marginBottom: 6 }}>
                      {n.title}
                      {!n.read && (
                        <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 800 }}>
                          • New
                        </span>
                      )}
                    </h4>
                    {n.message && <p className="cart-item-category">{n.message}</p>}
                    <div className="cart-item-price" style={{ justifyContent: "flex-start" }}>
                      <span className="unit-price">
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                      {!n.read && (
                        <button
                          className="checkout-btn"
                          style={{ padding: "10px 12px" }}
                          onClick={() => markAsRead(n.id)}
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        className="clear-cart-btn"
                        style={{ padding: "10px 12px" }}
                        onClick={() => removeNotif(n.id)}
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotifSidebar;
