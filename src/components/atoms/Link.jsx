import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Link({ children, to, ...props }) {
  return (
    <RouterLink to={to} {...props}>
      {children}
    </RouterLink>
  );
}

export default Link;