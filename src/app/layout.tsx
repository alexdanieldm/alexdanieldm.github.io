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
    /* The reveal script sets data-reveal-ready here before React hydrates, so
       React finds an attribute it did not render. This is the documented
       escape hatch for exactly that, and it applies to this element only. */
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${kanji.variable}`}
      suppressHydrationWarning
    >
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
