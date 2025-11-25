import React from 'react';
import { Card } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom'; 
import Text from '../atoms/Text';
import Price from '../atoms/Price';
import Button from '../atoms/Button';
import { useCart } from '../../context/CartContext'; 

function CardBody({ product, children, ...props }) {
  const { addToCart } = useCart();

  if (product) {
    const id = product.id || product.idProducto || product._id;
    if (!id) {
        console.warn("CardBody: Producto sin ID", product);
    }

    return (
      <Card.Body {...props} className="d-flex flex-column h-100">
        <Text variant="h5" className="card-title text-truncate" title={product.nombre}>
            {product.nombre || product.title}
        </Text>

        <Text variant="p" className="card-text flex-grow-1" style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 3, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
        }}>
          {product.descripcion}
        </Text>
        
        <div className="mt-auto pt-3">
          <Text variant="h5" className="text-primary mb-3 fw-bold">
            <Price amount={product.precio} />
          </Text>
          
          <div className="d-grid gap-2">
            {id ? (
                <Button 
                    as={RouterLink} 
                    to={`/productos/${id}`} 
                    variant="outline-primary"
                >
                    Ver Detalles
                </Button>
            ) : (
                <span className="text-danger small">Error: Sin ID</span>
            )}

            <Button 
                variant="primary"
                onClick={() => addToCart(product)}
            >
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