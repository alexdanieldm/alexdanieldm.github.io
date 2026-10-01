/**
 * @fileoverview A write-up's text: the manuscript's blocks, in its order.
 *
 * Two things here look alike and are not. A quotation is somebody else's
 * words, so it is a real `<blockquote>`, with its source in a caption. A pull
 * quote is one of the piece's own sentences said again, larger; a screen
 * reader has just read it, so it is hidden from one, and the build has already
 * checked that it is a repeat (see `write-ups/index.ts`).
 */

import { HTML_LANG, type Locale } from '@/content/locales';
import { renderProse } from '@/content/rich';
import { FIGURE_WIDTHS, figureSrc, headingId, type Block, type WriteUp } from '@/content/write-ups';

import styles from './WriteUpText.module.scss';

/* The column is 760 on a laptop and the window less its gutters below that,
   which reaches 760 again at 840. */
const FIGURE_SIZES =
  '(max-width: 450px) calc(100vw - 48px), (max-width: 840px) calc(100vw - 80px), 760px';

/**
 * What the manuscript has not supplied yet, drawn so it cannot be missed. The
 * note is mine and in English, whatever the piece is written in.
 */
export function PlaceholderNote({ note }: { note: string }) {
  return (
    <div className={styles.placeholder} role="note" lang="en">
      <span className={styles.placeholderLabel}>Placeholder</span>
      {note}
    </div>
  );
}

function BlockView({ block, piece, locale }: { block: Block; piece: WriteUp; locale: Locale }) {
  switch (block.type) {
    case 'paragraph':
      return <p className={styles.paragraph}>{renderProse(block.text, locale)}</p>;

    case 'heading':
      return (
        <h2 id={headingId(block)} className={styles.heading}>
          {block.text}
        </h2>
      );

    case 'quotation':
      return (
        <figure className={styles.quotation}>
          <blockquote className={styles.quote} lang={block.lang}>
            <p>{renderProse(block.text, locale)}</p>
          </blockquote>
          {block.source && <figcaption className={styles.source}>{block.source}</figcaption>}
        </figure>
      );

    case 'pull':
      return (
        <p className={styles.quote} aria-hidden="true">
          {block.text}
        </p>
      );

    case 'figure':
      return (
        <figure className={styles.figure}>
          <div className={styles.frame}>
            {/* A plain <img> for the same reason as the posters: a static
                export has no optimiser, so next/image would send every screen
                one file. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={figureSrc(piece.slug, block.image, FIGURE_WIDTHS[0])}
              srcSet={FIGURE_WIDTHS.map(
                (width) => `${figureSrc(piece.slug, block.image, width)} ${width}w`,
              ).join(', ')}
              sizes={FIGURE_SIZES}
              width={FIGURE_WIDTHS[0]}
              height={(FIGURE_WIDTHS[0] * 9) / 16}
              alt={block.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          {(block.caption || block.label) && (
            <figcaption className={styles.caption}>
              {block.caption && (
                <span className={styles.captionText}>{renderProse(block.caption, locale)}</span>
              )}
              {block.label && <span className={styles.captionLabel}>{block.label}</span>}
            </figcaption>
          )}
        </figure>
      );

    case 'placeholder':
      return <PlaceholderNote note={block.note} />;
  }
}

/**
 * The text, marked with the piece's language whenever it is not the page's,
 * so a screen reader reads a Spanish piece in Spanish under an English header
 * and footer, and switches back for them.
 */
export function WriteUpText({
  piece,
  locale,
  id,
}: {
  piece: WriteUp;
  locale: Locale;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={styles.text}
      lang={piece.lang === locale ? undefined : HTML_LANG[piece.lang]}
    >
      {piece.body.map((block, index) => (
        <BlockView key={index} block={block} piece={piece} locale={locale} />
      ))}
    </div>
  );
}
