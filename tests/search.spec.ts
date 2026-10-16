import { test, expect } from '@playwright/test';

test.describe('Pencarian statis Pagefind', () => {
  test('pemicu cari hadir di header dan membuka modal', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('pagefind-modal-trigger button');
    await expect(trigger).toBeVisible({ timeout: 15000 });
    await trigger.click();

    const dialog = page.locator('dialog.pf-modal');
    await expect(dialog).toBeVisible();
    await expect(page.locator('pagefind-input input')).toBeFocused();
  });

  test('mengetik kata kunci mengembalikan hasil yang relevan di bahasa Indonesia', async ({ page }) => {
    await page.goto('/');
    await page.locator('pagefind-modal-trigger button').click();
    const input = page.locator('pagefind-input input');
    await input.fill('batik');

    const results = page.locator('pagefind-results a');
    await expect(results.first()).toBeVisible({ timeout: 10000 });
    const count = await results.count();
    expect(count).toBeGreaterThan(0);

    // Hasil teratas menunjuk ke artikel batik Lasem di bahasa Indonesia
    const hrefs = await results.evaluateAll((list) => list.map((a) => a.getAttribute('href')));
    expect(hrefs.some((h) => h?.includes('/budaya/batik-tulis-lasem/'))).toBe(true);
    // Tidak ada URL berbahasa Inggris yang bocor ke indeks Indonesia
    expect(hrefs.every((h) => !h?.startsWith('/en/'))).toBe(true);
  });

  test('pencarian di /en/ menghasilkan artikel berbahasa Inggris', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('pagefind-modal-trigger button').click();
    const input = page.locator('pagefind-input input');
    await input.fill('batik');

    const results = page.locator('pagefind-results a');
    await expect(results.first()).toBeVisible({ timeout: 10000 });

    const hrefs = await results.evaluateAll((list) => list.map((a) => a.getAttribute('href')));
    expect(hrefs.some((h) => h?.includes('/en/budaya/batik-tulis-lasem/'))).toBe(true);
    // Tidak ada URL Indonesia yang bocor ke indeks Inggris
    expect(hrefs.every((h) => h?.startsWith('/en/'))).toBe(true);
  });

  test('tombol Esc menutup modal dan mengembalikan fokus ke pemicu', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('pagefind-modal-trigger button');
    await trigger.click();
    const dialog = page.locator('dialog.pf-modal');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test('pencarian bertahan setelah navigasi client-side', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('pagefind-modal-trigger button')).toBeVisible({ timeout: 15000 });
    // Pindah halaman lewat navigasi desktop
    await page.locator('nav a[href="/sejarah/"]').first().click();
    await expect(page).toHaveURL(/\/sejarah\/$/);

    const trigger = page.locator('pagefind-modal-trigger button');
    await expect(trigger).toBeVisible({ timeout: 10000 });
    await trigger.click();
    await expect(page.locator('dialog.pf-modal')).toBeVisible();
  });

  test('tanpa JavaScript: pemicu tidak memecahkan tampilan', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));

    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    expect(errors).toEqual([]);
    await ctx.close();
  });
});
