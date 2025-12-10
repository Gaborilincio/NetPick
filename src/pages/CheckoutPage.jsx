import React, { useState } from 'react';
import { PurchaseService } from '../services/PurchaseService';
import { useCart } from '../context/CartContext'; 
import CheckoutSummary from '../organisms/CheckoutSummary';
import PaymentForm from '../organisms/PaymentForm';

const ID_USUARIO = 1; 
const ID_ESTADO_INICIAL = 1;

const CheckoutPage = () => {
    const { 
        cart, 
        cartTotal, 
        generateVentaRequestDTO, 
        clearCartAfterSuccess 
    } = useCart(); 

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    if (cart.length === 0 && !success) {
        return (
            <div className="max-w-4xl mx-auto p-8 mt-10">
                <h2 className="text-3xl font-bold text-gray-800">Finalizar Compra</h2>
                <p className="mt-4 text-lg text-red-500">El carrito está vacío. Agrega productos para proceder.</p>
            </div>
        );
    }
    const handlePagar = async ({ idMetodoPago, idMetodoEnvio }) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const ventaRequestDTO = generateVentaRequestDTO(
                ID_USUARIO,
                idMetodoPago, 
                idMetodoEnvio, 
                ID_ESTADO_INICIAL
            );
            const ventaFinal = await PurchaseService.realizarCompra(ventaRequestDTO);
            setSuccess(ventaFinal);
            clearCartAfterSuccess(); 
            
        } catch (err) {
            setError(err.message || 'Error desconocido al procesar la compra.'); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 mt-10">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Checkout Final</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <CheckoutSummary cart={cart} total={cartTotal} />
                <PaymentForm onSubmit={handlePagar} loading={loading} />
            </div>

            {error && (
                <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p className="font-bold">Error en la Compra:</p>
                    <p>{error}</p>
                </div>
            )}
            {success && (
                <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    <p className="font-bold">¡Compra Exitosa!</p>
                    <p>Venta ID: {success.idVenta}. Total: ${success.totalVenta.toLocaleString('es-CL')}</p>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;