import React, { useState } from 'react';
import Card from '../atoms/Card';
import Row from '../atoms/Row';
import Col from '../atoms/Col';
import FormGroup from '../atoms/FormGroup';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody'; 

function ProductFilter({ onFilterSubmit, onFilterReset }) {
  const [nombre, setNombre] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSubmit({
      nombre: nombre.trim(),
      minPrice: minPrice,
      maxPrice: maxPrice,
    });
  };

  const handleReset = () => {
    setNombre('');
    setMinPrice('');
    setMaxPrice('');
    onFilterReset();
  };

  return (
    <Card className="mb-4 shadow-sm">
      <CardBody>
        <h4 className="mb-3">Filtros de Búsqueda</h4>
        <form onSubmit={handleSubmit}>
          <Row className="align-items-end">
            
            {/* Filtro Nombre */}
            <Col md={4} lg={3} className="mb-3">
              <FormGroup label="Nombre del Producto" controlId="filterNombre">
                <Input
                  type="text"
                  placeholder="Ej: Zapatillas"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/* Filtro Precio Mínimo */}
            <Col md={4} lg={3} className="mb-3">
              <FormGroup label="Precio Mínimo" controlId="filterMinPrice">
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/* Filtro Precio Máximo */}
            <Col md={4} lg={3} className="mb-3">
              <FormGroup label="Precio Máximo" controlId="filterMaxPrice">
                <Input
                  type="number"
                  placeholder="100000"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </FormGroup>
            </Col>

            {/* Botones de Acción */}
            <Col md={12} lg={3} className="mb-3 d-flex gap-2">
              <Button 
                type="submit" 
                variant="primary" 
                className="w-100"
              >
                Filtrar
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleReset}
                className="w-100"
              >
                Limpiar
              </Button>
            </Col>

          </Row>
        </form>
      </CardBody>
    </Card>
  );
}

export default ProductFilter;