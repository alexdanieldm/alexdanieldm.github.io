import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { DEFAULT_LOCALE } from '@/content/locales';
import { pageMetadata } from '@/content/seo';

import { RootDocument } from './RootDocument';

export const metadata = pageMetadata({
  locale: DEFAULT_LOCALE,
  title: 'Page not found',
  description: 'That page does not exist. The work is all on the home page.',
  path: '/404/',
  noIndex: true,
});

/**
 * Exported as 404.html by the static build, which is the filename GitHub Pages
 * serves for a missing path without any configuration.
 *
 * It renders its own document. With two root layouts there is no single one for
 * a global not-found to sit inside, so it brings its own, in the default
 * language: a 404 is by definition a path that matched no route, so there is no
 * language in it to read.
 */
export default function NotFound() {
  return (
    <RootDocument locale={DEFAULT_LOCALE}>
      <NotFoundPage locale={DEFAULT_LOCALE} />
    </RootDocument>
  );
}
