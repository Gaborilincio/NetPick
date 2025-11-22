import React, { useState, useEffect } from 'react';
import Container from '../components/atoms/Container';
import CategoryGrid from '../components/molecules/CategoryGrid'; 
import '../styles/Home.css';
import { ProductService } from '../services/ProductService'; 

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await ProductService.getAllProducts();
      const mappedProducts = data.map(producto => ({
        title: producto.nombre,           
        image: producto.linkImagen,       
        description: `Precio: $${producto.precio} - ${producto.descripcion}`, 
        link: `/product/${producto.idProducto}` 
      }));

      setProducts(mappedProducts);
    };

    fetchProducts();
  }, []);
  return (
    <div className="homeContainer">
      <Container>
        {}
        <h2 style={{textAlign: 'center', margin: '20px 0'}}>Nuestros Productos Destacados</h2>
        
        {}
        {products.length > 0 ? (
           <CategoryGrid categories={products} />
        ) : (
           <p style={{textAlign: 'center'}}>Cargando productos del servidor...</p>
        )}
      </Container>
    </div>
  );
}

export default Home;