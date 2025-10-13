import React from 'react';
import Table from '../atoms/Table';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';

function CartTable({ cartItems, onRemoveItem, onContinueShopping }) {
  if (cartItems.length === 0) {
    return <EmptyCart onContinueShopping={onContinueShopping} />;
  }

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={onRemoveItem}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default CartTable;