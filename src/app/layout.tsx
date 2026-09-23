import type { Metadata, Viewport } from 'next';

import { DEFAULT_TITLE, SITE_NAME, SITE_URL } from '@/content/seo';
import { body, display, kanji } from '@/styles/fonts';

import { REVEAL_SCRIPT } from './revealScript';

import './globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${kanji.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
