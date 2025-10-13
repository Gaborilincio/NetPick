import React from 'react';
import { render, screen } from '@testing-library/react';
import Col from '../../../components/atoms/Col';
describe('Col Component', () => {
  it('renderiza la columna correctamente', () => {
    render(<Col>Contenido de columna</Col>);
    expect(screen.getByText('Contenido de columna')).toBeTruthy();
  });

  it('aplica el tamaño correctamente', () => {
    render(<Col md={6}>Columna mediana</Col>);
    const col = screen.getByText('Columna mediana');
    expect(col).toHaveClass('col-md-6');
  });
});