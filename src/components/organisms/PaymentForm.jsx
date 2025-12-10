import React, { useState, useEffect } from 'react';
import { PurchaseService } from '../../services/PurchaseService'; 

const PaymentForm = ({ onSubmit, loading }) => {
    const [metodosPago, setMetodosPago] = useState([]);
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState('');
    const [metodosEnvio, setMetodosEnvio] = useState([]);
    const [metodoEnvioSeleccionado, setMetodoEnvioSeleccionado] = useState('');

    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [pagoData, envioData] = await Promise.all([
                    PurchaseService.getMetodosPago(),
                    PurchaseService.getMetodosEnvio()
                ]);

                setMetodosPago(pagoData);
                if (pagoData.length > 0) {
                    setMetodoPagoSeleccionado(pagoData[0].idMetodoPago);
                }

                setMetodosEnvio(envioData);
                if (envioData.length > 0) {
                    setMetodoEnvioSeleccionado(envioData[0].idMetodoEnvio);
                }

            } catch (error) {
                console.error("Error al cargar datos de pago/envío:", error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchAllData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const idMetodoPago = parseInt(metodoPagoSeleccionado);
        const idMetodoEnvio = parseInt(metodoEnvioSeleccionado);
        
        if (!idMetodoPago || !idMetodoEnvio) {
            alert("Debe seleccionar un método de pago y envío válidos.");
            return;
        }

        onSubmit({ 
            idMetodoPago: idMetodoPago, 
            idMetodoEnvio: idMetodoEnvio
        });
    };

    if (loadingData) {
        return <div className="p-6 bg-white rounded-lg shadow-xl">Cargando opciones de pago y envío...</div>;
    }
    
    if (metodosPago.length === 0 || metodosEnvio.length === 0) {
         return <div className="p-6 bg-white rounded-lg shadow-xl text-red-500">No hay métodos de pago o envío disponibles.</div>;
    }


    return (
        <div className="bg-white p-6 rounded-lg shadow-xl border border-indigo-200">
            <h3 className="text-2xl font-bold mb-6 text-indigo-700">Información de Pago y Envío</h3>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="paymentMethod" className="block text-gray-700 font-semibold mb-2">
                        Método de Pago:
                    </label>
                    <select
                        id="paymentMethod"
                        value={metodoPagoSeleccionado}
                        onChange={(e) => setMetodoPagoSeleccionado(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {metodosPago.map((metodo) => (
                            <option 
                                key={metodo.idMetodoPago} 
                                value={metodo.idMetodoPago} 
                            >
                                {metodo.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="shippingMethod" className="block text-gray-700 font-semibold mb-2">
                        Método de Envío:
                    </label>
                    <select
                        id="shippingMethod"
                        value={metodoEnvioSeleccionado}
                        onChange={(e) => setMetodoEnvioSeleccionado(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        {metodosEnvio.map((metodo) => (
                            <option 
                                key={metodo.idMetodoEnvio} 
                                value={metodo.idMetodoEnvio} 
                            >
                                {metodo.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button 
                    type="submit" 
                    disabled={loading || metodosPago.length === 0 || metodosEnvio.length === 0}
                    className={`w-full py-3 rounded-md font-bold text-white transition duration-300 
                        ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {loading ? 'Procesando Pago...' : 'Confirmar y Pagar'}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;