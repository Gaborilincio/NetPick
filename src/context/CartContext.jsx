import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productId = product.id || product.idProducto || product._id;
      const existingItem = prevCart.find((item) => 
        (item.id || item.idProducto || item._id) === productId
      );

      if (existingItem) {
        return prevCart.map((item) =>
          (item.id || item.idProducto || item._id) === productId
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productToRemove) => {
    setCart((prevCart) => {
      const productId = productToRemove.id || productToRemove.idProducto || productToRemove._id;
      return prevCart.filter((item) => (item.id || item.idProducto || item._id) !== productId);
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};