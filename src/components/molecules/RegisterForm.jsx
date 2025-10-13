import React from 'react';
import FormGroup from '../atoms/FormGroup';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Alert from '../atoms/Alert';
import Row from '../atoms/Row';
import Col from '../atoms/Col';

function RegisterForm({ formData, handleChange, error, loading, onSubmit }) {
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      <form onSubmit={onSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup label="Nombre completo" className="mb-3">
              <Input
                type="text"
                name="nombre"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup label="Email" className="mb-3">
              <Input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup label="Teléfono" className="mb-3">
          <Input
            type="tel"
            name="telefono"
            placeholder="+56 9 1234 5678"
            value={formData.telefono}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Dirección" className="mb-3">
          <Input
            type="text"
            name="direccion"
            placeholder="Tu dirección"
            value={formData.direccion}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Contraseña" className="mb-3">
          <Input
            type="password"
            name="password"
            placeholder="Mínimo 6 caracteres"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup label="Confirmar contraseña" className="mb-4">
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </Button>
      </form>
    </>
  );
}

export default RegisterForm;