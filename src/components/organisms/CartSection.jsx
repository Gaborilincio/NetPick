import React from 'react';
import Container from '../atoms/Container';
import Row from '../atoms/Row';
import Col from '../atoms/Col';
import Card from '../atoms/Card';
import CardBody from '../molecules/CardBody';
import Text from '../atoms/Text';
import CartTable from '../molecules/CartTable';
import CartSummary from '../molecules/CartSummary';

function CartSection({ cartItems, onRemoveItem, onCheckout, onContinueShopping }) {
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5000;
  const total = subtotal + shipping;

  return (
    <Container className="my-5">
      <Text variant="h1" className="text-center mb-4">Mi Carrito</Text>
      
      <Row>
        <Col md={8}>
          <Card className="shadow">
            <CardBody>
              <CartTable 
                cartItems={cartItems}
                onRemoveItem={onRemoveItem}
                onContinueShopping={onContinueShopping}
              />
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <CartSummary 
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            cartItems={cartItems}
            onCheckout={onCheckout}
            onContinueShopping={onContinueShopping}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CartSection;