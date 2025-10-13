import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/organisms/AuthCard';
import LoginForm from '../components/molecules/LoginForm';
import Text from '../components/atoms/Text';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }
  
    const testUsers = [
      { id: 1, email: "admin@netpick.com", password: "123456", nombre: "Admin NetPick" },
      { id: 2, email: "user@netpick.com", password: "123456", nombre: "Usuario Demo" }
    ];
  
    const foundUser = testUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        ...foundUser,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('netpick_user', JSON.stringify(userData));
      
      window.location.href = '/profile';
    } else {
      setError('Credenciales incorrectas. Por favor, verifica tus datos.');
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Iniciar Sesión">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        loading={loading}
        onSubmit={handleSubmit}
      />
      
      <div className="text-center mt-3">
        <Text variant="p" className="text-muted small">
          Usuario demo: admin@netpick.com / 123456
        </Text>
      </div>
    </AuthCard>
  );
}

export default Login;