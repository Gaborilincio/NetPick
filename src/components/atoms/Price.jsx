import React from 'react';

function Price({ amount, currency = '$' }) {
  return <span>{currency}{amount.toLocaleString()}</span>;
}

export default Price;