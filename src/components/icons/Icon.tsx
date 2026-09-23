/**
 * @fileoverview The one `<svg>` wrapper every icon in the codebase renders
 * through, so accessibility and colour are decided once instead of per icon.
 *
 * Colour is always `currentColor`. None of these marks carry a hex, which is
 * what lets the same GitHub icon sit in a white header and on a coral band
 * without a second copy or a `filter: brightness()` trick.
 *
 * @example
 * // Decorative: the mark sits beside its own visible label.
 * <ReactIcon size={46} />
 *
 * @example
 * // Meaningful: the mark IS the label, so it needs a name.
 * <GithubIcon size={21} title="GitHub" />
 */

import type { ReactNode } from 'react';

export type IconProps = {
  /** Rendered size in px, applied to both axes. Defaults to 24. */
  size?: number;
  /**
   * Accessible name. Leave it out whenever the icon sits next to text that
   * already says the same thing: the icon is then hidden from assistive tech
   * rather than announced twice.
   */
  title?: string;
  className?: string;
};

type IconBaseProps = IconProps & {
  viewBox: string;
  children: ReactNode;
  /** Outline marks need the fill off and the stroke on. */
  variant?: 'fill' | 'stroke';
  strokeWidth?: number;
};

export function Icon({
  viewBox,
  size = 24,
  title,
  className,
  children,
  variant = 'fill',
  strokeWidth = 1.6,
}: IconBaseProps) {
  const isStroke = variant === 'stroke';
  const named = Boolean(title);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill={isStroke ? 'none' : 'currentColor'}
      stroke={isStroke ? 'currentColor' : undefined}
      strokeWidth={isStroke ? strokeWidth : undefined}
      strokeLinecap={isStroke ? 'round' : undefined}
      strokeLinejoin={isStroke ? 'round' : undefined}
      role={named ? 'img' : undefined}
      aria-label={title}
      aria-hidden={named ? undefined : true}
    >
      {children}
    </svg>
  );
}
