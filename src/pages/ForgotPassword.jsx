import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/organisms/AuthCard';
import FormGroup from '../components/atoms/FormGroup';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Alert from '../components/atoms/Alert';
import Text from '../components/atoms/Text';
import Link from '../components/atoms/Link';
import '../styles/ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico');
      setEmail('');
    } catch (err) {
      setMessage('Error al enviar el correo de recuperación');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="recuperar-container">
      <AuthCard title="Recuperar Contraseña">
        <div className="text-center mb-4">
          <Text variant="p" className="recuperar-descripcion">
            Ingresa tu correo electrónico y te enviaremos un enlace de recuperación
          </Text>
        </div>

        {message && (
          <Alert variant={message.includes('Error') ? 'danger' : 'success'}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup label="Correo electrónico" className="mb-4">
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 recuperar-boton" 
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
          </Button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" onClick={handleBackToLogin} className="recuperar-enlace">
            ← Volver al inicio de sesión
          </Link>
        </div>
      </AuthCard>
    </div>
  );
}

export default ForgotPassword;