import type { MetadataRoute } from 'next';

import { defaultLocaleFor, localePath, otherLocale } from '@/content/locales';
import { ROUTES, writeUpPath } from '@/content/navigation';
import { SITE_URL } from '@/content/seo';
import { writeUpFor, writtenUpSlugs } from '@/content/write-ups';

/* Written once, at build time, to `sitemap.xml`. */
export const dynamic = 'force-static';

const absolute = (route: string) => new URL(route, SITE_URL).href;

/**
 * Every page a search engine should find.
 *
 * A page in both languages is listed at both addresses, each naming the other
 * and the one it lives in first, so the two are read as one page in two
 * languages, the same as their hreflang tags say. A write-up is listed once, at
 * the address in its own language: its other route is the same text, and names
 * this one as its canonical. The 404 is not a page anyone should find.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.values(ROUTES).flatMap((path) => {
    const first = defaultLocaleFor(path);
    const languages = {
      en: absolute(localePath('en', path)),
      es: absolute(localePath('es', path)),
      'x-default': absolute(localePath(first, path)),
    };
    /* The language the page lives in first, then its translation. */
    return [first, otherLocale(first)].map((locale) => ({
      url: absolute(localePath(locale, path)),
      alternates: { languages },
    }));
  });

  const writeUps = writtenUpSlugs().flatMap((slug) => {
    const piece = writeUpFor(slug);
    if (!piece) return [];
    return [
      {
        url: absolute(localePath(piece.lang, writeUpPath(slug))),
        lastModified: piece.published,
      },
    ];
  });

  return [...pages, ...writeUps];
}
