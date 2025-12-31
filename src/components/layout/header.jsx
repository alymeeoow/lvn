
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiCalendar,
  FiHelpCircle,
  FiShoppingCart,
  FiBell,
  FiUser,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import "../../assets/styles/header.css";
import { useCart } from "../context/cartContext";
import { useNotif } from "../context/notifContext";

import logoImage from "../../assets/images/logo/mLogo.png";
import LoginButton from "../ui/button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, openCart } = useCart();
  const { notifCount, openNotif } = useNotif();


  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";


  const [authUser, setAuthUser] = useState(null);

  const readAuthUser = () => {
    try {
      const raw =
        sessionStorage.getItem("authUser") || localStorage.getItem("authUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    setAuthUser(readAuthUser());

   
    const onStorage = (e) => {
      if (e.key === "authUser") setAuthUser(readAuthUser());
    };
    window.addEventListener("storage", onStorage);


    const onAuthChanged = () => setAuthUser(readAuthUser());
    window.addEventListener("auth:changed", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:changed", onAuthChanged);
    };
  }, []);

  const isLoggedIn = !!authUser;

  const initials = useMemo(() => {
    const first = (authUser?.firstName || "").trim();
    const last = (authUser?.lastName || "").trim();
    const i1 = first ? first[0] : "";
    const i2 = last ? last[0] : "";
    return (`${i1}${i2}`.toUpperCase() || "U");
  }, [authUser]);

  const displayName = useMemo(() => {
    const first = (authUser?.firstName || "").trim();
    const last = (authUser?.lastName || "").trim();
    const full = `${first} ${last}`.trim();
    return full || "User";
  }, [authUser]);

  const navItems = [
    { path: "/", label: "Home", icon: <FiHome /> },
    { path: "/categories", label: "Categories", icon: <FiGrid /> },
    { path: "/bookings", label: "Bookings", icon: <FiCalendar /> },
    { path: "/faq", label: "FAQ", icon: <FiHelpCircle /> },
  ];

  const handleLoginClick = () => navigate("/login");

  const handleLogout = () => {
    sessionStorage.removeItem("authUser");
    localStorage.removeItem("authUser");
    setAuthUser(null);
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/", { replace: true });
  };


  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDocDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };

    const onEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const goProfile = () => {
    setMenuOpen(false);
    navigate("/profile"); 
  };


  const mobileNavItems = [
    navItems[0],
    navItems[1],
    navItems[2],
    navItems[3],
    {
      path: isLoggedIn ? "/profile" : "/login",
      label: isLoggedIn ? "Profile" : "Log In",
      icon: <FiUser />,
    },
  ];

  return (
    <>
 
      <header className="header">
        <div className="header-top">
          <div
            className="logo-section"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <div className="logo-container">
              <img
                src={logoImage}
                alt="Aaron Arredondo Logo"
                className="logo-img"
              />
            </div>
            <span className="logo-name">Aaron Arredondo</span>
          </div>

     
          {!isAuthPage && (
            <nav className="desktop-nav">
              <ul>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

    
          <div className="header-actions">
         
            {!isAuthPage && isLoggedIn && (
              <button
                className="cart-icon-btn"
                onClick={openNotif}
                aria-label={`Open notifications (${notifCount} unread)`}
                title="Notifications"
              >
                <FiBell className="cart-icon" />
                {notifCount > 0 && (
                  <span className="cart-badge">{notifCount}</span>
                )}
              </button>
            )}

                        {!isAuthPage && (
              <button
                className="cart-icon-btn"
                onClick={openCart}
                aria-label={`Open cart (${cartCount} items)`}
                title="Cart"
              >
                <FiShoppingCart className="cart-icon" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </button>
            )}

          
            {!isAuthPage && !isLoggedIn && (
              <LoginButton onClick={handleLoginClick} className="desktop-only" />
            )}

           
            {!isAuthPage && isLoggedIn && (
              <div
                className="desktop-only"
                ref={menuRef}
                style={{ position: "relative" }}
              >
                <button
                  type="button"
                  className="avatar-trigger"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Open account menu"
                  aria-expanded={menuOpen}
                  title={displayName}
                >
                  <span className="profile-avatar">{initials}</span>
                  <FiChevronDown
                    className={`avatar-chevron ${menuOpen ? "open" : ""}`}
                  />
                </button>

                {menuOpen && (
                  <div
                    className="avatar-menu"
                    role="menu"
                    aria-label="Account menu"
                  >
                    <div className="avatar-menu-header">
                      <div className="avatar-menu-name">{displayName}</div>
                      <div className="avatar-menu-sub">Account</div>
                    </div>

                    <button
                      type="button"
                      className="avatar-menu-item"
                      onClick={goProfile}
                      role="menuitem"
                    >
                      <FiUser /> Account
                    </button>

                    <button
                      type="button"
                      className="avatar-menu-item danger"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

            {!isAuthPage && (
        <nav className="bottom-nav mobile-only" aria-label="Main navigation">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `bottom-nav-item ${isActive ? "active" : ""}`
              }
              aria-label={item.label}
            >
              <span className="bottom-nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="bottom-nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
};

export default Header;
