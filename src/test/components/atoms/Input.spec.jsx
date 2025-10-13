import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {
  it('renderiza el input correctamente', () => {
    render(<Input placeholder="Ingresa texto" />);
    expect(screen.getByPlaceholderText('Ingresa texto')).toBeTruthy();
  });

  it('aplica los props correctamente', () => {
    render(<Input type="email" required className="custom-input" data-testid="email-input" />);
    const input = screen.getByTestId('email-input');
    expect(input.getAttribute('type')).toBe('email');
    expect(input.className).toContain('custom-input');
  });
});