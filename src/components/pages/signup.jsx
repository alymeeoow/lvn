// CompactSignup.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/signup.css";
import Button from "../ui/button";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaVenusMars,
  FaCalendarAlt,
  FaGlobe,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const GENDERS = [
  { value: "", label: "Select gender" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "nonbinary", label: "Non-binary" },
  { value: "prefer_not_say", label: "Prefer not to say" },
];

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidUSPhoneDigits(digits10) {
  if (!/^\d{10}$/.test(digits10)) return false;

  const area = digits10.slice(0, 3);
  const central = digits10.slice(3, 6);
  const line = digits10.slice(6, 10);

  if (!/^[2-9]\d{2}$/.test(area)) return false;
  if (!/^[2-9]\d{2}$/.test(central)) return false;

  if (area === "000" || central === "000" || line === "0000") return false;
  if (digits10 === "1234567890") return false;
  if (/^(\d)\1{9}$/.test(digits10)) return false;

  return true;
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 7);
  const part3 = digits.slice(7, 11);

  if (digits.length <= 3) return part1;
  if (digits.length <= 7) return `${part1}-${part2}`;
  return `${part1}-${part2}-${part3}`;
}

function normalizeToUS10Digits(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  if (digits.length === 11) return digits.slice(1);
  return "";
}

function isStrongEnoughPassword(pw) {
  if (!pw || pw.length < 8) return false;
  return /[A-Za-z]/.test(pw) && /\d/.test(pw);
}

function isValidOTP(code) {
  return /^\d{6}$/.test(code);
}

function prettyDateFromISO(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "2-digit" });
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


const STORAGE_KEYS = {
  USER: "user",
  SIGNUP_DRAFT: "signupFormData",
};

function safeJSONParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  return safeJSONParse(raw, fallback);
}

/* ------------------------------- */
/* ✅ Password hashing (NOT plaintext)
   PBKDF2 + SHA-256 (Web Crypto)
   Works on https or localhost
/* ------------------------------- */
const enc = new TextEncoder();

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function pbkdf2Hash(password, saltBytes, iterations = 120000) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  return new Uint8Array(bits);
}

async function createPasswordRecord(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16)); // 128-bit salt
  const hash = await pbkdf2Hash(password, salt);

  return {
    salt: bytesToBase64(salt),
    hash: bytesToBase64(hash),
    algo: "PBKDF2-SHA256",
    iterations: 120000,
  };
}

// (not used in signup, but handy if you want later)
async function verifyPassword(password, record) {
  if (!record?.salt || !record?.hash) return false;
  const saltBytes = base64ToBytes(record.salt);
  const hashBytes = await pbkdf2Hash(password, saltBytes, record.iterations || 120000);
  return bytesToBase64(hashBytes) === record.hash;
}

