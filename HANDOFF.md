# HANDOFF — Jelajah Rembang

> Dokumen serah-terima untuk agent berikutnya. Terakhir diperbarui **9 Oktober 2026**.
> Baca `AGENTS.md` dulu (aturan wajib), lalu `PRODUCT.md` (konteks produk) dan `DESIGN.md` (token).

---

## Status: SELESAI & LIVE ✅

Konten lengkap, galeri terisi, cover & koordinat 100% tuntas. Palet aktif **"Bahari Karang"**
(putih garam laut sejuk `#F8FAFC`, arang samudera `#0F172A`, merah delima Lasem `#C81E2B`,
biru bahari `#0369A1`, zamrud ombak `#0A6B79`, satu keluarga sans), menggantikan "Pesisir Segar"
yang dinilai kurang berwibawa/dingin. Seluruh ornamen batik dipercantik dengan motif otentik
ber-isen-isen (Kawung Rangkep, Latohan ombak banyu, Truntum kencana, Sekar Jagad) dan plat wastra
untuk kartu tanpa foto.

| Metrik | Nilai |
|---|---|
| Halaman terbangun | **74** |
| Artikel konten | **54** (27 judul × 2 bahasa) |
| Album galeri | **6** (12 berkas id+en), **36 foto** |
| Foto (Wikimedia Commons) | **57** berkas (**56** entri `credits.json`) |
| Judul ber-cover | **24** dari 27 (tambah Tradisi Laut, Dumbeg, Urap Latoh) |
| Destinasi ber-koordinat | **10** dari 10 (100% lengkap & terverifikasi OSM) |
| Pencarian statis (Pagefind) | **Aktif & bilingual** (35 id-id / 35 en-us), modal keyboard-accessible |
| `astro check` | **0 error / 0 warning / 0 hint** |
| Impeccable design lint | **0 anti-pattern** |
| Playwright (seluruh suite) | **47 lulus** (smoke, kontras, interaksi, ketahanan, search, live) |
| Anti-Slop (strict scan) | **0 error / 0 warning (242 files)** |
| Kontras WCAG AA | **850+ pasangan, 0 gagal** (6 halaman × terang/gelap) |
| Gambar OG (per halaman) | **86** (`/og/<slug>.jpg`, 1200×630) |
| Versi Cloudflare aktif | `4c453ecd-1c50-4d7a-b230-1496d7f14aa0` |

**Live:** https://jelajah-rembang.zzdree.workers.dev
**Repo:** https://github.com/zzdree/jelajah-rembang

Berkas uji: `tests/smoke.spec.ts` (asli), `tests/contrast.spec.ts` (kontras nyata dari
computed style, 6 halaman × 2 tema), `tests/interactions.spec.ts` (regresi lintas navigasi),
`tests/resilience.spec.ts` (reduced-motion + tanpa JS), `tests/search.spec.ts` (pencarian),
`tests/live.spec.ts` (verifikasi produksi).

---

## Palet "Bahari Karang" (AKTIF, 16 Okt 2026) — menggantikan "Pesisir Segar"

Pengguna meminta evaluasi ulang palet warna dan peremajaan ornamen visual batik: *"jujur color
pallete warna nya aku kurang sreg, coba kamu research lagi dong, sama ornamen ornamen juga percantik
lagi"*. 

Akar masalah "Pesisir Segar" v1: kanvas `#ffffff` murni 100% terasa dingin klinis (seperti aplikasi
kantor), merah bata `#c1272d` terasa seperti peringatan error ketika berdiri di atas putih polos, dan
ornamen batik sebelumnya hanya berupa garis kawat tipis 1.25px tanpa isen-isen.

**Perbaikan: Palet "Bahari Karang" (Oceanic Slate & Ruby Lasem) + Ornamen Wastra Ber-Isen.**

