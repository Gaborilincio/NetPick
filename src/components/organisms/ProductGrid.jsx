import React from 'react';
import Row from '../atoms/Row';
import Col from '../atoms/Col';
import Text from '../atoms/Text';
import ProductCard from '../molecules/ProductCard';

function ProductGrid({ productos, categoria }) {
  return (
    <div className="mb-5">
      <Text variant="h2" className="text-capitalize mb-4">{categoria}</Text>
      <Row>
        {productos.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductGrid;