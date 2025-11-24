import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container'; 

function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(correo, clave);
      navigate('/'); 
    } catch (err) {
      console.log(err); 
      setError(err.message || 'Error desconocido al iniciar sesión');
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </Container>
  );
}

export default Login;