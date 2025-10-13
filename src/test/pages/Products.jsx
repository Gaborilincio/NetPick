import React from 'react';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import ProductCard from '../components/molecules/ProductCard';
import productos from '../data/Products';

function Products() {
  return (
    <Container className="my-5">
      <Text variant="h1" className="text-center mb-5">Nuestros Productos</Text>
      
      {Object.entries(productos).map(([categoria, productosCategoria]) => (
        <div key={categoria} className="mb-5">
          <Text variant="h2" className="text-capitalize mb-4 border-bottom pb-2">
            {categoria}
          </Text>
          <Row>
            {productosCategoria.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default Products;