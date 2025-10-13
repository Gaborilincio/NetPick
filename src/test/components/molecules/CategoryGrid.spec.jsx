import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryGrid from '../../../components/molecules/CategoryGrid';

describe('CategoryGrid Component', () => {
  const mockCategories = [
    {
      title: 'Electrónicos',
      description: 'Los mejores dispositivos electrónicos',
      image: 'electronics.jpg',
      link: '/category/electronics'
    },
    {
      title: 'Ropa',
      description: 'Moda para toda ocasión',
      image: 'clothing.jpg',
      link: '/category/clothing'
    }
  ];

  it('renderiza todas las categorías correctamente', () => {
    render(
      <MemoryRouter>
        <CategoryGrid categories={mockCategories} />
      </MemoryRouter>
    );

    expect(screen.getByText('Electrónicos')).toBeTruthy();
    expect(screen.getByText('Ropa')).toBeTruthy();
    expect(screen.getByText('Los mejores dispositivos electrónicos')).toBeTruthy();
    expect(screen.getByText('Moda para toda ocasión')).toBeTruthy();
  });

  it('renderiza las imágenes con los atributos correctos', () => {
    render(
      <MemoryRouter>
        <CategoryGrid categories={mockCategories} />
      </MemoryRouter>
    );

    const images = screen.getAllByRole('img');
    expect(images[0].getAttribute('src')).toBe('electronics.jpg');
    expect(images[0].getAttribute('alt')).toBe('Electrónicos');
    expect(images[1].getAttribute('src')).toBe('clothing.jpg');
    expect(images[1].getAttribute('alt')).toBe('Ropa');
  });

  it('renderiza los botones con los enlaces correctos', () => {
    render(
      <MemoryRouter>
        <CategoryGrid categories={mockCategories} />
      </MemoryRouter>
    );

    const buttons = screen.getAllByText('Ver más');
    expect(buttons[0].closest('a').getAttribute('href')).toBe('/category/electronics');
    expect(buttons[1].closest('a').getAttribute('href')).toBe('/category/clothing');
  });
});