import { ShelfContactPage } from '@/components/pages/ShelfContactPage';
import { shelfCard } from '@/content/cards';
import { contentFor } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { pageMetadata } from '@/content/seo';

const LOCALE = 'en' as const;
const { contact } = contentFor(LOCALE).shelf;

export const metadata = pageMetadata({
  locale: LOCALE,
  title: contact.metaTitle,
  description: contact.metaDescription,
  path: ROUTES.shelfContact,
  image: shelfCard(LOCALE),
});

export default function Page() {
  return <ShelfContactPage locale={LOCALE} />;
}
