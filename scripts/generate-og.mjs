#!/usr/bin/env node
/**
 * generate-og.mjs — 1200x630 PNG social cards for every blog post + a default card.
 *
 * Pipeline: gray-matter (frontmatter) → satori (layout/text-wrap → SVG) → resvg (SVG → PNG).
 * Fonts: TTF buffers in scripts/og-fonts/ (satori cannot read woff2).
 *
 * Card style (author's established design — keep it exactly):
 *   flat #000000 background, #F4F1EA text, no accent, no gradients, nothing decorative.
 *
 * Usage: npm run og
 */

import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const OUT_DIR = path.join(ROOT, 'public', 'og');
const FONT_DIR = path.join(ROOT, 'scripts', 'og-fonts');

const WIDTH = 1200;
const HEIGHT = 630;

const BG = '#000000';
const INK = '#F4F1EA';
const INK_55 = 'rgba(244, 241, 234, 0.55)';
const INK_20 = 'rgba(244, 241, 234, 0.2)';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Format a frontmatter date (Date object or YYYY-MM-DD string) as "June 18, 2026", UTC-safe. */
function formatDate(value) {
  if (!value) return null;
  if (value instanceof Date) {
    return `${MONTHS[value.getUTCMonth()]} ${value.getUTCDate()}, ${value.getUTCFullYear()}`;
  }
  const m = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${Number(m[1])}`;
  return String(value);
}

/** Kicker line, uppercase, per card type. */
function kickerFor(fm) {
  if (fm.series && fm.part != null) {
    return `${String(fm.series).toUpperCase()} / PART ${fm.part}`;
  }
  if (fm.tag) return `DEBKOSH.COM / ${String(fm.tag).toUpperCase()}`;
  return 'DEBKOSH.COM / BLOG';
}

function card({ kicker, title, date }) {
  const footerChildren = [
    {
      type: 'div',
      props: { children: 'Sudipta Deb · debkosh.com' },
    },
  ];
  if (date) {
    footerChildren.push({
      type: 'div',
      props: { children: date },
    });
  }

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: BG,
        color: INK,
        padding: '64px 72px 56px',
      },
      children: [
        // Top-left mono kicker
        {
          type: 'div',
          props: {
            style: {
              fontFamily: 'Space Mono',
              fontSize: 24,
              letterSpacing: '0.18em',
              color: INK_55,
            },
            children: kicker,
          },
        },
        // Center-left title
        {
          type: 'div',
          props: {
            style: {
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              paddingBottom: 24,
            },
            children: {
              type: 'div',
              props: {
                style: {
                  fontFamily: 'Space Grotesk',
                  fontWeight: 700,
                  fontSize: 68,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: INK,
                  lineClamp: 3,
                },
                children: title,
              },
            },
          },
        },
        // Bottom hairline + footer row
        {
          type: 'div',
          props: {
            style: {
              width: '100%',
              height: 1,
              backgroundColor: INK_20,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'Space Mono',
              fontSize: 22,
              color: INK_55,
              paddingTop: 20,
            },
            children: footerChildren,
          },
        },
      ],
    },
  };
}

async function render(node, fonts) {
  const svg = await satori(node, { width: WIDTH, height: HEIGHT, fonts });
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
    background: BG,
  });
  return resvg.render().asPng();
}

async function main() {
  const [grotesk, mono] = await Promise.all([
    readFile(path.join(FONT_DIR, 'space-grotesk-700.ttf')),
    readFile(path.join(FONT_DIR, 'space-mono-400.ttf')),
  ]);
  const fonts = [
    { name: 'Space Grotesk', data: grotesk, weight: 700, style: 'normal' },
    { name: 'Space Mono', data: mono, weight: 400, style: 'normal' },
  ];

  await mkdir(OUT_DIR, { recursive: true });

  let files = [];
  try {
    files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md')).sort();
  } catch {
    console.warn(`No blog directory at ${BLOG_DIR}; generating default card only.`);
  }

  for (const file of files) {
    const raw = await readFile(path.join(BLOG_DIR, file), 'utf8');
    const { data: fm } = matter(raw);
    const png = await render(
      card({
        kicker: kickerFor(fm),
        title: fm.heading || fm.title || file.replace(/\.md$/, ''),
        date: formatDate(fm.date),
      }),
      fonts,
    );
    const out = path.join(OUT_DIR, file.replace(/\.md$/, '.png'));
    await writeFile(out, png);
    console.log(`og: ${path.relative(ROOT, out)} (${(png.length / 1024).toFixed(1)} KB)`);
  }

  const png = await render(
    card({
      kicker: 'DEBKOSH.COM',
      title: 'The part vendors leave out.',
      date: null,
    }),
    fonts,
  );
  const out = path.join(OUT_DIR, 'default.png');
  await writeFile(out, png);
  console.log(`og: ${path.relative(ROOT, out)} (${(png.length / 1024).toFixed(1)} KB)`);
  console.log(`og: done — ${files.length} post card(s) + default.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