| Token | Terang | Gelap | Peran |
|---|---|---|---|
| `--merah-lasem` | `#C81E2B` | `#F87171` | Merah delima Lasem pekat (kontras 5.46:1) |
| `--merah-lasem-deep` | `#991B1B` | `#FCA5A5` | Hover aksen merah delima tua |
| `--indigo-lasem` | `#0369A1` | `#38BDF8` | Biru pesisir bahari cerah (kontras 5.93:1) |
| `--soga` | `#0A6B79` | `#2DD4BF` | Zamrud ombak / sea-glass teal (kontras 6.19:1) |
| `--paper` | `#F8FAFC` | `#0B1120` | Putih garam laut sejuk / arang samudera dalam |
| `--paper-raised` | `#FFFFFF` | `#131C31` | Kartu elevated putih bersih |
| `--paper-sunken` | `#F1F5F9` | `#070A12` | Seksi inset buih laut sejuk |
| `--ink` | `#0F172A` | `#F1F5F9` | Teks utama: deep midnight slate (kontras 17.06:1) |
| `--ink-soft` | `#475569` | `#94A3B8` | Teks sekunder: slate pesisir (kontras 7.24:1) |
| `--rule` | `#E2E8F0` | `#1E293B` | Garis rambut sejuk |
| `--scrim` | `#0F172A` | `#070A12` | Veil modal / lightbox (selalu gelap) |

Garis aksen seksi (`.canting-rule`): pita gradien tiga warna Tiga Negeri Lasem
(`merah getih pitik #c81e2b` -> `zamrud soga #0a6b79` -> `nila wedel #0369a1`).

Ornamen batik (`BatikMotif.astro` & `HeritagePlate.astro`):
- **Kawung Rangkep:** kelopak ganda konsentris + cecek papat + ceplok intan pusat.
- **Latohan Pesisir:** rimbun anggur laut Caulerpa dengan sulur meliuk & ombak banyu.
- **Truntum Kencana:** bintang 8 arah dengan kuncup melati sari di tengah & pendaran embun.
- **Sekar Jagad:** bunga teratai akulturasi Tionghoa-Jawa Lasem.
- **Heritage Pattern Plate:** kartu grafis ber-watermark geometris batik untuk artikel tanpa cover foto.

**Perbaikan: buang seluruh keluarga coklat + emas, ganti putih bersih + aksen saturasi tinggi.**

| Token | Terang | Gelap | Peran |
|---|---|---|---|
| `--merah-lasem` | `#C1272D` | `#F0716F` | Aksen utama (Lasem bata) |
| `--merah-lasem-deep` | `#9C1C22` | `#F79B99` | Hover aksen |
| `--indigo-lasem` | `#1E3A8A` | `#93A7F0` | Wedel: indigo batik |
| `--soga` | `#0E6E7D` | `#5FC9D6` | **Teal laut** (nama token lama, nilai baru) |
| `--paper` | `#FFFFFF` | `#0E1418` | Kertas putih bersih / arang biru |
| `--paper-raised` | `#FFFFFF` | `#172026` | Kartu |
| `--paper-sunken` | `#F4F6F8` | `#080C0F` | Seksi inset |
| `--ink` | `#132029` | `#EEF3F5` | Teks utama (biru-arang) |
| `--ink-soft` | `#4A5A63` | `#9FB0B8` | Teks sekunder |
| `--rule` | `#D8DEE3` | `#2A363D` | Garis rambut |
| `--scrim` | `#132029` | `#080C0F` | Veil lightbox (selalu gelap) |

**Token `--gold` DIHAPUS.** Emas yang lolos kontras AA selalu jatuh ke oker kecoklatan
(`#9a6b00`, kontras 4,69) — jadi mustahil "segar" sekaligus AA. Tanda aksen kini `merah-lasem`.

Kontras terverifikasi: terang ink 16,58 · soft 7,16 · merah 5,84 · wedel 10,36 · teal 5,92;
gelap ink 16,59 · soft 8,28 · merah 6,45 · wedel 7,97 · teal 9,55. Semua lolos AA.

