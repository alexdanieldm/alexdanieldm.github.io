/**
 * @fileoverview Why the shelf exists, and an invitation back.
 *
 * The invitation asks what to try next rather than inviting an argument: this
 * is a page for sharing things, and the way back to me from it should be too.
 * It leads to the shelf's own page for writing to me, not the portfolio's
 * contact page, so answering it never takes anyone out of the shelf.
 */

import { ArrowUpRightIcon } from '@/components/icons';
import { ArrowLink, Button } from '@/components/ui';
import { contentFor, localePath, type Locale } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { Copy } from '@/content/rich';

import styles from './ShelfClosing.module.scss';

export function ShelfClosing({ locale }: { locale: Locale }) {
  const { closing } = contentFor(locale).shelf;
  const contact = localePath(locale, ROUTES.shelfContact);

  return (
    <section
      className={styles.closing}
      aria-labelledby="shelf-closing-title"
      data-reveal
      suppressHydrationWarning
    >
      <div className={styles.inner}>
        <h2 className={styles.title} id="shelf-closing-title">
          {closing.title}
        </h2>
        <span className={styles.rule} aria-hidden="true" />

        {closing.paragraphs.map((paragraph) => (
          <Copy key={paragraph} text={paragraph} className={styles.paragraph} />
        ))}

        {/* A quiet link at the end of a page you have been reading; on a phone,
            seventeen screens down, a button you can hit with a thumb. Only one
            is ever displayed, so only one is ever announced. */}
        <div className={styles.link}>
          <ArrowLink href={contact}>{closing.cta}</ArrowLink>
        </div>
        <div className={styles.button}>
          <Button href={contact} block iconAfter={<ArrowUpRightIcon size={17} />}>
            {closing.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
