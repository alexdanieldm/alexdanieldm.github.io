import { Fragment } from 'react';

import { RailHeading } from '@/components/ui';
import type { HomeContent } from '@/content/locales';
import { Copy } from '@/content/rich';

import styles from './About.module.scss';

export function About({ content }: { content: HomeContent['about'] }) {
  return (
    <section
      className={styles.about}
      id="about"
      aria-labelledby="about-title"
      data-reveal
      suppressHydrationWarning
    >
      <RailHeading
        id="about-title"
        note={content.note.map((line, i) => (
          <Fragment key={line}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      >
        {content.heading}
      </RailHeading>

      <div className={styles.body}>
        {content.paragraphs.map((text, i) => (
          <Copy key={i} text={text} className={i === 0 ? styles.lede : undefined} />
        ))}
      </div>
    </section>
  );
}
