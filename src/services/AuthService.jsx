import React, { useEffect, useState } from 'react';
import { AuthService } from '../services/AuthService'; 

const AUTH_API_URL = 'https://netpick-backend.onrender.com/api/v1/auth';

export const AuthService = {

  login: async (correo, clave) => {
    const token = btoa(`${correo}:${clave}`);
    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}` 
        },
        body: JSON.stringify({ correo, clave })
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
      const usuario = await response.json();
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(usuario));
      return usuario;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    window.location.href = '/'; 
  },

  getAuthHeader: () => {
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Basic ${token}` } : {};
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user_data');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  }
};