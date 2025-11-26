import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService';
import Container from '../components/atoms/Container';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import { Modal, Form, Table } from 'react-bootstrap';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null); 

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    linkImagen: '',
    categoriaId: '1' 
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await ProductService.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ nombre: '', descripcion: '', precio: '', stock: '', linkImagen: '', categoriaId: '1' });
    setShowModal(true);
  };

  const handleOpenEdit = (product) => {
    setEditingId(product.idProducto);
    setFormData({
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      stock: product.stock,
      linkImagen: product.linkImagen,
      categoriaId: product.categoria?.idCategoria || '1'
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await ProductService.updateProduct(editingId, formData);
      } else {
        await ProductService.createProduct(formData);
      }
      setShowModal(false);
      loadProducts(); 
    } catch (error) {
      alert("Error al guardar producto");
    }
  };

  // Borrar
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres borrar este producto?")) {
      await ProductService.deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Text variant="h2">Gestión de Productos</Text>
        <Button className="btn-success" onClick={handleOpenCreate}>
          + Nuevo Producto
        </Button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>Img</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Cat</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.idProducto}>
                <td>{prod.idProducto}</td>
                <td>
                  <img 
                    src={prod.linkImagen} 
                    alt="min" 
                    style={{width: '40px', height: '40px', objectFit: 'cover'}} 
                    onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
                  />
                </td>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.stock}</td>
                <td>{prod.categoria?.idCategoria}</td>
                <td>
                  <Button className="btn-sm btn-warning me-2" onClick={() => handleOpenEdit(prod)}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button className="btn-sm btn-danger" onClick={() => handleDelete(prod.idProducto)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </Form.Group>

            <div className="row">
                <div className="col-6">
                    <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" name="precio" value={formData.precio} onChange={handleChange} />
                    </Form.Group>
                </div>
                <div className="col-6">
                    <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} />
                    </Form.Group>
                </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control name="linkImagen" value={formData.linkImagen} onChange={handleChange} placeholder="https://..." />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID Categoría (1, 2, 3...)</Form.Label>
              <Form.Control type="number" name="categoriaId" value={formData.categoriaId} onChange={handleChange} />
              <Form.Text className="text-muted">Asegúrate de que el ID exista en la base de datos.</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button className="btn-primary" onClick={handleSave}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminProducts;