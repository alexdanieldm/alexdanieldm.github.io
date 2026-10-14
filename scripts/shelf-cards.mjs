/**
 * Cuts the shelf's link preview cards, the image a chat app or a feed shows
 * when someone pastes a link, into `public/shelf/`:
 *
 * - `card.jpg`, for the shelf: one spine a section, in the shelf's order, the
 *   posters named in `SPINES`.
 * - `thumbnail.jpg`, the same spines in a square, for the shelf's search
 *   result, so the shelf looks the same in a chat and in a search.
 * - `contact-card-<locale>.jpg`, for the shelf's contact page: the same
 *   spines under the page's own words and 嘱, one card a language.
 * - `<slug>/<still>-card.jpg`, for a write-up that names one of its stills as
 *   its `linkPreview`: that still, cut to the card's shape.
 *
 * Run it after reordering the shelf, replacing one of those posters, or giving
 * a write-up its preview: `npm run shelf:cards`. The deploy runs it again
 * before every build, so the live site never shows a stale card; running it
 * here keeps the committed copies, which local builds use, current. The build
 * stops while a card a page names is missing.
 *
 * The shelf and the pieces are read from their own TypeScript, compiled here
 * with the compiler the repo already has, so the spines follow the shelf's
 * order rather than keeping a list of its own that drifts. That works because
 * those files import nothing but types.
 *
 * sharp is not a dependency of this repo. It is already installed because Next
 * depends on it, and this runs as a step of its own, never inside `next build`.
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

/* `--color-base`, the gap between the spines. */
const GROUND = '#021926';

/* The shelf's image, in a chat and in a search: one spine a section, in the
   shelf's order, the way books stand on a shelf, each a poster's middle at
   full height, where the art is. The card is the chat's 1200 by 630; the
   thumbnail a 1200 square, like the portrait the home page names, so the two
   search results sit side by side at one sharpness. */
const THUMBNAIL = 1200;
const SPINE_GAP = 8;
const SPINES_QUALITY = 88;
/* My pick of poster for each section's spine. Each has to be on the shelf, in
   that section, or the script stops: an image of something no longer there
   would be wrong in every chat and every search result. */
const SPINES = {
  anime: 'gurren-lagann',
  manga: 'frieren',
  games: 'what-remains-of-edith-finch',
  movies: 'about-time',
  television: 'ted-lasso',
};

/* The shelf contact card's words, a layer a language: the label, the page's
   heading and lede, 嘱, and the fade that lets them read. sharp cannot set
   type in the site's faces, which are woff2 only, so these were drawn once in
   a browser onto a transparent ground and are laid here over freshly cut
   spines, so the card follows `SPINES` like the others. A new heading or
   lede on the page needs a new layer. */
const CONTACT_LAYERS = {
  es: 'scripts/layers/shelf-contact-es.png',
  en: 'scripts/layers/shelf-contact-en.png',
};

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

/** The posters named in `SPINES`, in the shelf's order, each checked against its section. */
async function spineSlugs() {
  const { SHELF, SHELF_SECTIONS } = await load('src/content/shelf.ts');
  return SHELF_SECTIONS.map((section) => {
    const slug = SPINES[section];
    if (!SHELF[section].some((item) => item.slug === slug)) {
      throw new Error(`The ${section} spine, "${slug}", is not in that section.`);
    }
    return slug;
  });
}

/** The spines, side by side, cut to a width and a height. */
async function spines(slugs, width, height) {
  const spineWidth = Math.floor((width - SPINE_GAP * (slugs.length + 1)) / slugs.length);
  const spineHeight = height - SPINE_GAP * 2;
  const layers = [];
  for (const [index, slug] of slugs.entries()) {
    const source = `${SHELF_DIR}/${slug}-720.webp`;
    const { width: posterWidth, height: posterHeight } = await sharp(source).metadata();
    const sliceWidth = Math.round(posterHeight * (spineWidth / spineHeight));
    const spine = await sharp(source)
      .extract({
        left: Math.round((posterWidth - sliceWidth) / 2),
        top: 0,
        width: sliceWidth,
        height: posterHeight,
      })
      .resize(spineWidth, spineHeight)
      .toBuffer();
    layers.push({
      input: spine,
      left: SPINE_GAP + index * (spineWidth + SPINE_GAP),
      top: SPINE_GAP,
    });
  }

  /* A touch of sharpening: a chat and a search both shrink it, and a soft
     source shrinks to a blur. */
  return sharp({ create: { width, height, channels: 3, background: GROUND } })
    .composite(layers)
    .sharpen({ sigma: 0.6 })
    .png()
    .toBuffer();
}

/** An image made of the spines, saved as the JPEG a chat or a search fetches. */
async function save(image, out, about) {
  await sharp(image).jpeg({ quality: SPINES_QUALITY, mozjpeg: true }).toFile(out);
  return `${out}: ${about}`;
}

/** The shelf contact page's cards: the card's spines under each language's words. */
async function contactCards(card) {
  const written = [];
  for (const [locale, layer] of Object.entries(CONTACT_LAYERS)) {
    const image = await sharp(card)
      .composite([{ input: layer }])
      .png()
      .toBuffer();
    written.push(
      await save(image, `${SHELF_DIR}/contact-card-${locale}.jpg`, `the spines under ${layer}`),
    );
  }
  return written;
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

const slugs = await spineSlugs();
const card = await spines(slugs, WIDTH, HEIGHT);
const written = [
  await save(card, `${SHELF_DIR}/card.jpg`, slugs.join(', ')),
  await save(
    await spines(slugs, THUMBNAIL, THUMBNAIL),
    `${SHELF_DIR}/thumbnail.jpg`,
    slugs.join(', '),
  ),
  ...(await contactCards(card)),
  ...(await stillCards()),
];
console.log(written.join('\n'));
