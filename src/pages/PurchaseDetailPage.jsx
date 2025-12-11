import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PurchaseService } from "../services/PurchaseService";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function PurchaseDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [venta, setVenta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setError("Debes iniciar sesión para ver los detalles de la compra.");
            setLoading(false);
            return;
        }
        fetchVenta();
    }, [id, user]);

    const fetchVenta = async () => {
        setLoading(true);
        try {
            const token = user.token;
            const data = await PurchaseService.getPurchaseDetails(id, token);
            setVenta(data);
        } catch (err) {
            setError(err.message || "Error al cargar detalles de la compra.");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(amount);

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString("es-CL", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando detalles de la compra...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    Volver atrás
                </Button>
            </Container>
        );
    }

    if (!venta) {
        return (
            <Container className="mt-4">
                <Alert variant="info">Venta no encontrada.</Alert>
            </Container>
        );
    }

    const estadoNombre = venta.estadoVenta?.nombre || "Procesando";

    return (
        <Container className="my-5">
            <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary text-white text-center py-3">
                    <h2>Detalle de la Compra #{venta.idVenta}</h2>
                </Card.Header>

                <Card.Body className="p-4">

                    <div className="d-flex justify-content-between mb-3">
                        <strong>Fecha:</strong>
                        <span>{formatDate(venta.fechaVenta)}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <strong>Estado:</strong>
                        <span
                            className={`badge ${
                                estadoNombre.toUpperCase().includes("ENTREGADO")
                                    ? "bg-success"
                                    : "bg-warning text-dark"
                            }`}
                        >
                            {estadoNombre}
                        </span>
                    </div>

                    <h4 className="mt-4 mb-3">Productos Comprados</h4>

                    <Table responsive striped bordered hover>
                        <thead className="table-dark">
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {venta.detallesVenta?.map((item) => (
                                <tr key={item.idDetalleVenta}>
                                    <td>{item.producto?.nombre || "Producto"}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{formatCurrency(item.producto?.precio || 0)}</td>
                                    <td>{formatCurrency((item.producto?.precio || 0) * item.cantidad)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-end mt-3">
                        <h4>Total: {formatCurrency(venta.totalVenta || 0)}</h4>
                    </div>

                    <div className="text-center mt-4">
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            ← Volver a mis compras
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PurchaseDetailPage;
