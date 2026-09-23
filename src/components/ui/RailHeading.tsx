import type { ReactNode } from 'react';

import styles from './RailHeading.module.scss';

type RailHeadingProps = {
  children: ReactNode;
  /** A short note under the rule: locale, languages, a one-line framing. */
  note?: ReactNode;
  id?: string;
  /** `large` is a top-level section, `medium` a section inside an article. */
  size?: 'large' | 'medium';
};

/**
 * The heading that sits in the narrow left rail: title, a short coral rule, and
 * optionally a note. Used wherever a section is a rail beside a column of prose.
 */
export function RailHeading({ children, note, id, size = 'large' }: RailHeadingProps) {
  return (
    <div className={styles.rail} data-size={size}>
      <h2 className={styles.title} id={id}>
        {children}
      </h2>
      <span className={styles.rule} aria-hidden="true" />
      {note && <div className={styles.note}>{note}</div>}
    </div>
  );
}
