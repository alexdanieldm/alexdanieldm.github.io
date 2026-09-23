import type { ReactNode } from 'react';

import styles from './SectionHeading.module.scss';

type SectionHeadingProps = {
  children: ReactNode;
  /** The quiet uppercase label opposite the title. */
  kicker?: string;
  id?: string;
  /** On the coral band the kicker has to lift to full contrast. */
  tone?: 'default' | 'on-accent';
};

/** A section title with an optional label sitting on the same baseline. */
export function SectionHeading({ children, kicker, id, tone = 'default' }: SectionHeadingProps) {
  return (
    <div className={styles.heading} data-tone={tone}>
      <h2 className={styles.title} id={id}>
        {children}
      </h2>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
    </div>
  );
}
