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
import { contentFor, type Locale } from '@/content/locales';
import { CV, ROUTES, SOCIALS } from '@/content/navigation';
import { Copy } from '@/content/rich';

import styles from './ContactPage.module.scss';

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

export function ContactPage({ locale }: { locale: Locale }) {
  const { contact } = contentFor(locale);

  return (
    <Ground washes={COMPACT_WASHES} washOffset="var(--banner-height-compact)">
      <SiteHeader locale={locale} path={ROUTES.contact} />

      <main id="main">
        <Banner variant="strip" eyebrow={contact.eyebrow} title={contact.title} />

        <section className={styles.body} aria-label={contact.bodyLabel}>
          <div className={styles.prose}>
            {contact.paragraphs.map((text, i) => (
              <Copy key={i} text={text} className={i === 0 ? styles.lede : undefined} />
            ))}
          </div>

          <ul className={styles.channels}>
            <Channel
              primary
              href={SOCIALS.email}
              label={contact.channels.email}
              value="alexdanieldm@gmail.com"
              icon={<EnvelopeIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <Channel
              href={SOCIALS.linkedin}
              label={contact.channels.linkedin}
              value="in/alexdanieldm"
              icon={<LinkedinIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <Channel
              href={SOCIALS.github}
              label={contact.channels.github}
              value="@alexdanieldm"
              icon={<GithubIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <Channel
              download={CV.filename}
              href={CV.href}
              label={contact.channels.cv}
              value={contact.channels.cvValue}
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
                {contact.entrust.title}
              </h2>
              <p className={styles.entrustBody}>{contact.entrust.body}</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} variant="inner" longLocation />
    </Ground>
  );
}
