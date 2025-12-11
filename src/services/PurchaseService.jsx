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
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `Error ${response.status}: No se pudo cargar el historial.`);
            }

            return await response.json(); 
        } catch (error) {
            console.error("Error en PurchaseService.getComprasByUserId:", error);
            throw error;
        }
    },

    realizarCompra: async (ventaRequestDTO, token) => {
        const url = `${API_BASE_URL}/checkout`;

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
                const clone = response.clone();
                let errorMessage = `Error HTTP ${response.status}: ${response.statusText}`;

                try {
                    const errJson = await clone.json();
                    errorMessage = errJson.message || JSON.stringify(errJson);
                } catch {
                    const textErr = await response.text();
                    errorMessage = textErr.substring(0, 120);
                }

                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            console.error("Error al realizar la compra:", error);
            throw error;
        }
    },

    getMetodosPago: async () => {
        try {
            const response = await fetch(METODO_PAGO_API_URL);

            if (!response.ok) {
                if (response.status === 204) return [];
                throw new Error(`Error al cargar métodos de pago (HTTP ${response.status})`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en PurchaseService.getMetodosPago:", error);
            throw error;
        }
    },

    getMetodosEnvio: async () => {
        try {
            const response = await fetch(METODO_ENVIO_API_URL);

            if (!response.ok) {
                if (response.status === 204) return [];
                throw new Error(`Error al cargar métodos de envío (HTTP ${response.status})`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en PurchaseService.getMetodosEnvio:", error);
            throw error;
        }
    },

    getPurchaseDetails: async (ventaId, token) => {
        const url = `${API_BASE_URL}/${ventaId}`; 

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `Error ${response.status}: Venta no encontrada.`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error en getPurchaseDetails:", error);
            throw error;
        }
    }
};
