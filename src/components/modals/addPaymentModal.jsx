import React, { useEffect, useMemo, useState } from "react";
import "../../assets/styles/addPaymentModal.css";
import { FaTimes, FaCreditCard } from "react-icons/fa";
import Button from "../ui/button";
import { toast } from "react-toastify";

const STORAGE_ADDRESSES_KEY = "userAddresses";

const emptyForm = {
  holderName: "",
  brand: "visa",
  cardNumber: "",
  exp: "",
  cvc: "",
  billingEnabled: false,
  useDefaultBilling: false,
  billingStreet: "",
  billingUnit: "",
  billingCity: "",
  billingState: "",
  billingZip: "",
  billingCountry: "USA",
};

const readAddresses = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_ADDRESSES_KEY)) || [];
  } catch {
    return [];
  }
};

const maskLast4 = (num) => {
  const digits = (num || "").replace(/\D/g, "");
  return digits.slice(-4);
};

const detectCardBrand = (digits) => {
  const n = (digits || "").replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2(2[2-9]|[3-6]|7[01]))/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^(6011|65|64[4-9])/.test(n)) return "discover";
  return "other";
};

const maxLenByBrand = (brand) => (brand === "amex" ? 15 : 16);
const cvcMaxLen = 4;

const formatCardNumber = (digits, brand) => {
  const d = (digits || "").replace(/\D/g, "");
  if (brand === "amex") {
    const p1 = d.slice(0, 4);
    const p2 = d.slice(4, 10);
    const p3 = d.slice(10, 15);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }
  return d.replace(/(.{4})/g, "$1 ").trim();
};

const formatExp = (value) => {
  const digits = (value || "").replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
};

const parseExp = (exp) => {
  const digits = (exp || "").replace(/\D/g, "").slice(0, 4);
  return { mm: digits.slice(0, 2), yy: digits.slice(2, 4) };
};

const isValidMonth = (mm) => {
  if (!mm || mm.length !== 2) return false;
  const n = Number(mm);
  return n >= 1 && n <= 12;
};

const normalizeDefaultAddressToBilling = (addr) => {
  if (!addr) return null;
  return {
    billingStreet: addr.street || "",
    billingUnit: addr.unit || "",
    billingCity: addr.city || "",
    billingState: addr.state || "",
    billingZip: addr.zip || "",
    billingCountry: addr.country || "USA",
  };
};

