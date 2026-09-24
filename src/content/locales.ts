/**
 * @fileoverview The two languages, and where each one lives.
 *
 * English is the default and sits at the root; Spanish is under `/es`. The
 * shapes are taken from the English files rather than declared separately, so
 * a Spanish file that drops a key or renames one is a type error rather than a
 * missing paragraph nobody notices.
 */

import { caseStudy as caseStudyEn } from './en/caseStudy';
import { common as commonEn } from './en/common';
import { contact as contactEn } from './en/contact';
import { home as homeEn } from './en/home';
import { links as linksEn } from './en/links';
import { caseStudy as caseStudyEs } from './es/caseStudy';
import { common as commonEs } from './es/common';
import { contact as contactEs } from './es/contact';
import { home as homeEs } from './es/home';
import { links as linksEs } from './es/links';

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export type HomeContent = typeof homeEn;
export type CaseStudyContent = typeof caseStudyEn;
export type ContactContent = typeof contactEn;
export type CommonContent = typeof commonEn;
export type LinksContent = typeof linksEn;

const CONTENT = {
  en: { home: homeEn, caseStudy: caseStudyEn, contact: contactEn, links: linksEn, common: commonEn },
  es: { home: homeEs, caseStudy: caseStudyEs, contact: contactEs, links: linksEs, common: commonEs },
} satisfies Record<Locale, unknown>;

export function contentFor(locale: Locale) {
  return CONTENT[locale];
}

/**
 * A route in a given language. The default language has no prefix, so English
 * keeps the short URLs and nothing redirects for the common case.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === '/' ? `/${locale}/` : `/${locale}${path}`;
}

/** The same page in the other language, for the switcher and for hreflang. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

/** BCP 47 tags, for `<html lang>` and og:locale. */
export const HTML_LANG: Record<Locale, string> = { en: 'en', es: 'es' };
export const OG_LOCALE: Record<Locale, string> = { en: 'en_GB', es: 'es_ES' };