**Tipografi: SATU keluarga sans.** Newsreader (serif) dilepas; **Hanken Grotesk** kini
`--font-display` **dan** `--font-body`. Judul dibedakan lewat **bobot 700 + tracking rapat**
(display -0.035em, h1 -0.022em, h2 -0.016em, h3 -0.01em), bukan ganti muka huruf. Metrik
line-height lebih ketat untuk sans (display 0.94, h1 1.08, h2 1.16, h3 1.30). Linter Impeccable
**tidak** punya aturan "satu keluarga font" (yang ada: *Overused font* — Inter/Roboto/Fraunces/
Geist/Plus Jakarta/Space Grotesk — dan *font di luar DESIGN.md*); Hanken Grotesk tidak masuk
daftar terlarang, jadi lint tetap 0.

**Dibersihkan:** paket `@fontsource-variable/newsreader` + `@fontsource/newsreader` di-uninstall;
`scripts/fonts/newsreader-*.ttf` dihapus; `scripts/build-fonts.mjs` hanya menyisakan 3 job Hanken;
`src/lib/og.ts` memakai Hanken untuk semua peran + palet baru; favicon (SVG + ICO 16/32/48) ke
putih/merah/teal; **drop-cap dihapus** (prop `dropcap` di `Prose.astro` + 4 halaman detail);
blockquote kini border kiri 2px `soga` (teal) tanpa serif italic.

**Strategi tetap: swap NILAI token, pertahankan NAMA** (nol rename → nol risiko regresi kelas).

**Pipeline font:** `scripts/build-fonts.mjs` hanya menyisakan 3 job Hanken → TTF statis
`hanken-{400,600,700}.ttf` (satori menolak variable font), diregistrasi di `src/lib/og.ts` sebagai
`'Hanken Grotesk Variable'` untuk **semua** peran OG.

**Verifikasi (9 Okt 2026):** check **0/0/0 (80 berkas)**, lint **0 temuan**, build **74 halaman**,
suite **41 lulus**, kontras **848 pasangan, 0 gagal** (6 halaman × terang/gelap). Screenshot
ditinjau di `/tmp/jr-segar/`.

---

## Palet "Arsip Pesisir" (DITOLAK, tinggal riwayat)

Kertas tua `#f4ede0` + tinta coklat `#231a14` + soga `#7c5a2a` + emas `#96630c`, serif Newsreader
untuk judul. Dinilai pengguna **"masih coklat, tidak fresh"** lalu diganti "Pesisir Segar" di atas.
Pelajaran yang bertahan: riset dulu sebelum rombak, dan **hitung kontras sebelum menulis kode**
(emas gagal AA sebagai teks kecil — itu sebabnya sekarang dibuang). Riwayat ini juga memuat tiga
bug interaksi yang diperbaiki (lihat bagian "Bug interaksi lintas halaman" di bawah).

---

## Redesign "Tinta & Tanah" (DITOLAK, tinggal riwayat)

Permintaan pengguna berlanjut: *"kurang suka palette warnanya, mau flat minimalism, banyak
animasi, palette clean dan menarik."* Dikerjakan dengan skill **antislop** + **ui-ux-pro-max**.
Revisi ini **menggantikan** percobaan sebelumnya ("Nyala Pesisir", maroon + krem) yang ditolak,
lalu **sendiri ditolak** dan diganti "Arsip Pesisir" di atas. Riwayat dipertahankan sebagai
pelajaran: apa yang berguna dari sini adalah sistem gerak **MOTION 3** dan bug yang ditemukan.

- **Palet (flat minimalism / Swiss):** satu aksen **terracotta** `#c2410c` + netral
  near-black. Kertas putih bersih `#ffffff` (bukan krem), inset `#f5f5f4`. Peran lama
  `indigo`/`soga` menjadi netral (`#18181b`/`#52525b`). **Semua kontras WCAG AA dihitung**
  (terang: ink 17,72 · soft 7,73 · aksen 5,18; gelap: 19,06 · 7,76 · 8,79).
- **Tipografi:** **Bodoni Moda dilepas.** Satu grotesk (**Hanken Grotesk**) untuk display
  **dan** body; Martian Mono tetap untuk data. Font OG → Hanken 400/600/700.
