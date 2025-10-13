import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

function Card({ children, ...props }) {
  return <BootstrapCard {...props}>{children}</BootstrapCard>;
}

export default Card;