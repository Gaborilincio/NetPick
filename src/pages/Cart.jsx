import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/atoms/Container';
import Row from '../components/atoms/Row';
import Col from '../components/atoms/Col';
import Card from '../components/atoms/Card';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';
import { useCart } from '../context/CartContext'; 

function Cart() {
  const navigate = useNavigate();

  const { cart, removeFromCart, clearCart, decreaseQuantity, addToCart } = useCart();

  const total = cart.reduce((acc, item) => {
    const precio = parseFloat(item.precio) || 0;
    const cantidad = item.quantity || 1;
    return acc + (precio * cantidad);
  }, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const getImage = (item) => {
    return item.url || item.image || item.linkImagen || item.img || "https://via.placeholder.com/150";
  };

  if (cart.length === 0) {
    return (
      <Container className="my-5 py-5 text-center">
        <div className="mb-4">
          <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#ccc' }}></i>
        </div>
        <Text variant="h2" className="mb-3">Tu carrito está vacío</Text>
        <Text variant="p" className="text-muted mb-4">
          Parece que aún no has agregado productos.
        </Text>
        <Button onClick={() => navigate('/productos')} className="btn-primary btn-lg">
          Ir a Comprar
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Text variant="h1" className="mb-4">Carrito de Compras</Text>

      <Row>
        <Col xs={12} lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Text variant="p" className="text-muted mb-0">{cart.length} artículos</Text>
            {clearCart && (
              <button onClick={clearCart} className="btn btn-link text-danger text-decoration-none btn-sm">
                Vaciar Carrito
              </button>
            )}
          </div>

          {cart.map((item) => (
            <Card key={item.id || item.idProducto || Math.random()} className="mb-3 shadow-sm border-0">
              <div className="row g-0 align-items-center">

                <div className="col-4 col-md-2 p-2">
                  <div style={{ height: '80px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src={getImage(item)}
                      alt={item.nombre}
                      className="img-fluid rounded"
                      style={{ maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <div className="col-8 col-md-10">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Text variant="h5" className="card-title h6 mb-1 text-truncate" style={{ maxWidth: '200px' }}>
                          {item.nombre || item.title}
                        </Text>
                        <Text variant="small" className="text-muted d-block">
                          {item.categoria?.nombre || item.categoria || "General"}
                        </Text>
                      </div>
                      <Text variant="h6" className="fw-bold text-primary">
                        ${item.precio}
                      </Text>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      
                      <div className="input-group input-group-sm" style={{ width: '100px' }}>
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={() => decreaseQuantity(item)} 
                        >
                            -
                        </button>
                        
                        <input
                          type="text"
                          className="form-control text-center"
                          value={item.quantity || 1}
                          readOnly
                        />
                        
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={() => addToCart(item)} 
                        >
                            +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item)}
                        className="btn btn-outline-danger btn-sm border-0"
                        title="Eliminar producto"
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </Col>
        <Col xs={12} lg={4} className="mt-4 mt-lg-0">
          <Card className="shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <div className="card-body p-4">
              <Text variant="h4" className="card-title mb-4">Resumen</Text>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${total}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Envío</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="h5 fw-bold">Total</span>
                <span className="h5 fw-bold text-primary">${total}</span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-100 btn-primary btn-lg mb-3"
              >
                Ir a Pagar
              </Button>

              <Button
                onClick={() => navigate('/productos')}
                className="w-100 btn-outline-secondary"
              >
                Seguir Comprando
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;