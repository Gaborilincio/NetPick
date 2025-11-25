import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Cart from './pages/Cart';
import ForgotPassword from './pages/ForgotPassword';
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/productos/:id" element={<ProductDetail />} />
              <Route path="/categorias" element={<Category />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/perfil/editar" element={<EditProfile />} />
              <Route path="/recuperar" element={<ForgotPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
