import { useEffect, useState } from 'react';

/**
 * Returns `true` when the viewport is wider than `breakpoint` pixels.
 * Listens for resize via `matchMedia` so it stays in sync.
 */
export function useIsDesktop(breakpoint: number = 600): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth > breakpoint : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoint + 1}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };

    handleChange(mql);
    mql.addEventListener('change', handleChange as (e: MediaQueryListEvent) => void);
    return () =>
      mql.removeEventListener('change', handleChange as (e: MediaQueryListEvent) => void);
  }, [breakpoint]);

  return isDesktop;
}
