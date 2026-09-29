/**
 * @fileoverview A poster or cover on the shelf, at the size its card gives it.
 *
 * It lifts on hover whether or not anything is written about it. The lift is
 * the shelf's texture, not an affordance: a card with no write-up is not a
 * link, keeps the arrow cursor, and goes nowhere, but it still responds.
 *
 * @example
 * <Poster slug="frieren" alt="Cover art for Frieren" sizes="204px" />
 */

import { POSTER_WIDTHS, posterSrc } from '@/content/shelf';

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
  return (
    <div className={['glow', styles.poster, className].filter(Boolean).join(' ')} data-tone={tone}>
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
