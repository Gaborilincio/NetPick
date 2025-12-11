const API_BASE_URL = "https://netpick-backend.onrender.com/api/v1/ventas";
const METODO_PAGO_API_URL = "https://netpick-backend.onrender.com/api/v1/metodopago";
const METODO_ENVIO_API_URL = "https://netpick-backend.onrender.com/api/v1/metodoenvio";

export const PurchaseService = {

    getComprasByUserId: async (userId, token) => {
        if (!userId) {
            throw new Error("Se requiere el ID de usuario para buscar compras.");
        }

        const url = `${API_BASE_URL}/historial/${userId}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
        } catch (error) {
            console.error("Error en PurchaseService.getComprasByUserId:", error);
            throw error;
        }
    },

    realizarCompra: async (ventaRequestDTO, token) => {
        const url = `${API_BASE_URL}/realizarCompra`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(ventaRequestDTO)
            });

            if (!response.ok) {
                let errorMessage = `Error HTTP ${response.status}: ${response.statusText}`;

                try {
                    const errorBody = await response.json();
                    errorMessage = errorBody.message || JSON.stringify(errorBody);
                } catch (e) {
                    const textError = await response.text();
                    errorMessage = `Error ${response.status}: ${textError.substring(0, 100)}...`;
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al realizar la compra:", error);
            throw error;
        }
    },

    getMetodosPago: async () => {
        try {
            const response = await fetch(METODO_PAGO_API_URL, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                if (response.status === 204) {
                    return [];
                }
                throw new Error(`Error al cargar métodos de pago. Estado: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en PurchaseService.getMetodosPago:", error);
            throw error;
        }
    },

    getMetodosEnvio: async () => {
        try {
            const response = await fetch(METODO_ENVIO_API_URL, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                if (response.status === 204) {
                    return [];
                }
                throw new Error(`Error al cargar métodos de envío. Estado: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en PurchaseService.getMetodosEnvio:", error);
            throw error;
        }
    }
};