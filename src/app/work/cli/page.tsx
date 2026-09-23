import type { Metadata } from 'next';

import { Ground, ARTICLE_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import {
  ArrowLink,
  Card,
  Mark,
  RailHeading,
  Caret,
  Terminal,
  TerminalLine,
  Value,
} from '@/components/ui';

import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'A CLI the whole team ships through',
  description:
    'One command that makes a deploy safe and puts the same standards in every repository ' +
    'while it is at it. Node.js and TypeScript.',
  alternates: { canonical: '/work/cli' },
};

const FACTS = [
  { label: 'Role', value: 'Author and maintainer', note: 'my own initiative' },
  { label: 'Built with', value: 'Node.js, TypeScript', note: 'git internals, platform APIs' },
  { label: 'Used by', value: 'The engineering team', note: 'on every client project' },
  { label: 'Status', value: 'Actively maintained', note: 'versioned and documented' },
];

export default function CliCaseStudy() {
  return (
    <Ground washes={ARTICLE_WASHES}>
      <SiteHeader variant="solid" />

      <main id="main">
        <div className={styles.page}>
          <section className={styles.intro} aria-labelledby="case-title">
            <div className={styles.back}>
              <ArrowLink href="/#work" direction="back">
                Back to work
              </ArrowLink>
            </div>

            <p className={styles.eyebrow}>
              <span className={styles.dash} aria-hidden="true" />
              Developer tooling
            </p>

            <h1 className={styles.title} id="case-title">
              A CLI the whole team ships through
            </h1>

            <p className={styles.lede}>
              One command that makes a deploy safe, and puts the same standards in every repository
              while it is at it.
            </p>

            <dl className={styles.facts}>
              {FACTS.map(({ label, value, note }) => (
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
              Why it exists
            </RailHeading>

            <div className={styles.prose}>
              <p>Two problems, both worth solving once rather than every week.</p>

              <p>
                The first is that a project can have{' '}
                <Mark>two owners writing into one file tree</Mark>. Developers own the code, while
                someone else, a client or a QA reviewer, owns the configuration they edit through a
                live editor, and git only ever had a copy of one of those. Deploy a branch over the
                top and <Mark>the half you do not own is gone, silently</Mark>. Everyone knew the
                rule. It was written down. It still went wrong, because knowing a rule and
                remembering it at 6pm on a Friday are different things. So syncing needed a senior
                developer watching, which meant waiting for one.
              </p>

              <p>
                The second is consistency. Across a lot of client projects, conventions drift:
                different folder structures, different patterns, different AI rules,{' '}
                <Mark>different output depending on who picked the job up</Mark>. Code review
                catches that eventually, which is a slow and expensive place to catch it.
              </p>

              <p>
                I started building this on my own initiative to fix both, because they turned out to
                be the same problem:{' '}
                <Mark>
                  things the team is supposed to remember should be things the tool already does
                </Mark>
                .
              </p>
            </div>
          </section>

          <section className={styles.terminals} aria-label="The tool running">
            <Terminal title="the safe sync">
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

            <Terminal title="the standards">
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
              <TerminalLine tone="faint" spaced>
                One source of truth, shipped with
              </TerminalLine>
              <TerminalLine tone="faint">the tool instead of remembered.</TerminalLine>
            </Terminal>
          </section>

          <section
            className={`${styles.split} ${styles.guarantees}`}
            aria-labelledby="guarantees-title"
          >
            <RailHeading
              id="guarantees-title"
              size="medium"
              note="Two promises about safety, two about consistency. Each one is something nobody has to hold in their head any more."
            >
              What it guarantees
            </RailHeading>

            <ul className={styles.guaranteeGrid}>
              <Card title="Nothing overwrites what it does not own">
                Whatever someone else edited moves one way, code moves the other. The tool will not
                perform the write that crosses that line, whatever you ask it for.
              </Card>

              <Card title="There is always a way back">
                The remote state is committed and tagged before anything is written, so the version
                that existed before a sync stays in git history and can be pushed back in one
                command.
              </Card>

              <Card title="Conventions arrive with the tool">
                Every client is its own thing, so no two builds are identical. What does not need
                reinventing each time is the shared groundwork: patterns, structure and scaffolding
                are installed rather than copied out of whichever repository someone last had open.
              </Card>

              <Card title="The AI rules travel with it">
                Our coding standards and agent definitions are distributed into every repository
                from <Mark>one source of truth</Mark>, so everyone&rsquo;s AI assistance follows the
                same conventions and the output stays consistent across the team.
              </Card>
            </ul>
          </section>
        </div>

        <section className={styles.closing} aria-labelledby="matters-title">
          <div className={styles.closingInner}>
            <RailHeading id="matters-title" size="medium">
              Why this matters on a team
            </RailHeading>

            <div className={styles.prose}>
              <p>
                Nobody asked me to build this. I noticed the same problem happening repeatedly, and
                that the cost of it was being paid by whoever was most senior and least available.
              </p>

              <p>
                That is the part worth knowing about me.{' '}
                <Mark>I will notice the thing the team keeps working around</Mark>, and I will go
                and fix it properly rather than getting better at avoiding it. It means a junior
                developer can deploy without supervision, a new project is consistent on day one,
                and the senior people get their afternoons back.
              </p>

              <p>
                It also means I am comfortable <Mark>owning something end to end</Mark>: designing
                it, building it, versioning it, documenting it, and maintaining it while other
                people depend on it every day.
              </p>
            </div>
          </div>

          <div className={styles.closingAction}>
            <ArrowLink href="/contact">Talk about this project</ArrowLink>
          </div>
        </section>
      </main>

      <SiteFooter variant="inner" />
    </Ground>
  );
}
