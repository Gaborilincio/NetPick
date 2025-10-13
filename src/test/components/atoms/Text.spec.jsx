import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Component', () => {
  it('renderiza el texto correctamente', () => {
    render(<Text>Hola mundo</Text>);
    expect(screen.getByText('Hola mundo')).toBeTruthy();
  });

  it('aplica la variante de heading correctamente', () => {
    render(<Text variant="h1">Título principal</Text>);
    const heading = screen.getByText('Título principal');
    expect(heading.tagName).toBe('H1');
    expect(heading).toBeTruthy();
  });

  it('usa p como variante por defecto', () => {
    render(<Text>Texto normal</Text>);
    const text = screen.getByText('Texto normal');
    expect(text.tagName).toBe('P');
  });

  it('aplica className correctamente', () => {
    render(<Text className="text-center">Texto centrado</Text>);
    const text = screen.getByText('Texto centrado');
    expect(text).toHaveClass('text-center');
  });
});