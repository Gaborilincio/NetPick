import React from 'react';
import Row from '../atoms/Row';
import Col from '../atoms/Col';
import Text from '../atoms/Text';

function UserInfo({ user }) {
  return (
    <Row>
      <Col sm={6}>
        <Text variant="p"><strong>Nombre:</strong> {user.nombre}</Text>
        <Text variant="p"><strong>Email:</strong> {user.email}</Text>
      </Col>
      <Col sm={6}>
        <Text variant="p"><strong>Teléfono:</strong> {user.telefono}</Text>
        <Text variant="p"><strong>Dirección:</strong> {user.direccion}</Text>
      </Col>
    </Row>
  );
}

export default UserInfo;