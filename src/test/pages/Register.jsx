import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/organisms/AuthCard';
import RegisterForm from '../components/molecules/RegisterForm';
import Text from '../components/atoms/Text';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now(),
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        fechaRegistro: new Date().toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        avatar: '/img/default-avatar.png'
      };
      
      localStorage.setItem('user_data', JSON.stringify(userData));
      navigate('/profile');
    } catch (err) {
      setError('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Crear Cuenta" maxWidth="500px">
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
      />

      <div className="text-center mt-3">
        <Text variant="p" className="mb-0">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </Text>
      </div>
    </AuthCard>
  );
}

export default Register;