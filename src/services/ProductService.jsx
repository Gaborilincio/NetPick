import { AuthService } from './AuthService';

const API_URL = 'https://netpick-backend.onrender.com/api/v1/producto';

export const ProductService = {
  getProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_URL}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al cargar productos");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};