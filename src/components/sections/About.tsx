import { Fragment } from 'react';

import { RailHeading } from '@/components/ui';
import type { HomeContent, Locale } from '@/content/locales';
import { renderProse } from '@/content/rich';

import styles from './About.module.scss';

export function About({ content, locale }: { content: HomeContent['about']; locale: Locale }) {
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
        {/* Prose rather than plain copy for the one link the paragraphs carry,
            into the shelf. */}
        {content.paragraphs.map((text, i) => (
          <p key={i} className={i === 0 ? styles.lede : undefined}>
            {renderProse(text, locale, 'portfolio')}
          </p>
        ))}
      </div>
    </section>
  );
}
