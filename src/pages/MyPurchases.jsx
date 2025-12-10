import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PurchaseService } from '../services/PurchaseService'; 
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function MyPurchases() {
    const { user, loading: authLoading } = useAuth();
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!authLoading && user) {
            fetchCompras();
        } else if (!authLoading && !user) {
            setError("Debes iniciar sesión para ver tus compras.");
            setLoading(false);
        }
    }, [user, authLoading]);

 const fetchCompras = async () => {
        setLoading(true);
        setError(null);
        try {
            const userId = Number(user.userId);
             const token = user.token; 
            const data = await PurchaseService.getComprasByUserId(userId, token); 
            setCompras(data);
        } catch (err) {
            setError(err.message || "Ocurrió un error al cargar tu historial de compras.");
        } finally {
            setLoading(false);
        }
    };
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-CL', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });
    };

    if (authLoading || loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status" variant="primary" />
                <p className="mt-3">Cargando historial de compras...</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Card className="shadow-lg border-0">
                <Card.Header as="h1" className="bg-primary text-white text-center py-3">
                    🛍️ Mi Historial de Compras
                </Card.Header>

                <Card.Body className="p-4">
                    {error && <Alert variant="danger">{error}</Alert>}

                    {compras.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            Aún no tienes compras registradas. ¡Explora nuestros productos!
                        </Alert>
                    ) : (
                        <Table responsive striped bordered hover className="mt-3">
                            <thead className="table-dark">
                                <tr>
                                    <th># Venta</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>Artículos</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {compras.map((compra) => {
                                    const estadoNombre = compra.estadoVenta?.nombre || 'Procesando';
                                    const esEntregado = estadoNombre.toUpperCase().includes('ENTREGADO');
                                    const itemCount = compra.detallesVenta?.length || 0;

                                    return (
                                        <tr key={compra.idVenta}>
                                            <td>{compra.idVenta}</td>
                                            <td>{formatDate(compra.fechaVenta)}</td>
                                            <td>{formatCurrency(compra.totalVenta || 0)}</td>
                                            <td>
                                                {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
                                            </td>
                                            <td>
                                                <span className={`badge ${esEntregado ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                    {estadoNombre}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default MyPurchases;
