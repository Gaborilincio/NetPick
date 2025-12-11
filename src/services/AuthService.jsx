const API_URL = "https://netpick-backend.onrender.com/api/v1/auth";

export const AuthService = {

  register: async (data) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: data.nombre,
        correo: data.correo,
        clave: data.clave,
        telefono: data.telefono || "000000000",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en registro");
    }
    return await response.text();
  },

  login: async (data) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correo: data.correo,
        clave: data.clave,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Credenciales incorrectas");
    }

    const json = await response.json();
    if (json.token) {
      localStorage.setItem("usuario", JSON.stringify(json));
    }
    return json;
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("usuario");
    return user ? JSON.parse(user) : null;
  },

  logout: () => {
    localStorage.removeItem("usuario");
  },

  getUser: () => {
    return JSON.parse(localStorage.getItem("usuario"));
  },

  updateProfile: async (userData) => {
    const currentUser = JSON.parse(localStorage.getItem('usuario'));
    const token = currentUser?.token;
    const userId = currentUser?.userId;

    if (!token) throw new Error("No estás autenticado (Falta token).");
    const bodyToSend = {
        ...userData,
        userId: userId 
    };

    try {
      const response = await fetch(`${API_URL}/profile`, { 
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(bodyToSend)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al actualizar perfil');
      }
      const updatedUser = await response.json();
      localStorage.setItem("usuario", JSON.stringify(updatedUser));

      return updatedUser; 
    } catch (error) {
      console.error("Error en updateProfile:", error);
      throw error;
    }
  }
};