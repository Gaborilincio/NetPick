import React from 'react';
import { render, screen } from '@testing-library/react';
import CardHeader from '../../../components/atoms/CardHeader';

describe('CardHeader Component', () => {
  it('renderiza el card header correctamente', () => {
    render(<CardHeader>Título de la card</CardHeader>);
    expect(screen.getByText('Título de la card')).toBeTruthy();
  });

  it('aplica las clases correctamente', () => {
    render(<CardHeader className="bg-primary">Header con fondo</CardHeader>);
    const header = screen.getByText('Header con fondo');
    expect(header).toHaveClass('bg-primary');
  });
});