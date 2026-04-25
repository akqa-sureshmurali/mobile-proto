/* ═══════════════════════════════════════════
   MobileProto — Public API
   ═══════════════════════════════════════════ */

/* Main component */
export { default as MobileFrameWrapper } from './components/MobileFrameWrapper';
export type { MobileFrameWrapperProps, FrameSvgProps } from './components/MobileFrameWrapper';

/* Default device frame */
export { default as IPhoneFrameSvg } from './components/IPhoneFrameSvg';
export type { IPhoneFrameSvgProps } from './components/IPhoneFrameSvg';

/* Hooks */
export { useIsDesktop } from './hooks/useIsDesktop';
export { useFrameScale, PHONE_WIDTH, PHONE_HEIGHT } from './hooks/useFrameScale';

/* Background presets */
export { backgroundPresets } from './presets';
export type { BackgroundPreset } from './presets';