- **Radius tajam:** kontrol 2px, kartu 4px. **Bug `rounded-pill` diperbaiki** (token hilang →
  badge `DestinasiCard` & bahan `KulinerDetailPage` kini benar-benar pil).
- **Flat:** glassmorphism header dihapus (solid + garis bawah); bayangan kartu dihapus; satu
  bayangan tersisa hanya untuk popup Leaflet (terdokumentasi DESIGN.md §Elevation).
- **Sistem gerak** (`src/styles/global.css`): `[data-reveal]` (+ `clip` mask),
  `[data-underline]`, **`[data-count]`** (counter angka `Intl.NumberFormat`; SSR = nilai final),
  **`[data-parallax]`** (hero, ≥768px, listener dibersihkan di `astro:before-swap`),
  `.canting-draw`, `.float-soft`, `.marquee-track`, dan **Astro View Transitions**.
- **Bug diperbaiki:** masker `clip-path: inset(0 0 100% 0)` dulu dipasang pada elemen yang
  diobservasi IntersectionObserver → luas irisan nol → **judul hero tertinggal di opacity 0**
  (tidak terlihat). Kini masker di elemen anak (`[data-reveal-clip-inner]`). Terverifikasi:
  `is-visible`, opacity 1, IO ratio 1.
- **Tanpa JS** → kelas `.js` tidak ada → semua konten tampil (nilai statistik = final).
- **`prefers-reduced-motion`** → reveal langsung, counter = nilai final, tanpa parallax/marquee.
- `ui-ux-pro-max` menyarankan "Glassmorphism / biru #2563EB / Poppins"; **ditolak** (default AI slop).

**Pelajaran penting:** linter Impeccable **buta pada glassmorphism/bayangan/gradien di
`.astro`/`.css`** (hanya membaca `.html`). "lint 0" **bukan** bukti flat. Audit manual:
`grep -rn "shadow\|backdrop-blur\|repeating-" src/`.

---

## Bug interaksi lintas halaman (DITEMUKAN & DIPERBAIKI 9 Okt 2026)

Redesign tadi hanya diuji dengan **memuat penuh setiap halaman**, sehingga kelas bug yang hanya
muncul saat **navigasi client-side** lolos tanpa terdeteksi. Ditemukan lewat pengujian browser
(klik tautan → verifikasi interaksi masih hidup). Lima bug nyata, semuanya sekarang dijaga uji
regresi `tests/interactions.spec.ts`:

| # | Gejala | Akar masalah | Perbaikan |
|---|---|---|---|
| 1 | Peta kosong (0 tile, 0 marker) setelah kembali ke `/peta` | skrip modul hanya berjalan sekali; DOM berganti saat navigasi | `initMap()` dipasang ulang di `astro:page-load` |
| 2 | Lightbox galeri tidak membuka setelah navigasi | sama | `bindLightbox()` dipasang ulang + penanda `dataset.bound` |
| 3 | Menu seluler mati setelah navigasi | sama | `bindMenu()` dipasang ulang |
| 4 | Tema kembali **light** setelah navigasi | ClientRouter menyalin atribut `<html>` dari dokumen baru; `data-theme` selalu `light` | sumber kebenaran `localStorage`; pulihkan di `astro:before-swap` |
| 5 | Counter menampilkan **angka negatif** (`-23.699`) | timestamp rAF bisa mendahului `performance.now()` | clamp `p` ke `[0,1]` |

Plus dua perbaikan kuatifikasi: observer ganda (`initReveal`/`initCount` dipanggil langsung
**dan** didengarkan dari `astro:page-load`), dan penanda guard `dataset.x = ''` yang *falsy*
sehingga listener terpasang dua kali (peta: *"Map container is already initialized"*).

**Cara menguji supaya kelas bug ini tidak terulang:** jangan puas dengan `page.goto()`.
Selalu klik tautan, lalu verifikasi interaksi masih hidup.

---

## Isi konten saat ini

