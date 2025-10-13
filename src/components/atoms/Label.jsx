import React from 'react';
import { Form } from 'react-bootstrap';

function Label({ children, ...props }) {
  return <Form.Label {...props}>{children}</Form.Label>;
}

export default Label;