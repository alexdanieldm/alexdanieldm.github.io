/**
 * @fileoverview A poster or cover on the shelf, at the size its card gives it.
 *
 * It lifts on hover whether or not anything is written about it. The lift is
 * the shelf's texture, not an affordance: a card with no write-up is not a
 * link, keeps the arrow cursor, and goes nowhere, but it still responds.
 *
 * Until its file arrives it shows itself blurred, from a 12x18 copy that comes
 * inline with the page (`content/shelf-placeholders.ts`), so scrolling faster
 * than the network never shows an empty frame.
 *
 * @example
 * <Poster slug="frieren" alt="Cover art for Frieren" sizes="204px" />
 */

import type { CSSProperties } from 'react';

import { POSTER_WIDTHS, posterSrc } from '@/content/shelf';
import { POSTER_PLACEHOLDERS } from '@/content/shelf-placeholders';

import styles from './Poster.module.scss';

type PosterProps = {
  slug: string;
  alt: string;
  /** How wide the card shows it, so the browser fetches the smallest file that covers it. */
  sizes: string;
  /** The feature's frame is coral; everything else is the quiet border. */
  tone?: 'accent';
  /** For the one poster that can be above the fold. The rest wait to be scrolled to. */
  priority?: boolean;
  className?: string;
};

export function Poster({ slug, alt, sizes, tone, priority = false, className }: PosterProps) {
  const placeholder = POSTER_PLACEHOLDERS[slug];

  return (
    <div
      className={['glow', styles.poster, className].filter(Boolean).join(' ')}
      data-tone={tone}
      style={
        placeholder
          ? ({ '--poster-placeholder': `url(${placeholder})` } as CSSProperties)
          : undefined
      }
    >
      {/* A plain <img> on purpose. Static export has no image optimiser, so
          next/image would render one src and no srcset, and every phone would
          fetch the retina file. The two widths are made once, ahead of time. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.image}
        src={posterSrc(slug, POSTER_WIDTHS[0])}
        srcSet={POSTER_WIDTHS.map((width) => `${posterSrc(slug, width)} ${width}w`).join(', ')}
        sizes={sizes}
        width={POSTER_WIDTHS[0]}
        height={POSTER_WIDTHS[0] * 1.5}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    </div>
  );
}
