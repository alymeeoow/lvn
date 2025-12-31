import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/styles/footer.css";
import Mlogo from "../../assets/images/logo/mLogo.png";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

                <div className="footer-section">
          <div className="logo-section-footer">
            <div className="footer-logo">
              <div className="logo-image">
                <img
                  src={Mlogo}
                  alt="Aaron Arredondo Logo"
                  className="logo-img"
                />
              </div>
              <div className="logo-text">
                <div className="logo-main">
                  <span className="logo-primary">Aaron Arredondo</span>
                </div>
              </div>
            </div>
          </div>

          <p className="footer-text">
            Delivering secure, patient-first healthcare solutions
          </p>
        </div>

                <div className="footer-section">
          <h4 className="footer-subtitle">
            <FiArrowRight className="subtitle-icon" />
            Quick Links
          </h4>

          <ul className="footer-links">
            <li>
              <NavLink to="/">
                <FiCheckCircle className="link-icon" />
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/categories">
                <FiCheckCircle className="link-icon" />
                Categories
              </NavLink>
            </li>

            <li>
              <NavLink to="/bookings">
                <FiCheckCircle className="link-icon" />
                Bookings
              </NavLink>
            </li>

            <li>
              <NavLink to="/faq">
                <FiCheckCircle className="link-icon" />
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>

                <div className="footer-section">
          <h4 className="footer-subtitle">
            <FiPhone className="subtitle-icon" />
            Contact Us
          </h4>

          <ul className="footer-links contact-links">
            <li>
              <a href="mailto:support@lvn.com" className="contact-link">
                <FiMail className="contact-icon" />
                <div className="contact-info">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">support@lvn.com</span>
                </div>
              </a>
            </li>

            <li>
              <a href="tel:5551234567" className="contact-link">
                <FiPhone className="contact-icon" />
                <div className="contact-info">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">(555) 123-4567</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

                <div className="footer-section">
          <h4 className="footer-subtitle">
            <FiFacebook className="subtitle-icon" />
            Stay Connected
          </h4>

          <p className="social-text">
            Follow us for health tips, updates, and special offers.
          </p>

          <div className="social-links">
            <a href="#" className="social-link facebook" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="#" className="social-link twitter" aria-label="X (Twitter)">
              <FaXTwitter />
            </a>
            <a href="#" className="social-link instagram" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="#" className="social-link linkedin" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="#" className="social-link youtube" aria-label="YouTube">
              <FiYoutube />
            </a>
          </div>
        </div>
      </div>

            <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © 2024 ProHealth Footer™ Personalized Healthcare. All rights reserved.
          </p>

          <div className="legal-links">
            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            <span className="divider">•</span>
            <NavLink to="/terms">Terms of Service</NavLink>
            <span className="divider">•</span>
            <NavLink to="/cookies">Cookie Policy</NavLink>
            <span className="divider">•</span>
            <NavLink to="/accessibility">Accessibility</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
