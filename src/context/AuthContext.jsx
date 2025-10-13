import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const initialUsers = [
      { 
        id: 1, 
        email: "admin@netpick.com", 
        password: "123456", 
        nombre: "Admin NetPick",
        telefono: "+56 9 1234 5678",
        direccion: "Av. Principal #123, Santiago"
      },
      { 
        id: 2, 
        email: "usuario@netpick.com", 
        password: "123456", 
        nombre: "Usuario Demo",
        telefono: "+56 9 8765 4321", 
        direccion: "Calle Secundaria #456, Santiago"
      }
    ];
    setUsers(initialUsers);

    const savedUser = localStorage.getItem('netpick_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = {
        ...foundUser,
        loginTime: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('netpick_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: "Credenciales incorrectas" };
  };

  const register = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      loginTime: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    localStorage.setItem('netpick_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('netpick_user', JSON.stringify(updatedUser));
    
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netpick_user');
  };

  const value = {
    user,
    users,
    login,
    register,
    updateProfile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}   