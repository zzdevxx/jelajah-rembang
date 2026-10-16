#!/usr/bin/env node
/**
 * apply-covers-coords.mjs
 *
 * Menyisipkan `cover:`+`coverAlt:` (10 judul) dan `coords:` (3 destinasi) ke
 * frontmatter berkas konten id & en. Idempoten: lewati bila field sudah ada.
 * Sumber kebenaran ada di skrip ini supaya tidak salah ketik.
 *
 * Pakai: node scripts/apply-covers-coords.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src/content');

const COVERS = [
  { koleksi: 'budaya', slug: 'kopi-lelet', cover: '../../../assets/galeri/kuliner-pesisir/warung-kopi-lelet.jpg',
    alt: { id: 'Warung Kopi Lelet di Lasem.', en: 'A Kopi Lelet stall in Lasem.' } },
  { koleksi: 'budaya', slug: 'wayang-potehi-dan-seni-pertunjukan', cover: '../../../assets/galeri/panggung-dan-warisan/potehi-01.jpg',
    alt: { id: 'Boneka wayang potehi, koleksi Museum Ganesya.', en: 'Wayang potehi puppets from the Ganesya Museum collection.' } },
  { koleksi: 'destinasi', slug: 'hutan-mangrove-rembang', cover: '../../../assets/galeri/pesisir-dan-pantai/hutan-mangrove.jpg',
    alt: { id: 'Hutan mangrove Pasarbanggi di pesisir Rembang.', en: 'The Pasarbanggi mangrove forest on the Rembang coast.' } },
  { koleksi: 'destinasi', slug: 'klenteng-cu-an-kiong', cover: '../../../assets/galeri/lasem-tiongkok-kecil/cu-an-kiong-aula.jpg',
    alt: { id: 'Aula tengah Kelenteng Cu An Kiong, Lasem.', en: 'The central hall of Cu An Kiong Temple, Lasem.' } },
  { koleksi: 'destinasi', slug: 'makam-kartini', cover: '../../../assets/galeri/napak-tilas-kartini/makam-kartini-01.jpg',
    alt: { id: 'Makam R.A. Kartini di Desa Bulu, Rembang.', en: 'The grave of R.A. Kartini in Bulu village, Rembang.' } },
  { koleksi: 'destinasi', slug: 'museum-kartini', cover: '../../../assets/galeri/napak-tilas-kartini/museum-kartini-pendopo.jpg',
    alt: { id: 'Pendopo Museum Kartini Rembang.', en: 'The pendopo of the Kartini Museum in Rembang.' } },
  { koleksi: 'destinasi', slug: 'pantai-karang-jahe', cover: '../../../assets/galeri/pesisir-dan-pantai/pantai-karang-jahe.jpg',
    alt: { id: 'Pantai Karang Jahe dengan deretan pohon cemara.', en: 'Karang Jahe beach with its rows of casuarina trees.' } },
  { koleksi: 'kuliner', slug: 'lontong-tuyuhan', cover: '../../../assets/galeri/kuliner-pesisir/lontong-tuyuhan-09.jpg',
    alt: { id: 'Lontong tuyuhan dalam kuah santan kuning.', en: 'Lontong tuyuhan in a yellow coconut broth.' } },
  { koleksi: 'kuliner', slug: 'sate-srepeh', cover: '../../../assets/galeri/kuliner-pesisir/sate-srepeh.jpg',
    alt: { id: 'Sate srepeh khas Rembang.', en: 'Sate srepeh, a Rembang specialty.' } },
  { koleksi: 'destinasi', slug: 'klenteng-gie-yong-bio', cover: '../../../assets/destinasi/klenteng-gie-yong-bio.jpg',
    alt: { id: 'Kelenteng Gie Yong Bio di Lasem.', en: 'Gie Yong Bio Temple in Lasem.' } },
  { koleksi: 'kuliner', slug: 'mangut-manyung', cover: '../../../assets/kuliner/mangut-manyung.jpg',
    alt: { id: 'Mangut kepala ikan manyung khas pesisir.', en: 'Smoked manyung fish head curry.' } },
  { koleksi: 'budaya', slug: 'tradisi-laut', cover: '../../../assets/budaya/tradisi-laut.jpg',
    alt: { id: 'Bengkel perahu tradisional di pesisir Sarang, Rembang.', en: 'Traditional boatbuilding workshop on the coast of Sarang, Rembang.' } },
  { koleksi: 'kuliner', slug: 'dumbeg', cover: '../../../assets/kuliner/dumbeg.jpg',
    alt: { id: 'Dumbeg, jajanan manis gurih berbalut daun lontar spiral.', en: 'Dumbeg, a sweet and savoury snack wrapped in spiral palm leaves.' } },
  { koleksi: 'kuliner', slug: 'urap-latoh', cover: '../../../assets/kuliner/urap-latoh.jpg',
    alt: { id: 'Latoh atau anggur laut (Caulerpa racemosa) segar khas pesisir Rembang.', en: 'Fresh latoh or sea grapes (Caulerpa racemosa) typical of the Rembang coast.' } },
  { koleksi: 'sejarah', slug: 'asal-usul-nama-rembang', cover: '../../../assets/galeri/pesisir-dan-pantai/pelabuhan-rembang-01.jpg',
    alt: { id: 'Pelabuhan Rembang di pesisir utara.', en: 'The port of Rembang on the north coast.' } },
];

const COORDS = [
  { slug: 'pantai-karang-jahe', coords: '[-6.6911, 111.4147]' },
  { slug: 'pantai-caruban', coords: '[-6.6786, 111.4288]' },
  { slug: 'pantai-wates', coords: '[-6.6888, 111.2810]' },
  { slug: 'museum-kartini', coords: '[-6.7064, 111.3503]' },
  { slug: 'makam-kartini', coords: '[-6.8625, 111.4064]' },
  { slug: 'petilasan-sunan-bonang', coords: '[-6.6598, 111.4680]' },
  { slug: 'klenteng-cu-an-kiong', coords: '[-6.6944, 111.4439]' },
  { slug: 'klenteng-gie-yong-bio', coords: '[-6.6957, 111.4404]' },
  { slug: 'hutan-mangrove-rembang', coords: '[-6.6973, 111.3882]' },
  { slug: 'embung-lodan', coords: '[-6.7947, 111.6087]' },
];

const quote = (s) => `"${String(s).replace(/"/g, '\\"')}"`;
let changed = 0;
const problems = [];

function insertAfter(lines, predicate, newLines) {
  const idx = lines.findIndex(predicate);
  if (idx === -1) return null;
  return [...lines.slice(0, idx + 1), ...newLines, ...lines.slice(idx + 1)];
}

function apply(path, fn) {
  const src = readFileSync(path, 'utf8');
  const lines = src.split('\n');
  const out = fn(lines);
  if (out) {
    writeFileSync(path, out.join('\n'));
    changed++;
  }
}

for (const c of COVERS) {
  for (const lang of ['id', 'en']) {
    const path = join(CONTENT, c.koleksi, lang, `${c.slug}.md`);
    try {
      readFileSync(path);
    } catch {
      problems.push(`Tidak ada: ${path}`);
      continue;
    }
    apply(path, (lines) => {
      if (lines.some((l) => l.startsWith('cover:'))) return null; // sudah ada
      return insertAfter(lines, (l) => l.startsWith('summary:'), [
        `cover: ${c.cover}`,
        `coverAlt: ${quote(c.alt[lang])}`,
      ]);
    });
  }
}

for (const c of COORDS) {
  for (const lang of ['id', 'en']) {
    const path = join(CONTENT, 'destinasi', lang, `${c.slug}.md`);
    try {
      readFileSync(path);
    } catch {
      problems.push(`Tidak ada: ${path}`);
      continue;
    }
    apply(path, (lines) => {
      if (lines.some((l) => l.startsWith('coords:'))) return null;
      return insertAfter(lines, (l) => l.startsWith('kecamatan:'), [`coords: ${c.coords}`]);
    });
  }
}

console.log(`Berkas diubah: ${changed}`);
if (problems.length) {
  console.error('MASALAH:');
  problems.forEach((p) => console.error('  ' + p));
  process.exitCode = 1;
}
