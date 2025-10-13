import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../../../components/molecules/RegisterForm';

describe('RegisterForm Component', () => {
  const mockFormData = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Principal 123',
    password: 'password123',
    confirmPassword: 'password123'
  };

  let mockHandleChange;
  let mockOnSubmit;

  beforeEach(() => {
    mockHandleChange = jasmine.createSpy('handleChange'); 
    mockOnSubmit = jasmine.createSpy('onSubmit').and.callFake(e => {
      if (e && e.preventDefault) e.preventDefault();
    }); 
  });

  it('renderiza todos los campos del formulario de registro', () => {
    render(
      <RegisterForm 
        formData={mockFormData}
        handleChange={mockHandleChange}
        error=""
        loading={false}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByPlaceholderText('Tu nombre completo')).toBeTruthy();
    expect(screen.getByPlaceholderText('tu@email.com')).toBeTruthy();
    expect(screen.getByPlaceholderText('+56 9 1234 5678')).toBeTruthy();
    expect(screen.getByPlaceholderText('Tu dirección')).toBeTruthy();
    expect(screen.getByPlaceholderText('Mínimo 6 caracteres')).toBeTruthy();
    expect(screen.getByPlaceholderText('Repite tu contraseña')).toBeTruthy();
  });

  it('muestra el error cuando existe', () => {
    render(
      <RegisterForm 
        formData={mockFormData}
        handleChange={mockHandleChange}
        error="Error en el registro"
        loading={false}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Error en el registro')).toBeTruthy();
  });

  it('muestra el estado de carga correctamente', () => {
    render(
      <RegisterForm 
        formData={mockFormData}
        handleChange={mockHandleChange}
        error=""
        loading={true}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Creando cuenta...')).toBeTruthy();
    const button = screen.getByText('Creando cuenta...');
    expect(button.disabled).toBe(true); 
  });

  it('llama a handleChange cuando se modifica un campo', () => {
    render(
      <RegisterForm 
        formData={mockFormData}
        handleChange={mockHandleChange}
        error=""
        loading={false}
        onSubmit={mockOnSubmit}
      />
    );

    const nombreInput = screen.getByPlaceholderText('Tu nombre completo');
    fireEvent.change(nombreInput, { target: { value: 'María García' } });
    
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('llama a onSubmit cuando se envía el formulario', () => {
    render(
      <RegisterForm 
        formData={mockFormData}
        handleChange={mockHandleChange}
        error=""
        loading={false}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByText('Crear Cuenta');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});