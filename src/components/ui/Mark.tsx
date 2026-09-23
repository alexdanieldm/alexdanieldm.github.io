import type { ReactNode } from 'react';

/**
 * The highlighter. Fills the line box and flips the text to the ground colour
 * on hover.
 *
 * A `<span>` rather than `<mark>` or `<strong>`. It is a reading-path device,
 * not semantic emphasis: three of these can land in one paragraph, and a screen
 * reader announcing emphasis three times in four sentences is worse than it
 * announcing none. The styling lives in globals.scss because several sections
 * use it and only one of them should own the rule.
 */
export function Mark({ children }: { children: ReactNode }) {
  return <span className="mark">{children}</span>;
}
