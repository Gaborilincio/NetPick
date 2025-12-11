import React, { useState } from 'react';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';

function WorkWithUsPage() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setEnviado(true);
      window.scrollTo(0, 0); 
    }, 1000);
  };

  if (enviado) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-success p-5 shadow-sm">
          <h1 className="display-4">¡Postulación Enviada! 🎉</h1>
          <Text variant="p" className="lead mt-3">
            Hemos recibido tus datos correctamente. Nuestro equipo de recursos humanos revisará tu perfil.
          </Text>
          <Button variant="outline-success" className="mt-4" onClick={() => setEnviado(false)}>
            Enviar otra postulación
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col className="col-12 col-md-8">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <Text variant="h3" className="mb-0 text-white">Trabaja con Nosotros</Text>
              <Text variant="p" className="mb-0 text-white-50">Únete al equipo de NetPick</Text>
            </div>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nombre Completo</label>
                  <input type="text" className="form-control" required placeholder="Nombre completo" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Correo Electrónico</label>
                  <input type="email" className="form-control" required placeholder="Correo eléctronico" />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Área de Interés</label>
                  <select className="form-select">
                    <option>Desarrollo Web</option>
                    <option>Logística</option>
                    <option>Ventas</option>
                    <option>Marketing</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Cuéntanos sobre ti</label>
                  <textarea className="form-control" rows="4" placeholder="Breve presentación..."></textarea>
                </div>

                <div className="d-grid">
                  <Button variant="primary" size="lg" type="submit">
                    Enviar Postulación
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WorkWithUsPage;