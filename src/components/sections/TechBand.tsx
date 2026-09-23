import {
  AwsIcon,
  FigmaIcon,
  GitIcon,
  GraphQLIcon,
  JavaScriptIcon,
  LiquidIcon,
  NextJsIcon,
  NodeIcon,
  ReactIcon,
  SassIcon,
  ShopifyIcon,
  TypeScriptIcon,
} from '@/components/icons';
import { SectionHeading, TechBadge } from '@/components/ui';

import styles from './TechBand.module.scss';

/**
 * Ordered by how much of my work actually runs through each, not by how well
 * known they are. The heading says the rest: these are tools, not an identity,
 * which is the whole reason the section exists rather than a stack badge in the
 * banner.
 */
/**
 * Sizes are measured, not chosen.
 *
 * One size for all twelve does not give twelve marks that look the same size,
 * because each one sits differently inside its own viewBox: at a 46px box the
 * drawn ink ranged from 29px to 46px across the row, and the padded ones read
 * as small. Each size below is 46 divided by that mark's measured ink ratio,
 * so every mark's longest side draws at the same 46px.
 *
 * Re-measure rather than nudge by eye if a mark is ever replaced: walk the
 * children of each svg, union their bounding rects, and compare the longest
 * side against its box.
 */
const STACK = [
  { label: 'TypeScript', Icon: TypeScriptIcon, size: 46 },
  { label: 'React', Icon: ReactIcon, size: 46 },
  { label: 'Next.js', Icon: NextJsIcon, size: 46 },
  { label: 'JavaScript', Icon: JavaScriptIcon, size: 53 },
  { label: 'Node.js', Icon: NodeIcon, size: 47 },
  { label: 'GraphQL', Icon: GraphQLIcon, size: 50 },
  { label: 'Shopify', Icon: ShopifyIcon, size: 46 },
  { label: 'Liquid', Icon: LiquidIcon, size: 48 },
  { label: 'SCSS', Icon: SassIcon, size: 46 },
  { label: 'AWS', Icon: AwsIcon, size: 48 },
  { label: 'Figma', Icon: FigmaIcon, size: 46 },
  { label: 'Git & CI/CD', Icon: GitIcon, size: 53 },
];

export function TechBand() {
  return (
    <section className={styles.band} id="tech" aria-labelledby="tech-title">
      <SectionHeading id="tech-title" kicker="Tools, not identity" tone="on-accent">
        What I build with
      </SectionHeading>

      <ul className={styles.grid}>
        {STACK.map(({ label, Icon, size }) => (
          <TechBadge key={label} label={label} icon={<Icon size={size} />} />
        ))}
      </ul>
    </section>
  );
}
