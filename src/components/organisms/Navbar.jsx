import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from '../atoms/Container'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from '../atoms/Button'; 
import { useAuth } from '../context/AuthContext'; 
import '../../styles/Navbar.css';

function NavigationBar() {
  const { user, logout } = useAuth(); 
  const [cartItems, setCartItems] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(2); 
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  const isActive = (path) => location.pathname === path ? 'activo' : '';

  return (
    <Navbar expand="lg" className="navegacion" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nombre-marca">
          NetPick
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={`enlace-navegacion ${isActive('/')}`}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={`enlace-navegacion ${isActive('/products')}`}>
              Productos
            </Nav.Link>
            {}
          </Nav>

          <Nav className="align-items-center">
            <Button as={Link} to="/cart" variant="primary" className="boton-carrito me-3">
              🛒 <span className="d-none d-md-inline">Carrito</span>
              {cartItems > 0 && <span className="contador-carrito ms-1">{cartItems}</span>}
            </Button>

            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-light dropdown-toggle menu-usuario" type="button" data-bs-toggle="dropdown">
                  Hola, {user.nombre} 
                </button>
                <ul className="dropdown-menu dropdown-menu-end desplegable-usuario">
                  <li>
                    <Link to="/profile" className="dropdown-item enlace-desplegable">Mi Perfil</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item enlace-desplegable text-danger" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light enlace-navegacion">
                  Ingresar
                </Link>
                <Link to="/register" className="btn btn-light enlace-navegacion fw-bold text-dark">
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