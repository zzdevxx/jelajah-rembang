#!/usr/bin/env node
/**
 * fetch-commons.mjs
 *
 * Mengunduh foto Wikimedia Commons (lebar 1600 px) ke src/assets/, lalu
 * menambahkan entri atribusi ke src/assets/credits.json.
 *
 * Catatan lingkungan:
 *  - Node `fetch` DIBLOKIR di mesin ini. Skrip ini memakai `curl -4` (IPv4).
 *  - Wikimedia membatasi laju; jeda 9 s antar panggilan API dan antar unduhan.
 *  - Resumable: berkas yang sudah ada di `dest` dilewati.
 *
 * Pakai:
 *   node scripts/fetch-commons.mjs scripts/commons-manifest.json
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const CREDITS = join(ASSETS, 'credits.json');
const UA = 'jelajah-rembang/0.1 (https://github.com/zzdevxx/jelajah-rembang; educational)';
const API = 'https://commons.wikimedia.org/w/api.php';
const THUMB_W = 1600;
const SLEEP_API = 9000;
const SLEEP_DL = 9000;

const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error('Usage: node scripts/fetch-commons.mjs scripts/commons-manifest.json');
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(resolve(manifestPath), 'utf8'));

const sleep = (ms) => execFileSync('sleep', [String(ms / 1000)]);

function curlJson(params, tries = 5) {
  const url = `${API}?${new URLSearchParams({ format: 'json', maxlag: '5', ...params })}`;
  for (let t = 0; t < tries; t++) {
    try {
      const out = execFileSync('curl', ['-4', '-s', '-H', `User-Agent: ${UA}`, url], {
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
      }).trim();
      if (out.startsWith('{')) return JSON.parse(out);
    } catch {
      /* retry */
    }
    console.error(`  ! retry API (${t + 1}/${tries})`);
    sleep(Math.min(20 * (t + 1), 120));
  }
  return {};
}

const strip = (s) => (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function fetchInfo(files) {
  const info = {};
  for (let i = 0; i < files.length; i += 18) {
    const batch = files.slice(i, i + 18);
    const d = curlJson({
      action: 'query',
      titles: batch.map((f) => `File:${f}`).join('|'),
      prop: 'imageinfo',
      iiprop: 'url|size|extmetadata',
      iiurlwidth: String(THUMB_W),
    });
    for (const p of Object.values(d?.query?.pages ?? {})) {
      if (!p.imageinfo) continue;
      const ii = p.imageinfo[0];
      const em = ii.extmetadata ?? {};
      const g = (k) => strip((em[k] ?? {}).value ?? '');
      info[p.title.slice(5)] = {
        thumb: (ii.thumburl ?? '').split('?')[0],
        license: g('LicenseShortName'),
        licenseUrl: g('LicenseUrl'),
        artist: g('Artist') || 'Unknown',
        source: ii.descriptionurl ?? '',
      };
    }
    if (i + 18 < files.length) sleep(SLEEP_API);
  }
  return info;
}

function download(url, dest) {
  mkdirSync(dirname(dest), { recursive: true });
  for (let t = 0; t < 4; t++) {
    try {
      execFileSync('curl', ['-4', '-s', '-L', '-H', `User-Agent: ${UA}`, '-o', dest, url], {
        maxBuffer: 128 * 1024 * 1024,
      });
      const sz = existsSync(dest) ? statSync(dest).size : 0;
      if (sz > 5000) return sz;
    } catch {
      /* retry */
    }
    sleep(Math.min(15 * (t + 1), 60));
  }
  return 0;
}

function dimensions(file) {
  try {
    const out = execFileSync('file', [file], { encoding: 'utf8' });
    // Dimensi gambar muncul sebagai "<w>x<h>, components N" (hindari field density "1x1").
    const m = out.match(/(\d+)\s*x\s*(\d+)\s*,\s*components/);
    if (m) return { width: Number(m[1]), height: Number(m[2]) };
  } catch {
    /* ignore */
  }
  return { width: 0, height: 0 };
}

function isImage(file) {
  try {
    return /JPEG|PNG/.test(execFileSync('file', [file], { encoding: 'utf8' }));
  } catch {
    return false;
  }
}

// ---- main ----
const files = manifest.map((m) => m.commons);
console.log(`Mengambil metadata ${files.length} berkas dari Commons...`);
const info = fetchInfo(files);
console.log(`Metadata diterima: ${Object.keys(info).length}/${files.length}`);

const credits = JSON.parse(readFileSync(CREDITS, 'utf8'));
const byLocal = new Set(credits.map((c) => c.local));
const bySource = new Set(credits.map((c) => c.source));
let added = 0,
  skipped = 0,
  failed = 0;

manifest.forEach((m, idx) => {
  const dest = join(ASSETS, m.dest);
  const meta = info[m.commons];
  if (!meta) {
    console.error(`MISS  ${m.commons} (tidak ada di respons API)`);
    failed++;
    return;
  }
  if (existsSync(dest) && isImage(dest)) {
    console.log(`SKIP  ${m.dest} (sudah ada)`);
    skipped++;
  } else {
    const sz = download(meta.thumb, dest);
    if (!sz || !isImage(dest)) {
      console.error(`FAIL  ${m.commons} -> ${m.dest}`);
      failed++;
      return;
    }
    console.log(`OK    ${m.dest} (${Math.round(sz / 1024)} KB)`);
  }
  const { width, height } = dimensions(dest);
  if (width < 400 || height < 400) console.error(`  ! dimensi kecil ${width}x${height} untuk ${m.dest}`);

  if (byLocal.has(m.dest) || bySource.has(meta.source)) {
    console.log(`  kredit sudah ada, dilewati (${m.dest})`);
    return;
  }
  credits.push({
    local: m.dest,
    title: m.title ?? m.commons.replace(/\.(jpe?g|png)$/i, ''),
    artist: meta.artist,
    license: meta.license,
    licenseUrl: meta.licenseUrl,
    source: meta.source,
    width,
    height,
  });
  byLocal.add(m.dest);
  bySource.add(meta.source);
  added++;

  if (idx < manifest.length - 1) sleep(SLEEP_DL);
});

// tulis atomik + validasi
const tmp = `${CREDITS}.tmp`;
writeFileSync(tmp, JSON.stringify(credits, null, 2) + '\n');
JSON.parse(readFileSync(tmp, 'utf8'));
renameSync(tmp, CREDITS);

console.log(`\nSelesai. kredit ditambah: ${added} | dilewati: ${skipped} | gagal: ${failed}`);
console.log(`Total entri credits.json: ${credits.length}`);
if (failed) process.exitCode = 1;
