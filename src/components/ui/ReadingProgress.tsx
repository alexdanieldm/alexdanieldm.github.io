'use client';

/**
 * @fileoverview A 3px bar across the top of the window that fills as a piece
 * is read.
 *
 * It is the answer to a long piece instead of splitting it into pages, which
 * would break find in page, links to a passage and the scroll position. It
 * makes the length finite at a glance, which is the one thing pages were for.
 *
 * It measures the text it is given, not the page: it is full when the last
 * paragraph is on screen, not when the footer is. It follows the reader's own
 * scroll, once a frame, with no animation of its own. A screen reader has its
 * own sense of where it is, so the bar is hidden from one.
 */

import { useEffect, useRef } from 'react';

import styles from './ReadingProgress.module.scss';

export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = document.getElementById(target);
    const node = bar.current;
    if (!text || !node) return;
    let ticking = false;

    const read = () => {
      ticking = false;
      const { top, height } = text.getBoundingClientRect();
      const seen = Math.min(1, Math.max(0, (window.innerHeight - top) / height));
      node.style.setProperty('--progress', String(seen));
    };

    const onMove = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove);
      window.removeEventListener('resize', onMove);
    };
  }, [target]);

  return (
    <div ref={bar} className={styles.progress} aria-hidden="true">
      <span className={styles.fill} />
    </div>
  );
}
