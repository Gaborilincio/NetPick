import React from 'react';
import Card from '../atoms/Card';
import CardHeader from '../atoms/CardHeader';
import CardBody from '../molecules/CardBody';
import Text from '../atoms/Text';
import UserInfo from '../molecules/UserInfo';
import OrderHistory from '../molecules/OrderHistory';

function ProfileContent({ user, pedidosRecientes }) {
  return (
    <div>
      <Card className="shadow mb-4">
        <CardHeader>
          <Text variant="h5" className="mb-0">Información Personal</Text>
        </CardHeader>
        <CardBody>
          <UserInfo user={user} />
        </CardBody>
      </Card>

      <Card className="shadow">
        <CardHeader>
          <Text variant="h5" className="mb-0">Pedidos Recientes</Text>
        </CardHeader>
        <CardBody>
          <OrderHistory pedidos={pedidosRecientes} />
        </CardBody>
      </Card>
    </div>
  );
}

export default ProfileContent;