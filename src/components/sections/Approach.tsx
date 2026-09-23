import type { CSSProperties } from 'react';

import { Card } from '@/components/ui';
import type { HomeContent } from '@/content/locales';
import { renderRich } from '@/content/rich';

import styles from './Approach.module.scss';

export function Approach({ content }: { content: HomeContent['approach'] }) {
  return (
    <section className={styles.approach} id="approach" aria-labelledby="approach-title">
      <div className={styles.header} data-reveal suppressHydrationWarning>
        <div>
          <h2 className={styles.title} id="approach-title">
            {content.heading}
          </h2>
          <p className={styles.lede}>{content.lede}</p>
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
        {content.cards.map((card) => (
          <Card key={card.index} index={card.index} title={card.title}>
            {renderRich(card.body)}
          </Card>
        ))}
      </ul>
    </section>
  );
}
