import { ArrowLink } from '@/components/ui';
import { contentFor, localePath, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';

import { SocialLinks } from './SocialLinks';

import styles from './SiteFooter.module.scss';

type SiteFooterProps = {
  locale: Locale;
  /** Inner pages put a way back where the home page puts its icons. */
  variant?: 'home' | 'inner';
  /** The contact page says where Barcelona is; everywhere else just says it. */
  longLocation?: boolean;
};

/**
 * The year is resolved at build time, not in the browser. It is right on the
 * day a build ships and drifts if nothing is deployed for a year, which is the
 * trade for not shipping JavaScript to render three characters.
 */
export function SiteFooter({ locale, variant = 'home', longLocation = false }: SiteFooterProps) {
  const { footer } = contentFor(locale).common;
  const place = longLocation ? footer.locationLong : footer.location;

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

      <p className={styles.note}>{footer.builtWith}</p>
    </footer>
  );
}
