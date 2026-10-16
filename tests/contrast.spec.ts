// Cek kontras WCAG AA untuk semua pasangan teks/latar nyata yang dirender,
// di light MAUPUN dark, diambil langsung dari computed style (bukan tebakan token).
import { test, expect } from '@playwright/test';

const PAGES = ['/', '/galeri/', '/destinasi/', '/profil/', '/kuliner/sate-srepeh/', '/peta/'];

function parseRgb(s: string): { r: number; g: number; b: number; a: number } | null {
  const m = s.match(/rgba?\(([^)]+)\)/);
  const raw = m?.[1];
  if (!raw) return null;
  const parts = raw.split(/[\s,/]+/).filter(Boolean).map(Number);
  const [r, g, b] = parts;
  if (r === undefined || g === undefined || b === undefined) return null;
  if ([r, g, b].some(Number.isNaN)) return null;
  return { r, g, b, a: parts.length > 3 ? (parts[3] ?? 1) : 1 };
}
function lum({ r, g, b }: { r: number; g: number; b: number }) {
  const f = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(a: string, b: string) {
  const ca = parseRgb(a), cb = parseRgb(b);
  if (!ca || !cb) return null;
  const la = lum(ca), lb = lum(cb);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

for (const theme of ['light', 'dark'] as const) {
  test.describe(`kontras ${theme}`, () => {
    test.use({ colorScheme: theme });
    for (const path of PAGES) {
      test(path, async ({ page }) => {
        await page.addInitScript(
          ([t]) => {
            try {
              localStorage.setItem('rembang-theme', t as string);
            } catch (err) {
              console.warn('localStorage theme init failed:', err);
            }
          },
          [theme],
        );
        await page.goto(path);
        await page.waitForTimeout(600);

        const samples = await page.evaluate(() => {
          // Ambil semua elemen teks terlihat, selesaikan latar efektif naik ke atas.
          // parseRgb didefinisikan DI DALAM evaluate: fungsi luar tak terlihat di browser.
          const parseRgb = (s: string) => {
            const m = s.match(/rgba?\(([^)]+)\)/);
            const raw = m?.[1];
            if (!raw) return null;
            const parts = raw.split(/[\s,/]+/).filter(Boolean).map(Number);
            const [r, g, b] = parts;
            if (r === undefined || g === undefined || b === undefined) return null;
            if ([r, g, b].some(Number.isNaN)) return null;
            return { r, g, b, a: parts.length > 3 ? (parts[3] ?? 1) : 1 };
          };

          const bgOf = (el: Element): string => {
            let node: Element | null = el;
            while (node) {
              const bg = getComputedStyle(node).backgroundColor;
              const parsed = parseRgb(bg);
              if (parsed && parsed.a > 0.95) return bg;
              node = node.parentElement;
            }
            return getComputedStyle(document.body).backgroundColor;
          };
          const out: { text: string; color: string; bg: string; size: number; weight: string; tag: string }[] = [];
          const els = Array.from(
            document.querySelectorAll('p, h1, h2, h3, a, span, li, button, label, td, th, dt, dd'),
          );
          for (const el of els) {
            const cs = getComputedStyle(el);
            const text = (el.textContent || '').trim();
            if (!text) continue;
            const rect = el.getBoundingClientRect();
            if (rect.width < 2 || rect.height < 2) continue;
            if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.1) continue;
            if (el.closest('[aria-hidden="true"]')) continue;
            // hanya teks langsung milik elemen ini
            const own = Array.from(el.childNodes).some((n) => n.nodeType === 3 && (n.textContent || '').trim());
            if (!own) continue;
            out.push({
              text: text.slice(0, 45),
              color: cs.color,
              bg: bgOf(el),
              size: parseFloat(cs.fontSize),
              weight: cs.fontWeight,
              tag: el.tagName.toLowerCase(),
            });
          }
          return out;
        });

        const failures: string[] = [];
        let checked = 0;
        for (const s of samples) {
          const r = ratio(s.color, s.bg);
          if (r === null) continue;
          checked++;
          const px = s.size;
          const large = px >= 24 || (px >= 18.66 && Number(s.weight) >= 700);
          const need = large ? 3 : 4.5;
          if (r < need - 0.01) {
            failures.push(
              `${r.toFixed(2)}:1 (butuh ${need}) [${s.tag} ${px}px w${s.weight}] "${s.text}" · ${s.color} on ${s.bg}`,
            );
          }
        }
        console.log(`KONTRAS ${theme} ${path}: ${checked} pasangan, ${failures.length} gagal`);
        if (failures.length) console.log('  ' + failures.slice(0, 12).join('\n  '));
        expect(failures, `${theme} ${path}\n${failures.slice(0, 12).join('\n')}`).toEqual([]);
      });
    }
  });
}
