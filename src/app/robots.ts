import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/content/seo';

/* Written once, at build time, to `robots.txt`. */
export const dynamic = 'force-static';

/** Everything may be crawled, and the sitemap says where it all is. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
