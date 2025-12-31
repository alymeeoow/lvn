
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../assets/styles/profile.css";
import Button from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

import ProfileSidebar from "../../layout/profileSidebar";

const STORAGE_AUTH_KEY = "authUser";


const TIME_ZONES = [
  "(GMT-05:00) Eastern Time (EST) - Detroit",
  "(GMT-05:00) Eastern Time (EST) - Indianapolis",
  "(GMT-05:00) Eastern Time (EST) - Marengo",
  "(GMT-05:00) Eastern Time (EST) - Petersburg",
  "(GMT-05:00) Eastern Time (EST) - Vevay",
  "(GMT-05:00) Eastern Time (EST) - Vincennes",
  "(GMT-05:00) Eastern Time (EST) - Winamac",
  "(GMT-05:00) Eastern Time (EST) - Louisville",
  "(GMT-05:00) Eastern Time (EST) - Monticello",
  "(GMT-05:00) Eastern Time (EST) - New York",
  "(GMT-06:00) Central Time (CST) - Chicago",
  "(GMT-06:00) Central Time (CST) - Knox, Indiana",
  "(GMT-06:00) Central Time (CST) - Tell City",
  "(GMT-06:00) Central Time (CST) - Menominee",
  "(GMT-06:00) Central Time (CST) - Beulah",
  "(GMT-06:00) Central Time (CST) - Center",
  "(GMT-06:00) Central Time (CST) - New Salem",
  "(GMT-07:00) Mountain Time (MST) - Boise",
  "(GMT-07:00) Mountain Time (MST) - Denver",
  "(GMT-07:00) Mountain Standard Time (MST) - Phoenix",
  "(GMT-08:00) Pacific Time (PST) - Los Angeles",
  "(GMT-09:00) Alaska Time (AKST) - Anchorage",
  "(GMT-09:00) Alaska Time (AKST) - Juneau",
  "(GMT-09:00) Alaska Time (AKST) - Metlakatla",
  "(GMT-09:00) Alaska Time (AKST) - Nome",
  "(GMT-09:00) Alaska Time (AKST) - Sitka",
  "(GMT-09:00) Alaska Time (AKST) - Yakutat",
  "(GMT-10:00) Hawaii-Aleutian Time (HAST) - Adak",
  "(GMT-10:00) Hawaii Time (HST) - Honolulu",
];

function readAuthUser() {
  try {
    const raw =
      sessionStorage.getItem(STORAGE_AUTH_KEY) ||
      localStorage.getItem(STORAGE_AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeAuthUser(updated) {
  if (sessionStorage.getItem(STORAGE_AUTH_KEY)) {
    sessionStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(updated));
  } else if (localStorage.getItem(STORAGE_AUTH_KEY)) {
    localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(updated));
  } else {
    sessionStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(updated));
  }
}

function only10Digits(value) {
  return value.replace(/\D/g, "").slice(0, 10);
}


