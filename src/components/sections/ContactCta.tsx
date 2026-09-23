import { ArrowUpRightIcon } from '@/components/icons';
import { Button } from '@/components/ui';

import styles from './ContactCta.module.scss';

/** The closing block. One heading, one sentence, one thing to do. */
export function ContactCta() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div>
        <h2 className={styles.title} id="cta-title">
          Let&rsquo;s talk about what you&rsquo;re building.
        </h2>
        <p className={styles.lede}>
          Happy to hear about a role, a project, or anything on this site you want to go deeper on.
        </p>
      </div>

      <Button href="/contact" size="large" className={styles.button}>
        Get in touch
        <ArrowUpRightIcon size={17} />
      </Button>
    </section>
  );
}
