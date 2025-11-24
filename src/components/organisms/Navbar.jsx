import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const handleToggle = (isOpen, metadata) => {
        setShowDropdown(isOpen);
    };

    const handleSelect = (eventKey) => {
        if (eventKey === 'logout') {
            handleLogout();
        } else if (eventKey === 'profile') {
            navigate('/perfil'); 
        } else if (eventKey === 'edit-profile') {
            navigate('/perfil/editar');
        }
        setShowDropdown(false); 
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">NetPick</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        
                        {user ? (
                            <NavDropdown
                                title={`Hola, ${user.nombre.split(' ')[0]}`}
                                id="nav-dropdown"
                                align="end"
                                show={showDropdown}
                                onToggle={handleToggle}
                                onSelect={handleSelect}
                            >
                                <NavDropdown.Item eventKey="profile">
                                    Mi Perfil
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="edit-profile">
                                    Editar Perfil
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="logout">
                                    Cerrar Sesión
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                            </>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;