import React from 'react';
import Container from '../components/atoms/Container';
import CategoryGrid from '../components/molecules/CategoryGrid';
import Footer from '../components/organisms/Footer';
import '../styles/Home.css';

function Home() {
  const categories = [
    {
      title: "Hogar",
      image: "/img/miniaturaHogar.webp",
      description: "Comienza por renovar los espacios de tu hogar y dar un nuevo aire en este",
      link: "/category/hogar"
    },
    {
      title: "Tecnología", 
      image: "/img/miniaturaTecnologia.webp",
      description: "Productos de ultima generación, descuentos y más ¿Que esperas? Entra Ya!",
      link: "/category/tecnologia"
    },
    {
      title: "Accesorios",
      image: "/img/miniaturaAccesorios.webp", 
      description: "Descubre una gran variedad de Accesorios.",
      link: "/category/accesorios"
    },
    {
      title: "Mascotas",
      image: "/img/miniaturaHogar.webp",
      description: "¡Todo lo que tu mascota necesita! Alimento, entretención, casas y más.",
      link: "/category/mascotas"
    }
  ];

  return (
    <>
      <main className="homeContainer">
        <Container>
          <CategoryGrid categories={categories} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Home;