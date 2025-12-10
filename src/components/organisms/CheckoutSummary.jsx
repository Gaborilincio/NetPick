import React from 'react';

const CheckoutSummary = ({ cart, total }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Resumen del Pedido</h3>
            <div className="space-y-3 border-b pb-4 mb-4">
                {cart.map(item => (
                    <div key={item.id || item._id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                            {item.nombre || 'Producto'} x {item.quantity || 1}
                        </span>
                        <span className="font-medium text-gray-700">
                            ${(item.precio * (item.quantity || 1)).toLocaleString('es-CL')}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-900">Total a Pagar:</span>
                <span className="text-2xl font-extrabold text-indigo-600">
                    ${total.toLocaleString('es-CL')}
                </span>
            </div>
        </div>
    );
};

export default CheckoutSummary;