/**
 * @fileoverview One section of the shelf, in its three tiers.
 *
 * The tiers are worked out here from what exists rather than stored anywhere:
 * an item with a take is a highlight, a featured highlight leads the section,
 * and the rest is the wall. So the section reshapes itself as things get
 * written, and a section with nothing written yet is simply all wall.
 *
 * Only a written-up item gets a button, and only the button is a link. A card
 * with nothing behind it is not a link, keeps the arrow cursor, and goes
 * nowhere; it still lifts on hover, because that is the shelf's texture.
 */

import { ArrowLink, Poster } from '@/components/ui';
import { contentFor, localePath, type Locale, type ShelfContent } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { Copy, type Rich } from '@/content/rich';
import { SHELF, SHELF_SECTIONS, type ShelfItem, type ShelfSectionKey } from '@/content/shelf';

import styles from './ShelfSection.module.scss';

/**
 * How wide each tier shows its poster, so the browser picks 360, 480 or 720
 * for the screen it is on. These follow the breakpoints in the module; they
 * only have to be close, because there are three files to choose between, not
 * ten.
 *
 * One entry is not a width. The page stops growing at its container, so on a
 * big monitor a card is the same 204px it is on a laptop, but each of those
 * pixels is physically bigger and the 480 file's softness starts to show. Past
 * 1800px, a width laptops do not reach at their default scaling, the slot is
 * claimed at 720, which makes every screen density fetch the 720 file.
 */
const BIG_MONITOR = '(min-width: 1800px) 720px';

const SIZES = {
  feature: `(max-width: 450px) calc(100vw - 92px), (max-width: 769px) 320px, (max-width: 990px) 200px, ${BIG_MONITOR}, 220px`,
  highlight: `(max-width: 450px) 140px, (max-width: 990px) 180px, ${BIG_MONITOR}, 215px`,
  wall: `(max-width: 450px) calc(50vw - 32px), (max-width: 769px) calc(33vw - 40px), (max-width: 990px) calc(25vw - 40px), ${BIG_MONITOR}, 204px`,
};

type Written = { item: ShelfItem; take: Rich };

function tiers(items: ShelfItem[], takes: Partial<Record<string, Rich>>) {
  const written: Written[] = [];
  const wall: ShelfItem[] = [];
  for (const item of items) {
    const take = takes[item.slug];
    if (take) written.push({ item, take });
    else wall.push(item);
  }
  const feature = written.find(({ item }) => item.featured);
  return { feature, highlights: written.filter((entry) => entry !== feature), wall };
}

function altFor(shelf: ShelfContent, item: ShelfItem) {
  return shelf.art[item.art ?? 'poster'].replace('{title}', item.title);
}

function creditFor(shelf: ShelfContent, item: ShelfItem) {
  const notes: Partial<Record<string, string>> = shelf.notes;
  const note = notes[item.slug];
  return note ? `${item.credit} · ${note}` : item.credit;
}

type ShelfSectionProps = {
  section: ShelfSectionKey;
  locale: Locale;
};

export function ShelfSection({ section, locale }: ShelfSectionProps) {
  const { shelf } = contentFor(locale);
  const eyebrows: Partial<Record<string, string>> = shelf.eyebrows;
  const { name, intro } = shelf.sections[section];
  const { feature, highlights, wall } = tiers(SHELF[section], shelf.takes);
  const titleId = `${section}-title`;

  /* The wall is labelled only when something sits above it: a section that is
     all wall does not need telling it is also a list. And it says nothing on it
     is written up only while that is true of every card. */
  const labelled = Boolean(feature) || highlights.length > 0;
  const unwritten = wall.every((item) => !item.writtenUp);

  const read = (item: ShelfItem, className?: string) =>
    item.writtenUp ? (
      <ArrowLink href={localePath(locale, `${ROUTES.shelf}${item.slug}/`)} className={className}>
        {shelf.readWriteUp}
      </ArrowLink>
    ) : null;

  return (
    <section
      id={section}
      className={styles.section}
      aria-labelledby={titleId}
      data-reveal
      suppressHydrationWarning
    >
      <div className={styles.head}>
        <h2 className={styles.title} id={titleId}>
          <span className={styles.dot} aria-hidden="true" />
          {name}
        </h2>
        <p className={styles.intro}>{intro}</p>
      </div>

      {feature && (
        <article className={styles.feature}>
          <Poster
            slug={feature.item.slug}
            alt={altFor(shelf, feature.item)}
            sizes={SIZES.feature}
            tone="accent"
            priority={section === SHELF_SECTIONS[0]}
            className={styles.featurePoster}
          />
          <div className={styles.featureBody}>
            {eyebrows[feature.item.slug] && (
              <p className={styles.eyebrow}>{eyebrows[feature.item.slug]}</p>
            )}
            <h3 className={styles.featureTitle}>{feature.item.title}</h3>
            <p className={styles.featureCredit}>{creditFor(shelf, feature.item)}</p>
            <Copy text={feature.take} className={styles.featureTake} />
            {read(feature.item, styles.featureRead)}
          </div>
        </article>
      )}

      {highlights.length > 0 && (
        <ul className={styles.highlights}>
          {highlights.map(({ item, take }) => (
            <li key={item.slug}>
              <article className={styles.highlight}>
                <Poster
                  slug={item.slug}
                  alt={altFor(shelf, item)}
                  sizes={SIZES.highlight}
                  className={styles.highlightPoster}
                />
                <h3 className={styles.highlightTitle}>{item.title}</h3>
                <p className={styles.highlightCredit}>{creditFor(shelf, item)}</p>
                <Copy text={take} className={styles.highlightTake} />
                {read(item, styles.highlightRead)}
              </article>
            </li>
          ))}
        </ul>
      )}

      {wall.length > 0 && labelled && (
        <div className={styles.wallHead}>
          <p className={styles.wallLabel}>{shelf.wall.label}</p>
          {unwritten && <p className={styles.wallNote}>{shelf.wall.unwritten}</p>}
        </div>
      )}

      {wall.length > 0 && (
        <ul className={styles.wall}>
          {wall.map((item) => (
            <li key={item.slug}>
              <article className={styles.card}>
                <Poster slug={item.slug} alt={altFor(shelf, item)} sizes={SIZES.wall} />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardCredit}>{creditFor(shelf, item)}</p>
                {read(item, styles.cardRead)}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
