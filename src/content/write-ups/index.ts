/**
 * @fileoverview Every write-up, and what the rest of the site may ask of them.
 *
 * Whether something on the shelf is written up is not stored on it. It is
 * written up when its piece is in this list, so a card can never lead to a
 * page that is not there, and the shelf and a piece ship together because they
 * cannot do anything else.
 *
 * The checks at the end run whenever this file is loaded, which is every
 * build, so a mistake in a piece stops the build instead of reaching the site.
 */

import { CARD_SIZE, inPublic, shelfCard } from '../cards';
import { localePath, type Locale } from '../locales';
import { ROUTES, writeUpPath } from '../navigation';
import { plainText } from '../rich';
import type { PreviewImage, ShelfPart } from '../seo';
import { shelfEntry } from '../shelf';

import { gurrenLagann } from './gurren-lagann';
import type { Block, Placeholder, WriteUp } from './types';

export type { Block, Fact, Placeholder, WriteUp } from './types';

const WRITE_UPS: WriteUp[] = [gurrenLagann];

const BY_SLUG = new Map(WRITE_UPS.map((piece) => [piece.slug, piece]));

export function writeUpFor(slug: string): WriteUp | undefined {
  return BY_SLUG.get(slug);
}

/** Every slug with a piece, which is every write-up page the build makes. */
export function writtenUpSlugs(): string[] {
  return WRITE_UPS.map((piece) => piece.slug);
}

/** Every piece, as the shelf's structured data lists it. */
export function shelfParts(): ShelfPart[] {
  return WRITE_UPS.flatMap((piece) => {
    const entry = shelfEntry(piece.slug);
    return entry
      ? [{ title: entry.item.title, path: writeUpPath(piece.slug), lang: piece.lang }]
      : [];
  });
}

/** Where an item's write-up is in the reader's language, or nothing while it has none. */
export function writeUpHref(locale: Locale, slug: string): string | undefined {
  return BY_SLUG.has(slug) ? localePath(locale, writeUpPath(slug)) : undefined;
}

/**
 * Whether an item's piece is written in the other language from the page that
 * links to it. A Spanish piece is the same Spanish text on the English route,
 * so the link says so before anyone follows it.
 */
export function inOtherLanguage(locale: Locale, slug: string): boolean {
  const piece = BY_SLUG.get(slug);
  return Boolean(piece && piece.lang !== locale);
}

export function isPlaceholder(value: unknown): value is Placeholder {
  return (
    typeof value === 'object' && value !== null && 'type' in value && value.type === 'placeholder'
  );
}

type Heading = Extract<Block, { type: 'heading' }>;

