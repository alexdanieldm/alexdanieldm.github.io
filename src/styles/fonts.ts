/**
 * @fileoverview The three faces the site uses, all self-hosted.
 *
 * `next/font` fingerprints each file, emits the `@font-face` rules into the
 * critical CSS and preloads the ones a route actually renders. That covers the
 * whole font checklist by itself: no render-blocking stylesheet, no external
 * dependency at runtime, no preload tag to keep in sync by hand.
 *
 * Each face exposes a CSS variable rather than a class, so the value can be
 * read from any stylesheet instead of having to be threaded through markup.
 */

import localFont from 'next/font/local';
import { Instrument_Serif } from 'next/font/google';

/**
 * Anonymous Pro, carried over from the previous site. Body copy, labels, and
 * anything that should read as typed rather than typeset.
 *
 * woff2 only. Every browser that can run this site supports it, and shipping a
 * woff alongside would mean two `@font-face` rules at the same weight.
 */
export const body = localFont({
  src: [
    { path: '../fonts/anonymous-pro-regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/anonymous-pro-bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

/** Instrument Serif. Headings only, and the one thing the old site did not have. */
export const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

/**
 * Imokenpi, also carried over. It renders exactly two glyphs on this site: 作
 * in the wordmark and 嘱 on the contact page.
 *
 * The `unicode-range` is scoped to those two codepoints so the browser only
 * fetches the file on a page that actually draws one. Add a third kanji
 * somewhere and it will silently fall back until it is added here too.
 */
export const kanji = localFont({
  src: [{ path: '../fonts/imokenpi.woff2', weight: '400', style: 'normal' }],
  variable: '--font-kanji',
  display: 'swap',
  declarations: [{ prop: 'unicode-range', value: 'U+4F5C, U+5631' }],
});
