import { Ground, SHELF_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ShelfClosing, ShelfHero, ShelfSection } from '@/components/sections';
import { contentFor, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { SHELF_SECTIONS } from '@/content/shelf';

import styles from './ShelfPage.module.scss';

/**
 * The shelf: things I love, and what each of them taught me.
 *
 * It is the personal half of the site, so it carries its own nav rather than
 * the portfolio's, with one link back. Everything on it is conditional on what
 * I have written: see `ShelfSection` for how an item earns its place.
 */
export function ShelfPage({ locale }: { locale: Locale }) {
  const { shelf } = contentFor(locale);

  return (
    <Ground washes={SHELF_WASHES}>
      <SiteHeader locale={locale} path={ROUTES.shelf} variant="solid" nav="shelf" />

      <main id="main" className={styles.page}>
        <ShelfHero locale={locale} />
        {SHELF_SECTIONS.map((key) => (
          <ShelfSection key={key} section={key} locale={locale} />
        ))}
        <ShelfClosing locale={locale} />
      </main>

      <SiteFooter locale={locale} path={ROUTES.shelf} variant="inner" note={shelf.disclaimer} />
    </Ground>
  );
}
