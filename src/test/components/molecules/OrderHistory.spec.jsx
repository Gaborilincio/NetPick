import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderHistory from '../../../components/molecules/OrderHistory';

describe('OrderHistory Component', () => {
  const mockPedidos = [
    {
      id: 1,
      producto: 'Laptop Dell',
      fecha: '2024-01-15',
      estado: 'Entregado'
    },
    {
      id: 2,
      producto: 'Mouse Inalámbrico',
      fecha: '2024-01-20',
      estado: 'En camino'
    },
    {
      id: 3,
      producto: 'Teclado Mecánico',
      fecha: '2024-01-25',
      estado: 'Pendiente'
    }
  ];

  it('renderiza todos los pedidos correctamente', () => {
    render(<OrderHistory pedidos={mockPedidos} />);

    expect(screen.getByText('Laptop Dell')).toBeTruthy();
    expect(screen.getByText('Mouse Inalámbrico')).toBeTruthy();
    expect(screen.getByText('Teclado Mecánico')).toBeTruthy();
  });

  it('muestra las fechas de los pedidos', () => {
    render(<OrderHistory pedidos={mockPedidos} />);

    expect(screen.getByText('Fecha: 2024-01-15')).toBeTruthy();
    expect(screen.getByText('Fecha: 2024-01-20')).toBeTruthy();
    expect(screen.getByText('Fecha: 2024-01-25')).toBeTruthy();
  });

  it('aplica los badges correctos según el estado', () => {
    render(<OrderHistory pedidos={mockPedidos} />);

    const entregadoBadge = screen.getByText('Entregado');
    const enCaminoBadge = screen.getByText('En camino');
    const pendienteBadge = screen.getByText('Pendiente');

    expect(entregadoBadge.className).toContain('bg-success');
    expect(enCaminoBadge.className).toContain('bg-warning');
    expect(pendienteBadge.className).toContain('bg-secondary');
  });

  it('renderiza el botón "Ver todos los pedidos"', () => {
    render(<OrderHistory pedidos={mockPedidos} />);

    const button = screen.getByText('Ver todos los pedidos');
    expect(button).toBeTruthy();
    expect(button.className).toContain('btn-outline-primary');
  });
});