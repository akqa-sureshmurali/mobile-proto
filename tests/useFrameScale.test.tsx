import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFrameScale, PHONE_HEIGHT, PHONE_WIDTH } from '../src/hooks/useFrameScale';

function setInnerHeight(value: number) {
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    writable: true,
    value,
  });
}

describe('useFrameScale', () => {
  let originalInnerHeight: number;

  beforeEach(() => {
    originalInnerHeight = window.innerHeight;
  });

  afterEach(() => {
    setInnerHeight(originalInnerHeight);
    vi.restoreAllMocks();
  });

  it('exports the natural phone dimensions', () => {
    expect(PHONE_WIDTH).toBe(451);
    expect(PHONE_HEIGHT).toBe(914);
  });

  it('returns 1 when there is enough vertical space for the phone', () => {
    setInnerHeight(PHONE_HEIGHT + 200);

    const { result } = renderHook(() => useFrameScale(40));
    expect(result.current).toBe(1);
  });

  it('scales down proportionally when the viewport is shorter than the phone', () => {
    setInnerHeight(500);
    const padding = 40;

    const { result } = renderHook(() => useFrameScale(padding));
    const expected = (500 - padding) / PHONE_HEIGHT;

    expect(result.current).toBeCloseTo(expected, 10);
    expect(result.current).toBeLessThan(1);
    expect(result.current).toBeGreaterThan(0);
  });

  it('uses a default vertical padding of 40 when none is provided', () => {
    setInnerHeight(700);

    const { result } = renderHook(() => useFrameScale());
    const expected = (700 - 40) / PHONE_HEIGHT;

    expect(result.current).toBeCloseTo(expected, 10);
  });

  it('updates the scale when the window is resized', () => {
    setInnerHeight(PHONE_HEIGHT + 200);

    const { result } = renderHook(() => useFrameScale(40));
    expect(result.current).toBe(1);

    act(() => {
      setInnerHeight(600);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBeCloseTo((600 - 40) / PHONE_HEIGHT, 10);
  });

  it('attaches and removes the resize listener', () => {
    setInnerHeight(1200);
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useFrameScale(40));
    const addedResize = addSpy.mock.calls.filter(([type]) => type === 'resize');
    expect(addedResize.length).toBeGreaterThanOrEqual(1);

    unmount();
    const removedResize = removeSpy.mock.calls.filter(([type]) => type === 'resize');
    expect(removedResize.length).toBeGreaterThanOrEqual(1);
  });

  it('recomputes immediately when the verticalPadding prop changes', () => {
    setInnerHeight(700);
    const { result, rerender } = renderHook(
      ({ pad }: { pad: number }) => useFrameScale(pad),
      { initialProps: { pad: 40 } },
    );

    expect(result.current).toBeCloseTo((700 - 40) / PHONE_HEIGHT, 10);

    rerender({ pad: 100 });
    expect(result.current).toBeCloseTo((700 - 100) / PHONE_HEIGHT, 10);
  });
});
