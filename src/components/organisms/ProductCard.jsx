import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../atoms/Card';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useCart } from '../../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const id = product.id || product.idProducto || product._id;
  const imagenSrc = product.url || product.image || product.linkImagen || product.img || "https://via.placeholder.com/300";
  if (!id) {
    console.warn("Producto sin ID detectado:", product);
    return null;
  }

  return (
    <Card className="h-100 shadow-sm d-flex flex-column">
      <div style={{ height: '220px', overflow: 'hidden', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <Image
          src={imagenSrc}
          alt={product.nombre || product.title}
          className="img-fluid"
          style={{ maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <Text variant="h5" className="card-title mb-2 text-truncate" title={product.nombre}>
          {product.nombre || product.title || "Producto sin nombre"}
        </Text>

        <Text variant="h6" className="text-primary mb-3 fw-bold">
          ${product.precio || 0}
        </Text>

        <p className="card-text text-muted small flex-grow-1" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.descripcion || "Sin descripción disponible"}
        </p>

        <div className="mt-3 d-grid gap-2">
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