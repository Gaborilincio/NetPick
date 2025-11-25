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
  const [allProducts, setAllProducts] = useState([]); 
  const [productos, setProductos] = useState([]);     
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({});

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductService.getProducts(); 
      setAllProducts(data);
      setProductos(data); 
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("Hubo un problema al cargar los productos.");
      setAllProducts([]);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {

    let resultado = [...allProducts];

    if (currentFilters.search) {
      const termino = currentFilters.search.toLowerCase();
      resultado = resultado.filter(p => 
        p.nombre && p.nombre.toLowerCase().includes(termino)
      );
    }

    if (currentFilters.minPrice) {
      resultado = resultado.filter(p => parseFloat(p.precio) >= parseFloat(currentFilters.minPrice));
    }

    if (currentFilters.maxPrice) {
      resultado = resultado.filter(p => parseFloat(p.precio) <= parseFloat(currentFilters.maxPrice));
    }

    if (currentFilters.category && currentFilters.category !== 'todas') {
       resultado = resultado.filter(p => p.categoria === currentFilters.category);
    }

    setProductos(resultado);

  }, [currentFilters, allProducts]); 

  const handleFilterSubmit = (filters) => {
    console.log("Filtros recibidos:", filters); 
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