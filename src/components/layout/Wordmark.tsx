import Link from 'next/link';

import styles from './Wordmark.module.scss';

/**
 * 作, the handle, and a coral full stop.
 *
 * The kanji is decorative and `aria-hidden`: it is part of the logotype, not
 * part of my name, and a screen reader announcing "tsukuru alexdanieldm" is
 * worse than it announcing the name on its own.
 */
export function Wordmark({ href = '/' }: { href?: string }) {
  return (
    <Link className={styles.wordmark} href={href}>
      <span className={styles.kanji} aria-hidden="true">
        作
      </span>
      alexdanieldm
      <span className={styles.stop} aria-hidden="true">
        .
      </span>
    </Link>
  );
}
