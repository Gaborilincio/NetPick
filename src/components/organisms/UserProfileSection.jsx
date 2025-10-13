import React from 'react';
import Container from '../atoms/Container';
import Row from '../atoms/Row';
import Col from '../atoms/Col';
import ProfileSidebar from './ProfileSideBar';
import ProfileContent from './ProfileContent';

function UserProfileSection({ user, pedidosRecientes, onEditProfile, onLogout }) {
  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <ProfileSidebar 
            user={user}
            onEditProfile={onEditProfile}
            onLogout={onLogout}
          />
        </Col>
        <Col md={8}>
          <ProfileContent 
            user={user}
            pedidosRecientes={pedidosRecientes}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfileSection;