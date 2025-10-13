import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../../components/atoms/Card';

describe('Card Component', () => {
  it('renderiza la card correctamente', () => {
    render(<Card>Contenido de la card</Card>);
    expect(screen.getByText('Contenido de la card')).toBeTruthy();
  });

  it('aplica las clases correctamente', () => {
    render(<Card className="shadow-sm">Card con sombra</Card>);
    const card = screen.getByText('Card con sombra');
    expect(card).toHaveClass('shadow-sm');
  });
});