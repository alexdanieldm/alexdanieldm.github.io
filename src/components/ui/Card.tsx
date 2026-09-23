import type { ReactNode } from 'react';

import styles from './Card.module.scss';

type CardProps = {
  title: string;
  children: ReactNode;
  /** The large serif numeral above the title, where the set is ordered. */
  index?: string;
};

/**
 * A raised panel with a coral top rule. The three beliefs on the home page and
 * the four guarantees on the case study are the same object.
 *
 * Translucent, not opaque: the background washes have to pass through it, or
 * every card edge becomes a seam as the light drifts past underneath.
 */
export function Card({ title, children, index }: CardProps) {
  return (
    <li className={`${styles.card} glow`}>
      {index && <p className={styles.index}>{index}</p>}
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
    </li>
  );
}
