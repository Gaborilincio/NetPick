import React from 'react';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

function UserAvatar({ user, onEditProfile, onLogout }) {
  return (
    <div className="text-center">
      <Image
        src={user.avatar}
        alt="Avatar"
        width="100"
        height="100"
        className="rounded-circle mb-3"
      />
      <Text variant="h4">{user.nombre}</Text>
      <Text variant="p" className="text-muted">{user.email}</Text>
      <Text variant="p" className="text-muted small">
        Miembro desde: {user.fechaRegistro}
      </Text>
      
      <Button onClick={onEditProfile} variant="primary" className="w-100 mb-2">
        Editar Perfil
      </Button>
      <Button onClick={onLogout} variant="outline-secondary" className="w-100">
        Cerrar Sesión
      </Button>
    </div>
  );
}

export default UserAvatar;