import type { CSSProperties, ComponentType, ReactNode } from 'react';
import { useIsDesktop } from '../hooks/useIsDesktop';
import { useFrameScale } from '../hooks/useFrameScale';
import { backgroundPresets } from '../presets';
import type { BackgroundPreset } from '../presets';
import IPhoneFrameSvg from './IPhoneFrameSvg';
import './MobileFrameWrapper.css';

/** Natural dimensions of the default phone SVG frame (px). */
const PHONE_WIDTH = 451;
const PHONE_HEIGHT = 914;

/** Props accepted by a custom frame SVG component. */
export interface FrameSvgProps {
  className?: string;
  style?: CSSProperties;
}

export interface MobileFrameWrapperProps {
  /** App content to wrap inside the mobile frame. */
  children: ReactNode;

  /**
   * Viewport width threshold (px). The phone frame is shown when the
   * viewport is wider than this value; below it content renders normally.
   * @default 600
   */
  breakpoint?: number;

  /**
   * Choose a built-in background style for the desktop shell.
   * Ignored when `backgroundElement` is provided.
   * @default 'dark'
   */
  backgroundPreset?: BackgroundPreset;

  /**
   * Render a fully custom background behind the phone frame.
   * When provided this takes priority over `backgroundPreset`.
   * Can be anything: a gradient `<div>`, a `<video>`, a `<canvas>`, etc.
   */
  backgroundElement?: ReactNode;

  /**
   * Swap the default iPhone frame for any React component that accepts
   * `{ className, style }` props and renders an SVG (or any element).
   *
   * @default IPhoneFrameSvg
   */
  frameSvg?: ComponentType<FrameSvgProps>;

  /**
   * Tint color for the default iPhone frame's bezel/body.
   * Only applies when using the built-in `IPhoneFrameSvg`.
   */
  frameColor?: string;

  /**
   * Vertical padding (px) so the phone frame doesn't touch the viewport edges.
   * @default 40
   */
  verticalPadding?: number;

  /** Extra CSS class for the outer desktop shell `<div>`. */
  className?: string;

  /** Extra inline styles for the outer desktop shell `<div>`. */
  style?: CSSProperties;

  /**
   * When `true`, the wrapper is bypassed entirely and children
   * render without any frame — useful for conditional toggling.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Wraps your mobile-first app content in a realistic phone frame when
 * viewed on desktop or tablet. On mobile-width viewports (or when
 * `disabled` is true) children render as-is with zero overhead.
 *
 * ```tsx
 * import { MobileFrameWrapper } from 'mobile-proto';
 *
 * function App() {
 *   return (
 *     <MobileFrameWrapper backgroundPreset="gradient">
 *       <YourMobileApp />
 *     </MobileFrameWrapper>
 *   );
 * }
 * ```
 */
export default function MobileFrameWrapper({
  children,
  breakpoint = 600,
  backgroundPreset: bgPreset = 'dark',
  backgroundElement,
  frameSvg: FrameComponent,
  frameColor,
  verticalPadding = 40,
  className,
  style,
  disabled = false,
}: MobileFrameWrapperProps) {
  const isDesktop = useIsDesktop(breakpoint);
  const scale = useFrameScale(verticalPadding);

  /* Pass-through on mobile viewports or when explicitly disabled */
  if (!isDesktop || disabled) {
    return <>{children}</>;
  }

  /* Resolve background styles */
  const bgStyle: CSSProperties = backgroundElement
    ? {}
    : backgroundPresets[bgPreset] ?? backgroundPresets.dark;

  /* Negative margin trick: keep the scaled element centered without layout shift */
  const marginV = -(PHONE_HEIGHT * (1 - scale)) / 2;
  const marginH = -(PHONE_WIDTH * (1 - scale)) / 2;

  return (
    <div
      className={`mp-desktop-shell${className ? ` ${className}` : ''}`}
      style={{ ...bgStyle, ...style }}
    >
      {/* Custom background slot */}
      {backgroundElement && (
        <div className="mp-background-slot">{backgroundElement}</div>
      )}

      {/* Phone container */}
      <div
        className="mp-phone-container"
        style={{
          transform: `scale(${scale})`,
          margin: `${marginV}px ${marginH}px`,
        }}
      >
        {/* Screen area — renders app via iframe at mobile width */}
        <div className="mp-screen-area">
          <iframe
            className="mp-screen-iframe"
            src={window.location.href}
            title="Mobile preview"
          />
        </div>

        {/* Device frame overlay */}
        {FrameComponent ? (
          <FrameComponent className="mp-phone-svg" />
        ) : (
          <IPhoneFrameSvg className="mp-phone-svg" frameColor={frameColor} />
        )}
      </div>
    </div>
  );
}
