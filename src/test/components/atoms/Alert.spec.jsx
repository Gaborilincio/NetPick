import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from '../../../components/atoms/Alert';

describe('Alert Component', () => {
  it('renderiza el alert correctamente', () => {
    render(<Alert>Mensaje importante</Alert>);
    expect(screen.getByText('Mensaje importante')).toBeTruthy();
  });

  it('aplica la variante correctamente', () => {
    render(<Alert variant="success">Éxito</Alert>);
    const alert = screen.getByText('Éxito');
    expect(alert).toHaveClass('alert-success');
  });
});