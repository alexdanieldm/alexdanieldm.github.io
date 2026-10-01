import type { Metadata } from 'next';

import { WriteUpPage, writeUpMetadata } from '@/components/pages/WriteUpPage';
import { writtenUpSlugs } from '@/content/write-ups';

const LOCALE = 'en' as const;

type Props = { params: Promise<{ slug: string }> };

/* The build makes a page for every piece and nothing else, and a slug nobody
   wrote is a 404 in development too, the way it will be on the site. A static
   route beside this one, /shelf/contact/, still wins. */
export const dynamicParams = false;

export function generateStaticParams() {
  return writtenUpSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return writeUpMetadata(LOCALE, (await params).slug);
}

export default async function Page({ params }: Props) {
  return <WriteUpPage locale={LOCALE} slug={(await params).slug} />;
}
