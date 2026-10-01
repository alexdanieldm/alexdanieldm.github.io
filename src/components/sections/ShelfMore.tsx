/**
 * @fileoverview The end of a write-up: more from the same section of the shelf.
 *
 * The four after this piece in the shelf's own order, wrapping round, so it
 * follows the shelf when the shelf is reordered rather than keeping a list of
 * its own that drifts.
 *
 * Its posters take the shelf's link rule from outside the shelf, as the
 * contact page's do: one with a write-up leads to it, the rest to their
 * section on the shelf, where they live. Those links are for a pointer; a
 * keyboard gets the one with words on it, "All of it", and a card's own
 * button once it has a write-up.
 */

import { ArrowUpRightIcon } from '@/components/icons';
import { ArrowLink, Button, Poster } from '@/components/ui';
import { contentFor, localePath, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import {
  creditLine,
  POSTER_BIG_MONITOR,
  posterAlt,
  SHELF,
  type ShelfSectionKey,
} from '@/content/shelf';
import { inOtherLanguage, writeUpHref } from '@/content/write-ups';

import styles from './ShelfMore.module.scss';

const SIZES = `(max-width: 450px) calc(50vw - 32px), (max-width: 990px) calc(25vw - 38px), ${POSTER_BIG_MONITOR}, 244px`;

type ShelfMoreProps = {
  locale: Locale;
  section: ShelfSectionKey;
  /** The piece this closes, which is left out. */
  slug: string;
};

export function ShelfMore({ locale, section, slug }: ShelfMoreProps) {
  const { shelf } = contentFor(locale);
  const { more } = shelf.writeUp;
  const items = SHELF[section];
  const at = items.findIndex((item) => item.slug === slug);
  const next = [...items.slice(at + 1), ...items.slice(0, at)].slice(0, 4);
  const sectionHref = localePath(locale, `${ROUTES.shelf}#${section}`);

  return (
    <section className={styles.more} aria-labelledby="shelf-more-title">
      <div className={styles.head}>
        {/* Two wordings, one shown at a time, so one is ever read out: the
            laptop has room to say where, the phone does not. */}
        <h2 className={styles.title} id="shelf-more-title">
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.long}>{more.titles[section].long}</span>
          <span className={styles.short}>{more.titles[section].short}</span>
        </h2>
        <ArrowLink href={sectionHref} className={styles.all}>
          {more.all}
        </ArrowLink>
      </div>

      <ul className={styles.grid}>
        {next.map((item) => {
          const written = writeUpHref(locale, item.slug);
          return (
            <li key={item.slug}>
              <article className={styles.card}>
                <Poster
                  slug={item.slug}
                  alt={posterAlt(shelf, item)}
                  sizes={SIZES}
                  href={written ?? sectionHref}
                />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardCredit}>{creditLine(shelf, item)}</p>
                {written && (
                  <ArrowLink href={written} className={styles.cardRead}>
                    {inOtherLanguage(locale, item.slug)
                      ? shelf.readWriteUpOther
                      : shelf.readWriteUp}
                  </ArrowLink>
                )}
              </article>
            </li>
          );
        })}
      </ul>

      {/* On a phone, a button you can hit with a thumb, as the shelf's
          closing does. Only one of the two is ever displayed. */}
      <div className={styles.button}>
        <Button href={sectionHref} block iconAfter={<ArrowUpRightIcon size={17} />}>
          {more.allShelf}
        </Button>
      </div>
    </section>
  );
}