const AddCardModal = ({ open, onClose, onSave, editingCard }) => {
  const [form, setForm] = useState(emptyForm);
  const isEdit = !!editingCard;

  const defaultAddress = useMemo(() => {
    const list = readAddresses();
    return list.find((a) => a.isDefault) || list[0] || null;
  }, [open]);

  const baseline = useMemo(() => {
    if (!isEdit || !editingCard) return emptyForm;

    const billing = editingCard.billingAddress || null;
    const mm = String(editingCard.expMonth || "").padStart(2, "0");
    const yyFull = String(editingCard.expYear || "");
    const yy = yyFull ? yyFull.slice(-2) : "";

    return {
      ...emptyForm,
      holderName: (editingCard.holderName || "").trim(),
      brand: (editingCard.brand || "visa").trim(),
      cardNumber: "",
      cvc: "",
      exp: mm && yy ? `${mm}/${yy}` : "",
      billingEnabled: !!billing,
      useDefaultBilling: false,
      billingStreet: billing?.street || "",
      billingUnit: billing?.unit || "",
      billingCity: billing?.city || "",
      billingState: billing?.state || "",
      billingZip: billing?.zip || "",
      billingCountry: billing?.country || "USA",
    };
  }, [isEdit, editingCard]);

  const hasAnyInput = useMemo(() => {
    return (
      form.holderName.trim() ||
      form.cardNumber.trim() ||
      form.exp.trim() ||
      form.cvc.trim() ||
      form.billingStreet.trim() ||
      form.billingCity.trim() ||
      form.billingState.trim() ||
      form.billingZip.trim()
    );
  }, [form]);

  const isDirty = useMemo(() => {
    if (!isEdit) return !!hasAnyInput;

    return (
      form.holderName.trim() !== baseline.holderName ||
      form.cardNumber.trim() !== baseline.cardNumber ||
      form.exp.trim() !== baseline.exp ||
      form.cvc.trim() !== baseline.cvc ||
      form.billingEnabled !== baseline.billingEnabled ||
      form.useDefaultBilling !== baseline.useDefaultBilling ||
      form.billingStreet.trim() !== baseline.billingStreet ||
      form.billingUnit.trim() !== baseline.billingUnit ||
      form.billingCity.trim() !== baseline.billingCity ||
      form.billingState.trim() !== baseline.billingState ||
      form.billingZip.trim() !== baseline.billingZip
    );
  }, [isEdit, form, baseline, hasAnyInput]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (editingCard) {
      setForm({ ...baseline });
      return;
    }

    setForm({
      ...emptyForm,
      billingEnabled: false,
      useDefaultBilling: false,
    });
  }, [open, editingCard, baseline]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropPointerDown = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "useDefaultBilling") {
      if (checked) {
        if (!defaultAddress) {
          toast.warn("No default address found. Please add an address first.");
          return;
        }
        const mapped = normalizeDefaultAddressToBilling(defaultAddress);

        setForm((p) => ({
          ...p,
          billingEnabled: true,
          useDefaultBilling: true,
          ...mapped,
        }));
      } else {
        setForm((p) => ({ ...p, useDefaultBilling: false }));
      }
      return;
    }

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "");
      const detectedBrand = detectCardBrand(digits);
      const maxLen = maxLenByBrand(detectedBrand);
      const trimmed = digits.slice(0, maxLen);

      setForm((p) => ({
        ...p,
        cardNumber: trimmed,
        brand: detectedBrand,
      }));
      return;
    }

    if (name === "exp") {
      setForm((p) => ({ ...p, exp: formatExp(value) }));
      return;
    }

    if (name === "cvc") {
      const cleaned = value.replace(/\D/g, "").slice(0, cvcMaxLen);
      setForm((p) => ({ ...p, cvc: cleaned }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleAddNewBilling = () => {
    setForm((p) => ({
      ...p,
      billingEnabled: true,
      useDefaultBilling: false,
      billingStreet: "",
      billingUnit: "",
      billingCity: "",
      billingState: "",
      billingZip: "",
      billingCountry: "USA",
    }));
  };

  const handleSubmit = () => {
    if (!isDirty) return;

    if (!form.holderName || !form.exp) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    const { mm, yy } = parseExp(form.exp);

    if (!mm || !yy || mm.length !== 2 || yy.length !== 2) {
      toast.warn("Expiration must be in MM/YY format.");
      return;
    }

    if (!isValidMonth(mm)) {
      toast.warn("Expiration month must be between 01 and 12.");
      return;
    }

    if (!isEdit) {
      const minLen = form.brand === "amex" ? 15 : 12;
      if (!form.cardNumber || form.cardNumber.length < minLen) {
        toast.warn("Please enter a valid card number.");
        return;
      }
      if (!form.cvc || form.cvc.length < 3) {
        toast.warn("Please enter a valid CVC.");
        return;
      }
    } else {
      if (!form.cvc || form.cvc.length < 3) {
        toast.warn("Please enter your CVC to save changes.");
        return;
      }
    }

    let billingAddress = null;

    if (form.billingEnabled) {
      if (
        form.useDefaultBilling &&
        (!form.billingStreet ||
          !form.billingCity ||
          !form.billingState ||
          !form.billingZip)
      ) {
        if (!defaultAddress) {
          toast.warn("No default address found. Please add an address first.");
          return;
        }
        const mapped = normalizeDefaultAddressToBilling(defaultAddress);
        setForm((p) => ({ ...p, ...mapped }));
      }

      if (!form.billingStreet || !form.billingCity || !form.billingState || !form.billingZip) {
        toast.warn("Please complete the billing address fields.");
        return;
      }

      billingAddress = {
        street: form.billingStreet.trim(),
        unit: form.billingUnit.trim(),
        city: form.billingCity.trim(),
        state: form.billingState.trim(),
        zip: form.billingZip.trim(),
        country: (form.billingCountry || "USA").trim(),
      };
    }

    const expMonth = mm;
    const expYear = `20${yy}`;

    if (isEdit) {
      onSave?.(
        {
          ...editingCard,
          holderName: form.holderName.trim(),
          brand: form.brand,
          expMonth,
          expYear,
          billingAddress,
          updatedAt: new Date().toISOString(),
        },
        "edit"
      );
      onClose?.();
      return;
    }

    onSave?.(
      {
        id: crypto.randomUUID(),
        holderName: form.holderName.trim(),
        brand: form.brand,
        last4: maskLast4(form.cardNumber),
        expMonth,
        expYear,
        billingAddress,
        createdAt: new Date().toISOString(),
      },
      "add"
    );

    onClose?.();
  };

  const billingInputsDisabled = form.useDefaultBilling;

  return (
    <div className="card-modal-backdrop" onPointerDown={handleBackdropPointerDown}>
      <div className="card-modal" role="dialog" aria-modal="true">
        <div className="card-modal-head">
          <h2>{isEdit ? "Edit card" : "Add new card"}</h2>
          <button className="card-modal-close" onClick={onClose} type="button">
            <FaTimes />
          </button>
        </div>

        <p className="card-modal-sub">Add your payment details.</p>

        <div className="card-form">
          <div className="card-form-row">
            <FaCreditCard className="card-form-ico" />
            <select value={form.brand} disabled>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="amex">Amex</option>
              <option value="discover">Discover</option>
              <option value="other">Other</option>
            </select>
          </div>

          <input
            name="holderName"
            placeholder="Cardholder name *"
            value={form.holderName}
            onChange={handleChange}
            autoComplete="cc-name"
          />

          {!isEdit && (
            <input
              name="cardNumber"
              placeholder="Card number *"
              value={formatCardNumber(form.cardNumber, form.brand)}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="cc-number"
            />
          )}

          <div className="card-form-grid">
            <input
              name="exp"
              placeholder="MM/YY *"
              value={form.exp}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="cc-exp"
            />

            <input
              name="cvc"
              placeholder="CVC *"
              value={form.cvc}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>

          <div className="card-billing">
            <div className="card-billing-head">
              <h3>Billing address</h3>

              <button
                type="button"
                className="card-billing-toggle"
                onClick={handleAddNewBilling}
              >
                Add new billing address
              </button>
            </div>

            <div className="card-billing-controls">
              <label className="card-billing-check">
                <input
                  type="checkbox"
                  name="useDefaultBilling"
                  checked={form.useDefaultBilling}
                  onChange={handleChange}
                />
                Use my default address
              </label>
            </div>

            {form.billingEnabled && (
              <div className="card-billing-form">
                <input
                  name="billingStreet"
                  placeholder="Street *"
                  value={form.billingStreet}
                  onChange={handleChange}
                  disabled={billingInputsDisabled}
                />

                <input
                  name="billingUnit"
                  placeholder="Unit / Apartment number"
                  value={form.billingUnit}
                  onChange={handleChange}
                  disabled={billingInputsDisabled}
                />

                <div className="card-billing-grid">
                  <input
                    name="billingCity"
                    placeholder="City *"
                    value={form.billingCity}
                    onChange={handleChange}
                    disabled={billingInputsDisabled}
                  />
                  <input
                    name="billingState"
                    placeholder="State *"
                    value={form.billingState}
                    onChange={handleChange}
                    disabled={billingInputsDisabled}
                  />
                  <input
                    name="billingZip"
                    placeholder="ZIP *"
                    value={form.billingZip}
                    onChange={handleChange}
                    inputMode="numeric"
                    disabled={billingInputsDisabled}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          className="card-save-btn"
          onClick={handleSubmit}
          disabled={!isDirty || !form.holderName || !form.exp}
          type="button"
        >
          {isEdit ? "Save changes" : "Save and continue"}
        </Button>
      </div>
    </div>
  );
};

export default AddCardModal;
