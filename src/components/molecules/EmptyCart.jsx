import React from 'react';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

function EmptyCart({ onContinueShopping }) {
  return (
    <div className="text-center py-4">
      <Text variant="h4">Tu carrito está vacío</Text>
      <Text variant="p" className="text-muted">
        Agrega algunos productos para continuar
      </Text>
      <Button variant="primary" onClick={onContinueShopping}>
        Ver Productos
      </Button>
    </div>
  );
}

export default EmptyCart;