import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartSection from '../components/organisms/CartSection';

function Cart() {
  const navigate = useNavigate();

  const cartItems = [
    {
      id: 1,
      name: "Smartphone Samsung Galaxy S22",
      price: 450000,
      quantity: 1,
      image: "/img/productos/tecnologia/tecnologia1.webp"
    },
    {
      id: 2, 
      name: "Audífonos Sony WH-1000XM5",
      price: 250000,
      quantity: 2,
      image: "/img/productos/tecnologia/tecnologia2.webp"
    }
  ];

  const handleRemoveItem = (itemId) => {
    console.log('Eliminar item del carrito:', itemId);
  };

  const handleCheckout = () => {
    console.log('Proceder al pago');
    navigate('/checkout'); 
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <CartSection 
      cartItems={cartItems}
      onRemoveItem={handleRemoveItem}
      onCheckout={handleCheckout}
      onContinueShopping={handleContinueShopping}
    />
  );
}

export default Cart;