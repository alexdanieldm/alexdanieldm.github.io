/**
 * @fileoverview The top of the shelf: what this page is, and what is on it.
 *
 * It is a banner for the sections under it, not the point of the page, so it
 * is sized one step above them rather than over them, and it is short enough
 * that the first section and its feature start above the fold on a laptop.
 */

import { ArrowLink } from '@/components/ui';
import { contentFor, localePath, type Locale, type ShelfContent } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { Copy } from '@/content/rich';
import { SHELF, SHELF_SECTIONS, SHELF_UPDATED } from '@/content/shelf';

import styles from './ShelfHero.module.scss';

/** One count in words, with its noun in the right number. */
function spell(count: number, counts: ShelfContent['counts'], key: keyof typeof SHELF) {
  const unit = counts.units[key];
  if (count === 1) return unit.one;
  return unit.other.replace('{n}', counts.words[count] ?? String(count));
}

/** "Ten anime, six manga, …", counted from the shelf so it cannot go stale. */
function contentsSentence(shelf: ShelfContent): string {
  const sentence = SHELF_SECTIONS.map((key) => spell(SHELF[key].length, shelf.counts, key)).join(
    ', ',
  );
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

/** 2026-09-29 to 29.09.2026, the way both languages write it in Spain. */
function displayDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
}

export function ShelfHero({ locale }: { locale: Locale }) {
  const { shelf } = contentFor(locale);
  const updated = displayDate(SHELF_UPDATED);

  return (
    <section className={styles.hero} aria-labelledby="shelf-title">
      <div className={styles.back}>
        <ArrowLink href={localePath(locale, ROUTES.home)} direction="back">
          {shelf.back}
        </ArrowLink>
      </div>

      <div className={styles.row}>
        <div className={styles.text}>
          <h1 className={styles.title} id="shelf-title">
            {shelf.title}
          </h1>
          <Copy text={shelf.lede} className={`${styles.lede} ${styles.long}`} />
          <Copy text={shelf.ledeShort} className={`${styles.lede} ${styles.short}`} />
        </div>

        <div className={styles.summary}>
          {/* Beside the title: the count as a sentence, the date pinned to the
              foot so the box's edges meet the title's top and the lede's end. */}
          <dl className={styles.facts}>
            <div>
              <dt className={styles.label}>{shelf.summary.contentsLabel}</dt>
              <dd className={styles.value}>
                {contentsSentence(shelf)}
                <span className={styles.aside}>{shelf.summary.onePage}</span>
              </dd>
            </div>
            <div>
              <dt className={styles.label}>{shelf.summary.updatedLabel}</dt>
              <dd className={styles.value}>
                <time dateTime={SHELF_UPDATED}>{updated}</time>
              </dd>
            </div>
          </dl>

          {/* Under the title, once it no longer fits beside it: the same facts
              as one row of numbers, which is what lets the first poster reach
              the fold on a phone. */}
          <div className={styles.counts}>
            <dl className={styles.stats}>
              {SHELF_SECTIONS.map((key) => (
                <div key={key}>
                  <dt className={styles.label}>{shelf.sections[key].short}</dt>
                  <dd className={styles.number}>{SHELF[key].length}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.updated}>
              <span className={styles.label}>{shelf.summary.updatedLabel}</span>
              <time dateTime={SHELF_UPDATED}>{updated}</time>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
