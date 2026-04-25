import { useEffect, useState } from 'react';

/** Natural dimensions of the default iPhone frame SVG (px). */
const PHONE_WIDTH = 451;
const PHONE_HEIGHT = 914;

/**
 * Returns a scale factor (0–1) so the phone frame fits within the viewport
 * height minus `verticalPadding` pixels on each edge.
 */
export function useFrameScale(verticalPadding: number = 40): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const available = window.innerHeight - verticalPadding;
      setScale(available < PHONE_HEIGHT ? available / PHONE_HEIGHT : 1);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [verticalPadding]);

  return scale;
}

export { PHONE_WIDTH, PHONE_HEIGHT };
