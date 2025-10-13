import React from 'react';
import { Card } from 'react-bootstrap';
import Text from '../atoms/Text';
import Price from '../atoms/Price';
import Button from '../atoms/Button';
import Link from '../atoms/Link';

function CardBody({ product, children, ...props }) {
  if (product) {
    return (
      <Card.Body {...props}>
        <Text variant="h5" className="card-title">{product.nombre}</Text>
        <Text variant="p" className="card-text flex-grow-1">
          {product.descripcion}
        </Text>
        <div className="mt-auto">
          <Text variant="h5" className="text-primary mb-3">
            <Price amount={product.precio} />
          </Text>
          <div className="d-grid gap-2">
            <Button as={Link} to={`/product/${product.id}`} variant="outline-primary">
              Ver Detalles
            </Button>
            <Button variant="primary">
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </Card.Body>
    );
  }

  return <Card.Body {...props}>{children}</Card.Body>;
}

export default CardBody;