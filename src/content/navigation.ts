/**
 * @fileoverview Site navigation and the links that are the same in every
 * language.
 *
 * Every in-page target is written through `localePath`, so a Spanish page
 * links to `/es/#about` and an English one to `/#about`. A bare hash would
 * only resolve from the page that owns the section; the rooted form works from
 * the case study and the contact page too, and the router still treats it as a
 * scroll when you are already there.
 */

import { localePath, type CommonContent, type Locale, type ShelfContent } from './locales';
import { SHELF_SECTIONS } from './shelf';

export type NavItem = {
  href: string;
  label: string;
};

export function navItems(locale: Locale, common: CommonContent): NavItem[] {
  const at = (path: string) => localePath(locale, path);
  return [
    { href: at('/#about'), label: common.nav.about },
    { href: at('/#work'), label: common.nav.work },
    { href: at('/#tech'), label: common.nav.tech },
    { href: at('/#approach'), label: common.nav.approach },
    { href: at('/contact/'), label: common.nav.contact },
    /* The one door into the shelf, the way the shelf's nav has one door out. */
    { href: at(ROUTES.shelf), label: common.nav.shelf },
  ];
}

/**
 * The shelf's own nav: its five sections, and nothing that leads away.
 *
 * The portfolio's nav carries a door into the shelf, and the shelf carries no
 * door back. That asymmetry is the point: the portfolio is where people get
 * sent into the write-ups, and once they are reading, the page should keep
 * them there rather than offer them a way out to my work. The way home is
 * still there for anyone who wants it, at the top of the page and in the
 * footer, just not in the nav.
 */
export function shelfNavItems(locale: Locale, shelf: ShelfContent): NavItem[] {
  const at = (path: string) => localePath(locale, path);
  return SHELF_SECTIONS.map((key) => ({
    href: at(`${ROUTES.shelf}#${key}`),
    label: shelf.sections[key].name,
  }));
}

/** Routes, in one place, so a page never spells a path out. */
export const ROUTES = {
  home: '/',
  contact: '/contact/',
  caseStudy: '/work/cli/',
  /* Not in navItems on purpose. It is what a social bio points at, not a
     destination anyone should reach from the site's own nav. */
  links: '/links/',
  shelf: '/shelf/',
} as const;

export const SOCIALS = {
  github: 'https://github.com/alexdanieldm',
  linkedin: 'https://www.linkedin.com/in/alexdanieldm/',
  email: 'mailto:alexdanieldm@gmail.com',
  /* Only the link page uses this one, which is the page Instagram itself
     points at. The rest of the site has no reason to link out to it. */
  instagram: 'https://www.instagram.com/alexdanieldm/',
} as const;

/**
 * The CV download.
 *
 * `filename` is what the browser writes to disk, via the anchor's `download`
 * attribute, rather than the path's own basename. A recruiter ends up with
 * twenty of these in one folder, and "cv.pdf" is the one they will never find
 * again. Deliberately unaccented: a plain-ASCII name survives every download
 * manager, mail client and filesystem it is about to pass through.
 */
export const CV = {
  href: '/cv.pdf',
  filename: 'Alex Duran - Full Stack Engineer - CV.pdf',
} as const;
