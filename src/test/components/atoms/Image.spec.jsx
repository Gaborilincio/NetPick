import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image Component', () => {
  it('renderiza la imagen correctamente', () => {
    render(<Image src="test.jpg" alt="Test image" />);
    const image = screen.getByAltText('Test image');
    expect(image.getAttribute('src')).toBe('test.jpg');
    expect(image.getAttribute('alt')).toBe('Test image');
  });

  it('aplica las clases correctamente', () => {
    render(<Image src="test.jpg" alt="Test image" className="custom-class" />);
    const image = screen.getByAltText('Test image');
    expect(image.className).toContain('custom-class');
  });
});