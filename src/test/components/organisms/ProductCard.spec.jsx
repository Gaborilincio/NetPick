import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Producto Test',     
    descripcion: 'Descripción test', 
    precio: 10000,
    url: 'test.jpg',             
  };

  const renderWithRouter = (component) => {
    return render(
      <MemoryRouter>
        {component}
      </MemoryRouter>
    );
  };

  it('renderiza la información básica del producto', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Producto Test')).toBeTruthy();
    expect(screen.getByText('Descripción test')).toBeTruthy();
    
    const priceElements = screen.getAllByText(/\$|10000/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('renderiza la imagen del producto', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    
    const imageWithAlt = images.find(img => img.alt.includes('Producto Test') || img.alt === 'Producto Test');
    expect(imageWithAlt).toBeTruthy();
  });

  it('se renderiza sin errores', () => {
    expect(() => {
      renderWithRouter(<ProductCard product={mockProduct} />);
    }).not.toThrow();
  });

  it('contiene elementos interactivos', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    const buttons = screen.queryAllByRole('button');
    const links = screen.queryAllByRole('link');
    
    expect(buttons.length + links.length).toBeGreaterThan(0);
  });
});