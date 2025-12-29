import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/cartContext';
import '../../assets/styles/cart.css';

const CartIcon = () => {
  const { cartCount, openCart } = useCart();

  return (
    <button className="cart-icon-btn" onClick={openCart} aria-label="Open cart">
      <FiShoppingCart className="cart-icon" />
      {cartCount > 0 && (
        <span className="cart-badge">{cartCount}</span>
      )}
    </button>
  );
};

export default CartIcon;