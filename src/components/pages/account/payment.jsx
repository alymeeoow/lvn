import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaCreditCard, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

import Button from "../../ui/button";
import ProfileSidebar from "../../layout/profileSidebar";
import AddCardModal from "../../modals/addPaymentModal";

const STORAGE_CARDS_KEY = "userPaymentCards";

const readCards = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_CARDS_KEY)) || [];
  } catch {
    return [];
  }
};

const writeCards = (list) => {
  localStorage.setItem(STORAGE_CARDS_KEY, JSON.stringify(list));
};

const PaymentOptions = () => {
  const toastIdRef = useRef(null);

  const [active, setActive] = useState("payment");
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    const list = readCards();
    if (list.length > 0) {
      const hasDefault = list.some((c) => c.isDefault);
      const next = hasDefault ? list : list.map((c, idx) => ({ ...c, isDefault: idx === 0 }));
      if (!hasDefault) writeCards(next);

      setCards(next);
      return;
    }

    setCards(list);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    localStorage.removeItem("authUser");
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/", { replace: true });
  };

  const openAddModal = () => {
    setEditingCard(null);
    setOpenModal(true);
  };

  const openEditModal = (card) => {
    setEditingCard(card);
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

    const hasDefault = list.some((c) => c.isDefault);
    if (!hasDefault) return list.map((c, idx) => ({ ...c, isDefault: idx === 0 }));

    const firstDefaultIndex = list.findIndex((c) => c.isDefault);
    return list.map((c, idx) => ({ ...c, isDefault: idx === firstDefaultIndex }));
  };

  const handleSavedCard = (payload, mode) => {
    setCards((prev) => {
      let next;

      if (mode === "edit") {
        next = prev.map((c) => (c.id === payload.id ? { ...c, ...payload } : c));
        next = ensureSingleDefault(next);
        showToast("success", "Card updated!");
      } else {
        const shouldBeDefault = prev.length === 0;
        next = [...prev, { ...payload, isDefault: shouldBeDefault }];
        next = ensureSingleDefault(next);
        showToast("success", "Card added!");
      }

      writeCards(next);
      return next;
    });
  };

  const handleMakeDefault = (id) => {
    setCards((prev) => {
      const next = prev.map((c) => ({ ...c, isDefault: c.id === id }));
      writeCards(next);
      showToast("success", "Default card updated!");
      return next;
    });
  };

  const handleDelete = async (id) => {
    if (cards.length <= 1) return;

    const result = await Swal.fire({
      title: "Delete this card?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setCards((prev) => {
      let next = prev.filter((c) => c.id !== id);
      if (next.length > 0 && !next.some((c) => c.isDefault)) {
        next = next.map((c, idx) => ({ ...c, isDefault: idx === 0 }));
      }

      writeCards(next);
      return next;
    });

    showToast("info", "Card deleted");
  };
  const getBrandLabel = (brand) => {
    if (!brand) return "Card";
    return brand.toUpperCase();
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
              <h1 className="profile-title">Payment options</h1>

              <div className="addr-topbar-actions">
                <Button className="addr-add-btn" onClick={openAddModal} type="button">
                  <span className="addr-add-ico">
                    <FaPlus />
                  </span>
                  Add New Card
                </Button>
              </div>
            </div>

            {cards.length === 0 ? (
              <div className="addr-empty">
                <div className="addr-empty-icon">
                  <FaCreditCard />
                </div>

                <h2 className="addr-empty-title">No cards yet</h2>
                <p className="addr-empty-sub">
                  Add a card to make checkout faster and easier.
                </p>

                <Button className="addr-empty-btn" onClick={openAddModal} type="button">
                  <span className="addr-empty-btn-ico">
                    <FaPlus />
                  </span>
                  Add new card
                </Button>
              </div>
            ) : (
              <div className="addr-list">
                {cards.map((c) => {
                  const onlyOne = cards.length === 1;

                  return (
                    <div key={c.id} className="addr-item">
                      <div className="addr-item-main">
                        <div className="addr-item-title">
                                                    {getBrandLabel(c.brand)} <span style={{ opacity: 0.6 }}>••••</span>{" "}
                          {c.last4 || "----"}
                          {c.isDefault && <span className="addr-default-tag">Default</span>}
                        </div>

                        <div className="addr-item-sub">
                          {c.holderName ? `${c.holderName} — ` : ""}
                          Expires {c.expMonth || "--"}/{c.expYear || "----"}
                        </div>

                        {!c.isDefault && !onlyOne && (
                          <button
                            type="button"
                            className="addr-set-default-btn"
                            onClick={() => handleMakeDefault(c.id)}
                          >
                            Set as default
                          </button>
                        )}
                      </div>

                      <div className="addr-item-actions">
                        <button
                          className="addr-action-btn"
                          type="button"
                          onClick={() => openEditModal(c)}
                          aria-label="Edit card"
                          title="Edit"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>

                        {!onlyOne && (
                          <button
                            className="addr-action-btn danger"
                            type="button"
                            onClick={() => handleDelete(c.id)}
                            aria-label="Delete card"
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

          <AddCardModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSave={handleSavedCard}
            editingCard={editingCard}
          />
        </section>
      </div>
    </div>
  );
};

export default PaymentOptions;
