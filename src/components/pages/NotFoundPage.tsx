import { Ground, COMPACT_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui';
import { contentFor, localePath, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';

import styles from './NotFoundPage.module.scss';

export function NotFoundPage({ locale }: { locale: Locale }) {
  const { notFound } = contentFor(locale).common;

  return (
    <Ground washes={COMPACT_WASHES}>
      <SiteHeader locale={locale} path="/404/" variant="solid" />

      <main className={styles.page} id="main">
        <p className={styles.code}>
          <span className={styles.dash} aria-hidden="true" />
          {notFound.code}
        </p>

        <h1 className={styles.title}>{notFound.title}</h1>

        <p className={styles.lede}>{notFound.lede}</p>

        <div className={styles.actions}>
          <Button href={localePath(locale, ROUTES.home)}>{notFound.backHome}</Button>
          <Button variant="ghost" href={localePath(locale, ROUTES.contact)}>
            {notFound.getInTouch}
          </Button>
        </div>
      </main>

      <SiteFooter locale={locale} path="/404/" variant="inner" />
    </Ground>
  );
}
