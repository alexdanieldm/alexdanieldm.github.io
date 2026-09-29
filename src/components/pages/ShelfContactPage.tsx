import { ArrowUpRightIcon, EnvelopeIcon } from '@/components/icons';
import { Ground, COMPACT_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { LinkRow } from '@/components/ui';
import { contentFor, type Locale } from '@/content/locales';
import { ROUTES, SOCIALS } from '@/content/navigation';
import { Copy } from '@/content/rich';

import shelfPage from './ShelfPage.module.scss';
import styles from './ShelfContactPage.module.scss';

/**
 * The shelf's own page for writing to me, at /shelf/contact/.
 *
 * The portfolio's contact page is about work: its nav, LinkedIn, GitHub and
 * the CV. The shelf's closing used to send people there, which was a door out
 * of the shelf I had not meant to leave open. This page keeps them inside: the
 * shelf's header, the shelf's type, and a footer whose way back leads to the
 * shelf rather than out of it.
 *
 * Email is the only way in. It opens with the subject already written, so I can
 * tell a shelf email from a work one before I open it.
 */
export function ShelfContactPage({ locale }: { locale: Locale }) {
  const { shelf, contact } = contentFor(locale);
  const page = shelf.contact;
  const email = `${SOCIALS.email}?subject=${encodeURIComponent(page.subject)}`;

  return (
    <Ground washes={COMPACT_WASHES}>
      <SiteHeader locale={locale} path={ROUTES.shelfContact} variant="solid" nav="shelf" />

      <div className={styles.frame}>
        {/* The shelf's display steps come from the shelf page's module, which
            declares them once for everything inside the shelf. */}
        <main id="main" className={`${shelfPage.page} ${styles.page}`}>
          <h1 className={styles.title}>{page.title}</h1>

          <section className={styles.body} aria-label={page.bodyLabel}>
            <div className={styles.text}>
              <Copy text={page.lede} className={styles.lede} />

              <div className={styles.more}>
                <div className={styles.list}>
                  <p id="shelf-contact-prompts">{page.promptsIntro}</p>
                  <ul className={styles.prompts} aria-labelledby="shelf-contact-prompts">
                    {page.prompts.map((prompt) => (
                      <li key={prompt}>
                        <span className={styles.dot} aria-hidden="true" />
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </div>
                <Copy text={page.closing} />
              </div>
            </div>

            <div className={styles.side}>
              <ul className={styles.channels}>
                <LinkRow
                  primary
                  href={email}
                  label={contact.channels.email}
                  value="alexdanieldm@gmail.com"
                  icon={<EnvelopeIcon size={24} />}
                  action={<ArrowUpRightIcon size={16} />}
                />
              </ul>
            </div>
          </section>
        </main>

        <SiteFooter
          locale={locale}
          path={ROUTES.shelfContact}
          variant="inner"
          backLabel={shelf.backToShelf}
          backTo={ROUTES.shelf}
          colophon={shelf.colophon}
        />
      </div>
    </Ground>
  );
}
