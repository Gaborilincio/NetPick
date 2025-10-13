import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Price from '../atoms/Price';
import Button from '../atoms/Button';

function CartItem({ item, onRemove }) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <Image 
            src={item.image} 
            alt={item.name}
            width="50"
            className="me-3"
          />
          <Text variant="span">{item.name}</Text>
        </div>
      </td>
      <td><Price amount={item.price} /></td>
      <td>{item.quantity}</td>
      <td><Price amount={item.price * item.quantity} /></td>
      <td>
        <Button variant="outline-danger" size="sm" onClick={() => onRemove(item.id)}>
          Eliminar
        </Button>
      </td>
    </tr>
  );
}

export default CartItem;