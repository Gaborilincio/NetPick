import React from 'react';
import { render, screen } from '@testing-library/react';
import FormGroup from '../../../components/atoms/FormGroup';

describe('FormGroup Component', () => {
  it('renderiza el form group correctamente', () => {
    render(<FormGroup>Campo de formulario</FormGroup>);
    expect(screen.getByText('Campo de formulario')).toBeTruthy();
  });

  it('muestra el label cuando se proporciona', () => {
    render(<FormGroup label="Email">Campo email</FormGroup>);
    expect(screen.getByText('Email')).toBeTruthy();
  });
});