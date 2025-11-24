const API_BASE_URL = "https://netpick-backend.onrender.com/api/v1/venta"; 

export const PurchaseService = {
    
   
    getComprasByUserId: async (userId) => {
        if (!userId) {
            throw new Error("Se requiere el ID de usuario para buscar compras.");
        }

        const url = `${API_BASE_URL}/usuario/${userId}`; 
        
        try {
            const response = await fetch(url);
            
            if (response.status === 204) { 
                return [];
            }
            
            if (!response.ok) {
                const errorText = await response.text(); 
                throw new Error(`Error al cargar las compras: ${errorText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error en PurchaseService.getComprasByUserId:", error);
            throw error; 
        }
    }

};