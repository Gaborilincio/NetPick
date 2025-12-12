import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PurchaseService } from '../services/PurchaseService'; 
import UserProfileSection from '../components/organisms/UserProfileSection';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [pedidosRecientes, setPedidosRecientes] = useState([]);

  useEffect(() => {
    const idDelUsuario = user?.userId || user?.id || user?.idUsuario;
    const tieneToken = user?.token;

    if (idDelUsuario && tieneToken) {
      fetchRecentOrders(idDelUsuario, tieneToken);
    }
  }, [user]);

  const fetchRecentOrders = async (idUser, token) => {
    try {
      const data = await PurchaseService.getComprasByUserId(idUser, token);
      const sortedData = data.sort((a, b) => new Date(b.fechaVenta) - new Date(a.fechaVenta)).slice(0, 3);
      const mappedOrders = sortedData.map(compra => {
        const estado = compra.estadoNombre || compra.estadoVenta?.nombre || 'Procesando';
        const itemCount = compra.productos?.length || compra.detallesVenta?.length || 0;
        const total = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(compra.totalVenta);

        return {
          id: compra.idVenta,
          producto: `Compra #${compra.idVenta} - ${itemCount} arts. (${total})`, 
          fecha: new Date(compra.fechaVenta).toLocaleDateString('es-CL'), 
          estado: estado
        };
      });

      setPedidosRecientes(mappedOrders);

    } catch (error) {
      console.error("Error cargando pedidos recientes:", error);
      setPedidosRecientes([]);
    }
  };

  const handleEditProfile = () => {
    navigate('/perfil/editar');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    fechaRegistro: user.fechaRegistro 
        ? new Date(user.fechaRegistro).toLocaleDateString() 
        : new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }), 
    avatar: '/img/default-avatar.png'
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
      <div className="text-center mt-4 mb-5">
        <button 
          className="btn btn-primary btn-lg" 
          onClick={() => navigate('/my-purchases')}
        >
          Ver Historial Completo
        </button>
      </div>
    </div>
  );
}

export default Profile;
