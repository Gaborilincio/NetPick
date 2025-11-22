import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileSection from '../components/organisms/UserProfileSection';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();

  const user = {
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Principal #123, Santiago, Chile',
    fechaRegistro: '15 Enero 2024',
    avatar: '/img/default-avatar.png'
  };

  const pedidosRecientes = [
    { id: 1, producto: 'Smartphone Samsung', fecha: '2024-01-20', estado: 'Entregado' },
    { id: 2, producto: 'Audífonos Sony', fecha: '2024-01-18', estado: 'En camino' },
    { id: 3, producto: 'Cafetera Philips', fecha: '2024-01-15', estado: 'Entregado' }
  ];

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user_data');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="perfil-container">
      <UserProfileSection 
        user={user}
        pedidosRecientes={pedidosRecientes}
        onEditProfile={handleEditProfile}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default Profile;