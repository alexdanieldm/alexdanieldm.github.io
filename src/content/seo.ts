/**
 * @fileoverview Everything the crawlers and the link unfurlers read.
 *
 * It lives in one place because Next shallow-merges metadata: a page that
 * declares its own `openGraph` replaces the parent's wholesale rather than
 * filling in the gaps. Without this, every inner page inherited the home
 * page's og:title, og:description and og:url, so pasting the contact link into
 * WhatsApp previewed the home page instead.
 */

import type { Metadata } from 'next';

export const SITE_URL = 'https://alexdanieldm.github.io';
export const SITE_NAME = 'Alex Durán';
export const DEFAULT_TITLE = 'Alex Durán, Full Stack Engineer';

/**
 * The link preview card, at the 1200x630 that WhatsApp, Slack, LinkedIn and X
 * all crop from. Generated from the live banner scene rather than drawn
 * separately, so it cannot drift away from the site it is advertising.
 */
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Alex Durán, full stack engineer. A road at dusk under a coral sun.',
} as const;

type PageSeo = {
  /** Goes through the title template for the tab; og:title gets it spelled out. */
  title: string;
  description: string;
  /** Route path, leading and trailing slash, e.g. `/contact/`. */
  path: string;
  /** Skip the tab-title template, for the one page that is already the full title. */
  isHome?: boolean;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path, isHome, noIndex }: PageSeo): Metadata {
  const fullTitle = isHome ? DEFAULT_TITLE : `${title} · ${SITE_NAME}`;

  return {
    /* Omitted rather than set to undefined on the home page. An explicit
       undefined overrides the layout's `title.default` with nothing, and the
       page ships with no <title> at all; leaving the key out lets it inherit. */
    ...(isHome ? {} : { title }),
    description,
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@alexdanieldm',
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
