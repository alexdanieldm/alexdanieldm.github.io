'use client';

/**
 * @fileoverview The English/Spanish toggle.
 *
 * It writes the choice to localStorage before navigating. That is the whole
 * point of it being a client component: the detection script reads that key
 * and stops guessing once someone has told it, so picking English on a Spanish
 * browser sticks instead of being overridden on the next visit.
 *
 * A plain link underneath, so it still works with the storage write failing or
 * scripting off. It is a full page load rather than a client transition, which
 * is correct here: the two languages have different root layouts, and the
 * document's `lang` has to change with them.
 */

import { LOCALE_STORAGE_KEY } from '@/content/localePreference';
import type { Locale } from '@/content/locales';

import styles from './LanguageSwitch.module.scss';

type LanguageSwitchProps = {
  /** The language being shown now. */
  current: Locale;
  /** The language this switches to. */
  target: Locale;
  /** Where this same page lives in the target language. */
  href: string;
  label: string;
  targetName: string;
};

export function LanguageSwitch({ current, target, href, label, targetName }: LanguageSwitchProps) {
  const remember = () => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, target);
    } catch {
      /* Private mode, blocked storage. The link still works; the guess resumes. */
    }
  };

  return (
    <a
      className={styles.switch}
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={`${label}: ${targetName}`}
      onClick={remember}
    >
      <span className={styles.current} aria-hidden="true">
        {current.toUpperCase()}
      </span>
      <span className={styles.slash} aria-hidden="true">
        /
      </span>
      {/* Deliberately unclassed: it inherits the link's own colour, which is
          the one the hover rule moves. */}
      <span aria-hidden="true">{target.toUpperCase()}</span>
    </a>
  );
}
