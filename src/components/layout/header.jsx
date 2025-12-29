import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiGrid, 
  FiCalendar, 
  FiHelpCircle, 
  FiUser,
  FiShoppingCart
} from 'react-icons/fi';
import '../../assets/styles/header.css';
import { useCart } from '../context/cartContext';

import logoImage from '../../assets/images/logo/mLogo.png'; 
import LoginButton from '../ui/button';

const Header = () => {
  const navigate = useNavigate();
  const { cartCount, openCart } = useCart();

  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/categories', label: 'Categories', icon: <FiGrid /> },
    { path: '/bookings', label: 'Bookings', icon: <FiCalendar /> },
    { path: '/faq', label: 'FAQ', icon: <FiHelpCircle /> },
    { path: '/login', label: 'Log In', icon: <FiUser /> },
  ];

  const handleLoginClick = () => {
    console.log('Login clicked');
    navigate('/login');
  };

  // REMOVED CART from here. It is now only in the top header.
  const mobileNavItems = [
    navItems[0], // Home
    navItems[1], // Categories
    navItems[2], // Bookings
    navItems[3], // FAQ
    navItems[4], // Login
  ];

  return (
    <>
      {/* Top Header */}
      <header className="header">
        <div className="header-top">
          <div className="logo-section">
            <div className="logo-container">
              <img 
                src={logoImage} 
                alt="Aaron Arredondo Logo" 
                className="logo-img"
              />
            </div>
            <span className="logo-name">Aaron Arredondo</span>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul>
              {navItems.slice(0, 4).map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions (Cart & Login) */}
          {/* Renamed to header-actions to denote it works for mobile too */}
          <div className="header-actions">
            
            {/* Cart Icon - NOW VISIBLE ON MOBILE (removed desktop-only class) */}
            <button 
              className="cart-icon-btn"
              onClick={openCart}
              aria-label={`Open cart (${cartCount} items)`}
            >
              <FiShoppingCart className="cart-icon" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
            
            {/* Login Button - Still hidden on mobile top bar */}
            <LoginButton 
              onClick={handleLoginClick}
              className="desktop-only"
            />
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="bottom-nav mobile-only" aria-label="Main navigation">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            <span className="bottom-nav-icon" aria-hidden="true">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Header;