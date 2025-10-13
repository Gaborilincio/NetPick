import React from 'react';
import Card from '../atoms/Card';
import CardBody from '../molecules/CardBody';
import UserAvatar from '../molecules/UserAvatar';

function ProfileSidebar({ user, onEditProfile, onLogout }) {
  return (
    <Card className="shadow">
      <CardBody className="text-center">
        <UserAvatar 
          user={user}
          onEditProfile={onEditProfile}
          onLogout={onLogout}
        />
      </CardBody>
    </Card>
  );
}

export default ProfileSidebar;