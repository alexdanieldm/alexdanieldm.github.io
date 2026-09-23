/**
 * @fileoverview A terminal window: chrome, a title, and lines of output.
 *
 * The lines are content, not a screenshot. They stay selectable, they reflow on
 * a phone, and the one thing the comps could only fake, the cursor still
 * waiting for an answer, is a real animation here.
 *
 * @example
 * <Terminal title="the safe sync">
 *   <TerminalLine prompt>oma sync-preview</TerminalLine>
 *   <TerminalLine>Tagged <Value>qa-preview-backup/2026-09-21T14-53-02</Value></TerminalLine>
 *   <TerminalLine tone="accent">Live theme: Northbeam Production</TerminalLine>
 *   <TerminalLine>Type the theme ID to continue: <Caret /></TerminalLine>
 * </Terminal>
 */

import type { ReactNode } from 'react';

import styles from './Terminal.module.scss';

export function Terminal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={`${styles.terminal} glow`}>
      <div className={styles.chrome}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} data-live />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

type TerminalLineProps = {
  children: ReactNode;
  /** Prefixes a coral `$`. Marks the line as something I typed. */
  prompt?: boolean;
  /** Coral is a refusal or a warning; faint is a closing remark, not output. */
  tone?: 'default' | 'accent' | 'faint';
  /** Extra space above, to separate one invocation from the next. */
  spaced?: boolean;
};

export function TerminalLine({
  children,
  prompt = false,
  tone = 'default',
  spaced = false,
}: TerminalLineProps) {
  return (
    <p className={styles.line} data-tone={tone} data-spaced={spaced || undefined}>
      {prompt && <span className={styles.prompt}>$</span>}
      {children}
    </p>
  );
}

/** A fragment of a line at full contrast: the part that is the actual answer. */
export function Value({ children }: { children: ReactNode }) {
  return <span className={styles.value}>{children}</span>;
}

/** The block cursor, still blinking, still waiting for the theme ID. */
export function Caret() {
  return <span className={styles.caret} aria-hidden="true" />;
}
