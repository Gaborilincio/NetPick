import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../../components/molecules/LoginForm';

describe('LoginForm Component', () => {
  it('renderiza el formulario de login correctamente', () => {
    render(
      <LoginForm 
        email=""
        setEmail={() => {}}
        password=""
        setPassword={() => {}}
        error=""
        loading={false}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
  });

  it('muestra el error cuando existe', () => {
    render(
      <LoginForm 
        email=""
        setEmail={() => {}}
        password=""
        setPassword={() => {}}
        error="Error de credenciales"
        loading={false}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByText('Error de credenciales')).toBeTruthy();
  });

  it('muestra el estado de carga correctamente', () => {
    render(
      <LoginForm 
        email=""
        setEmail={() => {}}
        password=""
        setPassword={() => {}}
        error=""
        loading={true}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByText('Iniciando sesión...')).toBeTruthy();
    expect(screen.getByText('Iniciando sesión...').disabled).toBe(true);
  });

  it('llama a onSubmit cuando se envía el formulario', () => {
  const mockOnSubmit = jasmine.createSpy('onSubmit').and.callFake(e => {
    if (e && e.preventDefault) e.preventDefault();
  });
  
  render(
    <LoginForm 
      email="test@test.com"
      setEmail={() => {}}
      password="password"
      setPassword={() => {}}
      error=""
      loading={false}
      onSubmit={mockOnSubmit}
    />
  );

  // Simular el envío haciendo clic en el botón
  fireEvent.click(screen.getByText('Iniciar Sesión'));
  expect(mockOnSubmit).toHaveBeenCalledTimes(1);
});
});