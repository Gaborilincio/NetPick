import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import ProductCard from '../components/molecules/ProductCard';
import productos from '../data/Products';

function Category() {
  const { categoryName } = useParams();
  
  const productosCategoria = productos[categoryName];

  if (!productosCategoria) {
    return (
      <Container className="my-5">
        <Text variant="h1" className="text-center">Categoría no encontrada</Text>
        <Text variant="p" className="text-center text-muted">
          La categoría "{categoryName}" no existe.
        </Text>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Text variant="h1" className="text-capitalize text-center mb-5">
        {categoryName}
      </Text>
      <Row>
        {productosCategoria.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Category;