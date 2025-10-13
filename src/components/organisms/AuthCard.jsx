import React from 'react';
import Container from '../atoms/Container';
import Card from '../atoms/Card';
import CardBody from '../molecules/CardBody';
import Text from '../atoms/Text';

function AuthCard({ children, title, maxWidth = '400px' }) {
  return (
    <Container className="my-5">
      <Card className="shadow mx-auto" style={{ maxWidth }}>
        <CardBody className="p-4">
          <Text variant="h2" className="text-center mb-4">{title}</Text>
          {children}
        </CardBody>
      </Card>
    </Container>
  );
}

export default AuthCard;