import { CloudDownloadIcon, CodeSlashIcon } from '@/components/icons';
import { Ground, HOME_WASHES } from '@/components/layout/Ground';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { About, Approach, Banner, ContactCta, SelectedWork, TechBand } from '@/components/sections';
import { Button } from '@/components/ui';
import { CV } from '@/content/navigation';

export default function HomePage() {
  return (
    <Ground washes={HOME_WASHES} washOffset="var(--banner-height)">
      <SiteHeader />

      <main id="main">
        <Banner
          id="top"
          eyebrow="Full Stack Engineer"
          title="I build web applications, from the first conversation to the last release."
          lede="Based in Barcelona, working across the whole process: scoping and planning, the interface, the code, the integrations, and seeing it through to release."
          actions={
            <>
              <Button href="#work" icon={<CodeSlashIcon size={17} />}>
                See the work
              </Button>
              <Button
                variant="ghost"
                href={CV.href}
                download={CV.filename}
                icon={<CloudDownloadIcon size={18} />}
              >
                Download CV
              </Button>
            </>
          }
        />

        <About />
        <SelectedWork />
        <TechBand />
        <Approach />
        <ContactCta />
      </main>

      <SiteFooter />
    </Ground>
  );
}
