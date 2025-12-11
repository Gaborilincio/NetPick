import React from 'react';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import { useNavigate } from 'react-router-dom';

function TermsPage() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col className="col-12 col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <Text variant="h2" className="fw-bold mb-4 text-center">Términos y Condiciones</Text>
              
              <Text variant="p" className="text-muted mb-4">
                Última actualización: {new Date().toLocaleDateString()}
              </Text>

              <hr />

              <Text variant="h4" className="mt-4 mb-3">1. Introducción</Text>
              <Text variant="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>

              <Text variant="h4" className="mt-4 mb-3">2. Uso del Sitio</Text>
              <Text variant="p">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>

              <Text variant="h4" className="mt-4 mb-3">3. Propiedad Intelectual</Text>
              <Text variant="p">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </Text>

              <div className="text-center mt-5">
                <Button variant="primary" onClick={() => navigate(-1)}>
                  Entendido
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TermsPage;