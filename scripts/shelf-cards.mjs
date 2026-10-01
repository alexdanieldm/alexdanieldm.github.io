/**
 * Cuts the shelf's link preview cards, the image a chat app or a feed shows
 * when someone pastes a link, into `public/shelf/`:
 *
 * - `card.jpg`, for the shelf and its contact page: the first two of each
 *   section, a column each, on the shelf's ground. It is the collage the
 *   contact page shows, so the link previews what it leads to.
 * - `<slug>/<still>-card.jpg`, for a write-up that names one of its stills as
 *   its `linkPreview`: that still, cut to the card's shape.
 *
 * Run it after reordering the shelf, replacing one of those posters, or giving
 * a write-up its preview: `npm run shelf:cards`. The build stops while a card a
 * page names is missing, but it cannot tell a stale one, so run this.
 *
 * The shelf and the pieces are read from their own TypeScript, compiled here
 * with the compiler the repo already has, so the collage follows the shelf's
 * order rather than keeping a list of its own that drifts. That works because
 * those files import nothing but types.
 *
 * sharp is not a dependency of this repo. It is already installed because Next
 * depends on it, and this runs by hand, never in the build.
 */

import { readdirSync, readFileSync } from 'node:fs';

import sharp from 'sharp';
import ts from 'typescript';

/* The shape WhatsApp, Slack, LinkedIn and X all crop from, and the size
   `CARD_SIZE` in `src/content/cards.ts` declares. */
const WIDTH = 1200;
const HEIGHT = 630;
const QUALITY = 82;

/* Facebook asks for 1080 wide to look sharp on a dense screen. A still a
   little narrower than the card, as 1160 is, enlarges without anyone seeing;
   one under this is worth a bigger source. */
const SHARP_ENOUGH = 1080;

/* The collage's posters, 180 wide. The contact page sets them 8px apart at 106
   wide, and the gap here keeps that proportion. */
const POSTER_WIDTH = 180;
const POSTER_HEIGHT = 270;
const GAP = 14;

/* `--color-base`, the poster frame's `--color-border`, and the contact page's
   two washes (`COMPACT_WASHES`): coral low on the left, deep blue low on the
   right, each fading out at 62% of its radius. */
const GROUND = '#021926';
const FRAME = 'rgb(234 242 246 / 14%)';
const WASHES = [
  { x: 0.08, y: 0.41, radiusX: 620, radiusY: 260, color: 'rgb(247, 81, 85)', opacity: 0.16 },
  { x: 0.93, y: 0.82, radiusX: 660, radiusY: 280, color: 'rgb(14, 58, 82)', opacity: 0.55 },
];

const PUBLIC = 'public';
const SHELF_DIR = `${PUBLIC}/shelf`;
const WRITE_UPS_DIR = 'src/content/write-ups';

/** A content module, compiled to JavaScript and imported. */
async function load(file) {
  const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}

function encode(image) {
  return image.jpeg({ quality: QUALITY, mozjpeg: true });
}

async function shelfCard() {
  const { SHELF, SHELF_SECTIONS } = await load('src/content/shelf.ts');
  const columns = SHELF_SECTIONS.map((section) => SHELF[section].slice(0, 2));

  const gridWidth = columns.length * POSTER_WIDTH + (columns.length - 1) * GAP;
  const gridHeight = 2 * POSTER_HEIGHT + GAP;
  const left = Math.round((WIDTH - gridWidth) / 2);
  const top = Math.round((HEIGHT - gridHeight) / 2);

  const washes = WASHES.map(
    (wash, index) => `
    <radialGradient id="wash${index}">
      <stop offset="0" stop-color="${wash.color}" stop-opacity="${wash.opacity}" />
      <stop offset="0.62" stop-color="${wash.color}" stop-opacity="0" />
    </radialGradient>`,
  ).join('');
  const washRects = WASHES.map(
    (wash, index) =>
      `<rect x="${wash.x * WIDTH - wash.radiusX}" y="${wash.y * HEIGHT - wash.radiusY}" ` +
      `width="${wash.radiusX * 2}" height="${wash.radiusY * 2}" fill="url(#wash${index})" />`,
  ).join('');
  const ground = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
      <defs>${washes}</defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="${GROUND}" />
      ${washRects}
    </svg>`,
  );

  const layers = [];
  const frames = [];
  for (const [column, items] of columns.entries()) {
    for (const [row, item] of items.entries()) {
      const x = left + column * (POSTER_WIDTH + GAP);
      const y = top + row * (POSTER_HEIGHT + GAP);
      const poster = await sharp(`${SHELF_DIR}/${item.slug}-360.webp`)
        .resize(POSTER_WIDTH, POSTER_HEIGHT, { fit: 'cover' })
        .toBuffer();
      layers.push({ input: poster, left: x, top: y });
      /* Drawn inside the poster's edge, the way a CSS border sits inside it. */
      frames.push(
        `<rect x="${x + 0.5}" y="${y + 0.5}" width="${POSTER_WIDTH - 1}" ` +
          `height="${POSTER_HEIGHT - 1}" fill="none" stroke="${FRAME}" />`,
      );
    }
  }
  layers.push({
    input: Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">${frames.join('')}</svg>`,
    ),
    left: 0,
    top: 0,
  });

  const out = `${SHELF_DIR}/card.jpg`;
  await encode(sharp(ground).composite(layers)).toFile(out);
  const slugs = columns.flat().map((item) => item.slug);
  return `${out}: ${slugs.join(', ')}`;
}

/** The widest cut of a still on disk, which is the most there is to work from. */
function widestCut(slug, still) {
  const pattern = new RegExp(`^${still}-(\\d+)\\.webp$`);
  const widths = readdirSync(`${SHELF_DIR}/${slug}`)
    .map((file) => file.match(pattern)?.[1])
    .filter(Boolean)
    .map(Number);
  if (!widths.length) throw new Error(`No cut of "${still}" in ${SHELF_DIR}/${slug}/.`);
  return Math.max(...widths);
}

async function stillCards() {
  const files = readdirSync(WRITE_UPS_DIR).filter(
    (file) => file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts',
  );
  const written = [];
  for (const file of files) {
    const exports = await load(`${WRITE_UPS_DIR}/${file}`);
    const piece = Object.values(exports).find((value) => value?.slug && value?.body);
    const still = piece?.linkPreview;
    if (!still) continue;

    const width = widestCut(piece.slug, still);
    if (width < SHARP_ENOUGH) {
      console.warn(`${piece.slug}: "${still}" is ${width} wide, too soft enlarged to ${WIDTH}.`);
    }
    const out = `${SHELF_DIR}/${piece.slug}/${still}-card.jpg`;
    /* The top is kept: a still's faces sit high in it more often than what is
       at its feet matters. */
    await encode(
      sharp(`${SHELF_DIR}/${piece.slug}/${still}-${width}.webp`).resize(WIDTH, HEIGHT, {
        fit: 'cover',
        position: 'top',
      }),
    ).toFile(out);
    written.push(`${out}: from the ${width} cut`);
  }
  return written;
}

const written = [await shelfCard(), ...(await stillCards())];
console.log(written.join('\n'));
