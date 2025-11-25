import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../atoms/Card'; 
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useCart } from '../../context/CartContext'; 

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const id = product.id || product.idProducto;
  if (!product || !id) return null;

  return (
    <Card className="h-100 shadow-sm d-flex flex-column">
      <div style={{ height: '200px', overflow: 'hidden', padding: '1rem' }}>
        <Image 
          src={product.url || product.image || "https://via.placeholder.com/200"} 
          alt={product.nombre} 
          className="img-fluid w-100 h-100"
          style={{ objectFit: 'contain' }} 
        />
      </div>
      <div className="card-body d-flex flex-column">
        <Text variant="h5" className="card-title mb-2 text-truncate">
          {product.nombre || product.title}
        </Text>
        <Text variant="h6" className="text-primary mb-3">
          ${product.precio}
        </Text>
        <p className="card-text text-muted small flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
             {product.descripcion}
        </p>

        <div className="mt-auto d-grid gap-2">
            <Link to={`/productos/${id}`} className="btn btn-outline-primary">
                Ver Detalles
            </Link>
            
            <Button onClick={() => addToCart(product)} className="btn-primary">
                Agregar al Carrito
            </Button>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;