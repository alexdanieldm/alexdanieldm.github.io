import type { ReactNode } from 'react';

import styles from './LinkRow.module.scss';

type LinkRowProps = {
  /** The short word above the value: EMAIL, GITHUB, CV. */
  label: string;
  /** The destination spelled out, so the row says where it goes before it is tapped. */
  value: string;
  icon: ReactNode;
  /**
   * Live rows go somewhere. A row for something that does not exist yet has no
   * href and renders as a plain list item instead of a link: there is nothing
   * to focus, and nothing that announces itself as a destination.
   */
  href?: string;
  /** Trailing mark on a live row: an arrow out, or an arrow down for a file. */
  action?: ReactNode;
  /** Trailing word in place of that mark, on a row that is not live yet. */
  tag?: string;
  /** The one row I actually want used, filled rather than outlined. */
  primary?: boolean;
  /** A string renames the file on disk; see CV.filename. */
  download?: boolean | string;
};

/**
 * One row that points somewhere. The whole row is the target, rather than the
 * width of the address printed inside it.
 *
 * Shared because the contact page and the link page draw the same row, and two
 * copies would drift apart the first time either one changed.
 *
 * Its three metrics are custom properties rather than a size prop. The two
 * pages want different row heights on a phone and agree about everything else,
 * so a caller sets `--link-row-height` on its own list instead of this growing
 * a variant that then has to be kept in step with both callers.
 */
export function LinkRow({
  label,
  value,
  icon,
  href,
  action,
  tag,
  primary,
  download,
}: LinkRowProps) {
  const external = href?.startsWith('http');

  const inner = (
    <>
      {icon}
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </span>
      {action && <span className={styles.action}>{action}</span>}
      {tag && <span className={styles.tag}>{tag}</span>}
    </>
  );

  return (
    <li>
      {href ? (
        <a
          className={`${styles.row} glow`}
          href={href}
          data-primary={primary || undefined}
          download={download}
          rel={external ? 'noreferrer' : undefined}
          target={external ? '_blank' : undefined}
        >
          {inner}
        </a>
      ) : (
        <div className={styles.row} data-pending="">
          {inner}
        </div>
      )}
    </li>
  );
}
