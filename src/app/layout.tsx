import type { Metadata, Viewport } from 'next';

import { body, display, kanji } from '@/styles/fonts';

import './globals.scss';

const SITE_URL = 'https://alexdanieldm.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alex Durán, Full Stack Engineer',
    template: '%s · Alex Durán',
  },
  description:
    'Full stack engineer in Barcelona. I build web applications end to end: the interface, ' +
    'the code, the integrations, and the release.',
  authors: [{ name: 'Alex Durán', url: SITE_URL }],
  creator: 'Alex Durán',
  keywords: [
    'Alex Durán',
    'full stack engineer',
    'TypeScript',
    'React',
    'Next.js',
    'GraphQL',
    'Barcelona',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'Alex Durán',
    title: 'Alex Durán, Full Stack Engineer',
    description:
      'I build web applications, from the first conversation to the last release. Barcelona.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@alexdanieldm',
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#021926',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${kanji.variable}`}>
      <body>{children}</body>
    </html>
  );
}
