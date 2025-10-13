import React from 'react';
import Card from '../atoms/Card';
import CardBody from '../molecules/CardBody';  
import Image from '../atoms/Image';

function ProductCard({ product }) {
  return (
    <Card className="h-100 shadow-sm">
      <Image 
        src={product.url} 
        alt={product.nombre}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <CardBody 
        product={product}
        className="d-flex flex-column"
      />
    </Card>
  );
}

export default ProductCard;