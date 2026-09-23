import Link from 'next/link';

import { NAV_ITEMS } from '@/content/navigation';

import { MobileMenu } from './MobileMenu';
import { SocialLinks } from './SocialLinks';
import { StickyHeader } from './StickyHeader';
import { Wordmark } from './Wordmark';

import styles from './SiteHeader.module.scss';

type SiteHeaderProps = {
  /**
   * `overlay` sits inside a banner and lets the artwork show through;
   * `solid` is its own strip with a rule under it, for a page with no banner.
   */
  variant?: 'overlay' | 'solid';
  /** The href of the current page, so its nav item can mark itself. */
  current?: string;
};

export function SiteHeader({ variant = 'overlay', current }: SiteHeaderProps) {
  return (
    <StickyHeader variant={variant}>
      <Wordmark />

      <nav className={styles.nav} aria-label="Main">
        <ul className={styles.list}>
          {NAV_ITEMS.map(({ href, label }) => {
            const isCurrent = href === current;
            return (
              <li key={href}>
                <Link
                  className={styles.link}
                  href={href}
                  data-current={isCurrent || undefined}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.socials}>
        <SocialLinks />
      </div>

      <MobileMenu />
    </StickyHeader>
  );
}
