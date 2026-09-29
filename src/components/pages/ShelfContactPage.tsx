import { ArrowUpRightIcon, EnvelopeIcon } from '@/components/icons';
import { Ground, COMPACT_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { LinkRow, Poster } from '@/components/ui';
import { contentFor, localePath, type Locale } from '@/content/locales';
import { ROUTES, SOCIALS } from '@/content/navigation';
import { Copy } from '@/content/rich';
import { SHELF, SHELF_SECTIONS, type ShelfItem, type ShelfSectionKey } from '@/content/shelf';

import shelfPage from './ShelfPage.module.scss';
import styles from './ShelfContactPage.module.scss';

/**
 * The first two of each section, in the shelf's own order, one column each. It
 * follows the shelf when the shelf is reordered, rather than keeping a list of
 * its own that drifts.
 */
const COLLAGE = SHELF_SECTIONS.map((key) => ({ key, items: SHELF[key].slice(0, 2) }));

/* 81px wherever the grid keeps the laptop's width, which is everywhere but a
   phone; there it is a fifth of the width, less the gutters and the gaps. The
   360 file covers both, even at three times the density. */
const SIZES = '(max-width: 450px) calc(20vw - 16px), 81px';

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

  /* Where a poster here leads. On the shelf, one with nothing written about it
     goes nowhere, because you are already where it lives. From this page the
     shelf is somewhere to go, so it leads to its section there, and one with a
     write-up leads to that, as it does on the shelf. */
  const leadsTo = (key: ShelfSectionKey, item: ShelfItem) =>
    localePath(locale, item.writtenUp ? `${ROUTES.shelf}${item.slug}/` : `${ROUTES.shelf}#${key}`);

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
              {/* Decoration on this page, so screen readers skip it: the words
                  around it already say what the page is for. Its links are for
                  a pointer, like every poster link on the shelf, and stay out
                  of the tab order, which leaves the email row as the page's
                  one stop. */}
              <div className={styles.shelf} aria-hidden="true">
                {COLLAGE.map(({ key, items }) => (
                  <div key={key} className={styles.column}>
                    {items.map((item) => (
                      <Poster
                        key={item.slug}
                        slug={item.slug}
                        alt={shelf.art[item.art ?? 'poster'].replace('{title}', item.title)}
                        sizes={SIZES}
                        href={leadsTo(key, item)}
                      />
                    ))}
                  </div>
                ))}
              </div>

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
          note={shelf.disclaimer}
          backLabel={shelf.backToShelf}
          backTo={ROUTES.shelf}
          colophon={shelf.colophon}
        />
      </div>
    </Ground>
  );
}
