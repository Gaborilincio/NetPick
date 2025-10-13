import React from 'react';
import { render, screen } from '@testing-library/react';
import CartTable from '../../../components/molecules/CartTable';

describe('CartTable Component', () => {
  const mockOnRemoveItem = () => {};
  const mockOnContinueShopping = () => {};

  it('renderiza EmptyCart cuando el carrito está vacío', () => {
    render(<CartTable cartItems={[]} onRemoveItem={mockOnRemoveItem} onContinueShopping={mockOnContinueShopping} />);
    
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
    expect(screen.getByText('Agrega algunos productos para continuar')).toBeTruthy();
    expect(screen.getByText('Ver Productos')).toBeTruthy();
  });

  it('renderiza la tabla con items cuando el carrito tiene productos', () => {
    const mockItems = [
      { id: 1, name: 'Producto 1', price: 100, quantity: 2, image: 'img1.jpg' },
      { id: 2, name: 'Producto 2', price: 200, quantity: 1, image: 'img2.jpg' }
    ];
    
    render(<CartTable cartItems={mockItems} onRemoveItem={mockOnRemoveItem} onContinueShopping={mockOnContinueShopping} />);
    
    expect(screen.getByText('Producto')).toBeTruthy();
    expect(screen.getByText('Precio')).toBeTruthy();
    expect(screen.getByText('Cantidad')).toBeTruthy();
    expect(screen.getByText('Total')).toBeTruthy();
    expect(screen.getByText('Acciones')).toBeTruthy();
    
    expect(screen.getByText('Producto 1')).toBeTruthy();
    expect(screen.getByText('Producto 2')).toBeTruthy();
  });
});