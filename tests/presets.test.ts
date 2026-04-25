import { describe, it, expect } from 'vitest';
import { backgroundPresets } from '../src/presets';
import type { BackgroundPreset } from '../src/presets';

describe('backgroundPresets', () => {
  const expectedKeys: BackgroundPreset[] = ['dark', 'light', 'gradient', 'blur', 'mesh'];

  it('exports all five expected presets', () => {
    expect(Object.keys(backgroundPresets).sort()).toEqual([...expectedKeys].sort());
  });

  it.each(expectedKeys)('preset "%s" defines a non-empty background', (preset) => {
    const style = backgroundPresets[preset];
    expect(style).toBeDefined();
    expect(typeof style.background).toBe('string');
    expect((style.background as string).length).toBeGreaterThan(0);
  });

  it('dark preset uses solid #0a0a0a', () => {
    expect(backgroundPresets.dark.background).toBe('#0a0a0a');
  });

  it('light preset uses solid #f5f5f5', () => {
    expect(backgroundPresets.light.background).toBe('#f5f5f5');
  });

  it('gradient preset uses a linear-gradient', () => {
    expect(backgroundPresets.gradient.background).toMatch(/^linear-gradient\(/);
  });

  it('blur preset includes both standard and webkit backdrop-filter for cross-browser support', () => {
    expect(backgroundPresets.blur.backdropFilter).toBe('blur(40px)');
    expect(backgroundPresets.blur.WebkitBackdropFilter).toBe('blur(40px)');
  });

  it('mesh preset combines multiple radial-gradients', () => {
    const bg = backgroundPresets.mesh.background as string;
    const matches = bg.match(/radial-gradient/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(3);
  });
});
