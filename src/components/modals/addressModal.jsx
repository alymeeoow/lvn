import React, { useEffect, useMemo, useState } from "react";
import "../../assets/styles/addressModal.css";
import { FaSearch, FaTimes } from "react-icons/fa";
import Button from "../ui/button";
import { toast } from "react-toastify";

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

const DEFAULT_ZIP_BY_STATE = {
  AL: "35004",
  AK: "99501",
  AZ: "85001",
  AR: "72201",
  CA: "90001",
  CO: "80014",
  CT: "06103",
  DE: "19702",
  FL: "33101",
  GA: "30301",
  HI: "96813",
  ID: "83702",
  IL: "60601",
  IN: "46201",
  IA: "50301",
  KS: "66101",
  KY: "40202",
  LA: "70112",
  ME: "04101",
  MD: "21201",
  MA: "02108",
  MI: "48201",
  MN: "55401",
  MS: "39201",
  MO: "63101",
  MT: "59101",
  NE: "68102",
  NV: "89101",
  NH: "03101",
  NJ: "07102",
  NM: "87101",
  NY: "10001",
  NC: "28202",
  ND: "58102",
  OH: "44101",
  OK: "73102",
  OR: "97201",
  PA: "19102",
  RI: "02903",
  SC: "29201",
  SD: "57104",
  TN: "37201",
  TX: "75201",
  UT: "84101",
  VT: "05401",
  VA: "23219",
  WA: "98101",
  WV: "25301",
  WI: "53202",
  WY: "82001",
};

const emptyForm = {
  street: "",
  unit: "",
  country: "USA",
  state: "",
  city: "",
  zip: "",
};

const AddAddressModal = ({ open, onClose, onSave, editingAddress }) => {
  const [form, setForm] = useState(emptyForm);
  const isEdit = !!editingAddress;

  const stateNameByCode = useMemo(() => {
    const map = {};
    US_STATES.forEach((s) => (map[s.code] = s.name));
    return map;
  }, []);

  const baseline = useMemo(() => {
    if (!isEdit || !editingAddress) return emptyForm;

    const incomingState = editingAddress.state || "";
    const codeFromName =
      US_STATES.find((s) => s.name === incomingState)?.code || incomingState;

    return {
      street: (editingAddress.street || "").trim(),
      unit: (editingAddress.unit || "").trim(),
      country: "USA",
      state: (codeFromName || "").trim(),
      city: (editingAddress.city || "").trim(),
      zip: (editingAddress.zip || "").trim(),
    };
  }, [isEdit, editingAddress]);

  const hasAnyInput = useMemo(() => {
    return (
      form.street.trim() ||
      form.unit.trim() ||
      form.city.trim() ||
      form.state.trim() ||
      form.zip.trim()
    );
  }, [form]);

  const isDirty = useMemo(() => {
    if (!isEdit) return !!hasAnyInput;

    return (
      form.street.trim() !== baseline.street ||
      form.unit.trim() !== baseline.unit ||
      form.city.trim() !== baseline.city ||
      (form.state || "") !== (baseline.state || "") ||
      (form.zip || "") !== (baseline.zip || "")
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

    if (editingAddress) {
      const incomingState = editingAddress.state || "";
      const codeFromName =
        US_STATES.find((s) => s.name === incomingState)?.code || incomingState;

      setForm({
        street: editingAddress.street || "",
        unit: editingAddress.unit || "",
        country: "USA",
        state: codeFromName || "",
        city: editingAddress.city || "",
        zip: editingAddress.zip || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, editingAddress]);

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
    const { name, value } = e.target;

    if (name === "zip") {
      const cleaned = value.replace(/\D/g, "").slice(0, 10);
      setForm((p) => ({ ...p, zip: cleaned }));
      return;
    }

    if (name === "state") {
      const nextZip = DEFAULT_ZIP_BY_STATE[value] || "";
      setForm((p) => ({
        ...p,
        state: value,
        zip: nextZip || p.zip,
      }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isDirty) return;

    if (!form.street || !form.city || !form.state || !form.zip) {
      toast.warn("Please fill in all required fields.");
      return;
    }

    const stateFullName = stateNameByCode[form.state] || form.state;

    if (isEdit) {
      const payload = {
        ...editingAddress,
        ...form,
        state: stateFullName,
        updatedAt: new Date().toISOString(),
      };
      onSave?.(payload, "edit");
      onClose?.();
      return;
    }

    const payload = {
      id: crypto.randomUUID(),
      ...form,
      state: stateFullName,
      createdAt: new Date().toISOString(),
    };

    onSave?.(payload, "add");
    onClose?.();
  };

  return (
    <div className="addr-modal-backdrop" onPointerDown={handleBackdropPointerDown}>
      <div className="addr-modal" role="dialog" aria-modal="true">
        <div className="addr-modal-head">
          <h2>{isEdit ? "Edit address" : "Add new address"}</h2>
          <button className="addr-modal-close" onClick={onClose} type="button">
            <FaTimes />
          </button>
        </div>

        <p className="addr-modal-sub">You can either search or enter your address.</p>

        <div className="addr-search">
          <FaSearch />
          <input placeholder="Search address" disabled title="Autocomplete coming soon" />
        </div>

        <div className="addr-form">
          <input
            name="street"
            placeholder="Street *"
            value={form.street}
            onChange={handleChange}
          />

          <input
            name="unit"
            placeholder="Unit / Apartment number"
            value={form.unit}
            onChange={handleChange}
          />

          <select disabled>
            <option>USA</option>
          </select>

          <select name="state" value={form.state} onChange={handleChange}>
            <option value="">State *</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>

          <input name="city" placeholder="City *" value={form.city} onChange={handleChange} />

          <input
            name="zip"
            placeholder="ZIP code *"
            value={form.zip}
            onChange={handleChange}
            inputMode="numeric"
          />
        </div>

        <Button
          className="addr-save-btn"
          onClick={handleSubmit}
          disabled={!isDirty || !form.street || !form.city || !form.state || !form.zip}
          type="button"
        >
          {isEdit ? "Save changes" : "Save and continue"}
        </Button>
      </div>
    </div>
  );
};

export default AddAddressModal;
