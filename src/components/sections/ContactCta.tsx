import { ArrowUpRightIcon } from '@/components/icons';
import { Button } from '@/components/ui';
import { localePath, type HomeContent, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';

import styles from './ContactCta.module.scss';

/** The closing block. One heading, one sentence, one thing to do. */
export function ContactCta({ content, locale }: { content: HomeContent['cta']; locale: Locale }) {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div>
        <h2 className={styles.title} id="cta-title">
          {content.title}
        </h2>
        <p className={styles.lede}>{content.lede}</p>
      </div>

      <Button
        href={localePath(locale, ROUTES.contact)}
        size="large"
        className={styles.button}
        iconAfter={<ArrowUpRightIcon size={17} />}
      >
        {content.button}
      </Button>
    </section>
  );
}
