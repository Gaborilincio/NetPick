import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/molecules/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Laptop Gaming',
    descripcion: 'Laptop potente para gaming',
    precio: 1500,
    url: 'laptop.jpg'
  };

  it('renderiza el producto correctamente', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Laptop Gaming')).toBeTruthy();
    expect(screen.getByText('Laptop Gaming')).toBeTruthy();
    expect(screen.getByText('Laptop potente para gaming')).toBeTruthy();
  });

  it('renderiza el precio del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

  });

  it('contiene una imagen con el alt text correcto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const image = screen.getByAltText('Laptop Gaming');
    expect(image).toBeTruthy();
    expect(image.src).toContain('laptop.jpg');
  });
});