function prettyDateFromISO(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function isoFromParts(y, m, d) {
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

function clampMaxDateISO(iso, maxISO) {
  if (!iso) return iso;
  return iso > maxISO ? maxISO : iso;
}

function CalendarPicker({ valueISO, onChangeISO, disabled }) {
  const todayISO = new Date().toISOString().slice(0, 10);
  const today = new Date();
  const currentYear = today.getFullYear();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("day"); 

  const initial = useMemo(() => {
    if (valueISO) {
      const [y, m] = valueISO.split("-").map(Number);
      return { y, m };
    }
    return { y: currentYear, m: today.getMonth() + 1 };
  }, [valueISO, currentYear, today]);

  const [viewY, setViewY] = useState(initial.y);
  const [viewM, setViewM] = useState(initial.m);

  const wrapperRef = useRef(null);
  const yearListRef = useRef(null);

  const YEARS = useMemo(() => {
    const start = 1900;
    const arr = [];
    for (let y = currentYear; y >= start; y--) arr.push(y);
    return arr;
  }, [currentYear]);

  const monthName = useMemo(() => {
    const dt = new Date(viewY, viewM - 1, 1);
    return dt.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  }, [viewY, viewM]);

  const selected = valueISO ? valueISO.split("-").map(Number) : null;

  const days = useMemo(() => {
    const first = new Date(viewY, viewM - 1, 1);
    const firstDow = first.getDay();
    const daysInMonth = new Date(viewY, viewM, 0).getDate();

    const arr = [];
    for (let i = 0; i < firstDow; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [viewY, viewM]);

  const goPrevMonth = () => {
    const dt = new Date(viewY, viewM - 2, 1);
    setViewY(dt.getFullYear());
    setViewM(dt.getMonth() + 1);
  };

  const goNextMonth = () => {
    const dt = new Date(viewY, viewM, 1);
    setViewY(dt.getFullYear());
    setViewM(dt.getMonth() + 1);
  };

  const selectDay = (d) => {
    if (!d) return;
    const iso = isoFromParts(viewY, viewM, d);
    const safe = clampMaxDateISO(iso, todayISO);
    onChangeISO(safe);
    setOpen(false);
    setView("day");
  };

  const onBlurWrapper = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
      setView("day");
    }
  };

  useEffect(() => {
    if (!open || view !== "year") return;
    const targetYear = selected?.[0] || currentYear;
    const idx = YEARS.indexOf(targetYear);
    const el = yearListRef.current;
    if (!el || idx === -1) return;
    el.scrollTop = Math.max(0, idx * 36 - 120);
  }, [open, view, YEARS, currentYear, selected]);

  const MonthGrid = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginTop: 10,
        }}
      >
        {months.map((m) => {
          const dt = new Date(viewY, m - 1, 1);
          const label = dt.toLocaleDateString(undefined, { month: "short" });
          const isFutureMonth =
            viewY > currentYear ||
            (viewY === currentYear && m > today.getMonth() + 1);

          return (
            <button
              key={m}
              type="button"
              onClick={() => {
                if (isFutureMonth) return;
                setViewM(m);
                setView("day");
              }}
              disabled={isFutureMonth}
              style={{
                height: 40,
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "white",
                cursor: isFutureMonth ? "not-allowed" : "pointer",
                opacity: isFutureMonth ? 0.4 : 1,
                fontWeight: 800,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="profile-date"
      style={{ position: "relative" }}
      onBlur={onBlurWrapper}
      ref={wrapperRef}
    >
      <input
        type="text"
        name="dob_display"
        value={valueISO ? prettyDateFromISO(valueISO) : ""}
        readOnly
        disabled={disabled}
        placeholder="Select date"
        onClick={() => !disabled && setOpen((v) => !v)}
        onFocus={() => !disabled && setOpen(true)}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      />
      <span className="profile-date-ico" style={{ display: "flex" }}>
        <FaCalendarAlt />
      </span>

      {open && !disabled && (
        <div
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: 0,
            width: 320,
            maxWidth: "92vw",
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 14px 30px rgba(0,0,0,0.12)",
            border: "1px solid rgba(0,0,0,0.08)",
            padding: 14,
            zIndex: 50,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              type="button"
              onClick={() => {
                if (view === "day") goPrevMonth();
                if (view === "month") setViewY((y) => y - 1);
                if (view === "year") setViewY((y) => Math.max(1900, y - 12));
              }}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fff",
                cursor: "pointer",
                fontSize: 18,
              }}
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={() => {
                if (view === "day") setView("year");
                else if (view === "year") setView("month");
                else setView("year");
              }}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {view === "day" && (
                <>
                  <span>{monthName}</span>
                  <span style={{ opacity: 0.6, fontSize: 12 }}>▼</span>
                </>
              )}
              {view === "year" && (
                <>
                  <span>Select year</span>
                  <span style={{ opacity: 0.6, fontSize: 12 }}>▼</span>
                </>
              )}
              {view === "month" && (
                <>
                  <span>{viewY}</span>
                  <span style={{ opacity: 0.6, fontSize: 12 }}>▼</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (view === "day") goNextMonth();
                if (view === "month")
                  setViewY((y) => Math.min(currentYear, y + 1));
                if (view === "year")
                  setViewY((y) => Math.min(currentYear, y + 12));
              }}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fff",
                cursor: "pointer",
                fontSize: 18,
              }}
              aria-label="Next"
            >
              ›
            </button>
          </div>

          {view === "year" && (
            <div
              ref={yearListRef}
              style={{
                marginTop: 12,
                maxHeight: 260,
                overflowY: "auto",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.06)",
                padding: 8,
              }}
            >
              {YEARS.map((y) => {
                const isSelected = selected?.[0] === y;
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => {
                      setViewY(y);
                      setView("month");
                    }}
                    style={{
                      width: "100%",
                      height: 36,
                      borderRadius: 10,
                      border: "none",
                      background: isSelected
                        ? "rgba(0,0,0,0.06)"
                        : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "0 10px",
                      fontWeight: 900,
                    }}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          )}

          {view === "month" && <MonthGrid />}

          {view === "day" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 6,
                  marginTop: 12,
                  marginBottom: 6,
                  opacity: 0.75,
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
                  <div key={w} style={{ textAlign: "center" }}>
                    {w}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 6,
                }}
              >
                {days.map((d, idx) => {
                  const iso = d ? isoFromParts(viewY, viewM, d) : null;
                  const isFuture = iso ? iso > todayISO : false;

                  const isSelected =
                    !!selected &&
                    d &&
                    selected[0] === viewY &&
                    selected[1] === viewM &&
                    selected[2] === d;

                  return (
                    <button
                      key={`${idx}-${d ?? "x"}`}
                      type="button"
                      onClick={() => selectDay(d)}
                      disabled={!d || isFuture}
                      style={{
                        height: 38,
                        borderRadius: 999,
                        border: isSelected
                          ? "2px solid rgba(0,0,0,0.55)"
                          : "1px solid transparent",
                        background: "transparent",
                        cursor: !d || isFuture ? "not-allowed" : "pointer",
                        opacity: !d ? 0 : isFuture ? 0.35 : 1,
                        fontWeight: 800,
                      }}
                    >
                      {d || ""}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Profile Page ------------------------------ */

const ProfilePage = () => {
  const navigate = useNavigate();

  const [active, setActive] = useState("profile");
  const [authUser, setAuthUser] = useState(null);

  const [initialForm, setInitialForm] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    timeZone: "",
  });

  useEffect(() => {
    const u = readAuthUser();
    if (!u) {
      navigate("/login", { replace: true });
      return;
    }

    setAuthUser(u);

    const nextForm = {
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      dob: u.dob || "",
      gender: (u.gender || "").toUpperCase(),
      email: u.email || "",
      phone: only10Digits((u.phone || "").replace("🇺🇸 +1", "").trim()),
      timeZone: u.timeZone || "",
    };

    setForm(nextForm);
    setInitialForm(nextForm); // ✅ baseline for "dirty" check
  }, [navigate]);
  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/", { replace: true });
  };

  const initials = useMemo(() => {
    const f = (form.firstName || "").trim();
    const l = (form.lastName || "").trim();
    const i1 = f ? f[0] : "";
    const i2 = l ? l[0] : "";
    return `${i1}${i2}`.toUpperCase() || "U";
  }, [form.firstName, form.lastName]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((p) => ({ ...p, phone: only10Digits(value) }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };
  const isDirty = useMemo(() => {
    if (!initialForm) return false;
    return (
      form.firstName.trim() !== initialForm.firstName.trim() ||
      form.lastName.trim() !== initialForm.lastName.trim() ||
      (form.dob || "") !== (initialForm.dob || "") ||
      (form.gender || "") !== (initialForm.gender || "") ||
      (form.phone || "") !== (initialForm.phone || "") ||
      (form.timeZone || "") !== (initialForm.timeZone || "")
    );
  }, [form, initialForm]);

  const handleSave = () => {
    if (!isDirty) return; 
    const existing = readAuthUser();
    if (!existing) return;

    const updated = {
      ...existing,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      dob: form.dob,
      gender: (form.gender || "").toLowerCase(),
      phone: form.phone ? `🇺🇸 +1 ${form.phone}` : "",
      timeZone: form.timeZone,
      updatedAt: new Date().toISOString(),
    };

    writeAuthUser(updated);
    setAuthUser(updated);


    const newBaseline = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
    };
    setInitialForm(newBaseline);

    window.dispatchEvent(new Event("auth:changed"));
  };

  const displayName = useMemo(() => {
    const first = (form.firstName || "").trim();
    const last = (form.lastName || "").trim();
    return `${first} ${last}`.trim() || "User";
  }, [form.firstName, form.lastName]);

  return (
    <div className="profile-page">
      <div className="profile-shell">
        <ProfileSidebar
          active={active}
          onChange={setActive}
          onLogout={handleLogout}
        />

        <section className="profile-content">
          {active === "profile" && (
            <div className="profile-card">
              <h1 className="profile-title">Profile</h1>

              <div className="profile-avatar-wrap">
                <div className="profile-avatar-big">{initials}</div>
              </div>

              <div className="profile-form">
                <div className="profile-field">
                  <label>First name *</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="profile-field">
                  <label>Last name *</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>

                <div className="profile-field">
                  <label>Date Of Birth *</label>
                  <CalendarPicker
                    valueISO={form.dob}
                    onChangeISO={(iso) => setForm((p) => ({ ...p, dob: iso }))}
                    disabled={false}
                  />
                </div>

                <div className="profile-field select-wrap">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="NONBINARY">NON-BINARY</option>
                    <option value="PREFER_NOT_SAY">PREFER NOT TO SAY</option>
                  </select>
                </div>

                <div className="profile-field">
                  <label>Email address *</label>
                  <input
                    name="email"
                    value={form.email}
                    readOnly
                    className="readonly"
                  />
                </div>

                <div className="profile-field">
                  <label>Phone number</label>

                  <div className="profile-phone-row">
                    <div className="profile-code">
                      <div
                        className="profile-code-pill"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "0 12px",
                          fontWeight: 600,
                        }}
                      >
                        <img
                          src="https://flagcdn.com/us.svg"
                          alt="United States"
                          style={{
                            width: 18,
                            height: 14,
                            objectFit: "cover",
                            borderRadius: 2,
                          }}
                        />
                        <span>US +1</span>
                      </div>
                    </div>

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <div className="profile-field select-wrap">
                  <label>Time zone</label>
                  <select
                    name="timeZone"
                    value={form.timeZone}
                    onChange={handleChange}
                  >
                    <option value="">Select time zone</option>
                    {TIME_ZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="profile-actions">
                  <Button
                    className={`profile-save ${!isDirty ? "disabled" : ""}`}
                    onClick={handleSave}
                    disabled={!isDirty}
                  >
                    Save
                  </Button>
                </div>

                <p className="profile-muted" style={{ textAlign: "center" }}>
                  Signed in as <strong>{displayName}</strong>
                </p>
              </div>
            </div>
          )}

         
          {active === "password" && (
            <div className="profile-card">
              <h1 className="profile-title">Change password</h1>
              <p className="profile-muted">Add your change password UI here.</p>
            </div>
          )}

          {active === "payment" && (
            <div className="profile-card">
              <h1 className="profile-title">Payment options</h1>
              <p className="profile-muted">Add payment methods UI here.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
