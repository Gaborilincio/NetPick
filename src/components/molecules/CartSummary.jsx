import React from 'react';
import Card from '../atoms/Card';
import CardHeader from '../atoms/CardHeader';
import CardBody from '../molecules/CardBody';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Price from '../atoms/Price';

function CartSummary({ subtotal, shipping, total, cartItems, onCheckout, onContinueShopping }) {
  return (
    <Card className="shadow">
      <CardHeader>
        <Text variant="h5" className="mb-0">Resumen del Pedido</Text>
      </CardHeader>
      <CardBody>
        <div className="d-flex justify-content-between mb-2">
          <Text variant="span">Subtotal:</Text>
          <Text variant="span"><Price amount={subtotal} /></Text>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <Text variant="span">Envío:</Text>
          <Text variant="span"><Price amount={shipping} /></Text>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-3">
          <Text variant="strong">Total:</Text>
          <Text variant="strong"><Price amount={total} /></Text>
        </div>
        
        <Button 
          variant="primary" 
          className="w-100 mb-2" 
          disabled={cartItems.length === 0}
          onClick={onCheckout}
        >
          Proceder al Pago
        </Button>
        <Button variant="outline-secondary" className="w-100" onClick={onContinueShopping}>
          Seguir Comprando
        </Button>
      </CardBody>
    </Card>
  );
}

export default CartSummary;