'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';

import styles from './Wordmark.module.scss';

/**
 * 作, the handle, and a coral full stop.
 *
 * The kanji is decorative and `aria-hidden`: it is part of the logotype, not
 * part of my name, and a screen reader announcing "tsukuru alexdanieldm" is
 * worse than it announcing the name on its own.
 *
 * A client component for one click. On the page it points at, the shelf's
 * own or the portfolio's home, a link to where you already are does nothing
 * at all, and the wordmark is where people click to go home: it looked
 * broken. There it goes back to the top of the page instead, at the page's
 * own scroll-behavior, so smooth, or instant with reduced motion. A section's
 * hash goes with it, since the page is no longer at that section.
 */
export function Wordmark({ href }: { href: string }) {
  const toTop = (event: MouseEvent<HTMLAnchorElement>) => {
    /* A new tab or a new window is the browser's business, not this. */
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.currentTarget.pathname !== window.location.pathname) return;

    event.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0 });
  };

  return (
    <Link className={styles.wordmark} href={href} onClick={toTop}>
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
