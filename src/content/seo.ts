/**
 * @fileoverview Everything the crawlers and the link unfurlers read.
 *
 * It lives in one place because Next shallow-merges metadata: a page that
 * declares its own `openGraph` replaces the parent's wholesale rather than
 * filling in the gaps. Without this, every inner page inherited the home
 * page's og:title, og:description and og:url, so pasting the contact link into
 * WhatsApp previewed the home page.
 */

import type { Metadata } from 'next';

import { contentFor, defaultLocaleFor, localePath, OG_LOCALE, type Locale } from './locales';
import { SOCIALS } from './navigation';

/**
 * The address the site is served from: the custom domain set in the Pages
 * settings. alexdanieldm.github.io only redirects here, so every absolute
 * address a crawler or an unfurler reads, the canonical, the card, the
 * sitemap, is built on this one rather than on the redirect.
 */
export const SITE_URL = 'https://alexdanieldm.com';
export const SITE_NAME = 'Alex Durán';

export const DEFAULT_TITLE: Record<Locale, string> = {
  en: 'Alex Durán, Full Stack Engineer',
  es: 'Alex Durán, Full Stack Engineer',
};

export const SITE_DESCRIPTION: Record<Locale, string> = {
  en:
    'Full stack engineer in Barcelona. I build web applications end to end: the interface, ' +
    'the code, the integrations, and the release.',
  es:
    'Full stack engineer en Barcelona. Construyo aplicaciones web de principio a fin: la ' +
    'interfaz, el código, las integraciones, y la entrega.',
};

/**
 * The link preview card, at the 1200x630 that WhatsApp, Slack, LinkedIn and X
 * all crop from. Generated from the live banner scene rather than drawn
 * separately, so it cannot drift away from the site it is advertising.
 *
 * One card for both languages: it is the artwork, my name and 作, none of
 * which change.
 */
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Alex Durán, full stack engineer. A road at dusk under a coral sun.',
} as const;

/**
 * My photo, for search engines only: the Person below names it as me, so a
 * search for my name can show my face rather than a namesake's. It is never a
 * link preview. Those stay the artwork cards, so a shared link previews the
 * site, not me. The file is named after me because an image's name is one of
 * the few things an image search reads about it.
 */
const PORTRAIT_URL = '/alex-duran.jpg';

/** The card a chat app or a feed shows for a link, and what it says it shows. */
export type PreviewImage = { url: string; width: number; height: number; alt: string };

type PageSeo = {
  locale: Locale;
  /** Goes through the title template for the tab; og:title gets it spelled out. */
  title: string;
  description: string;
  /** The route WITHOUT a language prefix, e.g. `/contact/`. */
  path: string;
  /** Skip the tab-title template, for the one page that is already the full title. */
  isHome?: boolean;
  noIndex?: boolean;
  /**
   * The one language the page's text exists in, when it is not both. A
   * write-up in Spanish is the same Spanish text under either language's
   * header and footer, not a translation, so both routes name the Spanish URL
   * as the canonical and neither claims an alternate.
   */
  original?: Locale;
  /** `article` for a write-up; everything else is a page of the site. */
  type?: 'website' | 'article';
  /**
   * The page's own link preview. Left out, a page shows the site's card, which
   * is the portfolio's: right for it, wrong for the shelf, which is its own
   * half of the site and brings its own.
   */
  image?: PreviewImage;
  /** For an article: the day it went up, and the shelf section it sits in. */
  article?: { published: string; section: string };
};

