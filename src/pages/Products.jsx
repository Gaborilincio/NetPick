import React, { useState, useEffect, useCallback } from 'react';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import ProductFilter from '../components/organisms/ProductFilter';
import ProductCard from '../components/molecules/ProductCard';
import { ProductService } from '../services/ProductService';
import '../styles/Products.css';

function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({});

  const fetchProducts = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductService.getProducts(filters);
      setProductos(data);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("Hubo un problema al cargar los productos. Intenta nuevamente.");
      setProductos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentFilters);
  }, [currentFilters, fetchProducts]);

  const handleFilterSubmit = (filters) => {
    setCurrentFilters(filters);
  };

  const handleFilterReset = () => {
    setCurrentFilters({});
  };

  return (
    <div className="productos-container">
      <Container>
        <div className="mb-4 text-center">
            <Text variant="h1" className="productos-titulo">Nuestros Productos</Text>
            <Text variant="p" className="text-muted">Explora nuestro catálogo completo</Text>
        </div>

        <ProductFilter 
            onFilterSubmit={handleFilterSubmit} 
            onFilterReset={handleFilterReset} 
        />

        {loading && (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        )}

        {error && (
            <div className="alert alert-danger text-center" role="alert">
                {error}
            </div>
        )}

        {!loading && !error && productos.length === 0 && (
            <div className="alert alert-info text-center">
                No se encontraron productos con los filtros seleccionados.
            </div>
        )}

        {!loading && !error && productos.length > 0 && (
            <Row>
              {productos.map((product) => (
                <Col key={product.idProducto || product.id} sm={12} md={6} lg={3} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
        )}
      </Container>
    </div>
  );
}

export default Products;