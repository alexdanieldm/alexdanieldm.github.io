import { LinksPage } from '@/components/pages/LinksPage';
import { contentFor } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { pageMetadata } from '@/content/seo';

const LOCALE = 'en' as const;
const { links } = contentFor(LOCALE);

export const metadata = pageMetadata({
  locale: LOCALE,
  title: links.eyebrow,
  description: links.metaDescription,
  path: ROUTES.links,
});

export default function Page() {
  return <LinksPage locale={LOCALE} />;
}
