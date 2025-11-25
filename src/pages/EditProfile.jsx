import React, { useState } from 'react'; // Importamos useState
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

  const [formData, setFormData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Principal #123, Santiago, Chile'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/profile'); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a guardar:", formData);
    alert('¡Cambios guardados con éxito! (Demo)');
    navigate('/perfil'); 
  };

  return (
    <div className="editar-perfil-container py-5 bg-light" style={{ minHeight: '80vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow border-0">
              <CardBody className="p-4 p-md-5"> 
                
                <Text variant="h2" className="text-center mb-3 fw-bold">
                  Editar Perfil
                </Text>

                <Text variant="p" className="text-muted text-center mb-4 small">
                  Actualiza tu información personal
                </Text>

                <form onSubmit={handleSubmit}>
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

                  <FormGroup label="Teléfono" className="mb-3">
                    <Input
                      type="tel"
                      name="telefono"
                      placeholder="+56 9 1234 5678"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup label="Dirección" className="mb-4">
                    <Input
                      type="text"
                      name="direccion"
                      placeholder="Tu dirección"
                      value={formData.direccion}
                      onChange={handleChange}
                      as="textarea" 
                    />
                  </FormGroup>

                  <hr className="my-4" />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button 
                      type="button" 
                      variant="outline-secondary" 
                      onClick={handleCancel}
                      className="px-4" 
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                      className="px-4"
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditProfile;