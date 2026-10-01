/**
 * @fileoverview Inline markup for copy that lives in a content file.
 *
 * The prose needs exactly one inline treatment, the marker highlight, and it
 * appears a few dozen times. Writing it as `<Mark>` means the copy has to be
 * JSX, which is fine until there is a second language: translating a file of
 * markup is a worse job than translating a file of sentences, and it invites
 * someone to break the tags while editing the words.
 *
 * So copy is plain strings with `[[double brackets]]` around the highlighted
 * span, and this renders them. One convention, no parser to speak of, and a
 * content file a translator can read.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';

import { Mark } from '@/components/ui';

import { localePath, type Locale } from './locales';

/** A string that may contain `[[highlighted]]` spans. */
export type Rich = string;

const HIGHLIGHT = /\[\[(.+?)\]\]/g;

export function renderRich(text: Rich): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(HIGHLIGHT)) {
    const at = match.index;
    if (at > cursor) parts.push(text.slice(cursor, at));
    parts.push(<Mark key={at}>{match[1]}</Mark>);
    cursor = at + match[0].length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

/** A paragraph of rich copy, marked with its language when it is not the page's. */
export function Copy({ text, className, lang }: { text: Rich; className?: string; lang?: string }) {
  return (
    <p className={className} lang={lang}>
      {renderRich(text)}
    </p>
  );
}

/**
 * A write-up's prose: the marker, plus the two things a long piece needs that
 * the rest of the site does not, `*emphasis*` and `[a link](/a/route/)`.
 *
 * It sits beside `renderRich` rather than inside it. Everywhere else the copy
 * has exactly one treatment, and widening that parser would change how every
 * string already written for it is read; this one only reads text written for
 * it.
 *
 * Emphasis is a real `<em>`, unlike the marker, because here it is meant. A
 * link to a route on this site goes through `localePath`, so it leads to the
 * reader's language whichever language the piece is written in.
 */
export type Prose = string;

const PROSE = /\[\[(.+?)\]\]|\*(.+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/* Anything left between the matches that still looks like a mark is a typo,
   and it fails the build rather than shipping as literal brackets. */
const STRAY = /\[\[|\]\]|\*|\]\(/;

function linkTo(href: string, children: ReactNode, locale: Locale, key: number) {
  const route = href.startsWith('/') && !href.startsWith('//');
  return route ? (
    <Link key={key} href={localePath(locale, href)}>
      {children}
    </Link>
  ) : (
    <a key={key} href={href}>
      {children}
    </a>
  );
}

export function renderProse(text: Prose, locale: Locale): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;

  const plain = (to: number) => {
    const segment = text.slice(cursor, to);
    if (STRAY.test(segment)) throw new Error(`A mark is not closed in: "${text}"`);
    if (segment) parts.push(segment);
  };

  for (const match of text.matchAll(PROSE)) {
    const [whole, marked, emphasis, label, href] = match;
    const at = match.index;
    plain(at);
    if (marked !== undefined) parts.push(<Mark key={at}>{renderProse(marked, locale)}</Mark>);
    else if (emphasis !== undefined) parts.push(<em key={at}>{renderProse(emphasis, locale)}</em>);
    else if (label !== undefined && href !== undefined)
      parts.push(linkTo(href, renderProse(label, locale), locale, at));
    cursor = at + whole.length;
  }

  plain(text.length);
  return parts;
}

/** The words alone, without the marks: for a meta description, or comparing two passages. */
export function plainText(text: Prose): string {
  return text.replace(PROSE, (_, marked, emphasis, label) =>
    plainText(marked ?? emphasis ?? label),
  );
}
