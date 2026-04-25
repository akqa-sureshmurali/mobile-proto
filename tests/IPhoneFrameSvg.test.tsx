import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import IPhoneFrameSvg from '../src/components/IPhoneFrameSvg';

describe('IPhoneFrameSvg', () => {
  it('renders an SVG element with the correct intrinsic dimensions and viewBox', () => {
    const { container } = render(<IPhoneFrameSvg />);
    const svg = container.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('width', '451');
    expect(svg).toHaveAttribute('height', '914');
    expect(svg).toHaveAttribute('viewBox', '0 0 451 914');
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  it('forwards the className prop onto the root <svg>', () => {
    const { container } = render(<IPhoneFrameSvg className="my-frame" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('my-frame');
  });

  it('forwards inline style onto the root <svg>', () => {
    const { container } = render(<IPhoneFrameSvg style={{ opacity: 0.5 }} />);
    const svg = container.querySelector('svg') as SVGElement;
    expect(svg.style.opacity).toBe('0.5');
  });

  it('uses the default body fill of "black" when no frameColor is provided', () => {
    const { container } = render(<IPhoneFrameSvg />);
    const bodyRect = container.querySelector('rect[width="439.425"]');
    expect(bodyRect).not.toBeNull();
    expect(bodyRect).toHaveAttribute('fill', 'black');
  });

  it('applies the custom frameColor to both the body fill and stroke', () => {
    const customColor = '#ff00aa';
    const { container } = render(<IPhoneFrameSvg frameColor={customColor} />);

    const bodyRect = container.querySelector('rect[width="439.425"]');
    expect(bodyRect).toHaveAttribute('fill', customColor);

    const strokeRect = container.querySelector('rect[width="437.708"]');
    expect(strokeRect).toHaveAttribute('stroke', customColor);
  });

  it('renders nested <defs> and decorative <g> groups', () => {
    const { container } = render(<IPhoneFrameSvg />);
    expect(container.querySelector('defs')).not.toBeNull();
    expect(container.querySelectorAll('g').length).toBeGreaterThan(0);
  });
});
