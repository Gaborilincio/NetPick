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
        if (data) setProduct(data);
        else setError("Producto no encontrado");
      } catch (err) {
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

  if (loading) return <div className="text-center py-5">Cargando...</div>;
  if (error || !product) return <div className="text-center py-5 text-danger">{error}</div>;

  const imagenSrc = product.linkImagen || product.url || product.image || "https://via.placeholder.com/500";

  const categoriaNombre = typeof product.categoria === 'object' ? product.categoria.nombre : product.categoria;



  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow overflow-hidden">
            <Row className="g-0">
              <Col md={6} className="bg-light d-flex align-items-center justify-content-center">
                <Image
                  src={product.url || product.image}
                  alt={product.nombre}
                  className="img-fluid p-4"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
              </Col>
              <Col md={6} className="p-4 d-flex flex-column justify-content-center">
                <Text variant="small" className="text-muted text-uppercase mb-2">
                  {typeof product.categoria === 'object' ? product.categoria.nombre : product.categoria}
                </Text>
                <Text variant="h2" className="mb-3 fw-bold">
                  {product.nombre}
                </Text>
                <Text variant="p" className="text-secondary mb-4">
                  {product.descripcion || "Sin descripción disponible."}
                </Text>
                <Text variant="h3" className="text-primary mb-4">
                  ${product.precio}
                </Text>

                <hr className="my-4" />
                <div className="d-grid gap-2">
                  <Button
                    onClick={handleAddToCart}
                    className={`btn-lg ${agregado ? 'btn-success' : 'btn-primary'}`}
                  >
                    {agregado ? '¡Agregado al Carrito!' : 'Agregar al Carrito'}
                  </Button>
                </div>

              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;