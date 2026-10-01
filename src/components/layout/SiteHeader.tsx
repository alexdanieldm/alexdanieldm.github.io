import Link from 'next/link';

import { DownloadIcon } from '@/components/icons';
import { localeStorageKey } from '@/content/localePreference';
import { contentFor, localePath, otherLocale, type Locale } from '@/content/locales';
import { CV, navItems, ROUTES, shelfNavItems } from '@/content/navigation';

import { LanguageSwitch } from './LanguageSwitch';
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
  /**
   * Which world the header belongs to. The shelf carries only its own
   * sections, its wordmark stays on the shelf, and of the icons it keeps only
   * email, so nothing in the header leads a reader away from what they came to
   * read.
   */
  nav?: 'site' | 'shelf';
};

/* An email is someone wanting to talk about what is on the shelf, which is the
   one reason worth leaving it for. GitHub and LinkedIn are the portfolio's
   business, and so is the CV. */
const SHELF_SOCIALS = ['email'] as const;

export function SiteHeader({ locale, path, variant = 'overlay', nav = 'site' }: SiteHeaderProps) {
  const { common, shelf } = contentFor(locale);
  const items = nav === 'shelf' ? shelfNavItems(locale, shelf) : navItems(locale, common);
  const socials = nav === 'shelf' ? SHELF_SOCIALS : undefined;
  const here = localePath(locale, path);
  const home = localePath(locale, nav === 'shelf' ? ROUTES.shelf : ROUTES.home);

  /* The shelf's header carries the language switch; the portfolio's leaves it
     to the footer. The portfolio follows the browser's language, so there the
     switch corrects a guess. The shelf guesses nothing: everyone lands on it in
     Spanish, so for anyone who reads English the switch is the first thing
     they need, and the shelf's bar has the room, one icon where the
     portfolio's has three. Beside that icon on a laptop, opposite it in the
     menu below the desktop breakpoint. */
  const other = otherLocale(locale);
  const languageSwitch = nav === 'shelf' && (
    <LanguageSwitch
      current={locale}
      target={other}
      href={localePath(other, path)}
      storageKey={localeStorageKey(path)}
      label={common.language.label}
      targetName={common.language[other]}
    />
  );

  return (
    <StickyHeader variant={variant} nav={nav}>
      <Wordmark href={home} />

      <nav className={styles.nav} aria-label={common.mainNavLabel}>
        <ul className={styles.list}>
          {items.map(({ href, label, fullLoad }) => {
            const isCurrent = href === here;
            const Anchor = fullLoad ? 'a' : Link;
            return (
              <li key={href}>
                <Anchor
                  className={styles.link}
                  href={href}
                  data-current={isCurrent || undefined}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {label}
                </Anchor>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.socials} data-nav={nav}>
        {languageSwitch && <div className={styles.languageSwitch}>{languageSwitch}</div>}
        <SocialLinks only={socials} />
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
        brand={<Wordmark href={home} />}
        footer={
          <>
            <SocialLinks only={socials} />
            {nav === 'site' && (
              <a className={styles.menuCv} href={CV.href} download={CV.filename}>
                CV
                <DownloadIcon size={14} />
              </a>
            )}
            {languageSwitch}
          </>
        }
      />
    </StickyHeader>
  );
}
