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
    
    const generateVentaRequestDTO = (idUsuario, idMetodoPago, idMetodoEnvio, idEstado) => {
        if (cart.length === 0) {
            throw new Error("El carrito está vacío. Agregue productos para continuar con la compra.");
        }

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
                clearCartAfterSuccess
            }}
        >
            {children}
        </CartContext.Provider>
    );
};