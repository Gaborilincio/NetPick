import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from '../../../components/atoms/Container';

describe('Container Component', () => {
  it('renderiza el container con children', () => {
    render(
      <Container>
        <div>Child content</div>
      </Container>
    );
    expect(screen.getByText('Child content')).toBeTruthy();
  });

  it('aplica la prop fluid correctamente', () => {
    const { container } = render(<Container fluid>Content</Container>);
    expect(container.firstChild).toHaveClass('container-fluid');
  });

  it('aplica className personalizado', () => {
    const { container } = render(<Container className="my-custom-class">Content</Container>);
    expect(container.firstChild).toHaveClass('my-custom-class');
  });
});