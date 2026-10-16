import { test, expect } from '@playwright/test';

// Verifikasi LIVE (bukan preview): bug yang diperbaiki harus benar-benar hilang
// di produksi. Dijalankan terhadap https://jelajah-rembang.zzdree.workers.dev.
const LIVE = 'https://jelajah-rembang.zzdree.workers.dev';

test.describe('verifikasi live', () => {
  test.use({ baseURL: LIVE });

  test('beranda melayani palet "Bahari Karang" baru', async ({ page }) => {
    await page.goto('/');
    // Kertas putih garam laut sejuk & arang samudera dalam (Bahari Karang), bukan krem/coklat "Arsip Pesisir".
    const colors = await page.evaluate(() => {
      const cs = getComputedStyle(document.body);
      return { bg: cs.backgroundColor, color: cs.color };
    });
    expect(colors.bg).toBe('rgb(248, 250, 252)');
    expect(colors.color).toBe('rgb(15, 23, 42)');

    // Judul memakai sans Hanken Grotesk (satu keluarga, tanpa serif).
    const h1Font = await page.locator('h1').first().evaluate((el) => getComputedStyle(el).fontFamily);
    expect(h1Font).toContain('Hanken Grotesk');
    expect(h1Font).not.toContain('Newsreader');

    // Header solid: tanpa glassmorphism.
    const header = await page.locator('header').evaluate((el) => {
      const cs = getComputedStyle(el);
      return { backdrop: cs.backdropFilter, bg: cs.backgroundColor };
    });
    expect(header.backdrop === 'none' || header.backdrop === '').toBe(true);
  });

  test('tema gelap bertahan setelah navigasi client-side', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-theme-toggle]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await page.locator('a[href="/galeri/"]').first().click();
    await expect(page).toHaveURL(/\/galeri\/$/);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(darkBg);
  });

  test('interaksi hidup setelah navigasi (menu, lightbox, peta)', async ({ page }) => {
    // Menu seluler
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.locator('[data-menu-toggle]').click();
    await page.locator('[data-menu-panel] a[href="/sejarah/"]').click();
    await expect(page).toHaveURL(/\/sejarah\/$/);
    await page.locator('[data-menu-toggle]').click();
    await expect(page.locator('[data-menu-panel]')).toBeVisible();

    // Lightbox
    await page.goto('/galeri/');
    await page.locator('[data-lightbox]').first().click();
    await expect(page.locator('#lightbox')).toBeVisible();
    await page.keyboard.press('Escape');

    // Peta
    await page.goto('/peta/');
    await page.locator('#rembang-map').scrollIntoViewIfNeeded();
    await expect(page.locator('.rembang-pin').first()).toBeAttached({ timeout: 20000 });
  });

  test('counter tidak negatif & gambar OG hidup', async ({ page, request }) => {
    await page.goto('/');
    const counter = page.locator('[data-count]').first();
    await counter.scrollIntoViewIfNeeded();
    await expect(counter).toHaveText('669.145', { timeout: 6000 });

    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(og).toContain('/og/beranda.jpg');
    const res = await request.get(og!);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/jpeg');
  });
});
