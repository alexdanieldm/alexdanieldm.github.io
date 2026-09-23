'use client';

/**
 * @fileoverview The header shell: fixed, and it gets out of the way.
 *
 * Scrolling down past the banner slides it up out of view; scrolling up at all
 * brings it straight back. The point is that navigation is always one small
 * upward flick away without a bar sitting on top of the reading the whole time.
 *
 * Only the shell is a client component. Everything inside it is passed in as
 * children from a server component and stays server-rendered, so making the
 * header interactive did not drag the wordmark, the nav and three icons into
 * the bundle with it.
 */

import { useEffect, useState, type ReactNode } from 'react';

import styles from './SiteHeader.module.scss';

/** Nothing happens inside this much of the page: it is banner, and the header belongs on it. */
const SETTLE_AT = 140;

/** Ignore anything smaller. Trackpad drift and rubber-banding both live below it. */
const MIN_DELTA = 6;

type StickyHeaderProps = {
  variant: 'overlay' | 'solid';
  children: ReactNode;
};

export function StickyHeader({ variant, children }: StickyHeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const read = () => {
      const y = window.scrollY;
      setSettled(y > SETTLE_AT);

      const delta = y - last;
      if (Math.abs(delta) < MIN_DELTA) return;
      setHidden(delta > 0 && y > SETTLE_AT);
      last = y;
    };

    /* rAF-throttled: scroll fires far faster than the screen refreshes, and
       there is no point computing a state we cannot paint. React bails on a
       set that does not change the value, so a steady scroll re-renders twice
       in total, not once a frame. */
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        read();
      });
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={styles.header}
        data-variant={variant}
        data-settled={settled || undefined}
        data-hidden={hidden || undefined}
      >
        {children}
      </header>

      {/* A fixed header takes no space, so a page without a banner to sit on
          needs the height back. It belongs here rather than as padding each
          such page has to remember. */}
      {variant === 'solid' && <div className={styles.spacer} aria-hidden="true" />}
    </>
  );
}
