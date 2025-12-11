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
        const existingIndex = findItemInCart(product.id || product.idProducto);

        if (existingIndex > -1) {
            const newCart = [...cart];
            newCart[existingIndex].quantity = (newCart[existingIndex].quantity || 1) + 1;
            setCart(newCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const decreaseQuantity = (productId) => {
        const index = findItemInCart(productId);
        if (index === -1) return;

        const newCart = [...cart];

        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
            setCart(newCart);
        } else {
            setCart(cart.filter((_, i) => i !== index));
        }
    };

    const removeFromCart = (productId) => {
        const index = findItemInCart(productId);
        if (index === -1) return;
        setCart(cart.filter((_, i) => i !== index));
    };

    const generateVentaRequestDTO = (idUsuario, idMetodoPago, idMetodoEnvio, idEstado) => {
        const productosDTO = cart.map(item => ({
            idProducto: item.id || item.idProducto || item._id,
            cantidad: item.quantity || 1
        }));

        return {
            idUsuario,
            idMetodoPago,
            idMetodoEnvio,
            idEstado,
            productos: productosDTO
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
                decreaseQuantity,
                removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
