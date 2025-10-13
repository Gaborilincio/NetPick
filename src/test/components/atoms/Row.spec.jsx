import React from 'react';
import { render, screen } from '@testing-library/react';
import Row from '../../../components/atoms/Row';

describe('Row Component', () => {
  it('renderiza la fila correctamente', () => {
    render(<Row>Contenido de la fila</Row>);
    expect(screen.getByText('Contenido de la fila')).toBeTruthy();
  });

  it('aplica las clases correctamente', () => {
    render(<Row className="justify-content-center">Fila centrada</Row>);
    const row = screen.getByText('Fila centrada');
    expect(row).toHaveClass('justify-content-center');
  });
});