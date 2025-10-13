import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../../../components/molecules/CartItem';

describe('CartItem Component', () => {
  const mockItem = {
    id: 1,
    name: 'Producto de prueba',
    price: 100000,
    quantity: 2,
    image: 'product.jpg'
  };

  let mockOnRemove;

  beforeEach(() => {
    mockOnRemove = jasmine.createSpy('onRemove'); 
  });

  it('renderiza la información del producto correctamente', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('Producto de prueba')).toBeTruthy();
    expect(screen.getByAltText('Producto de prueba')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('Eliminar')).toBeTruthy();
  });

  it('calcula y muestra el total correctamente', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('$100.000')).toBeTruthy();
    expect(screen.getByText('$200.000')).toBeTruthy();
  });

  it('llama a onRemove con el id correcto cuando se hace clic en Eliminar', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    fireEvent.click(screen.getByText('Eliminar'));
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });

  it('aplica las clases correctas al botón Eliminar', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    const button = screen.getByText('Eliminar');
    expect(button.classList.contains('btn-outline-danger')).toBe(true);
    expect(button.classList.contains('btn-sm')).toBe(true);
  });
});