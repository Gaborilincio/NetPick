import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import ProductCard from '../components/molecules/ProductCard';
import productos from '../data/Products';
import '../styles/Category.css';

function Category() {
  const { categoryName } = useParams();
  
  const productosCategoria = productos[categoryName];

  if (!productosCategoria) {
    return (
      <div className="categoria-container">
        <Container>
          <Text variant="h1" className="text-center">Categoría no encontrada</Text>
          <Text variant="p" className="text-center text-muted">
            La categoría "{categoryName}" no existe.
          </Text>
        </Container>
      </div>
    );
  }

  return (
    <div className="categoria-container">
      <Container>
        <Text variant="h1" className="categoria-titulo">
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
    </div>
  );
}

export default Category;