/**
 * og.ts — pembuat gambar Open Graph (1200x630) untuk Jelajah Rembang.
 *
 * Alur: satori (HTML-like → SVG, memakai font asli) → sharp (SVG → JPEG).
 * Font dimuat dari `scripts/fonts/*.ttf` (hasil `scripts/build-fonts.mjs`).
 * Hanya dipakai saat build (prerender); tidak pernah dikirim ke peramban.
 */
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export { ogSlugFor } from './og-slug';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Warna dari DESIGN.md "Wastra Pusaka" (heks, sinkron 1:1). */
const C = {
  paper: '#faf8f5',
  sunken: '#f1efeb',
  ink: '#141416',
  soft: '#56555c',
  accent: '#a31828',
  teal: '#0e585e',
  rule: '#e4e2da',
};

// Saat prerender, proses berjalan dari root proyek; bundel berada di dist/,
// jadi jangan pakai import.meta.url. Lihat jebakan #11 di HANDOFF.md.
const FONT_DIR = join(process.cwd(), 'scripts', 'fonts') + '/';
let fontsCache: Parameters<typeof satori>[1]['fonts'] | null = null;

function fonts() {
  if (!fontsCache) {
    fontsCache = [
      // Satu keluarga sans (judul, wordmark, body OG)
      { name: 'Hanken Grotesk Variable', data: readFileSync(`${FONT_DIR}hanken-400.ttf`), weight: 400, style: 'normal' },
      { name: 'Hanken Grotesk Variable', data: readFileSync(`${FONT_DIR}hanken-600.ttf`), weight: 600, style: 'normal' },
      { name: 'Hanken Grotesk Variable', data: readFileSync(`${FONT_DIR}hanken-700.ttf`), weight: 700, style: 'normal' },
    ];
  }
  return fontsCache;
}

export interface OgProps {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Path absolut ke berkas gambar (bila ada). */
  imageFile?: string;
}

/* ---------- potongan tata letak ---------- */

const ellipse = (w: number, h: number, extra: Record<string, unknown>) => ({
  type: 'div',
  props: {
    style: {
      position: 'absolute',
      width: `${w}px`,
      height: `${h}px`,
      borderRadius: '9999px',
      border: `2px solid ${C.soft}`,
      opacity: 0.45,
      ...extra,
    },
  },
});

const motif = {
  type: 'div',
  props: {
    style: { position: 'absolute', right: '64px', top: '150px', width: '280px', height: '280px' },
    children: [
      ellipse(92, 132, { left: '94px', top: '0px' }),
      ellipse(92, 132, { left: '94px', bottom: '0px' }),
      ellipse(132, 92, { left: '0px', top: '94px' }),
      ellipse(132, 92, { right: '0px', top: '94px' }),
      {
        type: 'div',
        props: {
          style: {
            position: 'absolute',
            left: '130px',
            top: '130px',
            width: '20px',
            height: '20px',
            borderRadius: '9999px',
            border: `2px solid ${C.accent}`,
            opacity: 0.7,
          },
        },
      },
    ],
  },
};

function eyebrowRow(text: string) {
  return {
    type: 'div',
    props: {
      style: { display: 'flex', alignItems: 'center', gap: '16px' },
      children: [
        { type: 'div', props: { style: { width: '40px', height: '3px', backgroundColor: C.accent } } },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontFamily: 'Hanken Grotesk Variable',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: C.accent,
            },
            children: text,
          },
        },
      ],
    },
  };
}

function footerRow() {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: `2px solid ${C.rule}`,
        paddingTop: '26px',
      },
      children: [
        { type: 'div', props: { style: { display: 'flex', fontFamily: 'Hanken Grotesk Variable', fontSize: '28px', fontWeight: 700, color: C.ink }, children: 'Jelajah Rembang' } },
        { type: 'div', props: { style: { display: 'flex', fontFamily: 'Hanken Grotesk Variable', fontSize: '18px', color: C.soft }, children: 'Rembang, Jawa Tengah' } },
      ],
    },
  };
}

function titleSize(title: string): number {
  const n = title.length;
  if (n <= 26) return 84;
  if (n <= 40) return 72;
  if (n <= 56) return 60;
  if (n <= 74) return 50;
  return 44;
}

function clamp(s: string, n: number): string {
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
}

/* ---------- dua varian kartu ---------- */

function textLayout({ eyebrow, title, lead }: OgProps) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: C.paper,
        padding: '80px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Hanken Grotesk Variable',
      },
      children: [
        motif,
        eyebrowRow(eyebrow),
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: '22px' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontFamily: 'Hanken Grotesk Variable',
                    fontSize: `${titleSize(title)}px`,
                    fontWeight: 700,
                    lineHeight: 1.06,
                    color: C.ink,
                    maxWidth: '740px',
                  },
                  children: clamp(title, 90),
                },
              },
              lead
                ? {
                    type: 'div',
                    props: {
                      style: { display: 'flex', fontFamily: 'Hanken Grotesk Variable', fontSize: '28px', lineHeight: 1.4, color: C.soft, maxWidth: '680px' },
                      children: clamp(lead, 130),
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        footerRow(),
      ],
    },
  };
}

function photoLayout(props: OgProps, dataUri: string) {
  const { eyebrow, title, lead } = props;
  return {
    type: 'div',
    props: {
      style: { width: '100%', height: '100%', display: 'flex', backgroundColor: C.paper, fontFamily: 'Hanken Grotesk Variable' },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '700px',
              padding: '72px',
            },
            children: [
              eyebrowRow(eyebrow),
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', gap: '20px' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontFamily: 'Hanken Grotesk Variable',
                          fontSize: `${titleSize(title)}px`,
                          fontWeight: 700,
                          lineHeight: 1.06,
                          color: C.ink,
                        },
                        children: clamp(title, 80),
                      },
                    },
                    lead
                      ? {
                          type: 'div',
                          props: {
                            style: { display: 'flex', fontFamily: 'Hanken Grotesk Variable', fontSize: '28px', lineHeight: 1.4, color: C.soft },
                            children: clamp(lead, 110),
                          },
                        }
                      : null,
                  ].filter(Boolean),
                },
              },
              { type: 'div', props: { style: { display: 'flex', fontFamily: 'Hanken Grotesk Variable', fontSize: '28px', fontWeight: 700, color: C.ink }, children: 'Jelajah Rembang' } },
            ],
          },
        },
        { type: 'img', props: { src: dataUri, width: 500, height: OG_HEIGHT, style: { objectFit: 'cover' } } },
      ],
    },
  };
}

/** Render satu kartu OG → Buffer JPEG. */
export async function renderOg(props: OgProps): Promise<Buffer> {
  let element: unknown = textLayout(props);

  if (props.imageFile) {
    try {
      const buf = readFileSync(props.imageFile);
      const mime = props.imageFile.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
      element = photoLayout(props, `data:${mime};base64,${buf.toString('base64')}`);
    } catch {
      element = textLayout(props);
    }
  }

  // satori bertipe ReactNode; kita beri struktur node generik.
  const svg = await satori(element as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts: fonts() });
  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}
