import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsDesktop } from '../src/hooks/useIsDesktop';

interface MqlMock {
  matches: boolean;
  media: string;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  _listeners: Set<(e: { matches: boolean }) => void>;
  _set: (matches: boolean) => void;
}

function createMatchMediaMock(initialMatches: boolean) {
  const listeners = new Set<(e: { matches: boolean }) => void>();
  const mql: MqlMock = {
    matches: initialMatches,
    media: '',
    addEventListener: vi.fn((_event: string, cb: (e: { matches: boolean }) => void) => {
      listeners.add(cb);
    }),
    removeEventListener: vi.fn((_event: string, cb: (e: { matches: boolean }) => void) => {
      listeners.delete(cb);
    }),
    _listeners: listeners,
    _set(matches: boolean) {
      this.matches = matches;
      this._listeners.forEach((cb) => cb({ matches }));
    },
  };
  return mql;
}

describe('useIsDesktop', () => {
  let originalInnerWidth: number;
  let originalMatchMedia: typeof window.matchMedia;
  let currentMql: MqlMock;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: originalInnerWidth,
    });
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  function installMatchMedia(initialMatches: boolean) {
    currentMql = createMatchMediaMock(initialMatches);
    window.matchMedia = vi.fn().mockReturnValue(currentMql) as unknown as typeof window.matchMedia;
  }

  it('returns true when initial viewport is wider than the breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 1024 });
    installMatchMedia(true);

    const { result } = renderHook(() => useIsDesktop(600));
    expect(result.current).toBe(true);
  });

  it('returns false when the initial viewport is narrower than or equal to the breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 500 });
    installMatchMedia(false);

    const { result } = renderHook(() => useIsDesktop(600));
    expect(result.current).toBe(false);
  });

  it('uses the default breakpoint of 600 when none is provided', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 800 });
    installMatchMedia(true);

    renderHook(() => useIsDesktop());

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 601px)');
  });

  it('builds a min-width query that is breakpoint + 1 pixels', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 800 });
    installMatchMedia(true);

    renderHook(() => useIsDesktop(768));

    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 769px)');
  });

  it('updates the value when the media query changes', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 1024 });
    installMatchMedia(true);

    const { result } = renderHook(() => useIsDesktop(600));
    expect(result.current).toBe(true);

    act(() => {
      currentMql._set(false);
    });
    expect(result.current).toBe(false);

    act(() => {
      currentMql._set(true);
    });
    expect(result.current).toBe(true);
  });

  it('subscribes via addEventListener and unsubscribes on unmount', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 1024 });
    installMatchMedia(true);

    const { unmount } = renderHook(() => useIsDesktop(600));
    expect(currentMql.addEventListener).toHaveBeenCalledTimes(1);
    expect(currentMql.removeEventListener).not.toHaveBeenCalled();

    unmount();
    expect(currentMql.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('re-subscribes when the breakpoint prop changes', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 1024 });
    installMatchMedia(true);

    const { rerender } = renderHook(({ bp }: { bp: number }) => useIsDesktop(bp), {
      initialProps: { bp: 600 },
    });

    expect(window.matchMedia).toHaveBeenLastCalledWith('(min-width: 601px)');

    rerender({ bp: 900 });
    expect(window.matchMedia).toHaveBeenLastCalledWith('(min-width: 901px)');
  });
});
