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

import { existsSync } from 'node:fs';
import path from 'node:path';

import { localePath, type Locale } from '../locales';
import { ROUTES, writeUpPath } from '../navigation';
import { plainText } from '../rich';
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

function check(piece: WriteUp) {
  const fail = (reason: string) => {
    throw new Error(`Write-up "${piece.slug}": ${reason}.`);
  };

  if (!shelfEntry(piece.slug)) fail('nothing on the shelf has this slug');
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
        if (!existsSync(path.join(process.cwd(), 'public', file))) fail(`${file} is missing`);
      }
    }
  }

  /* A placeholder can be built and looked at on my machine, but never
     deployed: the workflow runs with CI set, and there it fails the build. */
  const open = placeholders(piece);
  if (process.env.CI && open.length) fail(`still waiting for ${open.join(', ')}`);
}

if (BY_SLUG.size !== WRITE_UPS.length) throw new Error('Two write-ups share a slug.');
WRITE_UPS.forEach(check);
