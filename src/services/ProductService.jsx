import { AuthService } from './AuthService';

const API_URL = 'https://netpick-backend.onrender.com/api/v1/producto';

export const ProductService = {
  getProducts: async (filters = {}) => {
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '' && v !== 'undefined')
      );

      const params = new URLSearchParams(cleanFilters).toString();
      
      const response = await fetch(`${API_URL}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error Backend (${response.status}): ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Falló la carga de productos:", error);
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