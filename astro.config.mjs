// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Ganti bila custom domain dipasang nanti. Wajib untuk canonical, hreflang, sitemap.
  site: 'https://jelajah-rembang.zzdree.workers.dev',

  // Situs 100% konten: setiap rute diprerender jadi HTML saat build.
  output: 'static',

  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
    routing: {
      prefixDefaultLocale: false, // Indonesia di "/", Inggris di "/en/"
      redirectToDefaultLocale: false,
    },
    fallback: { en: 'id' },
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'id',
        locales: { id: 'id-ID', en: 'en-US' },
      },
    }),
    // Indeks pencarian statis. Hanya halaman bertanda `data-pagefind-body` yang
    // masuk indeks, sehingga halaman kredit (150+ entri atribusi) dan 404 terlewat
    // dengan sendirinya. Bahasa dideteksi dari atribut <html lang>.
    pagefind({
      indexConfig: {
        excludeSelectors: ['nav', 'aside', '[data-pagefind-ignore]'],
      },
    }),
  ],

  // Tailwind v4 = plugin Vite, bukan integrasi Astro.
  vite: {
    plugins: [tailwindcss()],
  },

  build: {
    inlineStylesheets: 'auto',
  },

  prefetch: {
    prefetchAll: true,
  },
});
