import React from 'react';
import { Form } from 'react-bootstrap';

function FormGroup({ label, children, ...props }) {
  return (
    <Form.Group {...props}>
      {label && <Form.Label>{label}</Form.Label>}
      {children}
    </Form.Group>
  );
}

export default FormGroup;