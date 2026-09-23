import { ArrowLink } from '@/components/ui';
import { contentFor, localePath, otherLocale, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';

import { LanguageSwitch } from './LanguageSwitch';
import { SocialLinks } from './SocialLinks';

import styles from './SiteFooter.module.scss';

type SiteFooterProps = {
  locale: Locale;
  /** The route this footer sits on, unprefixed, so the switch points at its twin. */
  path: string;
  /** Inner pages put a way back where the home page puts its icons. */
  variant?: 'home' | 'inner';
  /** The contact page says where Barcelona is; everywhere else just says it. */
  longLocation?: boolean;
};

/**
 * The year is resolved at build time, not in the browser. It is right on the
 * day a build ships and drifts if nothing is deployed for a year, which is the
 * trade for not shipping JavaScript to render three characters.
 *
 * The language switch lives here rather than in the header. The browser's own
 * language already decides which version you land on, so the switch is a
 * correction for the minority who want the other one, not a primary control,
 * and the header has no room for it on a phone.
 */
export function SiteFooter({
  locale,
  path,
  variant = 'home',
  longLocation = false,
}: SiteFooterProps) {
  const { footer, language } = contentFor(locale).common;
  const place = longLocation ? footer.locationLong : footer.location;
  const other = otherLocale(locale);

  return (
    <footer className={styles.footer}>
      <p className={styles.note}>
        © {new Date().getFullYear()} Alex Durán, {place}
      </p>

      {variant === 'home' ? (
        <SocialLinks tone="quiet" />
      ) : (
        <ArrowLink href={localePath(locale, ROUTES.home)} direction="back">
          {footer.backHome}
        </ArrowLink>
      )}

      <div className={styles.end}>
        <LanguageSwitch
          current={locale}
          target={other}
          href={localePath(other, path)}
          label={language.label}
          targetName={language[other]}
        />
        <p className={styles.note}>{footer.builtWith}</p>
      </div>
    </footer>
  );
}
