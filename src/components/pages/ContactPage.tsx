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
import { LinkRow } from '@/components/ui';
import { contentFor, type Locale } from '@/content/locales';
import { CV, ROUTES, SOCIALS } from '@/content/navigation';
import { Copy } from '@/content/rich';

import styles from './ContactPage.module.scss';

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
            <LinkRow
              primary
              href={SOCIALS.email}
              label={contact.channels.email}
              value="alexdanieldm@gmail.com"
              icon={<EnvelopeIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <LinkRow
              href={SOCIALS.linkedin}
              label={contact.channels.linkedin}
              value="in/alexdanieldm"
              icon={<LinkedinIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <LinkRow
              href={SOCIALS.github}
              label={contact.channels.github}
              value="@alexdanieldm"
              icon={<GithubIcon size={24} />}
              action={<ArrowUpRightIcon size={16} />}
            />
            <LinkRow
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

      <SiteFooter locale={locale} path={ROUTES.contact} variant="inner" longLocation />
    </Ground>
  );
}
