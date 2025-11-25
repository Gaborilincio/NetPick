import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import ProductCard from '../components/molecules/ProductCard';
import { ProductService } from '../services/ProductService';
import '../styles/global.css';

function Category() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchAndGroupProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getProducts();

        const agrupados = data.reduce((acc, product) => {
          let nombreCat = 'Otros';
          if (product.categoria && typeof product.categoria === 'object') {
             nombreCat = product.categoria.name || product.categoria.nombre || product.categoria.title || 'Categoría Desconocida';
          } 
          else if (typeof product.categoria === 'string') {
             nombreCat = product.categoria;
          }
          if (!acc[nombreCat]) {
            acc[nombreCat] = [];
          }
          acc[nombreCat].push(product);
          return acc;
        }, {});

        setGroupedProducts(agrupados);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGroupProducts();
  }, []);


  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando categorías...</span>
        </div>
      </Container>
    );
  }

  if (Object.keys(groupedProducts).length === 0) {
    return (
      <Container className="py-5 text-center">
        <Text variant="h2">No hay categorías disponibles por el momento.</Text>
      </Container>
    );
  }

  return (
    <div className="category-page py-4">
      <Container>
        <Text variant="h1" className="text-center mb-5">Categorías</Text>
        {Object.keys(groupedProducts).map((nombreCategoria) => (
          <div key={nombreCategoria} className="mb-5 category-section">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <Text variant="h2" className="text-capitalize m-0">
                {nombreCategoria}
              </Text>
              <Link to={`/productos?category=${nombreCategoria}`} className="btn btn-outline-primary btn-sm">
                Ver todo {nombreCategoria}
              </Link>
            </div>

            <Row>
              {groupedProducts[nombreCategoria].slice(0, 4).map((product) => (
                <Col key={product.idProducto || product.id} sm={12} md={6} lg={3} className="mb-3">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Category;