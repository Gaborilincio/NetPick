import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

function UserProfile({ user }) {
  return (
    <div className="text-center p-4">
      <Image
        src={user.avatar || "/img/default-avatar.png"}
        alt="Avatar"
        width="100"
        height="100"
        className="rounded-circle mb-3"
      />
      <Text as="h4">{user.name}</Text>
      <Text as="p" className="text-muted">{user.email}</Text>
      <Button variant="outline-primary">Editar Perfil</Button>
    </div>
  );
}

export default UserProfile;