/**
 * @fileoverview The shelf: what is on it, in what order, and which of it is
 * written up. The words around it live in `en/shelf.ts` and `es/shelf.ts`;
 * nothing here needs translating, because it is titles, names and years.
 *
 * An item's tier is never stored. It follows from what exists. An item with a
 * take is a highlight, a highlight marked `featured` leads its section, and
 * everything else sits on the wall. Writing a take is what promotes something,
 * so publishing one never means touching a layout.
 *
 * Titles stay in the form they were released under, in both languages. It is
 * the name on the poster beside them, and the one you would search for.
 */

export const SHELF_SECTIONS = ['anime', 'manga', 'games', 'movies', 'television'] as const;
export type ShelfSectionKey = (typeof SHELF_SECTIONS)[number];

export type ShelfItem = {
  /** The id, the poster's file stem, and the write-up's path segment. */
  slug: string;
  title: string;
  /** Who made it and when: names and a year, the same in every language. */
  credit: string;
  /** Box art and manga covers are described as covers, the rest as posters. */
  art?: 'cover';
  /** What its section leads with, once it has a take to lead with. */
  featured?: true;
  /**
   * Set once its write-up is published. Without it the card has no button and
   * is not a link at all: no pointer cursor, nowhere to go, but the same hover.
   */
  writtenUp?: true;
};

export const SHELF: Record<ShelfSectionKey, ShelfItem[]> = {
  anime: [
    /* Day one is this card and nothing else written up. The article itself is
       still being written, so /shelf/gurren-lagann/ does not exist yet and its
       button leads nowhere until it does: ship the two together. */
    {
      slug: 'gurren-lagann',
      title: 'Gurren Lagann',
      credit: 'Hiroyuki Imaishi, Gainax · 2007',
      featured: true,
      writtenUp: true,
    },
    { slug: 'haikyu', title: 'Haikyu!!', credit: 'Production I.G · 2014' },
    { slug: 'my-hero-academia', title: 'My Hero Academia', credit: 'Bones · 2016' },
    { slug: 'a-silent-voice', title: 'A Silent Voice', credit: 'Kyoto Animation · 2016' },
    { slug: 'banana-fish', title: 'Banana Fish', credit: 'MAPPA · 2018' },
    { slug: 'code-geass', title: 'Code Geass', credit: 'Sunrise · 2006' },
    { slug: 'fate-zero', title: 'Fate/Zero', credit: 'ufotable · 2011' },
    {
      slug: 'in-this-corner-of-the-world',
      title: 'In This Corner of the World',
      credit: 'MAPPA · 2016',
    },
    { slug: 'parasyte', title: 'Parasyte', credit: 'Madhouse · 2014' },
    { slug: 'redline', title: 'Redline', credit: 'Madhouse · 2009' },
  ],
  manga: [
    {
      slug: 'frieren',
      title: 'Frieren',
      credit: 'Kanehito Yamada and Tsukasa Abe · 2020',
      art: 'cover',
      featured: true,
    },
    { slug: 'berserk', title: 'Berserk', credit: 'Kentaro Miura · 1989', art: 'cover' },
    { slug: 'the-boxer', title: 'The Boxer', credit: 'Jung Ji-Hoon · 2019', art: 'cover' },
    {
      slug: 'the-greatest-estate-developer',
      title: 'The Greatest Estate Developer',
      credit: 'Lee Hyun-min and Kim Hyun-soo · 2021',
      art: 'cover',
    },
    { slug: 'vagabond', title: 'Vagabond', credit: 'Takehiko Inoue · 1998', art: 'cover' },
    {
      slug: 'on-the-way-to-meet-mom',
      title: 'On the Way to Meet Mom',
      credit: 'GOMYANG · 2025',
      art: 'cover',
    },
  ],
  games: [
    {
      slug: 'what-remains-of-edith-finch',
      title: 'What Remains of Edith Finch',
      credit: 'Giant Sparrow · 2017',
      art: 'cover',
      featured: true,
    },
    { slug: 'god-of-war', title: 'God of War', credit: 'Santa Monica Studio · 2018', art: 'cover' },
    { slug: 'the-last-of-us', title: 'The Last of Us', credit: 'Naughty Dog · 2013', art: 'cover' },
    {
      slug: 'marvels-spider-man',
      title: "Marvel's Spider-Man",
      credit: 'Insomniac Games · 2018',
      art: 'cover',
    },
    { slug: 'hollow-knight', title: 'Hollow Knight', credit: 'Team Cherry · 2017', art: 'cover' },
    {
      slug: 'it-takes-two',
      title: 'It Takes Two',
      credit: 'Hazelight Studios · 2021',
      art: 'cover',
    },
  ],
  movies: [
    { slug: 'the-gentlemen', title: 'The Gentlemen', credit: 'Guy Ritchie · 2019' },
    { slug: 'about-time', title: 'About Time', credit: 'Richard Curtis · 2013' },
    { slug: 'parasite', title: 'Parasite', credit: 'Bong Joon-ho · 2019' },
    { slug: 'the-nice-guys', title: 'The Nice Guys', credit: 'Shane Black · 2016' },
    { slug: 'superman', title: 'Superman', credit: 'James Gunn · 2025' },
    { slug: 'nimona', title: 'Nimona', credit: 'Nick Bruno and Troy Quane · 2023' },
  ],
  television: [
    { slug: 'ted-lasso', title: 'Ted Lasso', credit: 'Jason Sudeikis and Bill Lawrence · 2020' },
    { slug: 'bojack-horseman', title: 'BoJack Horseman', credit: 'Raphael Bob-Waksberg · 2014' },
    {
      slug: 'brooklyn-nine-nine',
      title: 'Brooklyn Nine-Nine',
      credit: 'Dan Goor and Michael Schur · 2013',
    },
    {
      slug: 'the-midnight-gospel',
      title: 'The Midnight Gospel',
      credit: 'Pendleton Ward and Duncan Trussell · 2020',
    },
    { slug: 'invincible', title: 'Invincible', credit: 'Robert Kirkman · 2021' },
    {
      slug: 'love-death-robots',
      title: 'Love, Death & Robots',
      credit: 'Tim Miller and David Fincher · 2019',
    },
  ],
};

/**
 * The last time the shelf changed, as an ISO date so it sorts and parses. It
 * renders as DD.MM.YYYY in both languages, which is how both of them read it
 * in Spain.
 */
export const SHELF_UPDATED = '2026-09-29';

/**
 * The poster widths on disk. 480 is the one a retina laptop actually wants: a
 * wall card is 204px, so 408 device pixels, which used to round up to the 720
 * file at twice the bytes. 720 still covers a phone at three times density.
 */
export const POSTER_WIDTHS = [360, 480, 720] as const;

export function posterSrc(slug: string, width: (typeof POSTER_WIDTHS)[number]): string {
  return `/shelf/${slug}-${width}.webp`;
}
