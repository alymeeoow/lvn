import React, { useState } from 'react';
import { 
  FiShoppingCart, 
  FiTrash2, 
  FiPlus, 
  FiMinus,
  FiChevronRight,
  FiPackage,
  FiTruck,
  FiShield,
  FiClock,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiUser,
  FiMail,
  FiMapPin,
  FiSmartphone
} from 'react-icons/fi';
import { useCart } from '../context/cartContext';
import '../../assets/styles/cart.css';

const CartPage = () => {
  const {
    cartItems,
    cartCount,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getItemTotal,
    clearCart
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return price || '$0.00';
  };

  const shippingEstimate = cartCount > 0 ? 9.99 : 0;
  const taxRate = 0.08;
  const taxAmount = getCartTotal() * taxRate;
  const orderTotal = getCartTotal() + shippingEstimate + taxAmount;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);

    setTimeout(() => {
      alert('Order placed successfully! Thank you for your purchase.');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const steps = [
    { number: 1, title: 'Cart', icon: <FiShoppingCart /> },
    { number: 2, title: 'Shipping', icon: <FiMapPin /> },
    { number: 3, title: 'Payment', icon: <FiCreditCard /> },
    { number: 4, title: 'Confirm', icon: <FiCheck /> }
  ];

  return (
    <div className="cart-page">
            <div className="cart-page-header">
        <h1>
          <FiShoppingCart className="header-icon" />
          Shopping Cart
        </h1>
        <p className="cart-page-subtitle">
          Review your items and proceed to checkout
        </p>
      </div>

      <div className="cart-page-content">
                <div className="checkout-steps">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`step ${checkoutStep >= step.number ? 'active' : ''}`}
            >
              <div className="step-circle">
                {checkoutStep > step.number ? <FiCheck /> : step.icon}
              </div>
              <span className="step-title">{step.title}</span>
              {index < steps.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

                <div className="cart-page-main">
                    <div className="cart-items-section">
            <div className="section-header">
              <h2>Your Items ({cartCount})</h2>
              {cartItems.length > 0 && (
                <button className="clear-cart-btn" onClick={clearCart}>
                  <FiTrash2 /> Clear All
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="empty-cart-page">
                <FiShoppingCart className="empty-cart-icon" />
                <h3>Your cart is empty</h3>
                <p>Browse our treatments and add items to get started</p>
                <a href="/categories" className="browse-treatments-btn">
                  Browse Treatments
                </a>
              </div>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-page-item">
                    <div className="item-image">
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&auto=format'}
                        alt={item.name}
                      />
                    </div>
                    
                    <div className="item-details">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <button 
                          className="remove-item-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      
                      <p className="item-category">{item.category || 'Healthcare'}</p>
                      <p className="item-description">
                        {item.description || 'Professional healthcare treatment'}
                      </p>
                      
                      <div className="item-meta">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => handleDecrement(item)}
                          >
                            <FiMinus />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => handleIncrement(item)}
                          >
                            <FiPlus />
                          </button>
                        </div>
                        
                        <div className="item-pricing">
                          <span className="item-total">{formatPrice(getItemTotal(item))}</span>
                          <span className="item-unit">
                            {formatPrice(item.price)} each
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

                        <div className="trust-section">
              <div className="trust-item">
                <FiShield />
                <div>
                  <h4>Secure & Confidential</h4>
                  <p>Your privacy is our priority</p>
                </div>
              </div>
              <div className="trust-item">
                <FiPackage />
                <div>
                  <h4>Discreet Packaging</h4>
                  <p>Plain packaging for privacy</p>
                </div>
              </div>
              <div className="trust-item">
                <FiTruck />
                <div>
                  <h4>Fast Shipping</h4>
                  <p>2-3 day delivery</p>
                </div>
              </div>
              <div className="trust-item">
                <FiClock />
                <div>
                  <h4>24/7 Support</h4>
                  <p>Medical professionals available</p>
                </div>
              </div>
            </div>
          </div>

                    <div className="order-summary-section">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{cartCount > 0 ? formatPrice(shippingEstimate) : 'Free'}</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax (8%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
                
                <div className="summary-divider" />
                
                <div className="summary-row total">
                  <strong>Order Total</strong>
                  <strong>{formatPrice(orderTotal)}</strong>
                </div>
              </div>

                            {checkoutStep >= 2 && (
                <div className="shipping-form">
                  <h3>
                    <FiUser />
                    Shipping Information
                  </h3>
                  
                  <div className="form-group">
                    <label>
                      <FiUser /> Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        <FiMail /> Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>
                        <FiSmartphone /> Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FiMapPin /> Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        placeholder="City"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        placeholder="State"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>
              )}

                            <button 
                className="checkout-btn-primary"
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isCheckingOut}
              >
                <FiLock />
                {isCheckingOut ? 'Processing Your Order...' : 'Secure Checkout'}
                <FiChevronRight />
              </button>

                            <div className="payment-methods">
                <div className="payment-icons">
                  <span className="payment-icon">💳</span>
                  <span className="payment-icon">🏦</span>
                  <span className="payment-icon">🔒</span>
                  <span className="payment-icon">📱</span>
                </div>
                <p className="payment-note">
                  All major credit cards, Apple Pay, Google Pay, and crypto accepted
                </p>
              </div>

                            <div className="return-policy">
                <h4>
                  <FiCheck />
                  30-Day Satisfaction Guarantee
                </h4>
                <p>
                  If you're not satisfied with your treatment, contact us within 30 days for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;