import React from 'react';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';

function CartIcon({ itemCount = 0, onClick }) {
  return (
    <Button variant="outline-light" className="position-relative" onClick={onClick}>
      🛒 {/* Icono simple o puedes usar un SVG */}
      {itemCount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}

export default CartIcon;