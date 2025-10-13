import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import CardBody from '../../../components/molecules/CardBody';

const mockProduct = {
  id: 1,
  nombre: "Alimento para perros - Champion Dog",
  precio: 30000,
  descripcion: "Alimento balanceado para perros, ideal para todas las razas y tamaños. Rico en proteínas y nutrientes.",
  url: "/img/productos/mascotas/mascota1.webp"
};

const renderWithRouter = (component) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('CardBody Component', () => {
  it('renderiza correctamente con todas las propiedades del producto', () => {
    renderWithRouter(<CardBody product={mockProduct} />);

    expect(screen.getByText('Alimento para perros - Champion Dog')).toBeTruthy();
    expect(screen.getByText('$30.000')).toBeTruthy();
    expect(screen.getByText('Alimento balanceado para perros, ideal para todas las razas y tamaños. Rico en proteínas y nutrientes.')).toBeTruthy();
  });

  it('renderiza el precio con formato de moneda correcto', () => {
    renderWithRouter(<CardBody product={mockProduct} />);

    const priceElement = screen.getByText('$30.000');
    expect(priceElement).toBeTruthy();
  });

  it('maneja productos sin descripción', () => {
    const productWithoutDescription = {
      ...mockProduct,
      descripcion: ''
    };

    renderWithRouter(<CardBody product={productWithoutDescription} />);

    expect(screen.getByText('Alimento para perros - Champion Dog')).toBeTruthy();
    expect(screen.getByText('$30.000')).toBeTruthy();
  });

  it('aplica las clases CSS correctamente', () => {
    const { container } = renderWithRouter(<CardBody product={mockProduct} />);

    const cardBody = container.querySelector('.card-body');
    expect(cardBody).toBeTruthy();
    expect(cardBody.classList.contains('card-body')).toBe(true);
  });

  it('renderiza con diferentes productos de las categorías', () => {
    const techProduct = {
      id: 5,
      nombre: "Smartphone Samsung Galaxy S22",
      precio: 450000,
      descripcion: "Teléfono inteligente con cámara de alta resolución y rendimiento superior.",
      url: "/img/productos/tecnologia/tecnologia1.webp"
    };

    renderWithRouter(<CardBody product={techProduct} />);

    expect(screen.getByText('Smartphone Samsung Galaxy S22')).toBeTruthy();
    expect(screen.getByText('$450.000')).toBeTruthy();
    expect(screen.getByText('Teléfono inteligente con cámara de alta resolución y rendimiento superior.')).toBeTruthy();
  });

  it('maneja productos con precios altos correctamente', () => {
    const expensiveProduct = {
      id: 7,
      nombre: "Laptop MacBook Pro 14",
      precio: 1500000,
      descripcion: "Potente laptop de Apple con procesador M1 Pro.",
      url: "/img/productos/tecnologia/tecnologia3.webp"
    };

    renderWithRouter(<CardBody product={expensiveProduct} />);

    expect(screen.getByText('$1.500.000')).toBeTruthy();
  });
});