import type { Metadata, Viewport } from 'next';

import { RootDocument } from '../RootDocument';

import { DEFAULT_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/content/seo';

const LOCALE = 'en' as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE[LOCALE],
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION[LOCALE],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    'Alex Durán',
    'full stack engineer',
    'TypeScript',
    'React',
    'Next.js',
    'GraphQL',
    'Barcelona',
  ],
};

export const viewport: Viewport = {
  themeColor: '#021926',
  colorScheme: 'dark',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale={LOCALE}>{children}</RootDocument>;
}
