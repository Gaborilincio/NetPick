import React from 'react';
import { render, screen } from '@testing-library/react';
import Price from '../../../components/atoms/Price';

describe('Price Component', () => {
  it('renderiza el precio correctamente', () => {
    render(<Price amount={1000} />);
    const priceElement = screen.getByText('$1000');
    expect(priceElement).toBeTruthy();
  });
});