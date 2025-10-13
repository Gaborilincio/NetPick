import React from 'react';
import { Col as BootstrapCol } from 'react-bootstrap';

function Col({ children, ...props }) {
  return <BootstrapCol {...props}>{children}</BootstrapCol>;
}

export default Col;