import React from 'react';
import { Row as BootstrapRow } from 'react-bootstrap';

function Row({ children, ...props }) {
  return <BootstrapRow {...props}>{children}</BootstrapRow>;
}

export default Row;