import React from 'react';
import CardBody from './CardBody';
import Row from '../atoms/Row';
import Col from '../atoms/Col';
import Card from '../atoms/Card';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import Link from '../atoms/Link';

function CategoryGrid({ categories }) {
  return (
    <Row>
      {categories.map((category, index) => (
        <Col key={index} xs={12} sm={6} md={3} className="mb-4">
          <Card className="categoryCard h-100">
            <Image 
              src={category.image} 
              alt={category.title}
              className="categoryImage card-img-top"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <CardBody className="d-flex flex-column">
              <Text variant="h5" className="card-title">{category.title}</Text>
              <Text variant="p" className="card-text flex-grow-1">
                {category.description}
              </Text>
              <div className="mt-auto">
                <Button as={Link} to={category.link} variant="primary" className="w-100">
                  Ver más
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CategoryGrid;