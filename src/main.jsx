import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/Home.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider> 
        <App />
      </AuthProvider> 
  </StrictMode>,
)