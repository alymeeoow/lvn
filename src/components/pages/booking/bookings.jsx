// BookingsPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/bookings.css";
import { FiInbox, FiClock, FiCheckCircle } from "react-icons/fi";

const AUTH_KEY = "authUser"; // matches your logout storage key

const getAuthUser = () => {
  try {
    const sessionUser = sessionStorage.getItem(AUTH_KEY);
    if (sessionUser) return JSON.parse(sessionUser);

    const localUser = localStorage.getItem(AUTH_KEY);
    if (localUser) return JSON.parse(localUser);

    return null;
  } catch {
    return null;
  }
};

const BookingsPage = () => {
  const navigate = useNavigate();

  // ✅ Redirect if NOT logged in
  useEffect(() => {
    const user = getAuthUser();
    if (!user) navigate("/login", { replace: true });
  }, [navigate]);

  const [tab, setTab] = useState("ongoing");

  // ✅ Hardcoded demo bookings (based on your product catalog)
  const ongoingBookings = useMemo(
    () => [
      {
        id: "bk-ongoing-1",
        serviceName: "Semaglutide Injection",
        date: "Sep 10, 2025",
        time: "2:30 PM",
        location: "Telehealth (Video)",
        status: "ongoing",
        statusLabel: "In progress",
      },
      {
        id: "bk-ongoing-2",
        serviceName: "Hair Loss Oral Medication",
        date: "Sep 18, 2025",
        time: "11:00 AM",
        location: "Telehealth (Phone)",
        status: "pending",
        statusLabel: "Pending",
      },
      {
        id: "bk-ongoing-3",
        serviceName: "NAD+ Injection",
        date: "Sep 22, 2025",
        time: "4:15 PM",
        location: "Telehealth (Video)",
        status: "scheduled",
        statusLabel: "Scheduled",
      },
    ],
    []
  );

  const pastBookings = useMemo(
    () => [
      {
        id: "bk-past-1",
        serviceName: "Tirzepatide",
        date: "Aug 15, 2025",
        time: "9:00 AM",
        location: "Telehealth (Video)",
        status: "completed",
        statusLabel: "Completed",
      },
      {
        id: "bk-past-2",
        serviceName: "PT-141 (bremelanotide) Injectable",
        date: "Jul 28, 2025",
        time: "1:30 PM",
        location: "Telehealth (Video)",
        status: "completed",
        statusLabel: "Completed",
      },
      {
        id: "bk-past-3",
        serviceName: "Acne Gel",
        date: "Jun 05, 2025",
        time: "10:45 AM",
        location: "Telehealth (Message)",
        status: "completed",
        statusLabel: "Completed",
      },
    ],
    []
  );

  const list = tab === "ongoing" ? ongoingBookings : pastBookings;

  // ✅ Prevent flash (don’t render anything while redirecting)
  const isLoggedIn = !!getAuthUser();
  if (!isLoggedIn) return null;

  return (
    <div className="bookings-page">
      <div className="bookings-shell">
        <header className="bookings-header">
          <h1 className="bookings-title">My Bookings</h1>
          <p className="bookings-subtitle">
            Manage all your upcoming and past bookings at one place
          </p>

          <div className="bookings-tabs" role="tablist" aria-label="Bookings tabs">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "ongoing"}
              className={`bookings-tab ${tab === "ongoing" ? "active" : ""}`}
              onClick={() => setTab("ongoing")}
            >
              <FiClock className="bookings-tab-ico" />
              Ongoing Services
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={tab === "past"}
              className={`bookings-tab ${tab === "past" ? "active" : ""}`}
              onClick={() => setTab("past")}
            >
              <FiCheckCircle className="bookings-tab-ico" />
              Past Services
            </button>
          </div>
        </header>

        <section className="bookings-content" role="tabpanel">
          {list.length === 0 ? (
            <div className="bookings-empty">
              <div className="bookings-empty-icon" aria-hidden="true">
                <FiInbox />
              </div>
              <h2 className="bookings-empty-title">There&apos;s nothing to show here.</h2>
              <p className="bookings-empty-sub">
                Looks like the client hasn&apos;t booked any services yet.
              </p>
            </div>
          ) : (
            <div className="bookings-list">
              {list.map((b) => (
                <article key={b.id} className="booking-card">
                  <div className="booking-card-top">
                    <div>
                      <div className="booking-card-title">{b.serviceName}</div>
                      <div className="booking-card-meta">
                        {b.date} • {b.time} • {b.location}
                      </div>
                    </div>

                    <span className={`booking-badge ${b.status}`}>{b.statusLabel}</span>
                  </div>

                  <div className="booking-card-actions">
                    <button
                      className="booking-btn"
                      type="button"
                      onClick={() => console.log("View details:", b.id)}
                    >
                      View details
                    </button>

                    <button
                      className="booking-btn subtle"
                      type="button"
                      onClick={() => console.log("Contact provider:", b.id)}
                    >
                      Contact provider
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BookingsPage;
