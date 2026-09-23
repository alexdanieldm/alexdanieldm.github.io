import { Ground, ARTICLE_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import {
  ArrowLink,
  Card,
  Caret,
  RailHeading,
  Terminal,
  TerminalLine,
  Value,
} from '@/components/ui';
import { contentFor, localePath, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { Copy, renderRich } from '@/content/rich';

import styles from './CaseStudyPage.module.scss';

export function CaseStudyPage({ locale }: { locale: Locale }) {
  const { caseStudy } = contentFor(locale);
  const home = localePath(locale, ROUTES.home);

  return (
    <Ground washes={ARTICLE_WASHES}>
      <SiteHeader locale={locale} path={ROUTES.caseStudy} variant="solid" />

      <main id="main">
        <div className={styles.page}>
          <section className={styles.intro} aria-labelledby="case-title">
            <div className={styles.back}>
              <ArrowLink href={`${home}#work`} direction="back">
                {caseStudy.back}
              </ArrowLink>
            </div>

            <p className={styles.eyebrow}>
              <span className={styles.dash} aria-hidden="true" />
              {caseStudy.eyebrow}
            </p>

            <h1 className={styles.title} id="case-title">
              {caseStudy.title}
            </h1>

            <p className={styles.lede}>{caseStudy.lede}</p>

            <dl className={styles.facts}>
              {caseStudy.facts.map(({ label, value, note }) => (
                <div className={styles.fact} key={label}>
                  <dt className={styles.factLabel}>{label}</dt>
                  <dd className={styles.factValue}>
                    {value}
                    <br />
                    <span className={styles.factNote}>{note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.split} aria-labelledby="why-title">
            <RailHeading id="why-title" size="medium">
              {caseStudy.why.heading}
            </RailHeading>

            <div className={styles.prose}>
              {caseStudy.why.paragraphs.map((text, i) => (
                <Copy key={i} text={text} />
              ))}
            </div>
          </section>

          {/* The output is the tool's own, so it stays in its own language. */}
          <section className={styles.terminals} aria-label={caseStudy.terminals.label}>
            <Terminal title={caseStudy.terminals.safeSync}>
              <TerminalLine prompt>oma sync-preview</TerminalLine>
              <TerminalLine>Fetching themes...</TerminalLine>
              <TerminalLine>
                Sync changes to <Value>&quot;OMA | Northbeam | Preview&quot;</Value>? yes
              </TerminalLine>
              <TerminalLine>Checking git status...</TerminalLine>
              <TerminalLine>
                <Value>Git repository is clean</Value>
              </TerminalLine>
              <TerminalLine>Creating preview theme backup...</TerminalLine>
              <TerminalLine>
                <Value>Committed all theme changes</Value>
              </TerminalLine>
              <TerminalLine>
                Tagged <Value>qa-preview-backup/2026-09-21T14-53-02</Value>
              </TerminalLine>
              <TerminalLine>Full theme state preserved in git history</TerminalLine>
              <TerminalLine>Committing JSON changes...</TerminalLine>
              <TerminalLine>
                <Value>Committed JSON changes</Value>
              </TerminalLine>
              <TerminalLine>Comparing local files with preview theme...</TerminalLine>
              <TerminalLine>
                <Value>Compared with preview theme</Value>
              </TerminalLine>

              <TerminalLine prompt spaced>
                oma sync-preview -t 124906102
              </TerminalLine>
              <TerminalLine>Fetching theme info...</TerminalLine>
              <TerminalLine tone="accent">Live theme: Northbeam Production</TerminalLine>
              <TerminalLine>
                Type the theme ID to continue: <Caret />
              </TerminalLine>
              <TerminalLine tone="accent">Aborted. Live theme left untouched.</TerminalLine>
            </Terminal>

            <Terminal title={caseStudy.terminals.standards}>
              <TerminalLine prompt>oma rules sync</TerminalLine>
              <TerminalLine>
                <Value>CLAUDE.md</Value> managed block updated
              </TerminalLine>
              <TerminalLine>
                skills/oma-shopify-theme <Value>synced</Value>
              </TerminalLine>
              <TerminalLine>
                skills/oma-nextjs <Value>synced</Value>
              </TerminalLine>
              <TerminalLine>
                agents <Value>4 definitions</Value>
              </TerminalLine>
              <TerminalLine>Project notes left untouched</TerminalLine>
              {caseStudy.terminals.standardsNote.map((line, i) => (
                <TerminalLine key={line} tone="faint" spaced={i === 0}>
                  {line}
                </TerminalLine>
              ))}
            </Terminal>
          </section>

          <section
            className={`${styles.split} ${styles.guarantees}`}
            aria-labelledby="guarantees-title"
          >
            <RailHeading id="guarantees-title" size="medium" note={caseStudy.guarantees.note}>
              {caseStudy.guarantees.heading}
            </RailHeading>

            <ul className={styles.guaranteeGrid}>
              {caseStudy.guarantees.cards.map((card) => (
                <Card key={card.title} title={card.title}>
                  {renderRich(card.body)}
                </Card>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.closing} aria-labelledby="matters-title">
          <div className={styles.closingInner}>
            <RailHeading id="matters-title" size="medium">
              {caseStudy.matters.heading}
            </RailHeading>

            <div className={styles.prose}>
              {caseStudy.matters.paragraphs.map((text, i) => (
                <Copy key={i} text={text} />
              ))}
            </div>
          </div>

          <div className={styles.closingAction}>
            <ArrowLink href={localePath(locale, ROUTES.contact)}>{caseStudy.matters.cta}</ArrowLink>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} path={ROUTES.caseStudy} variant="inner" />
    </Ground>
  );
}
