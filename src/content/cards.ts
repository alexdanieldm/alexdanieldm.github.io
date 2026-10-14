/**
 * @fileoverview The shelf's link preview cards: what a chat app or a feed
 * shows when someone pastes a link to the shelf.
 *
 * The portfolio's cards are the banner scene with my name over it (`OG_IMAGE`
 * in `seo.ts`). The shelf is its own half of the site and previews as itself:
 * the shelf and its contact page as the collage the contact page shows, and a
 * write-up as a still from the work it is about. `npm run shelf:cards` cuts
 * them into `public/shelf/`.
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

import { contentFor, type Locale } from './locales';
import type { PreviewImage } from './seo';

/** Every card's size, as `scripts/shelf-cards.mjs` cuts it. */
export const CARD_SIZE = { width: 1200, height: 630 } as const;

/** Whether a file is in `public/`, for the checks that stop a build. */
export function inPublic(file: string): boolean {
  return existsSync(path.join(process.cwd(), 'public', file));
}

const SHELF_CARD = '/shelf/card.jpg';

/* Checked whenever this loads, which is every build, so a missing card stops
   the build rather than shipping a link that previews as a broken image. */
if (!inPublic(SHELF_CARD)) throw new Error(`${SHELF_CARD} is missing: run npm run shelf:cards.`);

/** The shelf's card: for the shelf, its contact page, and a write-up with no still of its own. */
export function shelfCard(locale: Locale): PreviewImage {
  return { url: SHELF_CARD, ...CARD_SIZE, alt: contentFor(locale).shelf.cardAlt };
}

/* The image a search result shows beside the shelf, cut by the same script.
   Square, like the portrait the home page names, because a result's thumbnail
   is square: a wide card is cropped to its middle there, and a page with no
   image of its own named lent the result whichever poster Google picked. */
const SHELF_THUMBNAIL = '/shelf/thumbnail.jpg';
const THUMBNAIL_SIZE = { width: 1200, height: 1200 } as const;

if (!inPublic(SHELF_THUMBNAIL)) {
  throw new Error(`${SHELF_THUMBNAIL} is missing: run npm run shelf:cards.`);
}

/** The shelf's square thumbnail, for its structured data. */
export function shelfThumbnail(locale: Locale): PreviewImage {
  return { url: SHELF_THUMBNAIL, ...THUMBNAIL_SIZE, alt: contentFor(locale).shelf.thumbnailAlt };
}
