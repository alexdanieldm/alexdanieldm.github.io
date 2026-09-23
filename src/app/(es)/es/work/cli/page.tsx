import { CaseStudyPage } from '@/components/pages/CaseStudyPage';
import { contentFor } from '@/content/locales';
import { ROUTES } from '@/content/navigation';
import { pageMetadata } from '@/content/seo';

const LOCALE = 'es' as const;
const { caseStudy } = contentFor(LOCALE);

export const metadata = pageMetadata({
  locale: LOCALE,
  title: caseStudy.title,
  description: caseStudy.metaDescription,
  path: ROUTES.caseStudy,
});

export default function Page() {
  return <CaseStudyPage locale={LOCALE} />;
}
