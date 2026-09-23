import type { ReactNode } from 'react';

import {
  ArrowUpRightIcon,
  CloudDownloadIcon,
  DownloadIcon,
  EnvelopeIcon,
  GithubIcon,
  LinkedinIcon,
} from '@/components/icons';
import { Ground, COMPACT_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Banner } from '@/components/sections';
import { Mark } from '@/components/ui';
import { CV, SOCIALS } from '@/content/navigation';
import { pageMetadata } from '@/content/seo';

import styles from './page.module.scss';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Email, LinkedIn, GitHub and my CV. Barcelona, hybrid or remote, in English or Spanish.',
  path: '/contact/',
});

type ChannelProps = {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  /** Trailing mark: an arrow out, or an arrow down for a file. */
  action: ReactNode;
  primary?: boolean;
  /** A string renames the file on disk; see CV.filename. */
  download?: boolean | string;
};

/**
 * One way to reach me. The whole row is the link, so the target is 452 by 76
 * rather than the width of the address inside it.
 */
function Channel({ href, label, value, icon, action, primary, download }: ChannelProps) {
  const external = href.startsWith('http');

  return (
    <li>
      <a
        className={`${styles.channel} glow`}
        href={href}
        data-primary={primary || undefined}
        download={download}
        rel={external ? 'noreferrer' : undefined}
        target={external ? '_blank' : undefined}
      >
        {icon}
        <span className={styles.channelText}>
          <span className={styles.channelLabel}>{label}</span>
          <span className={styles.channelValue}>{value}</span>
        </span>
        <span className={styles.channelArrow}>{action}</span>
      </a>
    </li>
  );
}

export default function ContactPage() {
  return (
    <Ground washes={COMPACT_WASHES} washOffset="var(--banner-height-compact)">
      <SiteHeader current="/contact" />

      <main id="main">
        <Banner
          variant="strip"
          eyebrow="Contact"
          title={<>Let&rsquo;s talk about what you&rsquo;re building.</>}
        />

        <section className={styles.body} aria-label="How to reach me">
          <div className={styles.prose}>
            <p className={styles.lede}>
              A role, a project, or a question about something on this site. I would rather have the
              conversation than not.
            </p>

            <p>
              Email is the fastest way to reach me, and{' '}
              <Mark>I answer everything that is not a template</Mark>. If you found me through a
              specific piece of work, mention which one. I am happy to go deeper than a portfolio
              page allows, including the parts that did not go well.
            </p>

            <p>
              I am based in Barcelona and work hybrid or remote, in <Mark>English</Mark> or{' '}
              <Mark>Spanish</Mark>.
            </p>
          </div>

          <ul className={styles.channels}>
            <Channel
              primary
              href={SOCIALS.email}
              label="Email"
              value="alexdanieldm@gmail.com"
              icon={<EnvelopeIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <Channel
              href={SOCIALS.linkedin}
              label="LinkedIn"
              value="in/alexdanieldm"
              icon={<LinkedinIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <Channel
              href={SOCIALS.github}
              label="GitHub"
              value="@alexdanieldm"
              icon={<GithubIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <Channel
              download={CV.filename}
              href={CV.href}
              label="CV"
              value="Download PDF"
              icon={<CloudDownloadIcon size={24} />}
              action={<DownloadIcon size={16} />}
            />
          </ul>
        </section>

        <section className={styles.entrust} aria-labelledby="entrust-title">
          <div className={`${styles.entrustInner} glow`}>
            <span className={styles.kanji} aria-hidden="true">
              嘱
            </span>

            <div>
              <h2 className={styles.entrustTitle} id="entrust-title">
                嘱, to entrust
              </h2>
              <p className={styles.entrustBody}>
                This character has been on my site since the first version, and it stays. It means
                to entrust something to someone, which is more or less what hiring an engineer is. I
                read a lot of manga, so it was going to end up in here somewhere.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="inner" location="Barcelona, Spain" />
    </Ground>
  );
}
