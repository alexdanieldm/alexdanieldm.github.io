import { EnvelopeIcon, GithubIcon, LinkedinIcon } from '@/components/icons';
import { SOCIALS } from '@/content/navigation';

import styles from './SocialLinks.module.scss';

/* The three names are the same word in both languages, so they stay here
   rather than becoming three more strings to translate identically. */
const LINKS = [
  { key: 'github', href: SOCIALS.github, label: 'GitHub', Icon: GithubIcon },
  { key: 'linkedin', href: SOCIALS.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { key: 'email', href: SOCIALS.email, label: 'Email', Icon: EnvelopeIcon },
] as const;

export type SocialKey = (typeof LINKS)[number]['key'];

/**
 * The three ways to reach me, as icons, or the ones named in `only`.
 *
 * Each one is a 32px target around a 21px mark: the box is sized to clear the
 * 24px minimum for a pointer target, not to fit the glyph.
 *
 * The name goes on the link, not on the mark inside it. A link does compute its
 * name from its subtree, so labelling the svg would technically work, but it
 * leaves the anchor itself unnamed in the accessibility tree and risks being
 * read twice, as a link and again as an image. One name, on the thing that is
 * actually the control.
 */
export function SocialLinks({
  tone = 'default',
  only,
}: {
  tone?: 'default' | 'quiet';
  only?: readonly SocialKey[];
}) {
  const links = only ? LINKS.filter(({ key }) => only.includes(key)) : LINKS;

  return (
    <ul className={styles.list} data-tone={tone}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            className={styles.link}
            href={href}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            target={href.startsWith('http') ? '_blank' : undefined}
            aria-label={label}
          >
            <Icon size={21} />
          </a>
        </li>
      ))}
    </ul>
  );
}
