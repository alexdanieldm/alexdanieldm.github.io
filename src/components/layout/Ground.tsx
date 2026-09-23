/**
 * @fileoverview The page ground: the drifting light behind everything, plus the
 * dot grid over it.
 *
 * @example
 * <Ground washes={HOME_WASHES} washOffset="var(--banner-height)">
 *   {page}
 * </Ground>
 */

import type { CSSProperties, ReactNode } from 'react';

import styles from './Ground.module.scss';

export type Wash = {
  /** Centre, as a percentage of the wash field's width and height. */
  x: number;
  y: number;
  /** Radii in px. These are ellipse radii, so the element is twice each. */
  radiusX: number;
  radiusY: number;
  /** Coral reads as warmth, depth as distance. Nothing else is in the palette. */
  tone: 'accent' | 'depth';
  /** Vertical travel over one leg of the loop, in px. Negative drifts upward. */
  drift: number;
  /** Seconds. Deliberately coprime-ish across a set, so the loop never lines up. */
  duration: number;
};

/**
 * Four washes for the home page.
 *
 * The first one is the only one anybody consciously notices: it sits behind the
 * About copy, which is where a reader stops moving for long enough to see that
 * the light is moving. It gets the longest travel for that reason. The rest
 * counter-move by less, so the field breathes instead of sliding as one sheet.
 */
export const HOME_WASHES: Wash[] = [
  { x: 8, y: 15.5, radiusX: 760, radiusY: 470, tone: 'accent', drift: -34, duration: 24 },
  { x: 95, y: 37, radiusX: 820, radiusY: 520, tone: 'depth', drift: 20, duration: 29 },
  { x: 4, y: 59, radiusX: 860, radiusY: 520, tone: 'accent', drift: -28, duration: 26 },
  { x: 92, y: 82, radiusX: 900, radiusY: 560, tone: 'depth', drift: 16, duration: 31 },
];

/** Three washes, for a long inner page such as a case study. */
export const ARTICLE_WASHES: Wash[] = [
  { x: 6, y: 20, radiusX: 760, radiusY: 440, tone: 'accent', drift: -28, duration: 24 },
  { x: 94, y: 46, radiusX: 800, radiusY: 460, tone: 'depth', drift: 18, duration: 29 },
  { x: 5, y: 73, radiusX: 820, radiusY: 470, tone: 'accent', drift: -24, duration: 26 },
];

/** Two washes, for a page short enough that more would crowd it. */
export const COMPACT_WASHES: Wash[] = [
  { x: 8, y: 41, radiusX: 620, radiusY: 260, tone: 'accent', drift: -22, duration: 24 },
  { x: 93, y: 82, radiusX: 660, radiusY: 280, tone: 'depth', drift: 16, duration: 29 },
];

type GroundProps = {
  washes: Wash[];
  /**
   * How far down the page the wash field starts, as a CSS length.
   *
   * Not cosmetic. A banner paints its own sky and fades into the ground colour
   * at its bottom edge; a wash reaching up into that fade is exactly what makes
   * the join between the two read as a seam. Starting the field below the
   * banner means no wash can ever do that, at any content height, rather than
   * relying on percentages that happen to clear it at one viewport size.
   */
  washOffset?: string;
  children: ReactNode;
};

export function Ground({ washes, washOffset = '0px', children }: GroundProps) {
  return (
    <div className={styles.ground}>
      <div
        className={styles.field}
        style={{ '--ground-wash-offset': washOffset } as CSSProperties}
        aria-hidden="true"
      >
        <div className={styles.fieldInner}>
          {washes.map((wash, index) => (
            <span
              key={index}
              className={styles.wash}
              data-tone={wash.tone}
              style={
                {
                  '--wash-x': `${wash.x}%`,
                  '--wash-y': `${wash.y}%`,
                  '--wash-width': `${wash.radiusX * 2}px`,
                  '--wash-height': `${wash.radiusY * 2}px`,
                  '--wash-drift': `${wash.drift}px`,
                  '--wash-duration': `${wash.duration}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.dots} aria-hidden="true" />

      {children}
    </div>
  );
}
