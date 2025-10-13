import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartIcon from '../../../components/molecules/CartIcon';

describe('CartIcon Component', () => {
  it('renderiza el icono del carrito sin badge cuando no hay items', () => {
    render(<CartIcon itemCount={0} onClick={() => {}} />);

    expect(screen.getByText('🛒')).toBeTruthy();
    expect(screen.queryByText('0')).toBeFalsy();
  });

  it('renderiza el badge con la cantidad correcta de items', () => {
    render(<CartIcon itemCount={5} onClick={() => {}} />);

    expect(screen.getByText('🛒')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('llama a onClick cuando se hace clic en el icono', () => {
    let clicked = false;
    const mockOnClick = () => { clicked = true; };
    
    render(<CartIcon itemCount={3} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText('🛒'));
    expect(clicked).toBe(true);
  });

  it('aplica las clases correctas al badge', () => {
    render(<CartIcon itemCount={2} onClick={() => {}} />);

    const badge = screen.getByText('2');
    expect(badge.classList.contains('position-absolute')).toBe(true);
    expect(badge.classList.contains('top-0')).toBe(true);
    expect(badge.classList.contains('start-100')).toBe(true);
    expect(badge.classList.contains('translate-middle')).toBe(true);
  });

  it('no muestra badge cuando itemCount es 0', () => {
    render(<CartIcon itemCount={0} onClick={() => {}} />);
    
    const badge = screen.queryByText('0');
    expect(badge).toBeFalsy();
  });
});