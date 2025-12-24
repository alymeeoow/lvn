import React, { useState } from 'react';
import { 
  FiHome, 
  FiGrid, 
  FiCalendar, 
  FiHelpCircle, 
  FiUser
} from 'react-icons/fi';
import '../../assets/styles/header.css';

import logoImage from '../../assets/images/logo/mLogo.png'; 

import LoginButton from '../ui/button';

const Header = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: <FiHome /> },
    { id: 'categories', label: 'Categories', icon: <FiGrid /> },
    { id: 'bookings', label: 'Bookings', icon: <FiCalendar /> },
    { id: 'faq', label: 'FAQ', icon: <FiHelpCircle /> },
    { id: 'login', label: 'Log In', icon: <FiUser /> },
  ];

  const handleLogin = () => {
    console.log('Login clicked');
    // Add your login logic here
  };

  const handleNavClick = (itemId) => {
    if (itemId === 'login') {
      handleLogin();
    } else {
      setActiveTab(itemId);
    }
  };

  return (
    <>
      {/* Top Header - Just Logo */}
      <header className="header">
        <div className="header-top">
          <div className="logo-section">
            <div className="logo-container">
              {/* Replace SVG with image logo */}
              <img 
                src={logoImage} 
                alt="Aaron Arredondo Logo" 
                className="logo-img"
              />
            </div>
            <span className="logo-name">Aaron Arredondo</span>
          </div>
          
          {/* Desktop Navigation - Only shows on desktop */}
          <nav className="desktop-nav">
            <ul>
              {navItems.slice(0, 4).map((item) => ( // First 4 items only for desktop
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className={activeTab === item.id ? 'active' : ''}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Use your separate LoginButton component */}
          <LoginButton 
            onClick={handleLogin}
            className="desktop-only"
          />
        </div>
      </header>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="bottom-nav mobile-only" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
            aria-label={item.label}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="bottom-nav-icon" aria-hidden="true">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Header;