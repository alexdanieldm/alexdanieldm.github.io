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

export const SOCIALS = {
  github: 'https://github.com/alexdanieldm',
  linkedin: 'https://www.linkedin.com/in/alexdanieldm/',
  email: 'mailto:alexdanieldm@gmail.com',
} as const;
