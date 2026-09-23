import { Fragment, type ReactNode } from 'react';

import { FigmaIcon, GraphQLIcon, TerminalIcon } from '@/components/icons';
import { ArrowLink, Caret, SectionHeading, Terminal, TerminalLine, Value } from '@/components/ui';
import { localePath, type HomeContent, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { Copy, renderRich } from '@/content/rich';

import { IntegrationDiagram, SurfacesDiagram } from './WorkSchematics';

import styles from './SelectedWork.module.scss';

type Article = HomeContent['work']['cli'];

type WorkArticleProps = {
  content: Pick<Article, 'index' | 'discipline' | 'stack' | 'title' | 'lede' | 'paragraphs'>;
  icon: ReactNode;
  children?: ReactNode;
  /** The first article gets the coral rule; the rest get a hairline. */
  lead?: boolean;
};

function WorkArticle({ content, icon, children, lead = false }: WorkArticleProps) {
  return (
    <article
      className={styles.article}
      data-lead={lead || undefined}
      data-reveal
      suppressHydrationWarning
    >
      <div className={styles.rail}>
        {icon}
        <p className={styles.index}>{content.index}</p>
        <p className={styles.discipline}>{content.discipline}</p>
        <p className={styles.stack}>
          {content.stack.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              <span>{line}</span>
            </Fragment>
          ))}
        </p>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{content.title}</h3>
        <p className={styles.lede}>{content.lede}</p>
        {content.paragraphs.map((text, i) => (
          <Copy key={i} text={text} className={styles.prose} />
        ))}
        {children}
      </div>
    </article>
  );
}

export function SelectedWork({
  content,
  locale,
}: {
  content: HomeContent['work'];
  locale: Locale;
}) {
  return (
    <section className={styles.work} id="work" aria-labelledby="work-title">
      <div data-reveal suppressHydrationWarning>
        <SectionHeading id="work-title" kicker={content.kicker}>
          {content.heading}
        </SectionHeading>
      </div>

      <WorkArticle lead content={content.cli} icon={<TerminalIcon size={34} />}>
        <Terminal title="client-project">
          <TerminalLine>
            Pulling customizer content… <Value>18 files</Value>
          </TerminalLine>
          <TerminalLine>
            Backup tagged <Value>qa-preview-backup/2026-09-21T14-53</Value>
          </TerminalLine>
          <TerminalLine>
            Pushing local code… <Value>42 files</Value>, locales preserved
          </TerminalLine>
          <TerminalLine tone="accent" spaced>
            ⚠ Target theme role is LIVE. Push halted.
          </TerminalLine>
          <TerminalLine>
            Type the theme ID to confirm: <Caret />
          </TerminalLine>
        </Terminal>

        <ArrowLink href={localePath(locale, ROUTES.caseStudy)} className={styles.readMore}>
          {content.readCaseStudy}
        </ArrowLink>
      </WorkArticle>

      <WorkArticle content={content.data} icon={<GraphQLIcon size={34} />}>
        <IntegrationDiagram content={content.data.diagram} />
      </WorkArticle>

      <WorkArticle content={content.mvp} icon={<FigmaIcon size={34} />}>
        <SurfacesDiagram content={content.mvp.diagram} />
      </WorkArticle>

      <div className={styles.article} data-reveal suppressHydrationWarning>
        <div className={styles.rail}>
          <p className={styles.discipline}>{content.alsoLabel}</p>
        </div>

        <ul className={styles.also}>
          {content.also.map((item) => (
            <li className={styles.alsoItem} key={item.title}>
              <span className={styles.alsoRule} aria-hidden="true" />
              <h3 className={styles.alsoTitle}>{item.title}</h3>
              <p className={styles.alsoBody}>{renderRich(item.body)}</p>
              <p className={styles.alsoStack}>{item.stack}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
