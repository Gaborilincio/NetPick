import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function NavigationBar() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleToggle = (isOpen) => {
        setShowDropdown(isOpen);
    };

    const handleSelect = (eventKey) => {
        if (eventKey === 'logout') {
            handleLogout();
        } else if (eventKey === 'profile') {
            navigate('/perfil');
        } else if (eventKey === 'my-purchases') {
            navigate('/compras');
        } else if (eventKey === 'edit-profile') {
            navigate('/perfil/editar');
        }
        setShowDropdown(false);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top shadow-sm mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-white">NetPick</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/productos" active={location.pathname === '/productos'}>
                            Productos
                        </Nav.Link>
                        <Nav.Link as={Link} to="/categorias" active={location.pathname === '/categorias'}>
                            Categorías
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto align-items-lg-center gap-3">
                        <Button
                            as={Link}
                            to="/carrito"
                            variant="outline-light"
                            className="d-flex align-items-center position-relative border-0"
                        >
                            <span style={{ fontSize: "1.3rem" }}>🛒</span>
                            <span className="d-none d-lg-inline ms-2">Carrito</span>

                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartCount}
                                    <span className="visually-hidden">items en carrito</span>
                                </span>
                            )}
                        </Button>
                        {user ? (
                            <NavDropdown
                                title={`Hola, ${user.nombre ? user.nombre.split(' ')[0] : 'Usuario'}`}
                                id="nav-dropdown"
                                align="end"
                                show={showDropdown}
                                onToggle={handleToggle}
                                onSelect={handleSelect}
                            >
                                <NavDropdown.Item eventKey="profile">Mi Perfil</NavDropdown.Item>
                                <NavDropdown.Item eventKey="my-purchases">Mis Compras</NavDropdown.Item>
                                <NavDropdown.Item eventKey="edit-profile">Editar Perfil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="logout" className="text-danger">
                                    Cerrar Sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <div className="d-flex gap-2">
                                <Nav.Link as={Link} to="/login" className="btn btn-sm btn-outline-secondary text-white border-0">Ingresar</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="btn btn-sm btn-primary text-white px-3 rounded-pill">Registrarse</Nav.Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;