import React from 'react';
import { FiX, FiCheckCircle, FiShoppingCart } from 'react-icons/fi';
import { GiMedicinePills } from 'react-icons/gi';
import "../../assets/styles/productModal.css"


const ProductModal = ({ product, onClose, onAddToCart, productImage }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        
        {/* Header with Image and Basic Info */}
        <div className="modal-header">
          <div className="modal-image-container">
            <img 
              src={productImage} 
              alt={product.name}
              className="modal-image"
            />
          </div>
          <div className="modal-header-info">
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-product-type">
              <GiMedicinePills />
              <span>{product.type}</span>
            </div>
            <div className="modal-price-section">
              <span className="modal-price">{product.price}</span>
              <span className="modal-price-note">Monthly Treatment Plan</span>
            </div>
          </div>
        </div>

        {/* Body with Content Sections */}
        <div className="modal-body">
          {/* Description Section */}
          <div className="modal-section">
            <h3 className="modal-section-title">Description</h3>
            <p className="modal-description">
              {/* Description content will be passed from parent */}
            </p>
          </div>

          {/* Benefits Section */}
          <div className="modal-section">
            <h3 className="modal-section-title">Benefits</h3>
            <ul className="modal-list">
              {/* Benefits list will be passed from parent */}
            </ul>
          </div>

          {/* How It Works Section */}
          <div className="modal-section">
            <h3 className="modal-section-title">How It Works</h3>
            <ul className="modal-list">
              {/* Steps list will be passed from parent */}
            </ul>
          </div>

          {/* Warning Section */}
          <div className="modal-section warning-section">
            <h3 className="modal-section-title warning-title">
              Important Safety Information
            </h3>
            <ul className="modal-list warning-list">
              {/* Warning list will be passed from parent */}
            </ul>
          </div>

          {/* Disclaimer Section */}
          <div className="modal-section disclaimer-section">
            <p className="modal-disclaimer">
              {/* Disclaimer content will be passed from parent */}
            </p>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="modal-footer">
          <button className="modal-add-to-cart-btn" onClick={() => onAddToCart(product)}>
            <FiShoppingCart /> Add to Cart
          </button>
          <button className="modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;