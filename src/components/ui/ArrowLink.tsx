/**
 * @fileoverview A text link with an arrow, in the two directions the site uses.
 *
 * Direction and treatment are deliberately one prop rather than two. Forward
 * links go somewhere new and are coral with a growing underline; back links
 * return somewhere you have already been and stay quiet until hover, when the
 * text and the arrow recolour together. There is no fifth combination worth
 * having, so there is no prop for one.
 *
 * @example
 * <ArrowLink href="/work/oma-cli">Read the case study</ArrowLink>
 *
 * @example
 * <ArrowLink href="/#work" direction="back">Back to work</ArrowLink>
 */

import Link from 'next/link';
import type { ReactNode } from 'react';

import { ArrowLeftIcon, ArrowUpRightIcon } from '@/components/icons';

import styles from './ArrowLink.module.scss';

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  direction?: 'forward' | 'back';
  className?: string;
};

export function ArrowLink({ href, children, direction = 'forward', className }: ArrowLinkProps) {
  const forward = direction === 'forward';
  const classes = [styles.link, forward && 'text-link', className].filter(Boolean).join(' ');

  return (
    <Link className={classes} href={href} data-direction={direction}>
      {!forward && <ArrowLeftIcon size={14} className={styles.arrow} />}
      {children}
      {forward && <ArrowUpRightIcon size={14} className={styles.arrow} />}
    </Link>
  );
}
