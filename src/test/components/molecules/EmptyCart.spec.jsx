import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmptyCart from '../../../components/molecules/EmptyCart';

describe('EmptyCart Component', () => {
  const mockOnContinueShopping = jasmine.createSpy('onContinueShopping');

  beforeEach(() => {
    mockOnContinueShopping.calls.reset();
  });

  it('renderiza el mensaje de carrito vacío correctamente', () => {
    render(<EmptyCart onContinueShopping={mockOnContinueShopping} />);

    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
    expect(screen.getByText('Agrega algunos productos para continuar')).toBeTruthy();
    expect(screen.getByText('Ver Productos')).toBeTruthy();
  });

  it('llama a onContinueShopping cuando se hace clic en el botón', () => {
    render(<EmptyCart onContinueShopping={mockOnContinueShopping} />);

    fireEvent.click(screen.getByText('Ver Productos'));
    expect(mockOnContinueShopping).toHaveBeenCalledTimes(1);
  });

  it('aplica la variante primary al botón', () => {
    render(<EmptyCart onContinueShopping={mockOnContinueShopping} />);

    const button = screen.getByText('Ver Productos');
    expect(button.className).toContain('btn-primary');
  });
});