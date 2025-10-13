import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '../../../components/atoms/Badge';


describe('Badge Component', () => {
  it('renderiza el badge correctamente', () => {
    render(<Badge>Texto del badge</Badge>);
    expect(screen.getByText('Texto del badge')).toBeTruthy();
  });

  it('aplica la variante correctamente', () => {
    render(<Badge bg="primary">Badge primario</Badge>);
    const badge = screen.getByText('Badge primario');
    expect(badge).toHaveClass('bg-primary');
  });

  it('aplica props adicionales correctamente', () => {
    render(<Badge pill>Badge pill</Badge>);
    const badge = screen.getByText('Badge pill');
    expect(badge).toHaveClass('rounded-pill');
  });
});