import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

/**
 * `MobileFrameWrapper` renders an `<iframe>` whose `src` points at
 * `window.location.href`. happy-dom would otherwise eagerly fetch that URL
 * during tests, which floods the console with `NetworkError` noise. Pointing
 * the document at `about:blank` makes iframe loading a no-op.
 */
const happyWindow = window as unknown as {
  happyDOM?: { setURL?: (url: string) => void };
};
happyWindow.happyDOM?.setURL?.('about:blank');

afterEach(() => {
  cleanup();
});
