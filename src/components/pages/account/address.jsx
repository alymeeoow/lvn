import React, { useEffect, useRef, useState } from "react";
import "../../../assets/styles/address.css";
import { FaPlus, FaMapMarkerAlt, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

import Button from "../../ui/button";
import ProfileSidebar from "../../layout/profileSidebar";
import AddAddressModal from "../../modals/addressModal";

const STORAGE_ADDRESSES_KEY = "userAddresses";

const readAddresses = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_ADDRESSES_KEY)) || [];
  } catch {
    return [];
  }
};

const writeAddresses = (list) => {
  localStorage.setItem(STORAGE_ADDRESSES_KEY, JSON.stringify(list));
};

const MyAddresses = () => {
  const toastIdRef = useRef(null);

  const [active, setActive] = useState("addresses");
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    const list = readAddresses();
    if (list.length > 0) {
      const hasDefault = list.some((a) => a.isDefault);
      const next = hasDefault
        ? list
        : list.map((a, idx) => ({ ...a, isDefault: idx === 0 }));

      if (next !== list) writeAddresses(next);
      setAddresses(next);
      return;
    }

    setAddresses(list);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/", { replace: true });
  };

  const openAddModal = () => {
    setEditingAddress(null);
    setOpenModal(true);
  };

  const openEditModal = (addr) => {
    setEditingAddress(addr);
    setOpenModal(true);
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

  const ensureSingleDefault = (list) => {
    if (!list || list.length === 0) return list;
    const hasDefault = list.some((a) => a.isDefault);
    if (!hasDefault) return list.map((a, idx) => ({ ...a, isDefault: idx === 0 }));
    const firstDefaultIndex = list.findIndex((a) => a.isDefault);
    return list.map((a, idx) => ({ ...a, isDefault: idx === firstDefaultIndex }));
  };

  const handleSavedAddress = (payload, mode) => {
    setAddresses((prev) => {
      let next;

      if (mode === "edit") {
        next = prev.map((a) => (a.id === payload.id ? { ...a, ...payload } : a));
        next = ensureSingleDefault(next);
        showToast("success", "Address updated!");
      } else {
        const shouldBeDefault = prev.length === 0;
        next = [...prev, { ...payload, isDefault: shouldBeDefault }];
        next = ensureSingleDefault(next);
        showToast("success", "Address added!");
      }

      writeAddresses(next);
      return next;
    });
  };

  const handleMakeDefault = (id) => {
    setAddresses((prev) => {
      const next = prev.map((a) => ({ ...a, isDefault: a.id === id }));
      writeAddresses(next);
      showToast("success", "Default address updated!");
      return next;
    });
  };

  const handleDelete = async (id) => {
    if (addresses.length <= 1) return;

    const result = await Swal.fire({
      title: "Delete this address?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setAddresses((prev) => {
      let next = prev.filter((a) => a.id !== id);
      if (next.length > 0 && !next.some((a) => a.isDefault)) {
        next = next.map((a, idx) => ({ ...a, isDefault: idx === 0 }));
      }

      writeAddresses(next);
      return next;
    });

    showToast("info", "Address deleted");
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
            <div className="addr-topbar">
              <h1 className="profile-title">My addresses</h1>

              <div className="addr-topbar-actions">
                <Button className="addr-add-btn" onClick={openAddModal} type="button">
                  <span className="addr-add-ico">
                    <FaPlus />
                  </span>
                  Add New Address
                </Button>
              </div>
            </div>

            {addresses.length === 0 ? (
              <div className="addr-empty">
                <div className="addr-empty-icon">
                  <FaMapMarkerAlt />
                </div>

                <h2 className="addr-empty-title">No addresses yet</h2>
                <p className="addr-empty-sub">
                  Add your first address to get started with orders and deliveries.
                </p>

                <Button className="addr-empty-btn" onClick={openAddModal} type="button">
                  <span className="addr-empty-btn-ico">
                    <FaPlus />
                  </span>
                  Add new address
                </Button>
              </div>
            ) : (
              <div className="addr-list">
                {addresses.map((a) => {
                  const onlyOne = addresses.length === 1;

                  return (
                    <div key={a.id} className="addr-item">
                      <div className="addr-item-main">
                        <div className="addr-item-title">
                                                    {a.street}
                          {a.unit ? `, ${a.unit}` : ""}

                          {a.isDefault && <span className="addr-default-tag">Default</span>}
                        </div>

                        <div className="addr-item-sub">
                          {a.city}, {a.state} {a.zip} — {a.country}
                        </div>

                                                {!a.isDefault && !onlyOne && (
                          <button
                            type="button"
                            className="addr-set-default-btn"
                            onClick={() => handleMakeDefault(a.id)}
                          >
                            Set as default
                          </button>
                        )}
                      </div>

                      <div className="addr-item-actions">
                        <button
                          className="addr-action-btn"
                          type="button"
                          onClick={() => openEditModal(a)}
                          aria-label="Edit address"
                          title="Edit"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>

                                                {!onlyOne && (
                          <button
                            className="addr-action-btn danger"
                            type="button"
                            onClick={() => handleDelete(a.id)}
                            aria-label="Delete address"
                            title="Delete"
                          >
                            <FaTrash />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <AddAddressModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSave={handleSavedAddress}
            editingAddress={editingAddress}
          />
        </section>
      </div>
    </div>
  );
};

export default MyAddresses;
