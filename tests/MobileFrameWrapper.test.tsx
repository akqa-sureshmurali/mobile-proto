import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MobileFrameWrapper from '../src/components/MobileFrameWrapper';
import type { FrameSvgProps } from '../src/components/MobileFrameWrapper';
import { backgroundPresets } from '../src/presets';

interface MqlMock {
  matches: boolean;
  media: string;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
}

function installMatchMedia(matches: boolean) {
  const mql: MqlMock = {
    matches,
    media: '',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  window.matchMedia = vi.fn().mockReturnValue(mql) as unknown as typeof window.matchMedia;
  return mql;
}

function setViewport({ width, height }: { width?: number; height?: number }) {
  if (width !== undefined) {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: width,
    });
  }
  if (height !== undefined) {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: height,
    });
  }
}

describe('MobileFrameWrapper', () => {
  let originalInnerWidth: number;
  let originalInnerHeight: number;
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    setViewport({ width: originalInnerWidth, height: originalInnerHeight });
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  describe('mobile viewports / pass-through behavior', () => {
    it('renders children directly when the viewport is narrower than the breakpoint', () => {
      setViewport({ width: 400, height: 800 });
      installMatchMedia(false);

      render(
        <MobileFrameWrapper>
          <p>hello mobile</p>
        </MobileFrameWrapper>,
      );

      expect(screen.getByText('hello mobile')).toBeInTheDocument();
      expect(document.querySelector('.mp-desktop-shell')).toBeNull();
      expect(document.querySelector('.mp-phone-container')).toBeNull();
    });

    it('renders children directly when "disabled" is true, even on a desktop viewport', () => {
      setViewport({ width: 1440, height: 1024 });
      installMatchMedia(true);

      render(
        <MobileFrameWrapper disabled>
          <p>passthrough</p>
        </MobileFrameWrapper>,
      );

      expect(screen.getByText('passthrough')).toBeInTheDocument();
      expect(document.querySelector('.mp-desktop-shell')).toBeNull();
    });
  });

  describe('desktop viewports', () => {
    beforeEach(() => {
      setViewport({ width: 1440, height: 1200 });
      installMatchMedia(true);
    });

    it('renders the desktop shell, phone container, screen area, and an iframe', () => {
      render(
        <MobileFrameWrapper>
          <p>app</p>
        </MobileFrameWrapper>,
      );

      expect(document.querySelector('.mp-desktop-shell')).not.toBeNull();
      expect(document.querySelector('.mp-phone-container')).not.toBeNull();
      expect(document.querySelector('.mp-screen-area')).not.toBeNull();

      const iframe = document.querySelector('iframe.mp-screen-iframe') as HTMLIFrameElement | null;
      expect(iframe).not.toBeNull();
      expect(iframe).toHaveAttribute('title', 'Mobile preview');
      expect(iframe?.getAttribute('src')).toBe(window.location.href);
    });

    it('does NOT render children directly on desktop (they load via iframe)', () => {
      render(
        <MobileFrameWrapper>
          <p>inline-app-content</p>
        </MobileFrameWrapper>,
      );

      expect(screen.queryByText('inline-app-content')).toBeNull();
    });

    it('renders the default IPhoneFrameSvg when no custom frameSvg is provided', () => {
      render(
        <MobileFrameWrapper>
          <p>app</p>
        </MobileFrameWrapper>,
      );

      const svg = document.querySelector('svg.mp-phone-svg');
      expect(svg).not.toBeNull();
      expect(svg).toHaveAttribute('viewBox', '0 0 451 914');
    });

    it('passes frameColor through to the default IPhoneFrameSvg', () => {
      render(
        <MobileFrameWrapper frameColor="#123456">
          <p>app</p>
        </MobileFrameWrapper>,
      );

      const bodyRect = document.querySelector('rect[width="439.425"]');
      expect(bodyRect).toHaveAttribute('fill', '#123456');
    });

    it('renders a custom frame component when frameSvg is provided and skips the default', () => {
      const CustomFrame = vi.fn(({ className, style }: FrameSvgProps) => (
        <div data-testid="custom-frame" className={className} style={style} />
      ));

      render(
        <MobileFrameWrapper frameSvg={CustomFrame}>
          <p>app</p>
        </MobileFrameWrapper>,
      );

      const custom = screen.getByTestId('custom-frame');
      expect(custom).toBeInTheDocument();
      expect(custom).toHaveClass('mp-phone-svg');
      expect(document.querySelector('svg[viewBox="0 0 451 914"]')).toBeNull();
      expect(CustomFrame).toHaveBeenCalled();
    });

    it('applies the requested backgroundPreset to the desktop shell', () => {
      render(
        <MobileFrameWrapper backgroundPreset="gradient">
          <p>app</p>
        </MobileFrameWrapper>,
      );

      const shell = document.querySelector('.mp-desktop-shell') as HTMLElement;
      expect(shell.style.background).toBe(backgroundPresets.gradient.background);
    });

    it('defaults to the "dark" preset when no background prop is given', () => {
      render(
        <MobileFrameWrapper>
          <p>app</p>
        </MobileFrameWrapper>,
      );

      const shell = document.querySelector('.mp-desktop-shell') as HTMLElement;
      expect(shell.style.background).toBe(backgroundPresets.dark.background);
    });

    it('renders backgroundElement and skips the preset background when provided', () => {
      render(
        <MobileFrameWrapper
          backgroundPreset="gradient"
          backgroundElement={<div data-testid="custom-bg">custom</div>}
        >
          <p>app</p>
        </MobileFrameWrapper>,
      );

      expect(screen.getByTestId('custom-bg')).toBeInTheDocument();
      expect(document.querySelector('.mp-background-slot')).not.toBeNull();

      const shell = document.querySelector('.mp-desktop-shell') as HTMLElement;
      expect(shell.style.background).toBe('');
    });

    it('appends an extra className and merges custom styles onto the desktop shell', () => {
      render(
        <MobileFrameWrapper className="my-shell" style={{ color: 'rgb(255, 0, 0)' }}>
          <p>app</p>
        </MobileFrameWrapper>,
      );

      const shell = document.querySelector('.mp-desktop-shell') as HTMLElement;
      expect(shell).toHaveClass('mp-desktop-shell');
      expect(shell).toHaveClass('my-shell');
      expect(shell.style.color).toBe('rgb(255, 0, 0)');
    });

    it('applies a 1.0 scale transform when the viewport is tall enough', () => {
      setViewport({ width: 1440, height: 2000 });
      installMatchMedia(true);

      render(
        <MobileFrameWrapper>
          <p>app</p>
        </MobileFrameWrapper>,
      );

      const phone = document.querySelector('.mp-phone-container') as HTMLElement;
      expect(phone.style.transform).toBe('scale(1)');
      expect(phone.style.marginTop).toBe('0px');
      expect(phone.style.marginBottom).toBe('0px');
      expect(phone.style.marginLeft).toBe('0px');
      expect(phone.style.marginRight).toBe('0px');
    });

    it('scales the phone down and applies negative margins on short viewports', () => {
      setViewport({ width: 1440, height: 600 });
      installMatchMedia(true);

      render(
        <MobileFrameWrapper verticalPadding={40}>
          <p>app</p>
        </MobileFrameWrapper>,
      );

      const phone = document.querySelector('.mp-phone-container') as HTMLElement;
      const transformMatch = phone.style.transform.match(/scale\((.+)\)/);
      expect(transformMatch).not.toBeNull();

      const scale = Number(transformMatch?.[1]);
      const expectedScale = (600 - 40) / 914;
      expect(scale).toBeCloseTo(expectedScale, 5);

      const expectedMarginV = -((914 * (1 - expectedScale)) / 2);
      const expectedMarginH = -((451 * (1 - expectedScale)) / 2);

      const parsePx = (value: string) => Number(value.replace(/px$/, ''));
      expect(parsePx(phone.style.marginTop)).toBeCloseTo(expectedMarginV, 3);
      expect(parsePx(phone.style.marginBottom)).toBeCloseTo(expectedMarginV, 3);
      expect(parsePx(phone.style.marginLeft)).toBeCloseTo(expectedMarginH, 3);
      expect(parsePx(phone.style.marginRight)).toBeCloseTo(expectedMarginH, 3);
    });
  });
});
