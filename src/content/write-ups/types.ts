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
  | { type: 'paragraph'; text: Prose }
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
   * One of the piece's own sentences, repeated large. Screen readers skip it,
   * having just read it, and the build checks that it really is a repeat.
   */
  | { type: 'pull'; text: string }
  /** A still between paragraphs, at 16:9. `image` is a file stem in `public/shelf/<slug>/`. */
  | { type: 'figure'; image: string; alt: string; caption?: Prose; label?: string }
  | Placeholder;

export type WriteUp = {
  /** The shelf item it belongs to, and its path segment. */
  slug: string;
  /** The language the piece is written in. */
  lang: Locale;
  standfirst?: Prose | Placeholder;
  facts: Fact[];
  body: Block[];
};
