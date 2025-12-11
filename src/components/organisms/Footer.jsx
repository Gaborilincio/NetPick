import React from 'react';
import Container from '../atoms/Container';
import Row from '../atoms/Row';
import Col from '../atoms/Col';
import Text from '../atoms/Text';
import Link from '../atoms/Link'; 
import '../../styles/Footer.css'; 

function Footer() {
  
  const handleMockSubmit = (e) => {
    e.preventDefault();
    alert("¡Suscrito al newsletter (simulado)!");
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
      <Container>
        <Row>
          <Col className="col-12 col-md-3 mb-4">
            <Text variant="h5" className="text-warning fw-bold mb-3">NetPick</Text>
            <Text variant="p" className="text-white-50 small">
              Tu tienda online de confianza.
            </Text>
          </Col>
          <Col className="col-6 col-md-3 mb-4">
            <Text variant="h6" className="text-uppercase fw-bold mb-3 text-white">Tienda</Text>
            <div className="d-flex flex-column gap-2">
              <Link to="/productos" className="text-white-50 text-decoration-none small hover-light">Productos</Link>
              <Link to="/carrito" className="text-white-50 text-decoration-none small hover-light">Mi Carrito</Link>
              <Link to="/my-purchases" className="text-white-50 text-decoration-none small hover-light">Mis Compras</Link>
            </div>
          </Col>
          <Col className="col-6 col-md-3 mb-4">
            <Text variant="h6" className="text-uppercase fw-bold mb-3 text-white">Información</Text>
            <div className="d-flex flex-column gap-2">
              <Link to="/trabaja-con-nosotros" className="text-white-50 text-decoration-none small hover-light">
                Trabaja con nosotros
              </Link>
              <Link to="/terminos" className="text-white-50 text-decoration-none small hover-light">
                Términos y condiciones
              </Link>
              <Link to="/terminos" className="text-white-50 text-decoration-none small hover-light">
                Política de privacidad
              </Link>
            </div>
          </Col>

          <Col className="col-12 col-md-3 mb-4">
            <Text variant="h6" className="text-uppercase fw-bold mb-3 text-white">Newsletter</Text>
            <form onSubmit={handleMockSubmit} className="d-flex gap-2">
              <input 
                type="email" 
                placeholder="Tu correo" 
                className="form-control form-control-sm bg-secondary text-white border-secondary"
                style={{ maxWidth: '140px' }}
              />
              <button className="btn btn-primary btn-sm">Enviar</button>
            </form>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <Row>
          <Col className="text-center">
            <Text variant="p" className="text-white-50 small mb-0">
              &copy; {new Date().getFullYear()} NetPick.
            </Text>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;