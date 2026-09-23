import type { ReactNode } from 'react';

import { FigmaIcon, GraphQLIcon, TerminalIcon } from '@/components/icons';
import {
  ArrowLink,
  Caret,
  Mark,
  SectionHeading,
  Terminal,
  TerminalLine,
  Value,
} from '@/components/ui';

import { IntegrationDiagram, SurfacesDiagram } from './WorkSchematics';

import styles from './SelectedWork.module.scss';

type WorkArticleProps = {
  index: string;
  discipline: string;
  /** One line per row, so the rail reads as a list without being marked up as one. */
  stack: string[];
  icon: ReactNode;
  title: string;
  lede: string;
  children: ReactNode;
  /** The first article gets the coral rule; the rest get a hairline. */
  lead?: boolean;
};

function WorkArticle({
  index,
  discipline,
  stack,
  icon,
  title,
  lede,
  children,
  lead = false,
}: WorkArticleProps) {
  return (
    <article className={styles.article} data-lead={lead || undefined}>
      <div className={styles.rail}>
        {icon}
        <p className={styles.index}>{index}</p>
        <p className={styles.discipline}>{discipline}</p>
        <p className={styles.stack}>
          {stack.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.lede}>{lede}</p>
        {children}
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section className={styles.work} id="work" aria-labelledby="work-title">
      <SectionHeading id="work-title" kicker="Tooling, data, interface">
        Selected work
      </SectionHeading>

      <WorkArticle
        lead
        index="01"
        discipline="Developer tooling"
        stack={['Node.js, TypeScript', 'Git internals', 'Release workflows']}
        icon={<TerminalIcon size={34} />}
        title="A CLI the whole team ships through"
        lede="One command, so nobody has to wait on the tech lead to deploy safely."
      >
        <p className={styles.prose}>
          Syncing a theme used to need someone senior watching, because a careless push destroys
          work someone else owns, a client or QA editing live, that git never had a copy of. I
          started this on my own initiative to take that bottleneck out. It keeps the two sides of a
          project separate, tags a backup before it writes anything, and{' '}
          <Mark>stops dead at a live target</Mark>.
        </p>

        <p className={styles.prose}>
          The other half is consistency. The same tool installs our coding conventions, project
          scaffolding and AI rules into every repository from one source of truth, so{' '}
          <Mark>the output looks the same whoever built it</Mark>. Standards that ship with the tool
          do not drift the way a wiki page does, and they arrive with every update instead of being
          remembered.
        </p>

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

        <ArrowLink href="/work/cli" className={styles.readMore}>
          Read the case study
        </ArrowLink>
      </WorkArticle>

      <WorkArticle
        index="02"
        discipline="APIs & data"
        stack={['GraphQL, REST APIs', 'Next.js, TypeScript']}
        icon={<GraphQLIcon size={34} />}
        title="Real data, from whatever platform holds it"
        lede="The frontend decides how things look. The API decides what is true."
      >
        <p className={styles.prose}>
          A lot of my work is joining a custom interface to a system that already owns the data. I
          build the layer in between, so the platform keeps doing what it is genuinely good at and{' '}
          <Mark>the interface owes it nothing else</Mark>. Swap the backend and the interface barely
          notices.
        </p>

        <IntegrationDiagram />
      </WorkArticle>

      <WorkArticle
        index="03"
        discipline="Product frontend"
        stack={['React, TypeScript', 'React Native', 'Figma']}
        icon={<FigmaIcon size={34} />}
        title="From a design file to a full MVP"
        lede="Every screen, every state, web and mobile."
      >
        <p className={styles.prose}>
          I built the frontend of a product platform from Figma designs in React and TypeScript:
          responsive desktop and mobile interfaces, authentication, multi step forms, map
          integrations and real time chat, plus a React Native companion app alongside it.
        </p>

        <p className={styles.prose}>
          I was building the interface well before the backend work started, so{' '}
          <Mark>most of the time I defined the data contract</Mark>. For the chat I specified
          exactly what I needed, which properties, and how it had to be shaped, then worked with the
          backend developer until the API matched. Deciding what the frontend actually needs, and
          saying so early, is most of what makes the rest of the build calm.
        </p>

        <SurfacesDiagram />
      </WorkArticle>

      <div className={styles.article}>
        <div className={styles.rail}>
          <p className={styles.discipline}>Also</p>
        </div>

        <ul className={styles.also}>
          <li className={styles.alsoItem}>
            <span className={styles.alsoRule} aria-hidden="true" />
            <h3 className={styles.alsoTitle}>Storefronts, zero to live</h3>
            <p className={styles.alsoBody}>
              Complete e-commerce builds taken from nothing to a live store, and the template they
              start from: modular, reusable, and isolated enough that a section can move to another
              project without dragging the rest along.
            </p>
            <p className={styles.alsoStack}>Liquid, TypeScript, SCSS</p>
          </li>

          <li className={styles.alsoItem}>
            <span className={styles.alsoRule} aria-hidden="true" />
            <h3 className={styles.alsoTitle}>Crypto</h3>
            <p className={styles.alsoBody}>
              A cross platform desktop app that encrypts and decrypts files of any size, using{' '}
              <Mark>a hybrid public and private key system I designed</Mark>. Built end to end,
              including the interface.
            </p>
            <p className={styles.alsoStack}>Electron, Python, Node.js</p>
          </li>

          <li className={styles.alsoItem}>
            <span className={styles.alsoRule} aria-hidden="true" />
            <h3 className={styles.alsoTitle}>Serverless monetization</h3>
            <p className={styles.alsoBody}>
              An AWS Lambda function that unlocked yearly membership purchases, adding a new revenue
              path without disturbing the architecture around it.
            </p>
            <p className={styles.alsoStack}>AWS Lambda, Node.js</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
