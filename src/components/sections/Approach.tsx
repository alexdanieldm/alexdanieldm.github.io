import type { CSSProperties } from 'react';

import { Card, Mark } from '@/components/ui';

import styles from './Approach.module.scss';

export function Approach() {
  return (
    <section className={styles.approach} id="approach" aria-labelledby="approach-title">
      <div className={styles.header} data-reveal suppressHydrationWarning>
        <div>
          <h2 className={styles.title} id="approach-title">
            How I work
          </h2>
          <p className={styles.lede}>
            Three things I believe, none of which are about a framework.
          </p>
        </div>

        {/* 作: to make, to build. Decorative here; the wordmark already carries it. */}
        <span className={styles.kanji} aria-hidden="true">
          作
        </span>
      </div>

      <ul
        className={styles.cards}
        data-reveal
        suppressHydrationWarning
        style={{ '--reveal-delay': '0.1s' } as CSSProperties}
      >
        <Card index="01" title="Write it for whoever comes next">
          We over engineer things, and we forget that the person opening the file will not be us. I
          aim for code that is clean and modular enough that a piece can be lifted into another
          project without breaking, because good code does not fall apart once you take it out of
          its context. <Mark>Finishing something genuinely maintainable</Mark> is the part I am
          proudest of.
        </Card>

        <Card index="02" title="Design and build are one job">
          When you understand both sides properly, the design and the code{' '}
          <Mark>speak the same language and aim at the same thing</Mark>. I can read a Figma file,
          push back on it where it needs pushing back on, and build it without guessing what was
          meant. That is worth more than any handoff document.
        </Card>

        <Card index="03" title="Be transparent, and be around">
          Being clear about what I am doing, how it is going and where the team actually stands
          matters more than most technical decisions. And{' '}
          <Mark>being present while someone works through a problem</Mark> is worth more than we
          tend to give it credit for, as a developer and as a person.
        </Card>
      </ul>
    </section>
  );
}
