import type { ReactNode } from 'react';

import styles from './TechBadge.module.scss';

/**
 * One mark and its name, on the coral band.
 *
 * The mark is decorative: the label underneath already says what it is, so
 * naming the icon too would have a screen reader read "React React".
 */
export function TechBadge({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <li className={styles.badge}>
      {icon}
      <p className={styles.label}>{label}</p>
    </li>
  );
}
