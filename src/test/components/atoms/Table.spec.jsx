import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../../../components/atoms/Table';

describe('Table Component', () => {
  it('renderiza la tabla correctamente', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Celda de prueba</td>
          </tr>
        </tbody>
      </Table>
    );
    expect(screen.getByText('Celda de prueba')).toBeTruthy();
  });

  it('aplica la variante responsive correctamente', () => {
    const { container } = render(
      <Table responsive>
        <tbody>
          <tr>
            <td>Contenido responsive</td>
          </tr>
        </tbody>
      </Table>
    );
    
    const responsiveWrapper = container.querySelector('.table-responsive');
    expect(responsiveWrapper).toBeTruthy();
  });
});