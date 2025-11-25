import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const localData = localStorage.getItem('netpick_cart');
            return localData ? JSON.parse(localData) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('netpick_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.idProducto === product.idProducto);
            if (existingItem) {
                return prevCart.map(item => 
                    item.idProducto === product.idProducto 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.idProducto !== productId));
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};