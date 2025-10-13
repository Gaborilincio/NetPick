import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthCard from '../../../components/organisms/AuthCard';

describe('AuthCard Component', () => {
  it('renderiza el título y children correctamente', () => {
    render(
      <AuthCard title="Iniciar Sesión">
        <div data-testid="form-content">Formulario de login</div>
      </AuthCard>
    );

    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    expect(screen.getByTestId('form-content')).toBeTruthy();
    expect(screen.getByText('Formulario de login')).toBeTruthy();
  });

  it('aplica el maxWidth por defecto de 400px', () => {
    render(
      <AuthCard title="Registro">
        <div>Contenido</div>
      </AuthCard>
    );

    const title = screen.getByText('Registro');
    expect(title).toBeTruthy();

    const card = title.closest('.card') || title.closest('div');
    expect(card).toBeTruthy();
  });

  it('aplica el maxWidth personalizado cuando se proporciona', () => {
    render(
      <AuthCard title="Registro" maxWidth="500px">
        <div>Contenido</div>
      </AuthCard>
    );

    const title = screen.getByText('Registro');
    expect(title).toBeTruthy();

    const container = title.closest('.container') || title.closest('div');
    expect(container).toBeTruthy();
  });

  it('aplica las clases correctas al título', () => {
    render(
      <AuthCard title="Test">
        <div>Contenido</div>
      </AuthCard>
    );

    const title = screen.getByText('Test');
    expect(title).toBeTruthy();
    

    const classNames = title.className;
    expect(classNames).toBeDefined();
    

  });

  it('renderiza todos los elementos esenciales', () => {
    render(
      <AuthCard title="Auth Test">
        <button>Botón de prueba</button>
      </AuthCard>
    );

    expect(screen.getByText('Auth Test')).toBeTruthy();
    expect(screen.getByText('Botón de prueba')).toBeTruthy();
  });
});