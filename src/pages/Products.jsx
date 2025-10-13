import React from 'react';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import ProductCard from '../components/molecules/ProductCard';
import productos from '../data/Products';
import '../styles/Products.css';

function Products() {
  return (
    <div className="productos-container">
      <Container>
        <Text variant="h1" className="productos-titulo">Nuestros Productos</Text>
        
        {Object.entries(productos).map(([categoria, productosCategoria]) => (
          <div key={categoria} className="mb-5">
            <Text variant="h2" className="categoria-titulo">
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
    </div>
  );
}

export default Products;