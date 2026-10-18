# Jelajah Rembang

[![Live](https://img.shields.io/badge/Live-jelajah--rembang.zzdree.workers.dev-success?style=flat-square&logo=cloudflare)](https://jelajah-rembang.zzdree.workers.dev)
[![Stack](https://img.shields.io/badge/Astro-7-BC52EE?style=flat-square&logo=astro)](https://astro.build)
[![Stack](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Bilingual](https://img.shields.io/badge/Language-ID%20%2B%20EN-blue?style=flat-square)](https://jelajah-rembang.zzdree.workers.dev/en/)
[![Tests](https://img.shields.io/badge/Tests-47%20passing-brightgreen?style=flat-square)](https://playwright.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)


Situs profil daerah **Kabupaten Rembang**, Jawa Tengah: sejarah, budaya, kuliner, destinasi wisata, profil & geografi, galeri, dan peta interaktif. Bilingual (Indonesia + Inggris), statis, cepat.

Live: `https://jelajah-rembang.zzdree.workers.dev`

---

## Stack

| Bagian | Pilihan |
|---|---|
| Framework | **Astro 7** (`output: 'static'`, zero-JS by default) |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` (token di `@theme`) |
| Bahasa | TypeScript strict |
| Konten | Astro Content Collections (Markdown/MDX) |
| Font | Self-hosted via `@fontsource` (Hanken Grotesk sans, Martian Mono data) |
| Peta | Leaflet 1.9 + OpenStreetMap (tanpa API key) |
| Deploy | Cloudflare (static assets) |
| Uji | Playwright (smoke), `astro check`, Impeccable design linter |

**Tidak ada** framework UI klien (React/Vue). Interaktivitas hanya empat island kecil: peta Leaflet, lightbox `<dialog>`, toggle tema, dan pengendali reveal/counter/parallax.

---

## Struktur

```
src/
├── content.config.ts        # skema koleksi (zod)
├── content/
│   ├── sejarah/{id,en}/     # artikel per bahasa
│   ├── budaya/{id,en}/
│   ├── kuliner/{id,en}/
│   ├── destinasi/{id,en}/
│   └── galeri/{id,en}/
├── assets/                  # gambar sumber (dioptimasi saat build)
│   └── credits.json         # atribusi lisensi CC
├── components/
│   ├── seo/BaseHead.astro   # SEO, canonical, hreflang, OG
│   ├── nav/                 # header, breadcrumb, toggle bahasa/tema
│   ├── footer/
│   ├── ui/                  # primitif: Prose, Figure, StatBlock, BatikMotif
│   ├── cards/               # 4 varian kartu per tipe konten
│   ├── peta/MapIsland.astro # island Leaflet
│   └── pages/               # badan halaman (dipakai ulang id & en)
├── layouts/BaseLayout.astro
├── lib/{i18n,content}.ts
├── styles/global.css        # token desain "Pesisir Segar"
└── pages/                   # rute id (root) + en/ (prefix)
```

---

## Perintah

```bash
npm install          # pasang dependensi
npm run dev          # server pengembangan
npm run build        # astro check + astro build → dist/
npm run preview      # pratinjau hasil build
npm run check        # typecheck (termasuk file .astro)
npm run lint:design  # 60 aturan anti-slop Impeccable (target: 0)
npm test             # seluruh suite uji Playwright (41 test: smoke, kontras, interaksi, ketahanan, live)
npm run format       # Prettier
```

### Deploy

```bash
npm run deploy       # build + wrangler deploy
```

> **Catatan lingkungan dev Linux ini:** IPv6 mati, sehingga wrangler/Node fetch perlu prefix
> `NODE_OPTIONS='--dns-result-order=ipv4first'`. Sudah dibakukan di script `deploy` dan `preview:cf`.

---

## Arsitektur konten

Setiap berkas = satu bahasa. ID entri berformat `{lang}/{slug}` (mis. `id/sate-srepeh`).
Field `translationKey` menjodohkan pasangan id↔en, dipakai untuk `hreflang` dan toggle bahasa.

Menambah artikel:

1. Buat `src/content/{koleksi}/id/{slug}.md` dan `src/content/{koleksi}/en/{slug}.md`
   dengan `translationKey` yang **sama**.
2. Isi frontmatter sesuai skema di `src/content.config.ts`.
3. Halaman indeks & detail otomatis terbentuk lewat `getStaticPaths`.

---

## Sistem desain — "Pesisir Segar"

Segar & pesisir: **kertas putih bersih** `#FFFFFF`, **tinta biru-arang** `#132029`, tiga warna
aksen pesisir (merah Lasem `#C1272D`, teal laut `#0E6E7D`, indigo wedel `#1E3A8A`). **Tanpa
coklat/sepia, tanpa emas.** Tema gelap = arang biru `#0E1418`.

**Satu keluarga sans**: **Hanken Grotesk** untuk judul & prosa/UI (hierarki dari bobot + tracking),
**Martian Mono** untuk angka tabular. Foto dibingkai **garis rambut 1px** tanpa bayangan.

Sumber kebenaran token: **`DESIGN.md`** (frontmatter YAML + prosa). Konteks produk: **`PRODUCT.md`**.

Aturan inti: tanpa Inter/font sistem, tanpa teks abu di atas warna, tanpa `#000` murni, tanpa
coklat/emas, tanpa glassmorphism/bayangan kartu, tanpa kartu bersarang, tanpa grid kartu identik,
kontras body ≥4.5:1 (semua pasangan token lolos AA di kedua tema, dijaga
`tests/contrast.spec.ts`), measure 65–75ch, sistem gerak **MOTION 3** (reveal, stagger, mask
judul, underline, counter angka, parallax hero, pita kecamatan, transisi halaman) yang semuanya
mati di `prefers-reduced-motion`.

---

## Kredit gambar

Foto berasal dari **Wikimedia Commons** dengan lisensi bebas (CC BY, CC BY-SA, CC0, domain publik).
Atribusi lengkap per gambar: `src/assets/credits.json`, ditampilkan di halaman `/kredit`.

---

## Lisensi

Kode: MIT. Konten teks: © penulis. Gambar: sesuai lisensi masing-masing (lihat kredit).
Situs tidak resmi, dibuat untuk edukasi dan pelestarian budaya.
