import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../context/AuthContext'; 

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth(); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || user.name || '',
        email: user.email || '',
        telefono: user.telefono || user.phone || '', 
        direccion: user.direccion || user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/perfil'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await updateUserProfile(formData);

    setLoading(false);

    if (result.success) {
      alert('¡Perfil actualizado correctamente!');
      navigate('/perfil');
    } else {
      setError(result.message || 'Error al guardar los cambios.');
    }
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

                {error && (
                  <div className="alert alert-danger text-center">{error}</div>
                )}

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
                      readOnly 
                      style={{ backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
                      title="El email no se puede editar"
                    />
                  </FormGroup>

                  <FormGroup label="Teléfono" className="mb-3">
                    <Input
                      type="tel"
                      name="telefono"
                      placeholder="+56 9..."
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

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button 
                      type="button" 
                      variant="outline-secondary" 
                      onClick={handleCancel}
                      className="px-4"
                      disabled={loading}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                      className="px-4"
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar Cambios'}
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