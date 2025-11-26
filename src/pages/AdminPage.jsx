import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';

function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const IS_ADMIN = user?.rol === 'ADMIN' || user?.email === 'admin@netpick.com';
    
    if (!user || !IS_ADMIN) {
        navigate('/'); 
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Container className="my-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
            <Text variant="h1">Panel de Administración</Text>
            <Text variant="p" className="text-muted">Bienvenido, {user.nombre}</Text>
        </div>
        <span className="badge bg-warning text-dark fs-6">Modo Administrador</span>
      </div>

      <Row>
        <Col xs={12} md={4} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <div className="card-body text-center p-5">
              <div className="mb-3">
                <i className="bi bi-box-seam text-primary" style={{ fontSize: '3rem' }}></i>
              </div>
              <Text variant="h4">Productos</Text>
              <p className="text-muted">Agregar, editar o eliminar productos de la tienda.</p>
              <Button className="btn-primary w-100 mt-3" onClick={() => alert('Aquí iría a /admin/productos')}>
                Gestionar Productos
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;