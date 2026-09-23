import { HomePage } from '@/components/pages/HomePage';
import { contentFor } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { pageMetadata, SITE_DESCRIPTION } from '@/content/seo';

const LOCALE = 'en' as const;

export const metadata = pageMetadata({
  locale: LOCALE,
  isHome: true,
  title: 'Home',
  description: SITE_DESCRIPTION[LOCALE],
  path: ROUTES.home,
});

export default function Page() {
  return <HomePage locale={LOCALE} />;
}
