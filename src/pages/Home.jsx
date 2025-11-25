import React, { useState, useEffect } from 'react';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Text from '../components/atoms/Text';
import ProductCard from '../components/molecules/ProductCard'; 
import { ProductService } from '../services/ProductService';
import '../styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getProducts();
        setProducts(data.slice(0, 8)); 
        
      } catch (error) {
        console.error("Error cargando home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="homeContainer">
      <Container>
        <div className="text-center my-5">
           <Text variant="h1" style={{ color: '#333' }}>
             Nuestros Productos Destacados
           </Text>
           <Text variant="p" className="text-muted">
             Lo mejor de nuestra colección para ti
           </Text>
        </div>
        
        {loading ? (
           <div style={{textAlign: 'center', padding: '50px'}}>
             <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
             </div>
           </div>
        ) : (
           <Row>
             {products.length > 0 ? (
               products.map((producto) => (
                 <Col key={producto.id || producto.idProducto} sm={12} md={6} lg={3} className="mb-4">
                    <ProductCard product={producto} />
                 </Col>
               ))
             ) : (
               <div className="text-center w-100">No hay productos para mostrar.</div>
             )}
           </Row>
        )}
      </Container>
    </div>
  );
}

export default Home;