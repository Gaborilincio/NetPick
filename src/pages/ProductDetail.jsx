import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Card from '../components/atoms/Card';
import Image from '../components/atoms/Image';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import { ProductService } from '../services/ProductService';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getProductById(id);
        console.log("DATOS DETALLE:", data); 
        if (data) setProduct(data);
        else setError("Producto no encontrado");
      } catch (err) {
        console.error(err);
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAgregado(true);
      setTimeout(() => setAgregado(false), 2000);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (error || !product) return <div className="text-center py-5 text-danger">{error}</div>;

  const imagenSrc = product.linkImagen || product.url || product.image || product.img || "https://via.placeholder.com/500";
  
  const categoriaNombre = product.categoria ? (typeof product.categoria === 'object' ? product.categoria.nombre : product.categoria) : "General";

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow overflow-hidden border-0">
            <Row className="g-0">
              <Col md={6} className="bg-light d-flex align-items-center justify-content-center p-4">
                <Image 
                  src={imagenSrc} 
                  alt={product.nombre} 
                  className="img-fluid rounded"
                  style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/500?text=Sin+Imagen" }}
                />
              </Col>
              <Col md={6} className="p-4 p-md-5 d-flex flex-column justify-content-center">
                <Text variant="small" className="text-muted text-uppercase mb-2 fw-bold letter-spacing-1">
                  {categoriaNombre}
                </Text>

                <Text variant="h2" className="mb-3 fw-bold display-6">
                  {product.nombre}
                </Text>

                <Text variant="h3" className="text-primary mb-4 fw-bold">
                  ${product.precio}
                </Text>

                <Text variant="p" className="text-secondary mb-5" style={{ lineHeight: '1.6' }}>
                  {product.descripcion}
                </Text>

                <div className="d-grid gap-2">
                  <Button 
                    onClick={handleAddToCart}
                    className={`btn-lg py-3 ${agregado ? 'btn-success' : 'btn-primary'}`}
                  >
                    {agregado ? (
                        <>
                            <i className="bi bi-check-circle me-2"></i> Agregado al Carrito
                        </>
                    ) : (
                        <>
                            <i className="bi bi-cart-plus me-2"></i> Agregar al Carrito
                        </>
                    )}
                  </Button>
                </div>
                {product.stock !== undefined && (
                    <Text variant="small" className="text-muted mt-3 text-center">
                        Stock disponible: {product.stock} unidades
                    </Text>
                )}

              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;