import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/atoms/Container';
import Card from '../components/atoms/Card';
import CardBody from '../components/molecules/CardBody';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import FormGroup from '../components/atoms/FormGroup';
import Input from '../components/atoms/Input';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import '../styles/EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  
  const userData = {
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Principal #123, Santiago, Chile'
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Esta es una demostración. En una aplicación real se guardarían los cambios.');
    navigate('/profile');
  };

  return (
    <Container className="editar-perfil-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="editar-perfil-card">
            <CardBody className="p-4">
              <Text variant="h2" className="editar-perfil-titulo">
                Editar Perfil
              </Text>

              <Text variant="p" className="text-muted text-center mb-4">
                Formulario de demostración - Los cambios no se guardarán
              </Text>

              <form onSubmit={handleSubmit}>
                <FormGroup label="Nombre completo" className="mb-3">
                  <Input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    defaultValue={userData.nombre}
                    readOnly
                  />
                </FormGroup>

                <FormGroup label="Email" className="mb-3">
                  <Input
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    defaultValue={userData.email}
                    readOnly
                  />
                </FormGroup>

                <FormGroup label="Teléfono" className="mb-3">
                  <Input
                    type="tel"
                    name="telefono"
                    placeholder="+56 9 1234 5678"
                    defaultValue={userData.telefono}
                    readOnly
                  />
                </FormGroup>

                <FormGroup label="Dirección" className="mb-4">
                  <Input
                    type="text"
                    name="direccion"
                    placeholder="Tu dirección"
                    defaultValue={userData.direccion}
                    readOnly
                  />
                </FormGroup>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button 
                    type="button" 
                    variant="outline-secondary" 
                    onClick={handleCancel}
                    className="editar-perfil-boton editar-perfil-boton-secundario"
                  >
                    Volver al Perfil
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary"
                    className="editar-perfil-boton editar-perfil-boton-primario"
                  >
                    Guardar Cambios (Demo)
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;