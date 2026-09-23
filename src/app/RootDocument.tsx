/**
 * @fileoverview The document shell, shared by both language layouts.
 *
 * There are two root layouts rather than one, because `<html lang>` has to
 * change with the language and a child cannot reach up and set it. Route
 * groups make that legal: with no layout at the top of `app/`, each group
 * brings its own. Everything inside them is identical, so it lives here.
 *
 * The two inline scripts are deliberately the first things in `<body>`. Both
 * have to act before anything paints: one may redirect to the other language,
 * the other hides what it is about to reveal.
 */

import type { ReactNode } from 'react';

import { LOCALE_SCRIPT } from '@/content/localePreference';
import { contentFor, HTML_LANG, type Locale } from '@/content/locales';
import { body, display, kanji } from '@/styles/fonts';

import { REVEAL_SCRIPT } from './revealScript';

import './globals.scss';

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { common } = contentFor(locale);

  return (
    /* The reveal script sets data-reveal-ready here before React hydrates, so
       React finds an attribute it did not render. This is the documented
       escape hatch for exactly that, and it applies to this element only. */
    <html
      lang={HTML_LANG[locale]}
      className={`${body.variable} ${display.variable} ${kanji.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
        <a className="skip-link" href="#main">
          {common.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
