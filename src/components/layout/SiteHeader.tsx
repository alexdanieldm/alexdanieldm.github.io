import Link from 'next/link';

import { DownloadIcon } from '@/components/icons';
import { contentFor, localePath, otherLocale, type Locale } from '@/content/locales';
import { CV, navItems, ROUTES } from '@/content/navigation';

import { MobileMenu } from './MobileMenu';
import { SocialLinks } from './SocialLinks';
import { StickyHeader } from './StickyHeader';
import { Wordmark } from './Wordmark';

import styles from './SiteHeader.module.scss';

type SiteHeaderProps = {
  locale: Locale;
  /**
   * The route this header sits on, without a language prefix. It decides which
   * nav item is marked and where the language switch points.
   */
  path: string;
  /**
   * `overlay` sits inside a banner and lets the artwork show through;
   * `solid` is its own strip with a rule under it, for a page with no banner.
   */
  variant?: 'overlay' | 'solid';
};

export function SiteHeader({ locale, path, variant = 'overlay' }: SiteHeaderProps) {
  const { common } = contentFor(locale);
  const items = navItems(locale, common);
  const here = localePath(locale, path);

  return (
    <StickyHeader variant={variant}>
      <Wordmark href={localePath(locale, ROUTES.home)} />

      <nav className={styles.nav} aria-label={common.mainNavLabel}>
        <ul className={styles.list}>
          {items.map(({ href, label }) => {
            const isCurrent = href === here;
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

      {/* The wordmark and footer are handed over as already-rendered elements
          rather than imported inside the menu, so their icons stay out of the
          client bundle. */}
      <MobileMenu
        items={items}
        labels={{
          open: common.openMenu,
          close: common.closeMenu,
          dialog: common.siteNavLabel,
        }}
        brand={<Wordmark href={localePath(locale, ROUTES.home)} />}
        footer={
          <>
            <SocialLinks />
            <a className={styles.menuCv} href={CV.href} download={CV.filename}>
              CV
              <DownloadIcon size={14} />
            </a>
          </>
        }
      />
    </StickyHeader>
  );
}