export function pageMetadata({
  locale,
  title,
  description,
  path,
  isHome,
  noIndex,
  original,
  type = 'website',
  image = OG_IMAGE,
  article,
}: PageSeo): Metadata {
  const fullTitle = isHome ? DEFAULT_TITLE[locale] : `${title} · ${SITE_NAME}`;
  const canonical = localePath(original ?? locale, path);
  const alternates = original
    ? { canonical }
    : {
        canonical,
        /* Both languages point at each other, and x-default at the one the
           page lives in first, English for the portfolio and Spanish for the
           shelf, so a crawler treats them as one page in two languages rather
           than as duplicates competing with each other. */
        languages: {
          en: localePath('en', path),
          es: localePath('es', path),
          'x-default': localePath(defaultLocaleFor(path), path),
        },
      };

  return {
    /* Omitted rather than set to undefined on the home page. An explicit
       undefined overrides the layout's `title.default` with nothing, and the
       page ships with no <title> at all; leaving the key out lets it inherit. */
    ...(isHome ? {} : { title }),
    description,
    /* A page kept out of search claims no address and names no twin. The 404
       is that page, and its Spanish twin would be a page that does not exist. */
    ...(noIndex ? { robots: { index: false, follow: true } } : { alternates }),
    openGraph: {
      type,
      locale: OG_LOCALE[original ?? locale],
      siteName: SITE_NAME,
      url: canonical,
      title: fullTitle,
      description,
      images: [image],
      ...(type === 'article' && article
        ? { publishedTime: article.published, section: article.section, authors: [`${SITE_URL}/`] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@alexdanieldm',
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

/* ── Structured data ───────────────────────────────────────────────────────── */

const absolute = (route: string) => new URL(route, SITE_URL).href;

/** Me, as the author of everything here. */
const ME = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#me`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
} as const;

/** The site, for the pages that say they are part of it. */
const SITE_ID = `${SITE_URL}/#site`;

/**
 * The other names I am searched by: the handle every profile of mine shares,
 * and my name without the accent, the way most people type it and the way
 * GitHub and LinkedIn spell it, then with my middle name and in full.
 */
const ALTERNATE_NAMES = [
  'alexdanieldm',
  'Alex Duran',
  'Alex Daniel Duran',
  'Alex Daniel Duran Martinez',
];

/**
 * The site and me, for search engines, from the home page: what I do, where,
 * and the profiles elsewhere that are also me, so a search for my name can
 * treat them as one person rather than several namesakes.
 */
export function siteSchema(locale: Locale) {
  const { home, common } = contentFor(locale);
  const page = absolute(localePath(locale, '/'));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      /* The page itself, as a profile: a page about one person, which is the
         kind Google reads a person's other names and photo from. One per
         language, each at its own address, both about the same me. */
      {
        '@type': 'ProfilePage',
        '@id': `${page}#profile`,
        url: page,
        inLanguage: locale,
        mainEntity: { '@id': ME['@id'] },
        isPartOf: { '@id': SITE_ID },
      },
      {
        ...ME,
        alternateName: ALTERNATE_NAMES,
        image: absolute(PORTRAIT_URL),
        jobTitle: home.banner.eyebrow,
        description: SITE_DESCRIPTION[locale],
        /* The stack the About section leads with, and the two languages it
           says I work in. */
        knowsAbout: ['TypeScript', 'React', 'Next.js', 'GraphQL'],
        knowsLanguage: ['es', 'en'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: common.footer.location,
          addressCountry: 'ES',
        },
        sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.instagram, SOCIALS.x],
      },
      {
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: ['en', 'es'],
        author: { '@id': ME['@id'] },
      },
    ],
  };
}

type ArticleSeo = {
  title: string;
  description: string;
  /** The route, without a language prefix. */
  path: string;
  /** The language the piece is written in, whose address is its canonical one. */
  lang: Locale;
  published: string;
  image: PreviewImage;
  /** The work the piece is about, by its title. */
  about: string;
};

/** A write-up, for search engines: a post of mine, when it went up, in what language, and about what. */
export function articleSchema({
  title,
  description,
  path,
  lang,
  published,
  image,
  about,
}: ArticleSeo) {
  const url = absolute(localePath(lang, path));
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: lang,
    datePublished: published,
    image: absolute(image.url),
    author: ME,
    about: { '@type': 'CreativeWork', name: about },
  };
}
