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
const STACK = [
  { label: 'TypeScript', Icon: TypeScriptIcon, size: 44 },
  { label: 'React', Icon: ReactIcon, size: 46 },
  { label: 'Next.js', Icon: NextJsIcon, size: 44 },
  { label: 'JavaScript', Icon: JavaScriptIcon, size: 44 },
  { label: 'Node.js', Icon: NodeIcon, size: 48 },
  { label: 'GraphQL', Icon: GraphQLIcon, size: 46 },
  { label: 'Shopify', Icon: ShopifyIcon, size: 44 },
  { label: 'Liquid', Icon: LiquidIcon, size: 46 },
  { label: 'SCSS', Icon: SassIcon, size: 46 },
  { label: 'AWS', Icon: AwsIcon, size: 46 },
  { label: 'Figma', Icon: FigmaIcon, size: 42 },
  { label: 'Git & CI/CD', Icon: GitIcon, size: 46 },
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
