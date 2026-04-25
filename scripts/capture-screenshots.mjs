import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoPath = path.join(__dirname, 'demo-page.html');
const outDir = path.join(__dirname, '..', 'screenshots');

async function capture() {
  const browser = await chromium.launch();

  // ── Hero screenshot: gradient preset, wide desktop ──
  const heroCtx = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: 2,
  });
  const heroPage = await heroCtx.newPage();
  await heroPage.goto(`file://${demoPath}?preset=gradient&scale=0.88`);
  await heroPage.waitForTimeout(500);
  await heroPage.screenshot({
    path: path.join(outDir, 'hero.png'),
    type: 'png',
  });
  await heroCtx.close();

  // ── Presets comparison: 3 presets side by side (dark, gradient, mesh) ──
  // We capture each individually then note for README
  const presets = ['dark', 'gradient', 'mesh', 'blur', 'light'];
  for (const preset of presets) {
    const ctx = await browser.newContext({
      viewport: { width: 1200, height: 860 },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(`file://${demoPath}?preset=${preset}&scale=0.85`);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(outDir, `preset-${preset}.png`),
      type: 'png',
    });
    await ctx.close();
  }

  // ── Mobile passthrough: show how it looks on actual mobile (no frame) ──
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const mobilePage = await mobileCtx.newPage();
  // On mobile viewport, the wrapper renders children as-is (no frame)
  // Create a simple mobile-only page
  await mobilePage.goto(`file://${demoPath}?preset=dark&scale=1`);
  await mobilePage.waitForTimeout(400);
  // Override to hide shell background for mobile demo
  await mobilePage.evaluate(() => {
    const shell = document.querySelector('.mp-desktop-shell');
    shell.style.background = 'transparent';
    const phone = document.querySelector('.mp-phone-container');
    const svg = document.querySelector('.mp-phone-svg');
    svg.style.display = 'none';
    phone.style.width = '390px';
    phone.style.height = '844px';
    const screen = document.querySelector('.mp-screen-area');
    screen.style.top = '0';
    screen.style.left = '0';
    screen.style.width = '100%';
    screen.style.height = '100%';
    screen.style.borderRadius = '0';
  });
  await mobilePage.screenshot({
    path: path.join(outDir, 'mobile-passthrough.png'),
    type: 'png',
  });
  await mobileCtx.close();

  await browser.close();
  console.log('Screenshots saved to ./screenshots/');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
