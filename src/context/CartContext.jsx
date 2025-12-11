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
    const cartTotal = cart.reduce((acc, item) => acc + (item.precio * (item.quantity || 1)), 0);

    const clearCart = () => setCart([]);

    const findItemInCart = (id) => 
        cart.findIndex(item => item.id === id || item.idProducto === id);

    const addToCart = (product) => {
        const existingItemIndex = findItemInCart(product.id || product.idProducto);

        if (existingItemIndex > -1) {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity = (newCart[existingItemIndex].quantity || 1) + 1;
            setCart(newCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId, removeAll = false) => {
        const existingItemIndex = findItemInCart(productId);

        if (existingItemIndex === -1) return;

        const item = cart[existingItemIndex];

        if (removeAll || item.quantity <= 1) {
            setCart(cart.filter((_, index) => index !== existingItemIndex));
        } else {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity -= 1;
            setCart(newCart);
        }
    };

    const generateVentaRequestDTO = (idUsuario, idMetodoPago, idMetodoEnvio, idEstado) => {
        const productosDTO = cart.map(item => {
            const productId = item.id || item.idProducto || item._id;
            return {
                idProducto: productId,
                cantidad: item.quantity || 1,
            };
        });

        return {
            idUsuario,
            idMetodoPago,
            idMetodoEnvio,
            idEstado,
            productos: productosDTO,
        };
    };

    const clearCartAfterSuccess = () => setCart([]); 

    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                cartTotal,
                clearCart,
                generateVentaRequestDTO,
                clearCartAfterSuccess,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
