import React, { useState, useEffect } from 'react';
import Container from '../components/atoms/Container';
import CategoryGrid from '../components/molecules/CategoryGrid';
import '../styles/Home.css';
import { ProductService } from '../services/ProductService';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        console.log("Datos recibidos:", data); 

        const mappedProducts = data.map(producto => ({
          title: producto.nombre || "Producto sin nombre",

          image: producto.linkImagen || "https://via.placeholder.com/300", 
          
          description: `Precio: $${producto.precio || 0} - ${producto.descripcion || "Sin descripción"}`,
          
          link: `/product/${producto.idProducto}`
        }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error cargando home:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="homeContainer">
      <Container>
        <h2 style={{ textAlign: 'center', margin: '30px 0', color: '#333' }}>
          Nuestros Productos
        </h2>
        
        {products.length > 0 ? (
           <CategoryGrid categories={products} />
        ) : (
           <div style={{textAlign: 'center', padding: '50px'}}>
             <p>Cargando catálogo...</p>
           </div>
        )}
      </Container>
    </div>
  );
}

export default Home;