| Koleksi | id | en | Catatan |
|---|---|---|---|
| sejarah | 4 | 4 | gerbang timur, asal nama, Lasem, Kartini+Sunan Bonang |
| budaya | 5 | 5 | batik Lasem, klenteng+masjid, seni pertunjukan, tradisi laut, kopi lelet |
| kuliner | 8 | 8 | sate srepeh, lontong tuyuhan, kelo mrico, mangut, urap latoh, dumbeg, legen, kaoya dudul |
| destinasi | 10 | 10 | pantai, museum, religi, hutan, embung |
| **galeri** | **6** | **6** | ✅ album tematik: Lasem Tiongkok Kecil, Batik Tiga Negeri, Panggung dan Warisan, Napak Tilas R.A. Kartini, Pesisir dan Pantai, Kuliner Pesisir |

**Judul ber-cover (24):** batik-tulis-lasem, klenteng-dan-masjid-lasem, lasem-tiongkok-kecil,
kartini-dan-sunan-bonang, rembang-gerbang-timur, pantai-caruban, pantai-wates, petilasan-sunan-bonang,
legen, kopi-lelet, wayang-potehi-dan-seni-pertunjukan, hutan-mangrove-rembang, klenteng-cu-an-kiong,
klenteng-gie-yong-bio, makam-kartini, museum-kartini, pantai-karang-jahe, lontong-tuyuhan, sate-srepeh,
mangut-manyung, asal-usul-nama-rembang, tradisi-laut, dumbeg, urap-latoh.

**Belum ber-cover (3, sengaja):** embung-lodan, kaoya-dudul, kelo-mrico. Tidak ada foto Commons
yang benar-benar cocok; menampilkan placeholder ornamen batik SVG yang jujur dan estetik.

**Koordinat peta (10/10 destinasi — 100% lengkap):** pantai-karang-jahe, museum-kartini,
pantai-caruban, klenteng-gie-yong-bio, hutan-mangrove-rembang, makam-kartini (Bulu), pantai-wates
(Kaliori), petilasan-sunan-bonang (Lasem), klenteng-cu-an-kiong (Lasem), embung-lodan (Sarang).
Semua terverifikasi titik akurat dari OSM Nominatim / cagar budaya resmi.

---

## Pencarian Statis: Pagefind (SELESAI 16 Okt 2026)

Pencarian statis nol-server berbasis Pagefind 1.5 + `@pagefind/component-ui` (Web Components native).
Fitur utama:
- **Bilingual terpisah:** indeks terbagi otomatis menjadi `id-id` (35 halaman) dan `en-us` (35 halaman)
  berdasarkan atribut `<html lang>`. Pencarian di `/` hanya mengembalikan hasil Indonesia, dan pencarian
  di `/en/` hanya mengembalikan hasil Inggris.
- **Batas konten presisi:** konten diindeks lewat `data-pagefind-body` pada selubung isi (`Prose.astro`
  dan `PagefindBody.astro`). Halaman `/kredit/` (150+ entri atribusi) dan `404` otomatis dilewati.
- **Desain flat "Pesisir Segar":** seluruh token `--pf-*` dipetakan ke token desain proyek di
  `src/components/search/SearchDialog.astro`; bayangan dinolkan (`box-shadow: none`), radius 4px / 2px.
- **Jembatan tema gelap:** Pagefind menggantung tema pada `[data-pf-theme='dark']`. Disinkronkan di
  dua titik: `is:inline` di `BaseHead.astro` (cegah FOUC) dan `ThemeToggle.astro` (saat toggle).
- **Pembersihan kebocoran View Transitions:** Pagefind `InstanceManager` menahan elemen modal lama
  yang terputus dari DOM (`isConnected === false`). Dibersihkan secara idempoten di `SearchTrigger.astro`
  saat `astro:page-load` agar klik selalu membuka modal aktif.
- **Uji otomatis:** `tests/search.spec.ts` (6 pengujian: pemicu, kueri ID, kueri EN, Esc focus restore,
  ketahanan navigasi client-side, fallback tanpa JS).

---

## Yang BELUM dikerjakan (prioritas untuk agent berikutnya)

### Prioritas menengah

1. **Submit sitemap** ke Google Search Console (`/sitemap-index.xml`).
2. **Custom domain** — masih `*.workers.dev` (ditunda/skip oleh pengguna).

### Prioritas rendah / opsional

3. **Cover 6 judul sisanya.** Hanya bila ada foto Commons yang benar-benar cocok di masa depan.
   Jangan pakai foto generik atau foto tempat lain.

---

## OG image (SELESAI 9 Okt 2026)

Tiap halaman kini punya gambar Open Graph 1200×630 sendiri, dirender **saat build**
(satori → SVG → sharp → JPEG) oleh `src/lib/og.ts` + endpoint statis
`src/pages/og/[...slug].ts`. Total **86 berkas** di `dist/og/` (~2,2 MB, rata-rata ~25 KB/berkas).

- Varian **foto-forward** untuk halaman ber-cover (foto di kanan, judul di kiri).
- Varian **teks + motif batik** (garis SVG, bukan emoji) untuk halaman tanpa cover.
- `BaseHead.astro` menebak URL dari `Astro.url.pathname` lewat `ogSlugFor()` (`src/lib/og-slug.ts`);
  selalu mengeluarkan `og:image`, `og:image:width/height/alt`, dan `twitter:image`.
- Slug: `beranda`, `kuliner/sate-srepeh`, `en/destinasi/makam-kartini`, dst. (1:1 dengan pathname).

Regenerasi font (bila muka huruf berubah): `node scripts/build-fonts.mjs` (woff2 → TTF statis).

---

## Skrip bantu (baru, di `scripts/`)

Di luar `src/` sehingga tak tersentuh Content Collections/lint.

| Skrip | Fungsi |
|---|---|
| `scripts/commons-manifest.json` | Daftar berkas Commons → path lokal + judul. |
| `scripts/fetch-commons.mjs` | Unduh foto (1600 px) via `curl -4`, resumable, append `credits.json`. |
| `scripts/gen-galeri.mjs` | Hasilkan 12 berkas album galeri dari data + kredit asli. |
| `scripts/apply-covers-coords.mjs` | Sisipkan `cover`/`coverAlt`/`coords` ke frontmatter (idempoten). |
| `scripts/fix-dims.mjs` | Perbaiki `width`/`height` di `credits.json` dari berkas asli. |
| `scripts/build-fonts.mjs` | Konversi woff2 → TTF statis untuk OG (`scripts/fonts/`). |
| `scripts/README.md` | Penjelasan tiap skrip. |

Jalankan unduhan: `NODE_OPTIONS='--dns-result-order=ipv4first' node scripts/fetch-commons.mjs scripts/commons-manifest.json`

---

## Cara melanjutkan (resep praktis)

### Menambah artikel konten
1. Buat `src/content/{koleksi}/id/{slug}.md` dan `.../en/{slug}.md`.
2. `translationKey` **harus sama** di kedua berkas.
3. Isi frontmatter sesuai `src/content.config.ts`.
4. `npm run build` → halaman indeks & detail otomatis terbentuk.

### Menambah album galeri
Berkas `src/content/galeri/{id,en}/<album>.md`; `photos: [{src, alt, caption?, credit?}]`.
Nama berkas, `translationKey`, `order`, dan urutan `src` **identik** antar bahasa. Foto di
`src/assets/galeri/<album>/`. Halaman `/galeri/` dan lightbox sudah menangani sisanya.

### Menambah foto (Wikimedia Commons)
Pakai `scripts/fetch-commons.mjs` (tambah entri ke manifest). Atau manual:
1. `curl -4 -s -H "User-Agent: jelajah-rembang/0.1" "https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=File:NAMA&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=1600"`
2. Unduh `thumburl` (buang query `?utm_…`) ke `src/assets/...`.
3. Catat atribusi di `src/assets/credits.json` (dimensi dari `file <berkas>`, bukan `thumbwidth` API).
4. Pasang `cover:`/`photos[].src` (path relatif dari berkas konten).

> ⚠️ Node `fetch` diblokir di environment ini. Pakai **`curl -4`** untuk jaringan.
> Untuk wrangler/npm: `NODE_OPTIONS='--dns-result-order=ipv4first'`.
> Wikimedia membatasi laju: jeda ~9 s antar permintaan, batch judul ≤20.

### Deploy
```bash
NODE_OPTIONS='--dns-result-order=ipv4first' npm run build
NODE_OPTIONS='--dns-result-order=ipv4first' CI=true WRANGLER_SEND_METRICS=false npx wrangler deploy
```
Cloudflare: akun `b3646e9d901e18b382b3f961d2b98f69`. Worker aktif: `jelajah-rembang`.
Worker lama `rembang-web` **sudah dihapus** (9 Okt 2026).

### Verifikasi sebelum klaim selesai
```bash
NODE_OPTIONS='--dns-result-order=ipv4first' npm run check     # 0 error
node /home/zzdree/ANDREAS/impeccable/cli/bin/cli.js detect src/    # 0 anti-pattern
NODE_OPTIONS='--dns-result-order=ipv4first' npm run build      # 74 halaman
NODE_OPTIONS='--dns-result-order=ipv4first' npm test           # seluruh suite lulus
```

---

## Jebakan yang sudah ditemui (jangan terulang)

1. **IPv6 mati di laptop dev ini.** Node `fetch` dan `wrangler` gagal/hang tanpa prefix
   IPv4. Selalu `NODE_OPTIONS='--dns-result-order=ipv4first'`. `curl -6` gagal instan → pakai `curl -4`.
   `gh` butuh `GODEBUG=netdns=cgo`.

2. **Tailwind v4 ≠ v3.** Tidak ada `tailwind.config.ts`. Jangan ikut tutorial lama.

3. **Astro 7 lebih baru dari contoh internet.** Ikuti pola repo ini, bukan blog Astro 5.

4. **YAML frontmatter:** nilai yang mengandung `": "` harus dikutip, atau YAML membacanya
   sebagai objek (pernah mematahkan 74 baris `sources`). Kutip bila ada titik dua + spasi.

5. **Playwright browser mismatch.** Playwright 1.64 minta build 1248, yang terpasang 1234.
   Sudah di-symlink: `~/.cache/ms-playwright/chromium-1248 → chromium-1234`. Bila error
   "Executable doesn't exist", buat ulang symlink atau `npx playwright install chromium`.

6. **Preview server basi.** `astro preview` menyimpan pid; bila folder di-rename, server
   lama menyajikan `dist` lama. Matikan dulu (`kill <pid>` pada port 4321) lalu start ulang.

7. **`@astrojs/check` tidak mendukung TypeScript 7.** TypeScript di-pin ke `6.0.3`.

8. **`BaseLayout` wajib membungkus setiap halaman.** Bila `<title>` hilang, cek pembungkusan layout.

9. **`file` melaporkan density "1x1".** Saat membaca dimensi gambar dari `file`, cocokkan
   `(\d+)x(\d+), components` — jangan regex pertama (bisa menangkap density 1x1).

10. **Rate limit Wikimedia.** Burst beberapa permintaan → HTTP 429. Jeda 9 s + backoff + `maxlag=5`.

11. **satori & path font saat build.** `import.meta.url` menunjuk ke chunk di `dist/`, bukan
    root proyek. Pakai `process.cwd()` untuk menemukan `scripts/fonts/`. Dan satori **menolak
    variable font** (tabel `fvar` bikin opentype.js error); harus TTF statis (per-bobot).

12. **`image` prop `BaseHead`/`BaseLayout` sudah dihapus.** OG kini selalu otomatis; jangan
    tambah `image={...}` lagi.

13. **Skrip modul `.astro` hanya berjalan SEKALI.** View Transitions mengganti DOM setiap
    navigasi, jadi listener yang dipasang di badan skrip mati setelah pindah halaman.
    Gejala yang pernah terjadi: menu seluler, toggle tema, lightbox galeri, dan peta mati
    setelah navigasi. Selalu pasang ulang lewat `astro:page-load` (juga dipakai untuk
    memulihkan elemen yang baru dibuat), dan beri penanda guard di elemen (bukan variabel
    modul, karena modul tidak ikut di-scope ulang).

14. **`astro:page-load` juga menyala saat muat awal.** Jangan panggil `initX()` langsung
    *dan* mendengarkan event itu: IntersectionObserver jadi ganda dan memperebutkan elemen.
    Cukup `addEventListener` saja.

15. **Penanda guard harus berisi string tak-kosong.** `el.dataset.bound = ''` itu *falsy*,
    sehingga `if (el.dataset.bound) return;` tak pernah menyala. Akibat nyata: tombol memberi
    dua listener → satu klik membuka lalu langsung menutup panel (tampak seperti "tombol rusak"),
    dan peta melempar **"Map container is already initialized"**. Pakai `'true'`.

16. **View Transitions menimpa atribut `<html>`.** ClientRouter menyalin atribut dari dokumen
    baru dan hanya mempertahankan `data-astro-transition*`; `data-theme` karena itu selalu
    kembali `light` meski pengguna memilih gelap dan `localStorage` sudah benar. Sumber
    kebenaran harus `localStorage`/preferensi OS, bukan DOM. Pulihkan di `astro:before-swap`
    supaya tidak ada kedipan terang.

17. **Timestamp `requestAnimationFrame` bisa mendahului `performance.now()`** saat frame
    pertama. Counter yang memakai `(now - start)` menghasilkan angka **negatif** (`-23.699`).
    Clamp ke `Math.max(0, …)`.

---

## Keputusan yang sudah diambil (jangan diubah tanpa alasan)

| Keputusan | Alasan |
|---|---|
| Astro, bukan Next.js | Situs 100% konten; Astro = HTML statis, nol JS default, paling cepat |
| Cloudflare Workers static assets, bukan Pages | Panduan Cloudflare 2026 untuk proyek baru |
| Tanpa database | Konten = berkas Markdown di repo |
| Tanpa framework UI | 4 island vanilla TS cukup; bundle tetap kecil |
| Font Hanken Grotesk (satu keluarga sans) + Martian Mono (data) | Satu keluarga sans memberi kesan segar/modern; judul dibedakan lewat bobot+tracking. Serif Newsreader dilepas. Fraunces ada di daftar larangan Impeccable |
| Palet "Pesisir Segar" (putih bersih + merah Lasem + teal + indigo) | Dua palet sebelumnya ditolak pengguna: flat dingin, lalu krem/coklat. Putih bersih + aksen saturasi tinggi = "fresh" yang diminta |
| Tanpa token emas | Emas yang lolos AA selalu kecoklatan (oker); mustahil segar + AA. Tanda aksen pakai `merah-lasem` |
| Swap nilai token, pertahankan nama | Pemakaian kelas Tailwind tetap valid; nol risiko regresi kelas. `--soga` kini bernilai teal laut |
| Nama "Jelajah Rembang" | Dipilih pengguna; folder & repo sudah konsisten |
| Foto Wikimedia Commons | Lisensi bebas + atribusi; mudah diganti foto asli nanti |
| Galeri tematik-warisan (6 album) | Sejalan dengan posisi "arsip hidup", bukan galeri generik |

---

## Aset & kredensial

- **Cloudflare account ID:** `b3646e9d901e18b382b3f961d2b98f69` (env `CLOUDFLARE_ACCOUNT_ID`)
- **GitHub:** `zzdree` (gh CLI aktif)
- **Impeccable CLI:** `/home/zzdree/ANDREAS/impeccable/cli/bin/cli.js`
- **Foto + atribusi:** `src/assets/credits.json`, halaman `/kredit`

---

## Kontak & konteks pengguna

Pemilik proyek: **Andreas** (`zzdree`). Proyek lain di ekosistem yang sama:
`gia-deliksari-web` (Next.js + D1, referensi konvensi), `cbt-online`, `zzluxora-v10`.
Workflow 2 laptop (Linux dev ↔ Windows utama) via GitHub sebagai single source of truth.

**Bahasa komunikasi: Indonesia.** Pengguna menulis dalam bahasa Indonesia santai.
