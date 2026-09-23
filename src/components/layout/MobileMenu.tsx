'use client';

/**
 * @fileoverview The narrow-viewport navigation panel.
 *
 * The only client component on the site, and the only reason any JavaScript
 * ships at all. Everything else is static HTML and CSS.
 *
 * It owns dialog semantics properly rather than approximately: focus moves in
 * on open and back to the toggle on close, Tab is trapped inside the panel,
 * Escape closes it, and the page behind it does not scroll. The panel is not
 * rendered at all while closed, which is the cheapest way to guarantee no stale
 * `role="dialog"` or `aria-modal` is left behind on the page.
 *
 * The wordmark and the footer row arrive as props from the server component
 * that renders this, rather than being imported here. They are the same
 * components the header and footer already use, and passing them in keeps
 * their icons out of the client bundle: a client component's children stay
 * server-rendered, an import does not.
 */

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';

import { CloseIcon, MenuIcon } from '@/components/icons';
import type { NavItem } from '@/content/navigation';

import styles from './MobileMenu.module.scss';

const FOCUSABLE = 'a[href], button:not([disabled])';

type MobileMenuProps = {
  items: readonly NavItem[];
  labels: { open: string; close: string; dialog: string };
  /** The wordmark, so the open panel still says whose site it is. */
  brand: ReactNode;
  /** Social links, the language switch and the CV, along the bottom. */
  footer: ReactNode;
};

export function MobileMenu({ items, labels, brand, footer }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    /* Captured now rather than read in the cleanup. The toggle is always
       rendered so the node would in practice be the same one either way, but
       reading a ref during teardown is the pattern that eventually bites. */
    const toggle = toggleRef.current;

    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    /* Lock the page, and give back the width the scrollbar was using so the
       content underneath does not shift sideways as it disappears. */
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    /* Leave no residue: every listener removed, the scroll lock released, and
       focus put back on the control that opened this.

       Back on the toggle specifically, not on whatever held focus beforehand.
       A pointer click does not necessarily focus a button, so activeElement at
       open time is often <body>, and restoring that drops the keyboard user at
       the top of the document. The button that opened the dialog is where
       focus belongs on close either way. */
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      toggle?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        className={styles.toggle}
        ref={toggleRef}
        type="button"
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <MenuIcon size={16} />
      </button>

      {open && (
        <div
          className={styles.panel}
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
        >
          {/* 嘱, to entrust. The same character as the contact page, oversized
              and sitting behind the navigation rather than beside it. */}
          <span className={styles.kanji} aria-hidden="true">
            嘱
          </span>

          <div className={styles.panelHeader}>
            {brand}
            <button
              className={styles.toggle}
              type="button"
              aria-label={labels.close}
              onClick={close}
            >
              <CloseIcon size={16} />
            </button>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.list}>
              {items.map(({ href, label }, index) => (
                <li key={href}>
                  <Link className={styles.link} href={href} onClick={close}>
                    <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.panelFooter}>{footer}</div>
        </div>
      )}
    </>
  );
}
