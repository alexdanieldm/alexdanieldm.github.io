import { ContactPage } from '@/components/pages/ContactPage';
import { contentFor } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { pageMetadata } from '@/content/seo';

const LOCALE = 'es' as const;
const { contact } = contentFor(LOCALE);

export const metadata = pageMetadata({
  locale: LOCALE,
  title: contact.eyebrow,
  description: contact.metaDescription,
  path: ROUTES.contact,
});

export default function Page() {
  return <ContactPage locale={LOCALE} />;
}
