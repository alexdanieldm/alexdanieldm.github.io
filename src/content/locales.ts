/**
 * @fileoverview The two languages, and where each one lives.
 *
 * Each half of the site lives first in one language, at the root, with the
 * other under a prefix. The portfolio is English at `/`, Spanish under `/es`:
 * my work has always been in English. The shelf is the other way round,
 * Spanish at `/shelf/` and English under `/en/shelf/`: it is the personal
 * half, and Spanish is my first language. In both, the second language is the
 * translation.
 *
 * The shapes are taken from the English files rather than declared
 * separately, so a Spanish file that drops a key or renames one is a type
 * error rather than a missing paragraph nobody notices.
 */

import { caseStudy as caseStudyEn } from './en/caseStudy';
import { common as commonEn } from './en/common';
import { contact as contactEn } from './en/contact';
import { home as homeEn } from './en/home';
import { links as linksEn } from './en/links';
import { shelf as shelfEn } from './en/shelf';
import { caseStudy as caseStudyEs } from './es/caseStudy';
import { common as commonEs } from './es/common';
import { contact as contactEs } from './es/contact';
import { home as homeEs } from './es/home';
import { links as linksEs } from './es/links';
import { shelf as shelfEs } from './es/shelf';

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

/** The portfolio's language, and so the site's, wherever a path says nothing else. */
export const DEFAULT_LOCALE: Locale = 'en';

/* The shelf's root. Spelled here rather than read from ROUTES, because the
   routes are built on this file. */
const SHELF_ROOT = '/shelf';

/** The two halves of the site: my work, and the shelf. */
export type Half = 'portfolio' | 'shelf';

/** Which half a path, without a language prefix, belongs to. */
export function halfOf(path: string): Half {
  return path === SHELF_ROOT || path.startsWith(`${SHELF_ROOT}/`) ? 'shelf' : 'portfolio';
}

/** The language a path lives in at the root: Spanish for the shelf, English everywhere else. */
export function defaultLocaleFor(path: string): Locale {
  return halfOf(path) === 'shelf' ? 'es' : DEFAULT_LOCALE;
}

export type HomeContent = typeof homeEn;
export type CaseStudyContent = typeof caseStudyEn;
export type ContactContent = typeof contactEn;
export type CommonContent = typeof commonEn;
export type LinksContent = typeof linksEn;
export type ShelfContent = typeof shelfEn;

const CONTENT = {
  en: {
    home: homeEn,
    caseStudy: caseStudyEn,
    contact: contactEn,
    links: linksEn,
    shelf: shelfEn,
    common: commonEn,
  },
  es: {
    home: homeEs,
    caseStudy: caseStudyEs,
    contact: contactEs,
    links: linksEs,
    shelf: shelfEs,
    common: commonEs,
  },
} satisfies Record<Locale, unknown>;

export function contentFor(locale: Locale) {
  return CONTENT[locale];
}

/**
 * A route in a given language. The language a path lives in first has no
 * prefix, so each half keeps the short URLs in its own language and nothing
 * redirects for the common case. The other gets its prefix: `/es/contact/`,
 * `/en/shelf/`.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocaleFor(path)) return path;
  return path === '/' ? `/${locale}/` : `/${locale}${path}`;
}

/** The same page in the other language, for the switcher and for hreflang. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

/** BCP 47 tags, for `<html lang>` and og:locale. */
export const HTML_LANG: Record<Locale, string> = { en: 'en', es: 'es' };
export const OG_LOCALE: Record<Locale, string> = { en: 'en_GB', es: 'es_ES' };
