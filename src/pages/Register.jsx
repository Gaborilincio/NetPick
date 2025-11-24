import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import Container from 'react-bootstrap/Container';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    clave: '',
    telefono: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(formData);
      alert('Registro exitoso. Por favor inicia sesión.');
      navigate('/login');
    } catch (err) {
      setError('Error al registrarse. Intenta nuevamente.');
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Crear Cuenta</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* nombre */}
          <div className="mb-3">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* correo */}
          <div className="mb-3">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          {/* contraseña */}
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="clave"
              className="form-control"
              value={formData.clave}
              onChange={handleChange}
              required
            />
          </div>

          {/* teléfono */}
          <div className="mb-3">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Registrarse
          </button>
        </form>
      </div>
    </Container>
  );
}

export default Register;