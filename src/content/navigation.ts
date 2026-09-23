/**
 * @fileoverview Site navigation, in one place because three components render
 * it: the desktop header, the mobile menu, and the footer.
 *
 * Every in-page target is written as `/#id` rather than `#id`. A bare hash only
 * works from the page that owns the section; the rooted form resolves from the
 * case study and the contact page too, and the router still treats it as a
 * scroll rather than a reload when you are already home.
 */

export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/#about', label: 'About' },
  { href: '/#work', label: 'Work' },
  { href: '/#tech', label: 'Tech' },
  { href: '/#approach', label: 'Approach' },
  { href: '/contact', label: 'Contact' },
];

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

export const SOCIALS = {
  github: 'https://github.com/alexdanieldm',
  linkedin: 'https://www.linkedin.com/in/alexdanieldm/',
  email: 'mailto:alexdanieldm@gmail.com',
} as const;
