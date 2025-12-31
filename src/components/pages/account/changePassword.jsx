import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Button from "../../ui/button";
import ProfileSidebar from "../../layout/profileSidebar";

import "react-toastify/dist/ReactToastify.css";
import "../../../assets/styles/changePass.css";

/* ------------------------------- */
/* ✅ Same password hashing helpers as Signup (PBKDF2 + SHA-256)
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
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2Hash(password, salt);

  return {
    salt: bytesToBase64(salt),
    hash: bytesToBase64(hash),
    algo: "PBKDF2-SHA256",
    iterations: 120000,
  };
}

async function verifyPassword(password, record) {
  if (!record?.salt || !record?.hash) return false;
  const saltBytes = base64ToBytes(record.salt);
  const hashBytes = await pbkdf2Hash(password, saltBytes, record.iterations || 120000);
  return bytesToBase64(hashBytes) === record.hash;
}

/* ------------------------------- */
/* ✅ Local storage helpers (same style)
/* ------------------------------- */
const STORAGE_KEYS = {
  USER: "user",
  AUTH_USER: "authUser",
};

function safeJSONParse(str, fallback) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

function loadJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  return safeJSONParse(raw, fallback);
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const ChangePassword = () => {
  const toastIdRef = useRef(null);
  const navigate = useNavigate();

  const [active, setActive] = useState("password");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isFormValid = useMemo(() => {
    return (
      currentPassword.trim() &&
      newPassword.trim() &&
      confirmPassword.trim() &&
      newPassword.length >= 8 &&
      newPassword === confirmPassword
    );
  }, [currentPassword, newPassword, confirmPassword]);

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/", { replace: true });
  };

  const showToast = (type, message) => {
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        render: message,
        type,
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    toastIdRef.current = toast(message, {
      type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      draggable: true,
      pauseOnHover: true,
      theme: "light",
      onClose: () => {
        toastIdRef.current = null;
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("warning", "Please fill in all fields.");
      return;
    }
    if (newPassword.length < 8) {
      showToast("warning", "New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("error", "New passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const user = loadJSON(STORAGE_KEYS.USER, null);
      if (!user) {
        showToast("error", "No user found. Please sign up / log in again.");
        return;
      }
      const ok = await verifyPassword(currentPassword, user.passwordRecord);
      if (!ok) {
        showToast("error", "Current password is incorrect.");
        return;
      }
      const sameAsOld = await verifyPassword(newPassword, user.passwordRecord);
      if (sameAsOld) {
        showToast("warning", "New password must be different from the current password.");
        return;
      }
      const newRecord = await createPasswordRecord(newPassword);

      const updatedUser = {
        ...user,
        passwordRecord: newRecord,
        updatedAt: new Date().toISOString(),
      };

      saveJSON(STORAGE_KEYS.USER, updatedUser);
      const authUserLocal = safeJSONParse(localStorage.getItem(STORAGE_KEYS.AUTH_USER) || "", null);
      if (authUserLocal && authUserLocal.id === updatedUser.id) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify({ ...authUserLocal, ...updatedUser }));
      }
      const authUserSession = safeJSONParse(sessionStorage.getItem(STORAGE_KEYS.AUTH_USER) || "", null);
      if (authUserSession && authUserSession.id === updatedUser.id) {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify({ ...authUserSession, ...updatedUser }));
      }

      window.dispatchEvent(new Event("auth:changed"));

      showToast("success", "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrent(false);
      setShowNew(false);
      setShowConfirm(false);
    } catch (err) {
      showToast("error", err?.message || "Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        limit={1}
        onClose={() => {
          toastIdRef.current = null;
        }}
      />

      <div className="profile-shell">
        <ProfileSidebar active={active} onChange={setActive} onLogout={handleLogout} />

        <section className="profile-content">
          <div className="profile-card">
            <h1 className="profile-title profile-title-full">Change Password</h1>

            <form onSubmit={handleSubmit} className="change-password-form profile-form">
              <div className="profile-field">
                <label>Current Password</label>

                <div className="password-input-wrap">
                  <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-eye"
                    onClick={() => setShowCurrent((v) => !v)}
                    aria-label={showCurrent ? "Hide current password" : "Show current password"}
                  >
                    {showCurrent ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="profile-field">
                <label>New Password</label>

                <div className="password-input-wrap">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-eye"
                    onClick={() => setShowNew((v) => !v)}
                    aria-label={showNew ? "Hide new password" : "Show new password"}
                  >
                    {showNew ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="profile-field">
                <label>Confirm New Password</label>

                <div className="password-input-wrap">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="password-eye"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                  <div className="password-tip">
    Tip: Password should be at least <b>8 characters</b> and include at least <b>1 number</b>.
  </div>
              </div>

              <div className="profile-actions">
                <Button
                  type="submit"
                  className="change-password-btn profile-save"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
