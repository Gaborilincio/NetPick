import React from 'react';
import { render, screen } from '@testing-library/react';
import UserInfo from '../../../components/molecules/UserInfo';

describe('UserInfo Component', () => {
  const mockUser = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Principal 123, Santiago'
  };

  it('renderiza toda la información del usuario correctamente', () => {
    render(<UserInfo user={mockUser} />);

    expect(screen.getByText('Juan Pérez')).toBeTruthy();
    expect(screen.getByText('juan@example.com')).toBeTruthy();
    expect(screen.getByText('+56 9 1234 5678')).toBeTruthy();
    expect(screen.getByText('Av. Principal 123, Santiago')).toBeTruthy();
  });

  it('organiza la información en dos columnas', () => {
    render(<UserInfo user={mockUser} />);

    const cols = screen.getAllByText(/Juan Pérez|juan@example.com|\+56 9 1234 5678|Av. Principal 123, Santiago/);
    expect(cols.length).toBeGreaterThan(0);
  });

  it('muestra las etiquetas de los campos', () => {
    render(<UserInfo user={mockUser} />);

    expect(screen.getByText('Nombre:')).toBeTruthy();
    expect(screen.getByText('Email:')).toBeTruthy();
    expect(screen.getByText('Teléfono:')).toBeTruthy();
    expect(screen.getByText('Dirección:')).toBeTruthy();
  });
});