function CalendarPicker({ valueISO, onChangeISO, disabled, error }) {
  const todayISO = new Date().toISOString().slice(0, 10);
  const today = new Date();
  const currentYear = today.getFullYear();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState("day"); // "day" | "year" | "month"

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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 10 }}>
        {months.map((m) => {
          const dt = new Date(viewY, m - 1, 1);
          const label = dt.toLocaleDateString(undefined, { month: "short" });
          const isFutureMonth = viewY > currentYear || (viewY === currentYear && m > today.getMonth() + 1);

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
    <div className="sign-up-form-group">
      <div className="sign-up-input-with-icon" style={{ position: "relative" }} onBlur={onBlurWrapper} ref={wrapperRef}>
        <input
          type="text"
          name="dob_display"
          className={`sign-up-form-input ${error ? "error" : ""}`}
          placeholder=" "
          value={valueISO ? prettyDateFromISO(valueISO) : ""}
          readOnly
          disabled={disabled}
          onClick={() => !disabled && setOpen((v) => !v)}
          onFocus={() => !disabled && setOpen(true)}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        />
        <span className="sign-up-floating-label">Date Of Birth *</span>
        <FaCalendarAlt className="sign-up-input-icon" />

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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                  if (view === "month") setViewY((y) => Math.min(currentYear, y + 1));
                  if (view === "year") setViewY((y) => Math.min(currentYear, y + 12));
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
                        background: isSelected ? "rgba(0,0,0,0.06)" : "transparent",
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

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                  {days.map((d, idx) => {
                    const iso = d ? isoFromParts(viewY, viewM, d) : null;
                    const isFuture = iso ? iso > todayISO : false;

                    const isSelected =
                      !!selected && d && selected[0] === viewY && selected[1] === viewM && selected[2] === d;

                    return (
                      <button
                        key={`${idx}-${d ?? "x"}`}
                        type="button"
                        onClick={() => selectDay(d)}
                        disabled={!d || isFuture}
                        style={{
                          height: 38,
                          borderRadius: 999,
                          border: isSelected ? "2px solid rgba(0,0,0,0.55)" : "1px solid transparent",
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

      {error && <div className="sign-up-error-message">{error}</div>}
    </div>
  );
}

const SignupPage = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phoneCode: "+1",
    phone: "",
    timeZone: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Load draft signup data (optional)
  useEffect(() => {
    const draft = loadJSON(STORAGE_KEYS.SIGNUP_DRAFT, null);
    if (draft && typeof draft === "object") {
      setFormData((prev) => ({ ...prev, ...draft }));
    }
  }, []);

  // ✅ Save draft while typing (NO password / confirm / OTP)
  useEffect(() => {
    const safeDraft = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      gender: formData.gender,
      email: formData.email,
      phoneCode: formData.phoneCode,
      phone: formData.phone,
      timeZone: formData.timeZone,
    };
    saveJSON(STORAGE_KEYS.SIGNUP_DRAFT, safeDraft);
  }, [
    formData.firstName,
    formData.lastName,
    formData.dob,
    formData.gender,
    formData.email,
    formData.phoneCode,
    formData.phone,
    formData.timeZone,
  ]);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email)) newErrors.email = "Please enter a valid email address";

    if (formData.phone.trim()) {
      const us10 = normalizeToUS10Digits(formData.phone.trim());
      if (!us10 || !isValidUSPhoneDigits(us10)) newErrors.phone = "Enter a valid US phone number";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length) toast.error("Please fix the highlighted fields.");
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = "Password is required";
    else if (!isStrongEnoughPassword(formData.password))
      newErrors.password = "Use 8+ chars with at least 1 letter and 1 number";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) toast.error("Please fix the highlighted fields.");
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.verificationCode.trim()) newErrors.verificationCode = "Verification code is required";
    else if (!isValidOTP(formData.verificationCode.trim())) newErrors.verificationCode = "Enter the 6-digit code";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) toast.error("Please enter a valid 6-digit code.");
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "phone") return { ...prev, phone: formatPhone(value) };
      if (name === "verificationCode") return { ...prev, verificationCode: value.replace(/\D/g, "").slice(0, 6) };
      return { ...prev, [name]: value };
    });

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (message.text) setMessage({ type: "", text: "" });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!validateStep1()) return;
      setIsLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 700));
        setStep(2);
      } catch {
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (step === 2) {
      if (!validateStep2()) return;
      setIsLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 700));
        setStep(3);
        toast.info("We sent a 6-digit verification code to your email.", { position: "top-right", autoClose: 2000 });
      } catch {
        setMessage({ type: "error", text: "Unable to continue. Please try again." });
        toast.error("Unable to continue. Please try again.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (step === 3) {
      if (!validateStep3()) return;
      setIsLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 900));

        // ✅ Create hashed password record (NOT plaintext)
        const passwordRecord = await createPasswordRecord(formData.password);

        const newUser = {
          id: "signup-123",
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          dob: formData.dob,
          gender: formData.gender,
          email: formData.email.trim(),
          phone: formData.phone.trim() ? `🇺🇸 +1 ${formData.phone.trim()}` : "",
          timeZone: formData.timeZone,
          passwordRecord, // ✅ save hash+salt only
          createdAt: new Date().toISOString(),
        };

        // ✅ SAVE JSON LOCALLY
        saveJSON(STORAGE_KEYS.USER, newUser);

        // optional: clear draft once completed
        localStorage.removeItem(STORAGE_KEYS.SIGNUP_DRAFT);

        if (onSignupSuccess) onSignupSuccess(newUser);

        toast.success("Account verified! Redirecting...", { position: "top-right", autoClose: 3000 });
        setTimeout(() => navigate("/dashboard", { replace: true }), 3000);
      } catch (err) {
        setMessage({ type: "error", text: "Invalid code. Please try again." });
        toast.error(err?.message || "Invalid code. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      toast.success("A new verification code has been sent.", { position: "top-right", autoClose: 1600 });
    } catch {
      toast.error("Could not resend code. Try again.", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNeedHelp = () =>
    toast.info("Check your spam/junk folder. If still missing, try Resend code.", { position: "top-right", autoClose: 2200 });

  const StepIndicator = () => (
    <div className="sign-up-step-indicator">
      {[1, 2, 3].map((n) => (
        <div key={n} className={`sign-up-step-indicator-bar ${n <= step ? "active" : ""}`} />
      ))}
    </div>
  );

  const renderHeader = () => {
    if (step === 1) {
      return (
        <div className="sign-up-form-header">
          <div className="sign-up-form-header-row">
            <button
              type="button"
              className="sign-up-mobile-back-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              disabled={isLoading}
            >
              <FaArrowLeft />
            </button>
            <h2>Create your account</h2>
          </div>
          <p>Please tell us a bit about yourself.</p>
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="sign-up-form-header">
          <h2>Create a password</h2>
          <p>Use 8+ characters with at least 1 letter and 1 number.</p>
        </div>
      );
    }
    return (
      <div className="sign-up-form-header">
        <h2>Verify your account</h2>
        <p>Enter the 6-digit code sent to {formData.email || "your email"}.</p>
      </div>
    );
  };

  return (
    <div className="sign-up-page-wrapper">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <main className="sign-up-page">
        <div className="sign-up-container">
          {step === 1 && (
            <button className="sign-up-back-button" onClick={() => navigate(-1)} aria-label="Go back" disabled={isLoading}>
              <FaArrowLeft />
              <span></span>
            </button>
          )}

          <StepIndicator />

          {message.text && (
            <div className="sign-up-message-container">
              <div className={`sign-up-message ${message.type}`}>
                {message.type === "success" ? (
                  <FaCheckCircle className="sign-up-message-icon" />
                ) : (
                  <FaExclamationCircle className="sign-up-message-icon" />
                )}
                <span>{message.text}</span>
              </div>
            </div>
          )}

          {renderHeader()}

          <form className="sign-up-form" onSubmit={handleNext}>
            {step === 1 && (
              <>
                <div className="sign-up-form-group">
                  <div className="sign-up-input-with-icon">
                    <input
                      type="text"
                      name="firstName"
                      className={`sign-up-form-input ${errors.firstName ? "error" : ""}`}
                      placeholder=" "
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span className="sign-up-floating-label">First name *</span>
                    <FaUser className="sign-up-input-icon" />
                  </div>
                  {errors.firstName && <div className="sign-up-error-message">{errors.firstName}</div>}
                </div>

                <div className="sign-up-form-group">
                  <div className="sign-up-input-with-icon">
                    <input
                      type="text"
                      name="lastName"
                      className={`sign-up-form-input ${errors.lastName ? "error" : ""}`}
                      placeholder=" "
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span className="sign-up-floating-label">Last name *</span>
                    <FaUser className="sign-up-input-icon" />
                  </div>
                  {errors.lastName && <div className="sign-up-error-message">{errors.lastName}</div>}
                </div>

                <CalendarPicker
                  valueISO={formData.dob}
                  onChangeISO={(iso) => {
                    setFormData((p) => ({ ...p, dob: iso }));
                    if (errors.dob) setErrors((p) => ({ ...p, dob: "" }));
                  }}
                  disabled={isLoading}
                  error={errors.dob}
                />

                <div className="sign-up-form-group">
                  <div className="sign-up-input-with-icon">
                    <select
                      name="gender"
                      className="sign-up-form-input"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={{ appearance: "none" }}
                    >
                      {GENDERS.map((g) => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                    <span className="sign-up-floating-label">Gender</span>
                    <FaVenusMars className="sign-up-input-icon" />
                  </div>
                </div>

                <div className="sign-up-form-group">
                  <div className="sign-up-input-with-icon">
                    <input
                      type="email"
                      name="email"
                      className={`sign-up-form-input ${errors.email ? "error" : ""}`}
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span className="sign-up-floating-label">Email address *</span>
                    <FaEnvelope className="sign-up-input-icon" />
                  </div>
                  {errors.email && <div className="sign-up-error-message">{errors.email}</div>}
                </div>

                <div className="sign-up-form-group">
                  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 10 }}>
                    <div className="sign-up-input-with-icon">
                      <div
                        className="sign-up-form-input"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          paddingLeft: 28,
                          backgroundColor: "var(--input-bg, #fff)",
                          cursor: "default",
                          fontWeight: 500,
                        }}
                      >
                        <img
                          src="https://flagcdn.com/us.svg"
                          alt="United States"
                          style={{ width: 18, height: 14, objectFit: "cover", borderRadius: 2 }}
                        />
                        <span>US +1</span>
                      </div>
                      <span className="sign-up-floating-label">Code</span>
                    </div>

                    <div className="sign-up-input-with-icon">
                      <input
                        type="text"
                        name="phone"
                        className={`sign-up-form-input ${errors.phone ? "error" : ""}`}
                        placeholder=" "
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        inputMode="numeric"
                      />
                      <span className="sign-up-floating-label">Phone Number</span>
                      <FaPhoneAlt className="sign-up-input-icon" />
                    </div>
                  </div>
                  {errors.phone && <div className="sign-up-error-message">{errors.phone}</div>}
                </div>

                <div className="sign-up-form-group">
                  <div className="sign-up-input-with-icon">
                    <select
                      name="timeZone"
                      className="sign-up-form-input"
                      value={formData.timeZone}
                      onChange={handleChange}
                      disabled={isLoading}
                      style={{ appearance: "none" }}
                    >
                      <option value="">Select time zone</option>
                      {TIME_ZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                    <span className="sign-up-floating-label">Time zone</span>
                    <FaGlobe className="sign-up-input-icon" />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="sign-up-form-group">
                  <div className="sign-up-input-with-icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`sign-up-form-input ${errors.password ? "error" : ""}`}
                      placeholder=" "
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span className="sign-up-floating-label">Password *</span>
                    <FaLock className="sign-up-input-icon" />
                    <button
                      type="button"
                      className="sign-up-toggle-password"
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={isLoading}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <div className="sign-up-error-message">{errors.password}</div>}
                </div>

                <div className="sign-up-form-group">
                  <div className="sign-up-input-with-icon">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      className={`sign-up-form-input ${errors.confirmPassword ? "error" : ""}`}
                      placeholder=" "
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <span className="sign-up-floating-label">Confirm password *</span>
                    <FaLock className="sign-up-input-icon" />
                    <button
                      type="button"
                      className="sign-up-toggle-password"
                      onClick={() => setShowConfirm((v) => !v)}
                      disabled={isLoading}
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="sign-up-error-message">{errors.confirmPassword}</div>}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="sign-up-form-group">
                  <div className="sign-up-input-with-icon">
                    <input
                      type="text"
                      name="verificationCode"
                      className={`sign-up-form-input ${errors.verificationCode ? "error" : ""}`}
                      placeholder=" "
                      value={formData.verificationCode}
                      onChange={handleChange}
                      disabled={isLoading}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                    />
                    <span className="sign-up-floating-label">Verification code (6 digits) *</span>
                    <FaShieldAlt className="sign-up-input-icon" />
                  </div>
                  {errors.verificationCode && <div className="sign-up-error-message">{errors.verificationCode}</div>}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 6 }}>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: isLoading ? "not-allowed" : "pointer",
                      color: "var(--primary-color, #383938)",
                      textDecoration: "underline",
                      fontSize: 13,
                    }}
                  >
                    Resend code
                  </button>

                  <button
                    type="button"
                    onClick={handleNeedHelp}
                    disabled={isLoading}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: isLoading ? "not-allowed" : "pointer",
                      color: "var(--primary-color, #383938)",
                      textDecoration: "underline",
                      fontSize: 13,
                    }}
                  >
                    Need help?
                  </button>
                </div>
              </>
            )}

            <Button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="sign-up-spinner"></div>
                  {step === 1 ? "Saving..." : step === 2 ? "Sending code..." : "Verifying..."}
                </>
              ) : (
                <>
                  {step === 3 ? "Verify" : "Next"} <FaArrowRight className="button-icon" />
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
