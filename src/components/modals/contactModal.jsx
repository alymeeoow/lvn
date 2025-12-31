import React, { useEffect, useMemo, useState } from "react";
import "../../assets/styles/contactModal.css";
import { FaTimes } from "react-icons/fa";
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import Button from "../ui/button";
import { toast } from "react-toastify";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "", 
  topic: "General Question",
  message: "",
  preferredContact: "Email",
};

const TOPICS = [
  "General Question",
  "Orders & Shipping",
  "Billing & Payments",
  "Account Help",
  "Side Effects / Safety",
  "Technical Issue",
];

function formatUSPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 10);

  if (digits.length <= 3) return p1;
  if (digits.length <= 6) return `${p1}-${p2}`;
  return `${p1}-${p2}-${p3}`;
}

function hasAnyPhoneDigits(value) {
  return value.replace(/\D/g, "").length > 0;
}

const ContactModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState(emptyForm);

  const isValidEmail = useMemo(() => {
    if (!form.email.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  }, [form.email]);

  const isValid = useMemo(() => {
    if (!form.fullName.trim()) return false;
    if (!isValidEmail) return false;
    if (!form.message.trim()) return false;

    if (form.preferredContact === "Phone" && !hasAnyPhoneDigits(form.phone)) return false;

    return true;
  }, [form, isValidEmail]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) setForm(emptyForm);
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((p) => ({ ...p, phone: formatUSPhone(value) }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isValid) {
      toast.warn("Please complete the required fields.");
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    const phoneWithCode = phoneDigits ? `+1 ${form.phone}` : "";

    const payload = {
      ...form,
      phone: phoneWithCode,
      createdAt: new Date().toISOString(),
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    };

    onSubmit?.(payload);
    toast.success("Message sent! Support will reach out soon.");
    onClose?.();
  };

  return (
    <div
      className="contact-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <div className="contact-modal-head">
          <h2>Contact Support</h2>

          <button
            className="contact-modal-close"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <p className="contact-modal-sub">
          Send us a message and we’ll get back to you as soon as possible.
        </p>

        <div className="contact-modal-grid">
          <div className="contact-field">
            <label>
              Full name <span>*</span>
            </label>
            <div className="contact-input">
              <FiMessageSquare />
              <input
                name="fullName"
                placeholder="Your name"
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="contact-field">
            <label>
              Email <span>*</span>
            </label>
            <div className="contact-input">
              <FiMail />
              <input
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            {!isValidEmail && form.email.trim().length > 0 && (
              <div className="contact-hint error">Enter a valid email address.</div>
            )}
          </div>

                    <div className="contact-field">
            <label>Phone</label>

            <div className="contact-phone-row">
              <div className="contact-input contact-phone-code" aria-hidden="true">
                <img src="https://flagcdn.com/us.svg" alt="United States" />
                <span>+1</span>
              </div>

              <div className="contact-input contact-phone-input">
                <FiPhone />
                <input
                  name="phone"
                  placeholder="(optional)"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="contact-hint">If you prefer SMS/call, add your number.</div>
          </div>

          <div className="contact-field">
            <label>Topic</label>
            <select name="topic" value={form.topic} onChange={handleChange}>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="contact-field">
            <label>Preferred contact</label>
            <div className="contact-pill-row">
              <button
                type="button"
                className={`contact-pill ${form.preferredContact === "Email" ? "active" : ""}`}
                onClick={() => setForm((p) => ({ ...p, preferredContact: "Email" }))}
              >
                Email
              </button>
              <button
                type="button"
                className={`contact-pill ${form.preferredContact === "Phone" ? "active" : ""}`}
                onClick={() => setForm((p) => ({ ...p, preferredContact: "Phone" }))}
              >
                Phone
              </button>
            </div>

            {form.preferredContact === "Phone" && !hasAnyPhoneDigits(form.phone) && (
              <div className="contact-hint error">
                Phone is required if preferred contact is Phone.
              </div>
            )}
          </div>

          <div className="contact-field full">
            <label>
              Message <span>*</span>
            </label>
            <textarea
              name="message"
              placeholder="Tell us what you need help with..."
              value={form.message}
              onChange={handleChange}
              rows={6}
            />
          </div>
        </div>

        <Button
          className="contact-send-btn"
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default ContactModal;
