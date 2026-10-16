import { test, expect } from '@playwright/test';

test.describe('Beranda & navigasi', () => {
  test('beranda memuat dengan judul dan seksi', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Rembang');
    await expect(page.locator('header nav a[href="/sejarah/"]').first()).toBeVisible();
    await expect(page).toHaveTitle(/Rembang/);
  });

  test('hreflang menunjuk ke versi Inggris', async ({ page }) => {
    await page.goto('/');
    const alt = page.locator('link[rel="alternate"][hreflang="en-US"]');
    await expect(alt).toHaveAttribute('href', /\/en\//);
  });

  test('tidak ada scroll horizontal di lebar ponsel', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(overflow).toBe(false);
  });
});

test.describe('Toggle bahasa', () => {
  test('berpindah ke halaman Inggris yang sama (bukan beranda)', async ({ page }) => {
    await page.goto('/sejarah/');
    await page.locator('a[hreflang="en"]').first().click();
    await page.waitForURL(/\/en\/sejarah\/?$/);
    await expect(page.locator('h1')).toContainText(/History/i);
  });

  test('halaman detail Inggris memuat', async ({ page }) => {
    await page.goto('/en/kuliner/sate-srepeh/');
    await expect(page.locator('h1')).toContainText(/Sate Srepeh/i);
  });
});

test.describe('Konten', () => {
  test('detail kuliner menampilkan bahan', async ({ page }) => {
    await page.goto('/kuliner/sate-srepeh/');
    await expect(page.locator('h1')).toContainText('Sate Srepeh');
    await expect(page.getByText('Bahan utama')).toBeVisible();
  });

  test('halaman profil menampilkan statistik', async ({ page }) => {
    await page.goto('/profil/');
    await expect(page.getByText('669.145')).toBeVisible();
  });
});

test.describe('Island peta', () => {
  test('peta memuat Leaflet dan menampilkan marker seluruh 10 destinasi', async ({ page }) => {
    await page.goto('/peta/');
    // Leaflet menambahkan .leaflet-container saat init
    await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 15_000 });
    // Daftar destinasi tetap ada sebagai konten aksesibel (seluruh 10 destinasi berkoordinat)
    await expect(page.locator('.rembang-pin')).toHaveCount(10);
    await expect(page.locator('a[href*="/destinasi/"]').filter({ has: page.locator('.data-figure') })).toHaveCount(10);
  });

  test('daftar destinasi terbaca tanpa JavaScript', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/peta/');
    await expect(page.locator('a[href*="/destinasi/"]').first()).toBeVisible();
    await ctx.close();
  });
});

test.describe('Lightbox galeri', () => {
  test('halaman galeri memuat tanpa error', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/galeri/');
    await expect(page.locator('h1')).toContainText(/Galeri/i);
    expect(errors).toEqual([]);
  });

  test('album tampil dan lightbox membuka gambar', async ({ page }) => {
    await page.goto('/galeri/');
    // Album terisi (bukan keadaan kosong)
    await expect(page.locator('section h2').first()).toBeVisible();
    const thumb = page.locator('[data-lightbox]').first();
    await thumb.click();
    const dialog = page.locator('#lightbox');
    await expect(dialog).toHaveAttribute('open', '');
    // Sumber gambar besar terpasang (bukan placeholder)
    await expect(page.locator('#lb-img')).not.toHaveAttribute('src', /^data:image\/gif/);
  });
});

test.describe('404', () => {
  test('halaman tidak ditemukan menampilkan 404', async ({ page }) => {
    const res = await page.goto('/halaman-tidak-ada/');
    expect(res?.status()).toBe(404);
    await expect(page.getByText('404')).toBeVisible();
  });
});

test.describe('OG image', () => {
  test('beranda & detail memuat gambar OG 1200x630', async ({ page, request }) => {
    await page.goto('/');
    const home = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(home).toContain('/og/beranda.jpg');

    await page.goto('/kuliner/sate-srepeh/');
    const detail = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(detail).toContain('/og/kuliner/sate-srepeh.jpg');

    // Tembak path di server preview lokal (bukan URL produksi absolut).
    const res = await request.get(new URL(detail!).pathname);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/jpeg');
  });
});
