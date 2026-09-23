import { CloudDownloadIcon, CodeSlashIcon } from '@/components/icons';
import { Ground, HOME_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { About, Approach, Banner, ContactCta, SelectedWork, TechBand } from '@/components/sections';
import { Button } from '@/components/ui';
import { contentFor, type Locale } from '@/content/locales';
import { CV, ROUTES } from '@/content/navigation';

export function HomePage({ locale }: { locale: Locale }) {
  const { home } = contentFor(locale);

  return (
    <Ground washes={HOME_WASHES} washOffset="var(--banner-height)">
      <SiteHeader locale={locale} path={ROUTES.home} />

      <main id="main">
        <Banner
          id="top"
          eyebrow={home.banner.eyebrow}
          title={home.banner.title}
          lede={home.banner.lede}
          actions={
            <>
              <Button href="#work" icon={<CodeSlashIcon size={17} />}>
                {home.banner.seeWork}
              </Button>
              <Button
                variant="ghost"
                href={CV.href}
                download={CV.filename}
                icon={<CloudDownloadIcon size={18} />}
              >
                {home.banner.downloadCv}
              </Button>
            </>
          }
        />

        <About content={home.about} />
        <SelectedWork content={home.work} locale={locale} />
        <TechBand content={home.tech} />
        <Approach content={home.approach} />
        <ContactCta content={home.cta} locale={locale} />
      </main>

      <SiteFooter locale={locale} path={ROUTES.home} />
    </Ground>
  );
}
