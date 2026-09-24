import {
  ArrowUpRightIcon,
  CloudDownloadIcon,
  DocumentIcon,
  DownloadIcon,
  EnvelopeIcon,
  GithubIcon,
  LinkedinIcon,
  MusicIcon,
  SiteMarkIcon,
} from '@/components/icons';
import { Ground, COMPACT_WASHES } from '@/components/layout/Ground';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';
import { StripScene } from '@/components/sections/BannerScene';
import { LinkRow } from '@/components/ui';
import { contentFor, localePath, otherLocale, type Locale } from '@/content/locales';
import { CV, ROUTES, SOCIALS } from '@/content/navigation';
import { SITE_NAME } from '@/content/seo';

import styles from './LinksPage.module.scss';

const MARK = 22;
const ACTION = 16;

/**
 * The link page: what a social bio points at.
 *
 * It carries no site header and no site footer. Somebody arriving here came
 * from one link and wants another one, not a tour of the site, so the page is
 * the list and the two things that say whose list it is.
 *
 * The order is the whole design. Portfolio, email, music and writing come
 * first because those are the four I would actually want tapped from a photo
 * app; LinkedIn, the CV and GitHub go under Everything else because leading
 * with them turns a personal page into a CV with some links bolted on.
 *
 * Music and writing do not exist yet. They are drawn anyway, as pending rows,
 * which is a deliberate choice over leaving them out: the shape of the page is
 * the shape I want it to have, and an empty row is honest about the gap.
 */
export function LinksPage({ locale }: { locale: Locale }) {
  const { links, common } = contentFor(locale);
  const other = otherLocale(locale);

  return (
    /* 200px rather than a token: the scene is 200 tall at its tallest and 180
       on a phone, so offsetting by the taller of the two means no wash can
       reach up into the scene's fade at any width. */
    <Ground washes={COMPACT_WASHES} washOffset="200px">
      <main className={styles.page} id="main">
        {/* The strip composition at every width, including phones, where the
            banner uses the tall one. The tall scene is drawn to fill an 844px
            viewport; cropped into a band this shallow it shows the sun at
            several times the size it should be and no horizon at all. The
            strip is already the shallow composition, so it survives the crop
            and, at a phone's width, shows its full height rather than a slice. */}
        <div className={styles.scene} aria-hidden="true">
          <StripScene className={styles.sceneArt} />
          {/* Fades the artwork into the page colour, or the bottom edge of the
              scene is a hard line across the page. */}
          <div className={styles.fade} />
        </div>

        <div className={styles.column}>
          <header className={styles.who}>
            <span className={styles.kanji} aria-hidden="true">
              作
            </span>
            <h1 className={styles.name}>{SITE_NAME}</h1>
            <p className={styles.bio}>{links.bio}</p>
          </header>

          <ul className={styles.picked} aria-label={links.listLabel}>
            <LinkRow
              primary
              href={localePath(locale, ROUTES.home)}
              label={links.rows.portfolio}
              value="alexdanieldm.github.io"
              icon={<SiteMarkIcon size={MARK} />}
              action={<ArrowUpRightIcon size={ACTION} />}
            />
            <LinkRow
              href={SOCIALS.email}
              label={links.rows.email}
              value="alexdanieldm@gmail.com"
              icon={<EnvelopeIcon size={MARK} />}
              action={<ArrowUpRightIcon size={ACTION} />}
            />
            <LinkRow
              label={links.rows.music}
              value={links.pending.musicValue}
              tag={links.pending.musicTag}
              icon={<MusicIcon size={MARK} />}
            />
            <LinkRow
              label={links.rows.writing}
              value={links.pending.writingValue}
              tag={links.pending.writingTag}
              icon={<DocumentIcon size={MARK} />}
            />
          </ul>

          <section className={styles.rest} aria-labelledby="links-rest">
            <h2 className={styles.restTitle} id="links-rest">
              {links.restLabel}
            </h2>

            <ul className={styles.restList}>
              <LinkRow
                href={SOCIALS.linkedin}
                label={links.rows.linkedin}
                value="in/alexdanieldm"
                icon={<LinkedinIcon size={MARK} />}
                action={<ArrowUpRightIcon size={ACTION} />}
              />
              <LinkRow
                download={CV.filename}
                href={CV.href}
                label={links.rows.cv}
                value={links.cvValue}
                icon={<CloudDownloadIcon size={MARK} />}
                action={<DownloadIcon size={ACTION} />}
              />
              <LinkRow
                href={SOCIALS.github}
                label={links.rows.github}
                value="@alexdanieldm"
                icon={<GithubIcon size={MARK} />}
                action={<ArrowUpRightIcon size={ACTION} />}
              />
            </ul>
          </section>

          <footer className={styles.footer}>
            <div className={styles.footerText}>
              <p className={styles.note}>
                © {new Date().getFullYear()} {SITE_NAME}, {common.footer.location}
              </p>

              {/* The page has no header, so the switch lives here. It is the
                  only way across on a route the site's own nav never links to. */}
              <LanguageSwitch
                current={locale}
                target={other}
                href={localePath(other, ROUTES.links)}
                label={common.language.label}
                targetName={common.language[other]}
              />
            </div>

            <span className={styles.entrust} aria-hidden="true">
              嘱
            </span>
          </footer>
        </div>
      </main>
    </Ground>
  );
}
