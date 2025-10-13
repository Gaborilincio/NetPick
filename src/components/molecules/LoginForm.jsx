import React from 'react';
import FormGroup from '../atoms/FormGroup';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Alert from '../atoms/Alert';
import Text from '../atoms/Text';

function LoginForm({ email, setEmail, password, setPassword, error, loading, onSubmit }) {
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <form onSubmit={onSubmit}>
        <FormGroup label="Email" className="mb-3">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup label="Contraseña" className="mb-4">
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>

      <div className="text-center mt-3">
        <Text variant="p" className="mb-2">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </Text>
        <Text variant="p" className="mb-0">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </Text>
      </div>
    </>
  );
}

export default LoginForm;