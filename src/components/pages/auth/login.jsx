
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/login.css";
import Button from "../../ui/button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";


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
    { name: "PBKDF2", salt: saltBytes, iterations, hash: "SHA-256" },
    keyMaterial,
    256
  );

  return new Uint8Array(bits);
}

async function verifyPassword(password, record) {
  if (!record?.salt || !record?.hash) return false;
  const saltBytes = base64ToBytes(record.salt);
  const derived = await pbkdf2Hash(password, saltBytes, record.iterations || 120000);
  return bytesToBase64(derived) === record.hash;
}

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBackClick = () => navigate(-1);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      toast.error("Please fix the highlighted fields.", {
        position: "top-right",
        autoClose: 2500,
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const storedUserRaw = localStorage.getItem("user");
      const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

      if (!storedUser) {
        toast.error("No account found. Please sign up first.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      if ((storedUser.email || "").toLowerCase() !== formData.email.trim().toLowerCase()) {
        toast.error("Account not found with this email.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const record = storedUser.passwordRecord;
      if (!record) {
        toast.error("This account has no password record. Please sign up again.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      if (!window.crypto?.subtle) {
        toast.error("Secure login is not supported in this browser. Please use a modern browser.", {
          position: "top-right",
          autoClose: 3500,
        });
        return;
      }

      const ok = await verifyPassword(formData.password, record);
      if (!ok) {
        toast.error("Incorrect password.", { position: "top-right", autoClose: 2500 });
        return;
      }
      const { passwordRecord, ...safeUser } = storedUser;

      const loggedInUser = {
        ...safeUser,
        token: "mock-jwt-token",
        lastLoginAt: new Date().toISOString(),
      };
      if (formData.rememberMe) {
        localStorage.setItem("authUser", JSON.stringify(loggedInUser));
        sessionStorage.removeItem("authUser");
      } else {
        sessionStorage.setItem("authUser", JSON.stringify(loggedInUser));
        localStorage.removeItem("authUser");
      }
      window.dispatchEvent(new Event("auth:changed"));

      if (onLoginSuccess) onLoginSuccess(loggedInUser);

      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      toast.error(error?.message || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="login-page-wrapper">
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

      <main className="login-page">
        <div className="login-container">
                    <button
            className="login-back-button"
            onClick={handleBackClick}
            aria-label="Go back"
            disabled={isLoading}
          >
            <FaArrowLeft />
            <span></span>
          </button>

                    <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your account</p>
          </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
              <div className="input-with-icon">
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="email"
                />
                <span className="floating-label">Email Address</span>
                <FaEnvelope className="input-icon" />
              </div>
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

                        <div className="form-group">
              <div className="input-with-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <span className="floating-label">Password</span>
                <FaLock className="input-icon" />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

                        <div className="form-options">
              <label className="remember-checkbox">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                </div>
                <span>Remember me</span>
              </label>

              <a
                href="/forgot-password"
                className="forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Forgot password is not wired yet.", {
                    position: "top-right",
                    autoClose: 2000,
                  });
                }}
              >
                Forgot password?
              </a>
            </div>

                        <Button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <FaArrowRight className="button-icon" />
                </>
              )}
            </Button>
          </form>

                    <div className="divider"></div>

                    <div className="signup-link">
            Don&apos;t have an account?
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Create account
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
