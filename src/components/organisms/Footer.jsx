import React from 'react';
import Container from '../atoms/Container';
import Row from '../atoms/Row';
import Col from '../atoms/Col';
import Text from '../atoms/Text';
import Link from '../atoms/Link';
import '../../styles/Footer.css'; 

function Footer() {
  return (
    <footer className="pie-pagina">
      <Container>
        <Row>
          <Col md={4}>
            <Text variant="h5" className="nombre-empresa">NetPick</Text>
            <Text variant="p" className="descripcion-empresa">
              Tu tienda online de confianza para tecnología, hogar y más.
            </Text>
          </Col>
          <Col md={4}>
            <Text variant="h6" className="titulo-seccion">Enlaces Rápidos</Text>
            <div className="d-flex flex-column">
              <Link to="/products" className="enlace-rapido">Productos</Link>
              <Link to="/category/tecnologia" className="enlace-rapido">Tecnología</Link>
              <Link to="/category/hogar" className="enlace-rapido">Hogar</Link>
              <Link to="/category/accesorios" className="enlace-rapido">Accesorios</Link>
            </div>
          </Col>
          <Col md={4}>
            <Text variant="h6" className="titulo-seccion">Contacto</Text>
            <Text variant="p" className="informacion-contacto">contacto@netpick.com</Text>
            <Text variant="p" className="informacion-contacto">+56 9 1234 5678</Text>
            <Text variant="p" className="informacion-contacto">Santiago, Chile</Text>
          </Col>
        </Row>
        <hr className="linea-divisoria" />
        <Row>
          <Col className="text-center">
            <Text variant="p" className="texto-derechos">
              &copy; 2024 NetPick. Todos los derechos reservados.
            </Text>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;