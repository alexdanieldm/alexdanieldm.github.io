'use client';

/**
 * @fileoverview The rail's contents: every section of the piece, with the one
 * being read marked.
 *
 * The mark follows the headings' positions, read on scroll once a frame, the
 * way the reveal script sweeps rather than an observer: an observer only fires
 * when an intersection changes, and a jump or a fast scroll can carry a heading
 * past without it. A section is the one being read once its heading has passed
 * a line a third of the way down the window. A jump from this list lands a
 * heading above that line, so the item you click is the item that lights up.
 *
 * When the list is taller than the room the rail leaves it, the list scrolls
 * itself to keep the marked item in view. Only the list: moving the page would
 * fight the reader.
 */

import { useEffect, useId, useRef, useState } from 'react';

import styles from './WriteUpContents.module.scss';

/** How far down the window a heading has to be before its section is the one being read. */
const READING_LINE = 1 / 3;

type WriteUpContentsProps = {
  label: string;
  items: { id: string; text: string }[];
  /** The piece's language, when it is not the page's: the items are its headings. */
  lang?: string;
};

export function WriteUpContents({ label, items, lang }: WriteUpContentsProps) {
  const [current, setCurrent] = useState<string>();
  const list = useRef<HTMLUListElement>(null);
  const labelId = useId();

  useEffect(() => {
    const headings = items.flatMap(({ id }) => document.getElementById(id) ?? []);
    let ticking = false;

    const read = () => {
      ticking = false;
      const line = window.innerHeight * READING_LINE;
      const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= line);
      setCurrent(passed.at(-1)?.id);
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
  }, [items]);

  useEffect(() => {
    const box = list.current;
    const item = box?.querySelector<HTMLElement>('[data-current]')?.parentElement;
    if (!box || !item) return;
    const { offsetTop: top, offsetHeight: height } = item;
    if (top < box.scrollTop) box.scrollTop = top;
    else if (top + height > box.scrollTop + box.clientHeight) {
      box.scrollTop = top + height - box.clientHeight;
    }
  }, [current]);

  return (
    <nav className={styles.contents} aria-labelledby={labelId}>
      <p className={styles.label} id={labelId}>
        {label}
      </p>
      <ul ref={list} className={styles.list} lang={lang}>
        {items.map(({ id, text }) => {
          const isCurrent = id === current;
          return (
            <li key={id} className={styles.item}>
              <a
                className={styles.link}
                href={`#${id}`}
                data-current={isCurrent || undefined}
                aria-current={isCurrent || undefined}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
