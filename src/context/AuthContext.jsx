import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (correo, clave) => {
    try {
      const data = { correo, clave }; 
      const userData = await AuthService.login(data); 
      setUser(userData); 
      return userData;
    } catch (error) {
      throw error;      
    }
};

  const logout = () => {
    AuthService.logout();
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);