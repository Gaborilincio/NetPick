import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '../../../components/atoms/Label';

describe('Label Component', () => {
  it('renderiza el label correctamente', () => {
    render(<Label htmlFor="test-input">Email</Label>);
    const label = screen.getByText('Email');
    expect(label.getAttribute('for')).toBe('test-input');
  });

  it('aplica los props correctamente', () => {
    render(<Label htmlFor="email-input" className="custom-class">Correo</Label>);
    const label = screen.getByText('Correo');
    expect(label.className).toContain('custom-class');
  });
});