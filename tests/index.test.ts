import { describe, it, expect } from 'vitest';
import * as publicApi from '../src/index';

describe('public API surface (src/index.ts)', () => {
  it('exports MobileFrameWrapper as a function component', () => {
    expect(typeof publicApi.MobileFrameWrapper).toBe('function');
  });

  it('exports IPhoneFrameSvg as a function component', () => {
    expect(typeof publicApi.IPhoneFrameSvg).toBe('function');
  });

  it('exports the useIsDesktop and useFrameScale hooks', () => {
    expect(typeof publicApi.useIsDesktop).toBe('function');
    expect(typeof publicApi.useFrameScale).toBe('function');
  });

  it('exports the natural phone dimensions as numeric constants', () => {
    expect(publicApi.PHONE_WIDTH).toBe(451);
    expect(publicApi.PHONE_HEIGHT).toBe(914);
  });

  it('exports the backgroundPresets record with all five presets', () => {
    expect(publicApi.backgroundPresets).toBeDefined();
    expect(Object.keys(publicApi.backgroundPresets).sort()).toEqual(
      ['blur', 'dark', 'gradient', 'light', 'mesh'],
    );
  });
});
