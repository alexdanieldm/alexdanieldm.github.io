/**
 * @fileoverview The two diagrams in Selected work.
 *
 * Both are deliberately schematic. A screenshot of a client product would date,
 * would need permission, and would say less: what matters about the first is
 * the shape of the architecture, and what matters about the second is that
 * every surface got built, not what any one of them looked like.
 */

import type { HomeContent } from '@/content/locales';

import styles from './WorkSchematics.module.scss';

type DataDiagram = HomeContent['work']['data']['diagram'];
type MvpDiagram = HomeContent['work']['mvp']['diagram'];

/** One frontend, three protocols, three systems that own their own data. */
export function IntegrationDiagram({ content }: { content: DataDiagram }) {
  return (
    <figure className={`${styles.panel} glow`}>
      <figcaption className={styles.captionAccent}>{content.caption}</figcaption>

      <div className={styles.integration}>
        <div className={styles.client}>
          <p className={styles.clientName}>{content.clientName}</p>
          <p className={styles.clientStack}>{content.clientStack}</p>
        </div>

        <ul className={styles.sources}>
          {content.sources.map(({ protocol, system }) => (
            <li className={styles.source} key={protocol}>
              <span className={styles.protocol}>{protocol}</span>
              <span className={styles.wire} aria-hidden="true" />
              <span className={styles.system}>{system}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/** Three of the surfaces from the MVP, as shapes rather than screenshots. */
export function SurfacesDiagram({ content }: { content: MvpDiagram }) {
  const [map, chat, forms] = content.surfaces;

  return (
    <figure className={`${styles.panel} glow`}>
      <figcaption className={styles.caption}>{content.caption}</figcaption>

      <div className={styles.surfaces}>
        <div className={`${styles.surface} ${styles.surfaceWide} glow`}>
          <p className={styles.surfaceName}>{map}</p>
          <svg viewBox="0 0 220 98" width="100%" height="98" fill="none" aria-hidden="true">
            <path
              d="M0 24H220M0 52H220M0 80H220M40 0V98M100 0V98M160 0V98"
              stroke="rgba(234,242,246,0.10)"
              strokeWidth="1"
            />
            <path
              d="M22 80C58 80 62 46 96 46C132 46 138 20 194 20"
              style={{ stroke: 'var(--color-accent)' }}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="22" cy="80" r="5" style={{ fill: 'var(--color-accent)' }} />
            <circle
              cx="194"
              cy="20"
              r="5"
              fill="none"
              style={{ stroke: 'var(--color-accent)' }}
              strokeWidth="2.4"
            />
          </svg>
        </div>

        <div className={`${styles.surface} glow`}>
          <p className={styles.surfaceName}>{chat}</p>
          <span className={styles.bubble} style={{ width: '76%' }} />
          <span className={styles.bubble} style={{ width: '58%' }} />
          <span className={styles.bubbleOwn} style={{ width: '66%' }} />
          <span className={styles.bubble} style={{ width: '46%' }} />
        </div>

        <div className={`${styles.surface} glow`}>
          <p className={styles.surfaceName}>{forms}</p>
          <span className={styles.field} />
          <span className={styles.field} />
          <span className={styles.fieldActive} />
          <span className={styles.submit} />
        </div>
      </div>
    </figure>
  );
}