/** "Lo que me dejó" becomes `lo-que-me-dejo`: readable, and safe in a URL. */
export function headingId(heading: Heading): string {
  if (heading.id) return heading.id;
  return heading.text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** The piece's sections, in order, as the rail's contents lists them. */
export function headings(piece: WriteUp): { id: string; text: string }[] {
  return piece.body.flatMap((block) =>
    block.type === 'heading' ? [{ id: headingId(block), text: block.text }] : [],
  );
}

/**
 * The widths a still is cut at. 760 covers a phone or a smaller laptop's
 * column; the column reaches 880 at 1440. 1160 is as far as the first still
 * goes, and a still is never enlarged to fill a width its source does not
 * have: 1160 covers the widest column, and a phone's 342px at three times the
 * density. A still that arrives bigger is the moment to add a wider cut.
 */
export const FIGURE_WIDTHS = [760, 1160] as const;

export function figureSrc(slug: string, image: string, width: (typeof FIGURE_WIDTHS)[number]) {
  return `/shelf/${slug}/${image}-${width}.webp`;
}

/** Where a piece's link preview is, cut from the still it names. */
function stillCardSrc(slug: string, still: string): string {
  return `/shelf/${slug}/${still}-card.jpg`;
}

type Figure = Extract<Block, { type: 'figure' }>;

function linkPreviewStill(piece: WriteUp): Figure | undefined {
  return piece.body.find(
    (block): block is Figure => block.type === 'figure' && block.image === piece.linkPreview,
  );
}

/**
 * What a link to a piece previews as: the still it names, described by the
 * still's own alt text, or the shelf's card while it names none.
 */
export function writeUpCard(piece: WriteUp, locale: Locale): PreviewImage {
  const still = linkPreviewStill(piece);
  if (!still) return shelfCard(locale);
  return { url: stillCardSrc(piece.slug, still.image), ...CARD_SIZE, alt: still.alt };
}

/* ── Checks ────────────────────────────────────────────────────────────────── */

/* The static pages under the shelf, whose path a write-up's /shelf/<slug>/
   would collide with. Read off ROUTES, so a page added there is covered the
   day it is added. */
const TAKEN = Object.values(ROUTES)
  .filter((route) => route !== ROUTES.shelf && route.startsWith(ROUTES.shelf))
  .map((route) => route.slice(ROUTES.shelf.length, -1));

function placeholders(piece: WriteUp): string[] {
  const open = isPlaceholder(piece.standfirst) ? [piece.standfirst.note] : [];
  for (const block of piece.body) if (block.type === 'placeholder') open.push(block.note);
  return open;
}

/** Whether a string is a real day, written YYYY-MM-DD. */
function isDay(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

function check(piece: WriteUp) {
  const fail = (reason: string) => {
    throw new Error(`Write-up "${piece.slug}": ${reason}.`);
  };

  if (!shelfEntry(piece.slug)) fail('nothing on the shelf has this slug');
  if (!isDay(piece.published)) {
    fail(`it was published on "${piece.published}", which is not a day as YYYY-MM-DD`);
  }
  if (piece.updated !== undefined) {
    if (!isDay(piece.updated)) {
      fail(`it was updated on "${piece.updated}", which is not a day as YYYY-MM-DD`);
    }
    /* The dates are YYYY-MM-DD, so they compare as strings. */
    if (piece.updated <= piece.published) {
      fail(`it was updated on ${piece.updated}, which is not after it went up`);
    }
  }
  if (TAKEN.includes(piece.slug)) fail(`/shelf/${piece.slug}/ is already another page`);

  const ids = headings(piece).map(({ id }) => id);
  const repeated = ids.find((id, index) => ids.indexOf(id) !== index);
  if (repeated) fail(`two headings would share the id "${repeated}"`);

  /* A pull quote is hidden from screen readers, which is only fair if they
     have already read it. This makes sure they have, and that a pull quote is
     always a sentence of the piece rather than words of its own. */
  const paragraphs = piece.body.flatMap((block) =>
    block.type === 'paragraph' || block.type === 'standout' ? [plainText(block.text)] : [],
  );
  for (const block of piece.body) {
    if (block.type === 'pull' && !paragraphs.some((text) => text.includes(block.text))) {
      fail(`the pull quote "${block.text}" is not a sentence of the piece`);
    }
    if (block.type === 'figure') {
      if (!block.alt.trim()) fail(`the still "${block.image}" has no alt text`);
      for (const width of FIGURE_WIDTHS) {
        const file = figureSrc(piece.slug, block.image, width);
        if (!inPublic(file)) fail(`${file} is missing`);
      }
    }
  }

  if (piece.linkPreview) {
    if (!linkPreviewStill(piece)) {
      fail(`its link preview, "${piece.linkPreview}", is not one of its stills`);
    }
    const card = stillCardSrc(piece.slug, piece.linkPreview);
    if (!inPublic(card)) fail(`${card} is missing: run npm run shelf:cards`);
  }

  /* A placeholder can be built and looked at on my machine, but never
     deployed: the workflow runs with CI set, and there it fails the build. */
  const open = placeholders(piece);
  if (process.env.CI && open.length) fail(`still waiting for ${open.join(', ')}`);
}

if (BY_SLUG.size !== WRITE_UPS.length) throw new Error('Two write-ups share a slug.');
WRITE_UPS.forEach(check);
