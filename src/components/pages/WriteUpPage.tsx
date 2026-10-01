import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ARTICLE_WASHES, Ground } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { PlaceholderNote, ShelfMore, WriteUpContents, WriteUpText } from '@/components/sections';
import { ArrowLink, Poster, ReadingProgress } from '@/components/ui';
import { contentFor, HTML_LANG, localePath, type Locale } from '@/content/locales';
import { ROUTES, SOCIALS, writeUpPath } from '@/content/navigation';
import { plainText, renderProse } from '@/content/rich';
import { pageMetadata } from '@/content/seo';
import { POSTER_BIG_MONITOR, posterAlt, shelfEntry } from '@/content/shelf';
import { headings, isPlaceholder, writeUpFor } from '@/content/write-ups';

import styles from './WriteUpPage.module.scss';

/* What the progress bar measures: the text, not the page. */
const TEXT_ID = 'write-up-text';

/* 240 in the rail on a laptop; above the text, as wide as the phone comp drew
   it, everywhere narrower. */
const POSTER_SIZES = `(max-width: 450px) calc(100vw - 48px), (max-width: 990px) 342px, ${POSTER_BIG_MONITOR}, 240px`;

function find(slug: string) {
  const piece = writeUpFor(slug);
  const entry = shelfEntry(slug);
  /* Unreachable from the site: the route builds only the slugs that have a
     piece, and the registry has already checked each is on the shelf. */
  if (!piece || !entry) notFound();
  return { piece, ...entry };
}

/**
 * What the tab and a link preview say. The text exists in one language, so
 * both routes name that language's URL as the canonical.
 */
export function writeUpMetadata(locale: Locale, slug: string): Metadata {
  const { piece, item } = find(slug);
  const { standfirst } = piece;
  return pageMetadata({
    locale,
    title: item.title,
    /* Until the standfirst is in, the shelf's own description stands in. A
       placeholder never deploys, so this is never the one that ships. */
    description:
      standfirst && !isPlaceholder(standfirst)
        ? plainText(standfirst)
        : contentFor(locale).shelf.metaDescription,
    path: writeUpPath(slug),
    original: piece.lang,
    type: 'article',
  });
}

/**
 * A write-up, at /shelf/<slug>/ in both languages.
 *
 * It is a page under the shelf, so it wears the shelf's header and footer, and
 * every way back leads to the shelf rather than out of it. The page around the
 * piece is in the reader's language; the piece is in its own, and is marked
 * with it.
 *
 * One two column row: the rail on the left sticks while the piece scrolls, so
 * the poster, the facts and the contents stay in reach for the whole read. On a
 * phone there is no rail, and the poster and the facts sit under the title.
 */
export function WriteUpPage({ locale, slug }: { locale: Locale; slug: string }) {
  const { piece, item, section } = find(slug);
  const { shelf } = contentFor(locale);
  const route = writeUpPath(slug);
  const lang = piece.lang === locale ? undefined : HTML_LANG[piece.lang];
  const contents = headings(piece);
  const { coda } = shelf.writeUp;
  const subject = coda.subject.replace('{title}', item.title);

  return (
    <Ground washes={ARTICLE_WASHES}>
      <ReadingProgress target={TEXT_ID} />
      <SiteHeader locale={locale} path={route} variant="solid" nav="shelf" />

      <main id="main">
        <div className={styles.page}>
          <ArrowLink
            href={localePath(locale, ROUTES.shelf)}
            direction="back"
            className={styles.back}
          >
            {shelf.backToShelf}
          </ArrowLink>

          <article className={styles.piece}>
            <header className={styles.head}>
              <p className={styles.eyebrow}>
                <span className={styles.bar} aria-hidden="true" />
                {shelf.sections[section].name}
              </p>
              <h1 className={styles.title}>{item.title}</h1>
            </header>

            <div className={styles.rail}>
              <Poster
                slug={slug}
                alt={posterAlt(shelf, item)}
                sizes={POSTER_SIZES}
                tone="accent"
                priority
                className={styles.poster}
              />
              <dl className={styles.facts}>
                {piece.facts.map(({ label, value }) => (
                  <div key={label} className={styles.fact}>
                    <dt className={styles.factLabel}>{shelf.writeUp.facts[label]}</dt>
                    <dd className={styles.factValue}>{value}</dd>
                  </div>
                ))}
              </dl>
              {contents.length > 0 && (
                <WriteUpContents label={shelf.writeUp.contents} items={contents} lang={lang} />
              )}
            </div>

            <div className={styles.body}>
              {isPlaceholder(piece.standfirst) ? (
                <PlaceholderNote note={piece.standfirst.note} />
              ) : (
                piece.standfirst && (
                  <p className={styles.standfirst} lang={lang}>
                    {renderProse(piece.standfirst, locale)}
                  </p>
                )
              )}
              <span className={styles.rule} aria-hidden="true" />
              <WriteUpText piece={piece} locale={locale} id={TEXT_ID} />

              {/* The way in to writing to me, at the end of every piece. The
                address is printed under the link: on a computer with no mail
                app a mail link does nothing, and one click selects all of it
                to copy. */}
              <aside className={styles.coda} aria-label={coda.label}>
                <span className={styles.codaRule} aria-hidden="true" />
                <p className={styles.codaLine}>{coda.line}</p>
                <ArrowLink href={`${SOCIALS.email}?subject=${encodeURIComponent(subject)}`}>
                  {coda.link.replace('{title}', item.title)}
                </ArrowLink>
                <p className={styles.codaAddress}>{SOCIALS.email.replace('mailto:', '')}</p>
              </aside>
            </div>
          </article>
        </div>

        <ShelfMore locale={locale} section={section} slug={slug} />
      </main>

      <SiteFooter
        locale={locale}
        path={route}
        variant="inner"
        note={shelf.disclaimer}
        backLabel={shelf.backToShelf}
        backTo={ROUTES.shelf}
        colophon={shelf.colophon}
      />
    </Ground>
  );
}
