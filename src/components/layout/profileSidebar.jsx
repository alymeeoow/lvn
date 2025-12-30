import React from "react";

const ProfileSidebar = ({ active = "profile", onChange, onLogout }) => {
  return (
    <aside className="profile-sidebar">
      <h3 className="profile-sidebar-title">Account</h3>

      <button
        className={`profile-side-item ${active === "profile" ? "active" : ""}`}
        onClick={() => onChange("profile")}
      >
        Profile
      </button>

      <button
        className={`profile-side-item ${active === "addresses" ? "active" : ""}`}
        onClick={() => onChange("addresses")}
      >
        My Addresses
      </button>

      <button
        className={`profile-side-item ${active === "password" ? "active" : ""}`}
        onClick={() => onChange("password")}
      >
        Change password
      </button>

      <button
        className={`profile-side-item ${active === "payment" ? "active" : ""}`}
        onClick={() => onChange("payment")}
      >
        Payment options
      </button>

      {/* ✅ Mobile-only logout */}
      <button
        className="profile-side-item profile-logout-mobile"
        onClick={onLogout}
      >
        Log out
      </button>
    </aside>
  );
};



export default ProfileSidebar;