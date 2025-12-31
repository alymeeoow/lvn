import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <aside className="profile-sidebar">
      <h3 className="profile-sidebar-title">Account</h3>

      <button
        className="profile-side-item"
        onClick={() => navigate("/profile")}
        type="button"
      >
        Profile
      </button>

      <button
        className="profile-side-item"
        onClick={() => navigate("/addresses")}
        type="button"
      >
        My Addresses
      </button>

      <button
        className="profile-side-item"
        onClick={() => navigate("/changepass")}
        type="button"
      >
        Change password
      </button>

      <button
        className="profile-side-item"
        onClick={() => navigate("/payment")}
        type="button"
      >
        Payment options
      </button>

      <button
        className="profile-side-item profile-logout-mobile"
        onClick={onLogout}
        type="button"
      >
        Log out
      </button>
    </aside>
  );
};

export default ProfileSidebar;
