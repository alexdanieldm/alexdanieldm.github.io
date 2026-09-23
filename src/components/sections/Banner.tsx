import type { ReactNode } from 'react';

import { StripScene, TallScene, WideScene } from './BannerScene';

import styles from './Banner.module.scss';

type BannerProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  actions?: ReactNode;
  /** `full` fills the viewport on a phone; `strip` is the shorter inner-page band. */
  variant?: 'full' | 'strip';
  id?: string;
};

export function Banner({ eyebrow, title, lede, actions, variant = 'full', id }: BannerProps) {
  return (
    <section className={styles.banner} data-variant={variant} id={id}>
      {variant === 'full' ? (
        <>
          <WideScene className={styles.sceneWide} />
          <TallScene className={styles.sceneTall} />
        </>
      ) : (
        <StripScene className={styles.sceneWide} />
      )}

      {/* Fades the artwork into the page colour. Without it the bottom edge of
          the scene is a hard line across the page. */}
      <div className={styles.fade} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            {variant === 'full' && <span className={styles.dash} aria-hidden="true" />}
            {eyebrow}
          </p>

          <h1 className={styles.title}>{title}</h1>

          {lede && <p className={styles.lede}>{lede}</p>}

          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>
    </section>
  );
}
