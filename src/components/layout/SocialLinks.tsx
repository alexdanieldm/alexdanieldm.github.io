import { EnvelopeIcon, GithubIcon, LinkedinIcon } from '@/components/icons';
import { SOCIALS } from '@/content/navigation';

import styles from './SocialLinks.module.scss';

const LINKS = [
  { href: SOCIALS.github, label: 'GitHub', Icon: GithubIcon },
  { href: SOCIALS.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: SOCIALS.email, label: 'Email', Icon: EnvelopeIcon },
] as const;

/**
 * The three ways to reach me, as icons.
 *
 * Each one is a 32px target around a 21px mark. The mark is the only label, so
 * unlike everywhere else on the site these icons are named rather than hidden,
 * and the box is sized to clear the 24px minimum for a pointer target rather
 * than to fit the glyph.
 */
export function SocialLinks({ tone = 'default' }: { tone?: 'default' | 'quiet' }) {
  return (
    <ul className={styles.list} data-tone={tone}>
      {LINKS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            className={styles.link}
            href={href}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            target={href.startsWith('http') ? '_blank' : undefined}
          >
            <Icon size={21} title={label} />
          </a>
        </li>
      ))}
    </ul>
  );
}
