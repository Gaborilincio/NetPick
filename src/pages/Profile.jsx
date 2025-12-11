import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import UserProfileSection from '../components/organisms/UserProfileSection';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  if (!user) {
    return (
        <div className="perfil-container d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <h2>Cargando perfil o no autenticado...</h2>
        </div>
    );
  }

  const userData = {
    nombre: user.nombre || 'N/A',
    email: user.correo || 'N/A',
    telefono: user.telefono || 'Sin teléfono',
    direccion: user.direccion || 'Sin dirección registrada',
    fechaRegistro: '15 Enero 2024', 
    avatar: '/img/default-avatar.png'
  };

  const pedidosRecientes = [
    { id: 1, producto: 'Smartphone Samsung', fecha: '2024-01-20', estado: 'Entregado' },
    { id: 2, producto: 'Audífonos Sony', fecha: '2024-01-18', estado: 'En camino' },
    { id: 3, producto: 'Cafetera Philips', fecha: '2024-01-15', estado: 'Entregado' }
  ];

  const handleEditProfile = () => {
    navigate('/perfil/editar'); 
  };

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <div className="perfil-container">
      <UserProfileSection 
        user={userData} 
        pedidosRecientes={pedidosRecientes}
        onEditProfile={handleEditProfile}
        onLogout={handleLogout}
      />
      
      {/* Botón para navegar a Mis Compras */}
      <div className="text-center mt-4">
        <button 
          className="btn btn-info btn-lg" 
          onClick={() => navigate('/my-purchases')}
        >
          Ver Historial de Compras
        </button>
      </div>
    </div>
  );
}

export default Profile;