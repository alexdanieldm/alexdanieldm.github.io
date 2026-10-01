/**
 * @fileoverview The shape of a write-up: the long piece behind a card on the shelf.
 *
 * A piece is written in one language and is not translated, so it lives here
 * rather than under `en/` or `es/`, and it says which language it is in. Both
 * languages' routes show it: the page around it speaks the reader's language,
 * the piece keeps its own, marked with `lang` so a screen reader switches voice.
 *
 * Its title, credit and poster are the shelf item's, found by slug. Everything
 * else is the manuscript, block by block, in the manuscript's order.
 */

import type { Locale, ShelfContent } from '../locales';
import type { Prose } from '../rich';

/** Something the manuscript has not supplied yet: drawn as a visible box, and never deployed. */
export type Placeholder = { type: 'placeholder'; note: string };

/** A row in the rail. The label is interface, in the reader's language; the value is the piece's. */
export type Fact = { label: keyof ShelfContent['writeUp']['facts']; value: string };

export type Block =
  /** `closing` sets the piece's last thoughts a step larger than the rest. */
  | { type: 'paragraph'; text: Prose; closing?: true }
  /**
   * Starts a section, and gives the rail's contents its entry. The id is the
   * words, made safe for a URL, unless one is pinned here: pin it before
   * rewording a heading anybody may have linked to.
   */
  | { type: 'heading'; text: string; id?: string }
  /**
   * Somebody else's words: a line from the work, or from a person. `lang` when
   * they are in another language than the piece, as a BCP 47 tag.
   */
  | { type: 'quotation'; text: Prose; source?: string; lang?: string }
  /**
   * One of the piece's own sentences, or its own question, set large where it
   * falls in the text. It is said once, so a screen reader reads it like any
   * paragraph. A question is set a step smaller: questions run longer.
   */
  | { type: 'standout'; text: Prose; question?: true }
  /**
   * One of the piece's own sentences, repeated large. Screen readers skip it,
   * having just read it, and the build checks that it really is a repeat.
   */
  | { type: 'pull'; text: string }
  /** The thanks at the very end, the last line in coral. Emphasis in it is a shout. */
  | { type: 'signoff'; lines: Prose[] }
  /** A still between paragraphs, at 16:9. `image` is a file stem in `public/shelf/<slug>/`. */
  | { type: 'figure'; image: string; alt: string; caption?: Prose; label?: string }
  | Placeholder;

export type WriteUp = {
  /** The shelf item it belongs to, and its path segment. */
  slug: string;
  /** The language the piece is written in. */
  lang: Locale;
  /** The day it went up, as YYYY-MM-DD: for its metadata and the sitemap. */
  published: string;
  standfirst?: Prose | Placeholder;
  facts: Fact[];
  /**
   * The still a link to the piece previews as, by its file stem: one of the
   * piece's own figures, cut to the card's shape by `npm run shelf:cards`.
   * Left out, a link to it previews as the shelf.
   */
  linkPreview?: string;
  body: Block[];
};
