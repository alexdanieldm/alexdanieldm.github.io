/**
 * @fileoverview The two button treatments on the site, as one component.
 *
 * Renders an `<a>` when it is given an `href` and a `<button>` otherwise, so a
 * link that looks like a button is still a link: middle-click opens it, the
 * screen reader calls it a link, and the keyboard treats it like one.
 *
 * @example
 * <Button href="#work" icon={<CodeSlashIcon size={17} />}>See the work</Button>
 *
 * @example
 * // A trailing mark goes through iconAfter, never as a child. Globals set
 * // `svg { display: block }`, so an svg passed as a child lands inside the
 * // label span and breaks the line under the text.
 * <Button href="/contact" iconAfter={<ArrowUpRightIcon size={17} />}>Get in touch</Button>
 *
 * @example
 * <Button variant="ghost" href={CV.href} download={CV.filename}>Download CV</Button>
 */

import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  children: ReactNode;
  /** Sits before the label. Decorative: the label already says the same thing. */
  icon?: ReactNode;
  /** Sits after the label, as a flex sibling rather than inside it. */
  iconAfter?: ReactNode;
  /** Coral and filled, or outlined and filled on hover. */
  variant?: 'primary' | 'ghost';
  /** `large` is the closing call to action; everything else is `medium`. */
  size?: 'medium' | 'large';
  /** Stretches to the container, which is what the mobile banner wants. */
  block?: boolean;
  href?: string;
  /** `true` downloads under the path's own name; a string renames it on disk. */
  download?: boolean | string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
};

/** An href is "internal" when it is a route on this site, not a hash or a protocol. */
const isInternalRoute = (href: string) => href.startsWith('/') && !href.startsWith('//');

export function Button({
  children,
  icon,
  iconAfter,
  variant = 'primary',
  size = 'medium',
  block = false,
  href,
  download,
  onClick,
  type = 'button',
  className,
}: ButtonProps) {
  const classes = [styles.button, className].filter(Boolean).join(' ');
  const attributes = {
    className: classes,
    'data-variant': variant,
    'data-size': size,
    'data-block': block || undefined,
  };

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {iconAfter}
    </>
  );

  if (href) {
    /* A download or an anchor is a plain <a>: next/link would prefetch a route
       that does not exist, and it cannot do anything useful with a hash. */
    if (download || !isInternalRoute(href)) {
      const external = href.startsWith('http');
      return (
        <a
          {...attributes}
          href={href}
          download={download}
          rel={external ? 'noreferrer' : undefined}
          target={external ? '_blank' : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...attributes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button {...attributes} type={type} onClick={onClick}>
      {content}
    </button>
  );
}
