import type { CSSProperties } from 'react';

/** Built-in background presets for the desktop shell behind the phone frame. */
export type BackgroundPreset = 'dark' | 'light' | 'gradient' | 'blur' | 'mesh';

export const backgroundPresets: Record<BackgroundPreset, CSSProperties> = {
  dark: {
    background: '#0a0a0a',
  },
  light: {
    background: '#f5f5f5',
  },
  gradient: {
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
  },
  blur: {
    background: 'radial-gradient(ellipse at 30% 50%, rgba(56, 56, 80, 0.6) 0%, #0a0a0a 70%)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
  },
  mesh: {
    background: `
      radial-gradient(at 20% 25%, #1a0533 0%, transparent 50%),
      radial-gradient(at 80% 80%, #0d1b2a 0%, transparent 50%),
      radial-gradient(at 50% 50%, #0a0a0a 0%, transparent 80%),
      #0a0a0a
    `.trim(),
  },
};
