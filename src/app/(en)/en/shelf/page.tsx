import { ShelfPage } from '@/components/pages/ShelfPage';
import { shelfCard } from '@/content/cards';
import { contentFor } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { pageMetadata } from '@/content/seo';

const LOCALE = 'en' as const;
const { shelf } = contentFor(LOCALE);

export const metadata = pageMetadata({
  locale: LOCALE,
  title: shelf.title,
  description: shelf.metaDescription,
  path: ROUTES.shelf,
  image: shelfCard(LOCALE),
});

export default function Page() {
  return <ShelfPage locale={LOCALE} />;
}
