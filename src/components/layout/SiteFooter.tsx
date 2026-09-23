import { ArrowLink } from '@/components/ui';

import { SocialLinks } from './SocialLinks';

import styles from './SiteFooter.module.scss';

type SiteFooterProps = {
  /** Inner pages put a way back where the home page puts its icons. */
  variant?: 'home' | 'inner';
  /** The home page says Barcelona; the contact page says where that is. */
  location?: string;
};

/**
 * The year is resolved at build time, not in the browser. It is right on the
 * day a build ships and drifts if nothing is deployed for a year, which is the
 * trade for not shipping JavaScript to render three characters.
 */
export function SiteFooter({ variant = 'home', location = 'Barcelona' }: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.note}>
        © {new Date().getFullYear()} Alex Durán, {location}
      </p>

      {variant === 'home' ? (
        <SocialLinks tone="quiet" />
      ) : (
        <ArrowLink href="/" direction="back">
          Back home
        </ArrowLink>
      )}

      <p className={styles.note}>Next.js, TypeScript, SCSS Modules</p>
    </footer>
  );
}
