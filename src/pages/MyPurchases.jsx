import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PurchaseService } from '../services/PurchaseService';
import { useNavigate } from 'react-router-dom';
function MyPurchases() {
    const navigate = useNavigate();
    const { user, loading: authLoading = true } = useAuth();
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const idDelUsuario = user?.userId || user?.id || user?.idUsuario; 
        const tieneToken = user?.token;
        const isUserFullyReady = authLoading === false && user && idDelUsuario && tieneToken;

        if (isUserFullyReady) {
            console.log("Usuario listo para fetch. ID:", idDelUsuario);
            fetchCompras(idDelUsuario, tieneToken);
        } else if (authLoading === false && !user) {
            setError("Debes iniciar sesión para ver tus compras.");
            setLoading(false);
        } else if (authLoading === false && user) {
            console.error("Usuario incompleto:", user);
            if(idDelUsuario) fetchCompras(idDelUsuario, "TOKEN_DUMMY");
            else setLoading(false);
        }
    }, [user, authLoading]);

    const fetchCompras = async (idUser, token) => {
        setLoading(true);
        setError(null);
        try {
            console.log(`Fetching historial para ID: ${idUser}`);
            const data = await PurchaseService.getComprasByUserId(idUser, token);
            console.log("Datos recibidos:", data); 
            setCompras(data);
        } catch (err) {
            console.error("Fallo fetch:", err);
            setError(err.message || "Error al cargar historial.");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' });
    if (authLoading || loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando historial...</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white text-center py-3">
                    <h1 className="h3 mb-0">🛍️ Mi Historial de Compras</h1>
                </div>

                <div className="card-body p-4">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {!error && compras.length === 0 ? (
                        <div className="alert alert-info text-center">
                            Aún no tienes compras registradas. ¡Explora nuestros productos!
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover mt-3">
                                <thead className="table-dark">
                                    <tr>
                                        <th># Venta</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Artículos</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compras.map((compra) => {
                                        const estadoNombre = compra.estadoNombre || compra.estado?.nombre || 'Procesando';
                                        const esEntregado = estadoNombre.toString().toUpperCase().includes('ENTREGADO');
                                        const itemCount = compra.productos?.length || compra.detallesVenta?.length || 0;

                                        return (
                                            <tr key={compra.idVenta || Math.random()}>
                                                <td>{compra.idVenta}</td>
                                                <td>{formatDate(compra.fechaVenta)}</td>
                                                <td>{formatCurrency(compra.totalVenta || 0)}</td>
                                                <td>{itemCount} arts.</td>
                                                <td>
                                                    <span className={`badge ${esEntregado ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                        {estadoNombre}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => navigate(`/orden/${compra.idVenta}`)}
                                                    >
                                                        Ver detalle
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyPurchases;