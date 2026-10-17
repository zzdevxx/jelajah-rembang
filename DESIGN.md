---
schemaVersion: 2
name: Wastra Pusaka
description: Sistem desain untuk situs profil Kabupaten Rembang — imperial Lasem & velvet obsidian: kanvas alabaster sutra hangat (#FAF8F5), arang beludru (#141416), tiga warna aksen kultural (merah delima Lasem keraton #A31828, biru wedel pesisir #1B365D, zamrud soga #0E585E). Dark mode: obsidian beludru (#0A0B0E), kartu obsidian (#14161C), teks titanium (#F4F4F6), aksen rubi berkilau (#F43F5E), tombol rubi beludru (#BE123C).

colors:
  # --- Tiga warna aksen pesisir (elegan, keraton, saturasi berwibawa) ---
  merah-lasem: '#a31828'
  merah-lasem-deep: '#83101e'
  indigo-lasem: '#1b365d'
  soga: '#0e585e'

  # --- Permukaan terang (alabaster sutra hangat & bercahaya) ---
  paper: '#faf8f5'
  paper-raised: '#ffffff'
  paper-sunken: '#f1efeb'
  ink: '#141416'
  ink-soft: '#56555c'
  rule: '#e4e2da'
  focus: '#a31828'
  scrim: '#141416'

  # --- Permukaan gelap (obsidian beludru pekat) ---
  paper-dark: '#0a0b0e'
  paper-dark-raised: '#14161c'
  paper-dark-sunken: '#060709'
  ink-dark: '#f4f4f6'
  ink-soft-dark: '#90919c'
  rule-dark: '#20232c'
  merah-lasem-dark: '#f43f5e'
  merah-lasem-deep-dark: '#fb7185'
  merah-lasem-fill-dark: '#be123c'
  indigo-lasem-dark: '#60a5fa'
  soga-dark: '#2dd4bf'

typography:
  display:
    fontFamily: 'Hanken Grotesk Variable'
    fontSize: 'clamp(3rem, 9vw, 6.5rem)'
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: '-0.035em'
  h1:
    fontFamily: 'Hanken Grotesk Variable'
    fontSize: 'clamp(2rem, 4.5vw, 3rem)'
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: '-0.022em'
  h2:
    fontFamily: 'Hanken Grotesk Variable'
    fontSize: '1.75rem'
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: '-0.016em'
  h3:
    fontFamily: 'Hanken Grotesk Variable'
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '-0.01em'
  body:
    fontFamily: 'Hanken Grotesk Variable'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
  lead:
    fontFamily: 'Hanken Grotesk Variable'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Hanken Grotesk Variable'
    fontSize: '0.75rem'
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: '0.08em'
  data:
    fontFamily: 'Martian Mono Variable'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.4
  micro:
    fontFamily: 'Hanken Grotesk Variable'
    fontSize: '0.625rem'
    fontWeight: 600
    lineHeight: 1.4

rounded:
  control: '2px'
  card: '4px'
  hairline: '2px'
  pill: '9999px'

spacing:
  unit: '0.25rem'
  section: 'clamp(4.5rem, 9vw, 8rem)'
  content: '72rem'
  prose: '68ch'

components:
  button-primary:
    backgroundColor: '{colors.merah-lasem}'
    textColor: '#ffffff'
    rounded: '{rounded.control}'
    padding: '0.75rem 1.25rem'
  card:
    backgroundColor: '{colors.paper-raised}'
    textColor: '{colors.ink}'
    rounded: '{rounded.card}'
    border: '1px solid {colors.rule}'
  nav-link:
    textColor: '{colors.ink-soft}'
    fontSize: '0.875rem'
  stat-block:
    fontFamily: '{typography.data.fontFamily}'
    textColor: '{colors.ink}'
---

# Pesisir Segar

Sistem desain untuk situs profil **Kabupaten Rembang**. North Star: *kertas putih bersih dengan
tiga warna pesisir (merah Lasem, teal laut, indigo wedel) dicetak tajam, dan tipografi sans yang
tegas — segar seperti pagi di pantura, bukan arsip berdebu.*

## Overview

Revisi 9 Okt 2026 menggantikan **"Arsip Pesisir"** (kertas tua + tinta cokelat + serif) yang dinilai
pengguna **"masih coklat"** dan tidak segar. Akar masalahnya struktural: kertas `#f4ede0` adalah
**krem**, `--ink` `#231a14` adalah **coklat gelap**, dan `--soga` `#7c5a2a` **coklat tanah** — jadi
seluruh halaman memang bernuansa sepia, bukan sekadar "warm". Revisi ini membuang seluruh keluarga
coklat dan menggantinya dengan **putih bersih + aksen saturasi tinggi**.

Lima gagasan yang mengikat keputusan visual:

1. **Putih bersih, bukan kertas tua.** Dasar halaman adalah `#ffffff`. Pemisahan permukaan hanya
   lewat **langkah tonal tipis** (`paper` / `paper-sunken`) dan **garis rambut 1px**.
2. **Tiga warna pesisir, satu aksen utama.** Merah Lasem (`merah-lasem`) adalah aksen utama; teal
   laut (`soga`) dan indigo wedel (`indigo-lasem`) membawa identitas. **Tanpa emas** (emas yang
   lolos AA selalu kecoklatan, jadi dibuang seluruhnya).
3. **Satu keluarga sans.** Hanken Grotesk untuk judul **dan** prosa/UI — judul dibedakan lewat
   **bobot + tracking**, bukan ganti muka huruf. Martian Mono hanya untuk data.
4. **Geometri kain adalah ornamen.** Motif batik (Kawung, Truntum, Latohan) hadir sebagai
   **geometri garis SVG yang digambar sendiri** — bukan tekstur foto, bukan pola yang diulang
   di belakang teks.
5. **Tionghoa–Jawa adalah isi, bukan kostum.** Tanpa palet merah-emas norak, tanpa emoji naga,
   tanpa kaligrafi palsu. Sinkretisme tampil dalam *struktur* (klenteng ↔ masjid ↔ wihara).

Tema terang adalah utama. Tema gelap adalah tema kedua yang sungguhan (arang **biru**, bukan hitam
dingin), dengan aksen yang *naik* kecerahan. Keduanya dikendalikan token yang sama.

## Colors

Fresh coastal: **putih bersih + tiga warna aksen**. Nilai dinyatakan dalam heks untuk sinkron 1:1
dengan `src/styles/global.css`.

### Warna aksen (peran jenuh)

| Token | Terang | Gelap | Peran |
|---|---|---|---|
| `merah-lasem` | `#c1272d` | `#f0716f` | **Aksen utama** (Lasem bata). Tombol utama, item nav aktif, tautan aksi, cincin fokus. |
| `merah-lasem-deep` | `#9c1c22` | `#f79b99` | Hover/active aksen. |
| `indigo-lasem` | `#1e3a8a` | `#93a7f0` | **Wedel: indigo batik.** Tautan dalam prosa & judul "identitas", pin kategori religi/embung. |
| `soga` | `#0e6e7d` | `#5fc9d6` | **Teal laut.** Label kecil, garis hover, motif, pin kategori museum/alam/hutan. |

> **Tanpa `gold`.** Aksen emas dihapus: nilai emas yang lolos kontras AA selalu jatuh ke oker
> kecoklatan (`#9a6b00`), yang justru melawan arah "segar". Tanda aksen sekarang memakai
> `merah-lasem`.

### Permukaan & teks

| Peran | Terang | Gelap |
|---|---|---|
| `--paper` (dasar halaman) | `#ffffff` | `#0e1418` |
| `--paper-raised` (kartu) | `#ffffff` | `#172026` |
| `--paper-sunken` (inset, seksi) | `#f4f6f8` | `#080c0f` |
| `--ink` (teks utama) | `#132029` | `#eef3f5` |
| `--ink-soft` (teks sekunder) | `#4a5a63` | `#9fb0b8` |
| `--rule` (garis rambut) | `#d8dee3` | `#2a363d` |
| `--focus` (cincin fokus) | `#c1272d` | `#f0716f` |

> `--scrim` (veil overlay lightbox) selalu gelap di kedua tema (`#132029` / `#080c0f`): veil harus
> menggelapkan, bukan ikut berbalik terang.

> **Kontras (dihitung, WCAG AA).** Terang: `ink` 16,58:1 · `ink-soft` 7,16:1 · `merah` 5,84:1 ·
> `wedel` 10,36:1 · `teal` 5,92:1 di atas putih; putih di atas `merah` 5,84:1.
> Gelap: `ink` 16,59:1 · `ink-soft` 8,28:1 · `merah` 6,45:1 · `wedel` 7,97:1 · `teal` 9,55:1.
> Semua lolos. Diuji otomatis oleh `tests/contrast.spec.ts`.

### Aturan pakai

- Warna aksen jenuh **≤ ~12% viewport**; satu aksi utama per tampilan.
- **Jangan** menaruh teks abu di atas permukaan beraksen.
- **Satu** aksi utama per tampilan; jangan ada dua CTA aksen bersaing.
- Kartu dipisahkan **garis rambut 1px** saja (tanpa bayangan, tanpa border **dan** bayangan).

## Typography

**Satu keluarga, dua bobot.** **Hanken Grotesk Variable** untuk judul, hero, **dan** prosa/UI:
judul dibedakan lewat **bobot 700 + tracking rapat**, bukan muka huruf kedua. **Martian Mono**
hanya untuk data/angka.

| Peran | Muka huruf | Alasan |
|---|---|---|
| **Display & judul** | **Hanken Grotesk** (variabel, 700) | Satu keluarga yang tegas dan modern; hierarki dari bobot + tracking, bukan dari ganti font. |
| **Body/UI** | **Hanken Grotesk** (variabel, 400/600) | Grotesk humanis, aperture terbuka; nyaman untuk prosa panjang. |
| **Data** | **Martian Mono** (variabel) | Hanya untuk angka tabular, koordinat, label data. Bukan kostum mono, bukan heading. |

Skala:

```
display  clamp(3rem, 9vw, 6.5rem)      lh 0.94   tracking -0.035em  Hanken 700   (judul hero)
h1       clamp(2rem, 4.5vw, 3rem)      lh 1.08   tracking -0.022em  Hanken 700
h2       1.75rem                        lh 1.16   tracking -0.016em  Hanken 700
h3       1.25rem                        lh 1.30   tracking -0.010em  Hanken 600
body     1rem                           lh 1.65   measure 68ch       Hanken 400
lead     1.125rem                       lh 1.60                      Hanken 400
label    0.75rem                        lh 1.40   tracking 0.08em    Hanken 600 (huruf besar, hemat)
data     0.875rem                       lh 1.40                      Martian Mono 400 (tabular-nums)
2xs      0.625rem                       lh 1.40                      Hanken 600 (metadata mikro)
```

> `display` hanya untuk judul hero (`HomePage.astro`); `h1` adalah judul halaman biasa.
> Sans display butuh tracking **lebih rapat** dari serif (pakai -0.02em s/d -0.035em untuk judul
> besar), dan line-height lebih ketat (0.94–1.16).

Disiplin: measure body **65–75ch**; **lebih banyak ruang di atas judul daripada di bawah**;
tanpa gradient text; penekanan hanya lewat bobot/ukuran; tanpa eyebrow di atas setiap judul.

## Layout

- Lebar konten `72rem` (publik), `68ch` (prosa). Gutter `clamp(1.25rem, 4vw, 3rem)`.
- Irama seksi vertikal `clamp(4.5rem, 9vw, 8rem)`.
- Grid `minmax()` / `auto-fit`; setiap halaman indeks **berbeda secara struktural** (sejarah =
  garis waktu vertikal; budaya = dua kolom; kuliner = daftar padat mengutamakan gambar;
  destinasi = hibrida peta + kartu). Tidak pernah satu grid kartu identik untuk semua seksi.

## Motion — dial ENERGY 3 / RHYTHM 3 / MOTION 3

Gerak punya tujuan yang bisa ditulis satu baris, dan **semua mati total** di
`prefers-reduced-motion`. Tanpa JavaScript, konten tampil apa adanya (kelas `.js` tidak ada).

| Gerak | Tujuan | Implementasi |
|---|---|---|
| **Reveal saat scroll** | Menuntun mata mengikuti urutan baca | `[data-reveal]` + IntersectionObserver |
| **Stagger berjenjang** | Menyatakan hierarki dalam satu kelompok | `transition-delay: calc(var(--i) * 80ms)` |
| **Reveal mask (clip)** | Judul hero muncul dari bawah | `[data-reveal="clip"]` (clip-path) |
| **Underline tumbuh** | Menandai judul sebagai titik masuk | `[data-underline]::after` skala-X |
| **Canting Draw** | Motif batik menggambar dirinya sekali | `stroke-dashoffset` 1100ms |
| **Float lembut** | Satu aksen hidup di hero | `float-soft` 7s, hanya hero |
| **Counter angka** | Statistik "terisi" saat terlihat | `[data-count]`, `Intl.NumberFormat` |
| **Parallax hero** | Kedalaman halus saat scroll | `[data-parallax]`, rAF, hanya ≥768px |
| **Pita kecamatan** | 14 kecamatan sebagai konten nyata | `marquee` 38s, jeda saat hover |
| **Transisi halaman** | Kontinuitas antar navigasi | Astro View Transitions |

Pagar: gerak tidak untuk semua elemen; **nol** bounce/elastic (`--ease-out-expo` /
`--ease-out-quint` saja); listener parallax dibersihkan di `astro:before-swap`.

## Elevation & Depth

- **Diam:** garis rambut 1px `--rule` + satu langkah tonal. **Tanpa bayangan.**
- **Mengambang:** hanya untuk **overlay sejati** (popup/kontrol peta pihak ketiga). Satu
  bayangan terdokumentasi: `0 10px 30px -12px color-mix(in oklch, var(--ink) 35%, transparent)`.
- Tidak pernah glow, tidak pernah garis **dan** bayangan lebar bersamaan.

## Shapes

- Radius **tajam**: kontrol `2px`, kartu `4px`, pil `9999px` (badge saja).
- Garis rambut 1px sebagai pemisah; **tanpa** border garis-samping >1px.
- Motif batik sebagai geometri garis SVG: `stroke` 1–2px, `fill: none`, warna tinta.

## Components

- **Button utama** — latar `merah-lasem`, teks putih, radius `control` (2px). Hover → `merah-lasem-deep`; focus-visible → cincin `--focus`.
- **Card** — latar `paper-raised`, radius `card` (4px), border 1px `rule`. Tanpa bayangan.
- **Nav link** — `ink-soft` 0.875rem; aktif = `merah-lasem`.
- **Stat block** — `Martian Mono`, angka tabular, label kecil di atas nilai; mendukung counter.
- **Figure (lempeng bersih)** — `<figure>` + `<figcaption>`; gambar dibingkai **1px `rule` + padding dalam tipis + latar `paper-raised`**, garis rambut tanpa bayangan. Caption sans kecil.
- **Article header** — tanda aksen `merah-lasem` (garis pendek) di atas `h1`.
- **Timeline** (sejarah) — penanda era + tahun `Martian Mono`, garis vertikal `rule`.
- **Callout** — latar `paper-sunken`, border kiri 2px `soga`.

## Do's and Don'ts

**Lakukan:**

- Pakai tiga warna pesisir dengan peran jelas; merah Lasem sebagai satu-satunya aksen utama.
- Pisahkan permukaan dengan langkah tonal tipis + garis rambut 1px.
- Jaga measure prosa 65–75ch; beri lebih banyak ruang di atas judul.
- Bedakan judul dari body lewat **bobot + tracking**, bukan ganti muka huruf.
- Tema permukaan browser: `::selection` (merah), `caret-color`, scrollbar, `:focus-visible`.
- Ikuti sistem gerak di bagian **Motion**; semua mati di `prefers-reduced-motion`.

**Jangan:**

- Jangan pakai Inter, Roboto, sistem default, atau font larangan Impeccable (Fraunces, Plus Jakarta Sans, Space Grotesk, Geist).
- Jangan pakai **coklat/sepia/emas** sebagai permukaan atau tinta (kertas krem, tinta coklat, oker). Ini arah yang ditolak.
- Jangan pakai **glassmorphism / `backdrop-blur`** di mana pun (header termasuk). Linter tidak menangkap ini; jaga manual.
- Jangan pakai gradien, termasuk pola bergaris berulang (`repeating-linear-gradient`).
- Jangan pakai serif display (Newsreader) lagi: satu keluarga sans sudah menjadi kebijakan.
- Jangan taruh teks abu di atas warna beraksen.
- Jangan sarangkan kartu di dalam kartu; jangan grid kartu identik untuk semua seksi.
- Jangan pasang eyebrow/kicker di atas setiap judul; jangan gradient text.
- Jangan pakai bayangan pada kartu; hanya overlay sejati yang boleh mengambang.
- Jangan pakai easing bounce/elastic; jangan pakai emoji sebagai ikon; jangan pakai mono sebagai kostum.
- Jangan pakai foto stok pantai daerah lain dan menyebutnya "Pantai Karang Jahe".
