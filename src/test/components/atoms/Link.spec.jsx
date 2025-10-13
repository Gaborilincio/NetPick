import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Link from '../../../components/atoms/Link';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Link Component', () => {
  it('renderiza el link correctamente', () => {
    renderWithRouter(<Link to="/products">Productos</Link>);
    expect(screen.getByText('Productos')).toBeTruthy();
  });

  it('tiene el href correcto', () => {
    renderWithRouter(<Link to="/profile">Mi Perfil</Link>);
    const link = screen.getByRole('link', { name: 'Mi Perfil' });
    expect(link.getAttribute('href')).toBe('/profile');
  });
});