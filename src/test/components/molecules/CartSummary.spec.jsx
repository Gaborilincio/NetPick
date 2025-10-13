import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartSummary from '../../../components/molecules/CartSummary';

describe('CartSummary Component', () => {
  const mockOnCheckout = jasmine.createSpy('onCheckout');
  const mockOnContinueShopping = jasmine.createSpy('onContinueShopping');
  
  const mockProps = {
    subtotal: 1000,
    shipping: 50,
    total: 1050,
    cartItems: [{ id: 1, name: 'Producto', price: 1000, quantity: 1 }],
    onCheckout: mockOnCheckout,
    onContinueShopping: mockOnContinueShopping
  };

  beforeEach(() => {
    mockOnCheckout.calls.reset();
    mockOnContinueShopping.calls.reset();
  });

  it('renderiza los precios correctamente', () => {
    render(<CartSummary {...mockProps} />);

    expect(screen.getByText('Resumen del Pedido')).toBeTruthy();
    
    expect(screen.getByText('$1000')).toBeTruthy();
    expect(screen.getByText('$50')).toBeTruthy();
    expect(screen.getByText('$1050')).toBeTruthy();
  });

  it('habilita el botón de pago cuando hay items en el carrito', () => {
    render(<CartSummary {...mockProps} />);

    const checkoutButton = screen.getByText('Proceder al Pago');
    expect(checkoutButton.disabled).toBe(false);
  });

  it('deshabilita el botón de pago cuando el carrito está vacío', () => {
    render(<CartSummary {...mockProps} cartItems={[]} />);

    const checkoutButton = screen.getByText('Proceder al Pago');
    expect(checkoutButton.disabled).toBe(true);
  });

  it('llama a onCheckout cuando se hace clic en Proceder al Pago', () => {
    render(<CartSummary {...mockProps} />);

    const checkoutButton = screen.getByText('Proceder al Pago');
    fireEvent.click(checkoutButton);
    expect(mockOnCheckout).toHaveBeenCalledTimes(1);
  });

  it('llama a onContinueShopping cuando se hace clic en Seguir Comprando', () => {
    render(<CartSummary {...mockProps} />);

    const continueButton = screen.getByText('Seguir Comprando');
    fireEvent.click(continueButton);
    expect(mockOnContinueShopping).toHaveBeenCalledTimes(1);
  });
});