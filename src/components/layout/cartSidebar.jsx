import React, { useState, useEffect } from 'react';
import { 
  FiShoppingCart, 
  FiX, 
  FiTrash2, 
  FiPlus, 
  FiMinus,
  FiChevronRight,
  FiPackage,
  FiTruck,
  FiShield
} from 'react-icons/fi';
import { useCart } from '../context/cartContext';
import '../../assets/styles/cart.css';

const CartSidebar = () => {
  const {
    cartItems,
    cartCount,
    isCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getItemTotal,
    closeCart,
    clearCart
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Disable body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Get current body overflow value
      const body = document.body;
      // Save current styles
      const originalOverflow = body.style.overflow;
      const originalPosition = body.style.position;
      const originalTop = body.style.top;
      const originalWidth = body.style.width;
      
      // Apply styles to prevent scrolling
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      
      // Store scroll position in body dataset
      body.dataset.scrollY = scrollY.toString();
      
      // Cleanup function
      return () => {
        // Restore original styles
        body.style.overflow = originalOverflow;
        body.style.position = originalPosition;
        body.style.top = originalTop;
        body.style.width = originalWidth;
        
        // Restore scroll position
        const savedScrollY = parseInt(body.dataset.scrollY || '0', 10);
        window.scrollTo(0, savedScrollY);
        
        // Clean up dataset
        delete body.dataset.scrollY;
      };
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Proceeding to checkout! In a real app, this would redirect to checkout.');
      setIsCheckingOut(false);
    }, 1000);
  };

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
  const taxRate = 0.08; // 8% tax
  const taxAmount = getCartTotal() * taxRate;
  const orderTotal = getCartTotal() + shippingEstimate + taxAmount;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'active' : ''}`}
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <FiShoppingCart className="cart-header-icon" />
            <h2>Your Cart</h2>
            <span className="cart-item-count">({cartCount} items)</span>
          </div>
          <button className="cart-close-btn" onClick={closeCart}>
            <FiX />
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <FiShoppingCart className="empty-cart-icon" />
              <h3>Your cart is empty</h3>
              <p>Add some treatments to get started</p>
              <button className="continue-shopping-btn" onClick={closeCart}>
                Continue Browsing
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop&auto=format'}
                        alt={item.name}
                      />
                    </div>
                    
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-category">{item.category || 'Healthcare'}</p>
                      <div className="cart-item-price">
                        {formatPrice(getItemTotal(item))}
                        <span className="unit-price">
                          {formatPrice(item.price)} each
                        </span>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleDecrement(item)}
                          aria-label="Decrease quantity"
                        >
                          <FiMinus />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleIncrement(item)}
                          aria-label="Increase quantity"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      
                      <button 
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="order-summary">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal</span>
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
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                  <div className="trust-badge">
                    <FiShield />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="trust-badge">
                    <FiPackage />
                    <span>Discreet Packaging</span>
                  </div>
                  <div className="trust-badge">
                    <FiTruck />
                    <span>Free Shipping $75+</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="cart-actions">
                  <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                    <FiChevronRight />
                  </button>
                  
                  <button 
                    className="clear-cart-btn"
                    onClick={clearCart}
                  >
                    <FiTrash2 />
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;