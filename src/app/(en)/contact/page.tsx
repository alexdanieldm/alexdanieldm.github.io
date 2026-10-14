import { ContactPage } from '@/components/pages/ContactPage';
import { contentFor } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { CONTACT_CARD, pageMetadata } from '@/content/seo';

const LOCALE = 'en' as const;
const { contact } = contentFor(LOCALE);

export const metadata = pageMetadata({
  locale: LOCALE,
  title: contact.eyebrow,
  description: contact.metaDescription,
  path: ROUTES.contact,
  image: CONTACT_CARD[LOCALE],
});

export default function Page() {
  return <ContactPage locale={LOCALE} />;
}
