import React from 'react';
import Badge from '../atoms/Badge';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

function OrderHistory({ pedidos }) {
  const getBadgeVariant = (estado) => {
    switch(estado) {
      case 'Entregado': return 'success';
      case 'En camino': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <>
      {pedidos.map((pedido) => (
        <div key={pedido.id} className="border-bottom pb-2 mb-2">
          <div className="d-flex justify-content-between">
            <div>
              <Text variant="strong">{pedido.producto}</Text>
              <br />
              <Text variant="small" className="text-muted">
                Fecha: {pedido.fecha}
              </Text>
            </div>
            <Badge bg={getBadgeVariant(pedido.estado)}>
              {pedido.estado}
            </Badge>
          </div>
        </div>
      ))}
      <Button variant="outline-primary" size="sm" className="w-100 mt-2">
        Ver todos los pedidos
      </Button>
    </>
  );
}

export default OrderHistory;