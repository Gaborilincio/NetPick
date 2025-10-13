import React from 'react';
import { Card } from 'react-bootstrap';

function CardHeader({ children, ...props }) {
  return <Card.Header {...props}>{children}</Card.Header>;
}

export default CardHeader;