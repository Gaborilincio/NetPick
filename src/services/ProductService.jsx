import { AuthService } from './AuthService';

const API_URL = 'https://netpick-backend.onrender.com/api/v1/producto';

export const ProductService = {

  createProduct: async (producto) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) throw new Error("Error al crear producto");
      return await response.json();

    } catch (error) {
      console.error("Error en createProduct:", error);
      return null;
    }
  },

  updateProduct: async (id, producto) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) throw new Error("Error al actualizar producto");
      return await response.json();

    } catch (error) {
      console.error("Error en updateProduct:", error);
      return null;
    }
  },

  patchProduct: async (id, fields) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) throw new Error("Error en PATCH de producto");
      return await response.json();

    } catch (error) {
      console.error("Error en patchProduct:", error);
      return null;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar producto");
      return true;

    } catch (error) {
      console.error("Error en deleteProduct:", error);
      return false;
    }
  },

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
