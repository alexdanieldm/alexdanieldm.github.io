/** @fileoverview Link page copy, English. The page my Instagram bio points at. */

export const links = {
  eyebrow: 'Links',
  /* Its own sentence, not a lifted line. A description has to stand alone in a
     search result. */
  metaDescription:
    'Everywhere I am, on one page. Portfolio, email, and the two things I keep meaning to start.',

  bio: 'Barcelona. I build things for the web, train most days, and read a lot of manga.',

  /** Names the first list for a screen reader; the group has no visible heading. */
  listLabel: 'Where to find me',
  restLabel: 'Everything else',

  rows: {
    portfolio: 'Portfolio',
    email: 'Email',
    music: 'Music',
    writing: 'Writing',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    cv: 'CV',
    github: 'GitHub',
  },

  cvValue: 'Download PDF',

  /**
   * Neither of these exists yet. They are drawn as rows anyway, dashed and
   * tagged, so the page says where they will go instead of leaving a gap I
   * would then have to explain. Square brackets because they are placeholders
   * and should read as placeholders rather than as something I am hiding.
   *
   * Music sits in the four-across group, where the value has 90px between the
   * mark and its tag. Ten characters fit on one line there and eleven do not,
   * so this one is short by measurement rather than by taste.
   */
  pending: {
    musicValue: '[PLAYLIST]',
    musicTag: 'Idea',
    writingValue: '[A BLOG]',
    writingTag: 'Soon',
  },
};
