import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Card from '../components/atoms/Card';
import CardBody from '../components/molecules/CardBody';
import Image from '../components/atoms/Image';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import productos from '../data/Products';

function ProductDetail() {
  const { id } = useParams();
  
  const todosLosProductos = Object.values(productos).flat();
  const product = todosLosProductos.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="my-5">
        <Text variant="h1" className="text-center">Producto no encontrado</Text>
        <Text variant="p" className="text-center text-muted">
          El producto con ID {id} no existe.
        </Text>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow">
            <Row className="g-0">
              <Col md={6}>
                <Image 
                  src={product.url} 
                  alt={product.nombre} 
                  className="img-fluid h-100"
                  style={{ 
                    objectFit: 'cover', 
                    minHeight: '400px',
                    width: '100%' 
                  }}
                />
              </Col>
              <Col md={6}>
                <CardBody 
                  product={product}
                  className="h-100 d-flex flex-column p-4"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;