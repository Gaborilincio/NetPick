import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from '../atoms/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from '../atoms/Button';
import '../../styles/Navbar.css';

function NavigationBar() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('netpick_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setCartItems(2);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('netpick_user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path ? 'activo' : '';
  };

  return (
    <Navbar expand="lg" className="navegacion" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nombre-marca">
          NetPick
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`enlace-navegacion ${isActive('/')}`}
            >
              Inicio
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/products" 
              className={`enlace-navegacion ${isActive('/products')}`}
            >
              Productos
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/category/tecnologia" 
              className={`enlace-navegacion ${isActive('/category/tecnologia')}`}
            >
              Tecnología
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/category/hogar" 
              className={`enlace-navegacion ${isActive('/category/hogar')}`}
            >
              Hogar
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <Button 
              as={Link}
              to="/cart"
              variant="primary" 
              className="boton-carrito me-3"
            >
              🛒 Carrito
              {cartItems > 0 && (
                <span className="contador-carrito">
                  {cartItems}
                </span>
              )}
            </Button>
            {user ? (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle menu-usuario" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  👤 {user.nombre}
                </button>
                <ul className="dropdown-menu desplegable-usuario">
                  <li>
                    <Link 
                      to="/profile" 
                      className="dropdown-item enlace-desplegable"
                    >
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/edit-profile" 
                      className="dropdown-item enlace-desplegable"
                    >
                      Editar Perfil
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item enlace-desplegable" 
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link 
                  to="/login" 
                  className="btn btn-outline-light me-2 enlace-navegacion"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-light enlace-navegacion"
                  style={{ color: '#2c3e50', fontWeight: '600' }}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;