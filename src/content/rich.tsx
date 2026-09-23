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

import type { ReactNode } from 'react';

import { Mark } from '@/components/ui';

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

/** A paragraph of rich copy. */
export function Copy({ text, className }: { text: Rich; className?: string }) {
  return <p className={className}>{renderRich(text)}</p>;
}
