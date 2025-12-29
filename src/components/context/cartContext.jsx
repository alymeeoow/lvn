import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on first render
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart:', error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Save cart & update counts whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));

    setCartCount(cartItems.length); // unique items
    setTotalQuantity(
      cartItems.reduce((sum, item) => sum + item.quantity, 0)
    );
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        { ...product, quantity, addedAt: new Date().toISOString() }
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () =>
    cartItems.reduce((total, item) => {
      const price =
        typeof item.price === 'number'
          ? item.price
          : parseFloat(item.price?.replace(/[^0-9.-]+/g, '') || 0);

      return total + price * item.quantity;
    }, 0);

  const getItemTotal = (item) => {
    const price =
      typeof item.price === 'number'
        ? item.price
        : parseFloat(item.price?.replace(/[^0-9.-]+/g, '') || 0);

    return price * item.quantity;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        totalQuantity,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemTotal,
        toggleCart: () => setIsCartOpen(prev => !prev),
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
