import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../../components/organisms/Footer';

describe('Footer Component', () => {
  it('renderiza la información de la empresa correctamente', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('NetPick')).toBeTruthy();
    expect(screen.getByText('Tu tienda online de confianza para tecnología, hogar y más.')).toBeTruthy();
  });

  it('renderiza los enlaces rápidos correctamente', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('Enlaces Rápidos')).toBeTruthy();
    expect(screen.getByText('Productos')).toBeTruthy();
    expect(screen.getByText('Tecnología')).toBeTruthy();
    expect(screen.getByText('Hogar')).toBeTruthy();
    expect(screen.getByText('Accesorios')).toBeTruthy();
  });

  it('renderiza la información de contacto correctamente', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('Contacto')).toBeTruthy();
    expect(screen.getByText('contacto@netpick.com')).toBeTruthy();
    expect(screen.getByText('+56 9 1234 5678')).toBeTruthy();
    expect(screen.getByText('Santiago, Chile')).toBeTruthy();
  });

  it('renderiza el copyright correctamente', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('© 2024 NetPick. Todos los derechos reservados.')).toBeTruthy();
  });

  it('tiene los enlaces con las rutas correctas', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
  );

  const productosLink = screen.getByText('Productos').closest('a');
  expect(productosLink.getAttribute('href')).toBe('/products'); 
});
});