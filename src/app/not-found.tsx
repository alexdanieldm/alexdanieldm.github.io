import { COMPACT_WASHES, Ground } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Button } from '@/components/ui';
import { pageMetadata } from '@/content/seo';

import styles from './not-found.module.scss';

export const metadata = pageMetadata({
  title: 'Page not found',
  description: 'That page does not exist. The work is all on the home page.',
  path: '/404/',
  noIndex: true,
});

/**
 * Exported as 404.html by the static build, which is the filename GitHub Pages
 * serves for a missing path without any configuration.
 */
export default function NotFound() {
  return (
    <Ground washes={COMPACT_WASHES}>
      <SiteHeader variant="solid" />

      <main className={styles.page} id="main">
        <p className={styles.code}>
          <span className={styles.dash} aria-hidden="true" />
          404
        </p>

        <h1 className={styles.title}>This one does not exist.</h1>

        <p className={styles.lede}>
          Either I moved it or the link was wrong. The work is all on the home page, and the fastest
          way to ask me about something is email.
        </p>

        <div className={styles.actions}>
          <Button href="/">Back home</Button>
          <Button variant="ghost" href="/contact">
            Get in touch
          </Button>
        </div>
      </main>

      <SiteFooter variant="inner" />
    </Ground>
  );
}
