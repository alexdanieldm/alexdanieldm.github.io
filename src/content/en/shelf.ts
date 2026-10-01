/** @fileoverview The shelf's copy, English. The items themselves are in `../shelf.ts`. */

export const shelf = {
  title: 'Things I keep going back to',
  metaDescription:
    'The manga, anime, games, films and shows I love most, and what each of them taught me.',

  /* The way out to the portfolio, in the footer. It does not say home,
     because the shelf is one, and it is worded so that leaving sounds like
     the less fun option. */
  back: 'Back to the boring stuff',
  /* The way back from a page below the shelf. Only the shelf's own footer
     leads out to the portfolio; from anywhere under it, back is the shelf. */
  backToShelf: 'Back to the shelf',
  lede:
    'Nothing on this page is work. These are the manga, anime, games, films and shows I love ' +
    'most, the ones I have read, played or watched enough times to know by heart, and ' +
    '[[what each of them taught me]]. I would rather tell you why I love something than just ' +
    'hand you a list.',
  /* The phone keeps the first two sentences. The third says the same thing
     again, and on a 390px screen it costs the first poster its place above the
     fold. */
  ledeShort:
    'Nothing on this page is work. These are the manga, anime, games, films and shows I love ' +
    'most, and [[what each of them taught me]].',

  summary: {
    contentsLabel: 'What is in it',
    onePage: 'one page, for now',
    updatedLabel: 'Last updated',
  },

  /**
   * The count on desktop is a sentence, built from the shelf rather than typed,
   * so adding something never leaves it out of date. `{n}` is the number in
   * words; past twenty it falls back to digits, which is further than the shelf
   * is likely to get in any one section.
   */
  counts: {
    words: [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
      'twenty',
    ],
    units: {
      anime: { one: 'one anime', other: '{n} anime' },
      manga: { one: 'one manga', other: '{n} manga' },
      games: { one: 'one game', other: '{n} games' },
      movies: { one: 'one movie', other: '{n} movies' },
      television: { one: 'one show', other: '{n} shows' },
    },
  },

  /**
   * `name` is the heading and the nav label; `short` is the phone's row of
   * counts, where five of them share 342px. Each intro is held to two lines at
   * both widths, which is what keeps a section's header shorter than its
   * heading and pays for the space above it.
   */
  sections: {
    anime: {
      name: 'Anime',
      short: 'Anime',
      intro:
        'Where it started for me. I love all of these, and one of them more than is reasonable.',
    },
    manga: {
      name: 'Manga',
      short: 'Manga',
      intro: 'I read a lot of manga. These are the ones I hand to people who say they do not.',
    },
    games: {
      name: 'Video games',
      short: 'Games',
      intro:
        'Games I finished and still think about, and a small one I wish more people had played.',
    },
    movies: {
      name: 'Movies',
      short: 'Movies',
      intro: 'Films I never get tired of. Ask me to watch one with you and I will say yes.',
    },
    television: {
      name: 'Television',
      short: 'Shows',
      intro: 'Shows I have stayed with all the way, and would happily start again.',
    },
  },

  /** Only an item that is featured and has a take ever shows one of these. */
  eyebrows: {
    'gurren-lagann': 'The one I will not shut up about',
    frieren: 'The one I hand people first',
    'what-remains-of-edith-finch': 'The one I keep recommending',
  },

  /* A draft in the right voice, standing in until the real one is written.
     Having a take is what lifts an item off the wall, so on day one this is the
     only one there is. */
  takes: {
    'gurren-lagann':
      'It treats getting stronger as a promise rather than a cost, then keeps raising the ' +
      'promise until the scale stops making any sense at all, and it works because [[the show ' +
      'never once treats its own sincerity as a joke]]. It is where I learned that being this ' +
      'earnest, this loudly, takes more nerve than irony does, and I have loved it for that ' +
      'ever since.',
  },

  /** A word of context a couple of credits carry after the year. */
  notes: {
    berserk: 'unfinished',
    'the-boxer': 'webtoon, but it lives here',
  },

  wall: {
    label: 'Before I forget',
    /* Only shown while nothing on the wall has a write-up. Above cards that
       each carry a button, it would be contradicting them. */
    unwritten: 'no write up on these yet',
  },

  readWriteUp: 'Read the write up',
  art: { poster: 'Poster for {title}', cover: 'Cover art for {title}' },

  /**
   * The page around a write-up. The piece itself keeps the language it was
   * written in; these are in the reader's.
   */
  writeUp: {
    /* Above the rail's list of sections. */
    contents: 'Contents',
    /* The rail's rows. Only the label is translated: a value is a name or a
       year, the same in both languages. */
    facts: {
      studio: 'Studio',
      director: 'Director',
      year: 'Year',
    },
    /* After the piece, more from its section. The laptop has room to say
       where; the phone keeps the short title, and a button in place of the
       link. */
    more: {
      titles: {
        anime: { long: 'More anime on the shelf', short: 'More anime' },
        manga: { long: 'More manga on the shelf', short: 'More manga' },
        games: { long: 'More games on the shelf', short: 'More games' },
        movies: { long: 'More movies on the shelf', short: 'More movies' },
        television: { long: 'More shows on the shelf', short: 'More shows' },
      },
      all: 'All of it',
      allShelf: 'All of the shelf',
    },
    /* The end of every piece, word for word as the shelf contact canvas
       settled it: one line, and an email that already says which piece it is
       about, so I know before I open it. */
    coda: {
      label: 'Write to me',
      line: 'If it stayed with you too, or it made you think of something I should try, tell me.',
      link: 'Write to me about {title}',
      subject: 'About {title}',
    },
  },

  closing: {
    title: 'Why this page exists',
    paragraphs: [
      'The rest of this site is about how I work. This is the other half, and it is usually ' +
        'the half that tells you whether you would want to sit next to the person.',
      /* "The ones I have written up", not "each card": true on the first day,
         when one card of thirty four opens anything, and still true once they
         all do. */
      'Everything here is something I love and wanted to share. The ones I have written up ' +
        'open into a longer piece about [[what it gave me and why it stayed]].',
      'I add to it slowly, one piece at a time, so it is never quite finished.',
    ],
    cta: 'Tell me what I should try next',
  },

  /**
   * The shelf's own page for writing to me, which the closing leads to. It is
   * the personal half's contact page, so it offers email and nothing else: no
   * LinkedIn, no GitHub, no CV.
   */
  contact: {
    title: 'Your turn',
    /* What the tab and a search result say. The heading can be playful because
       the page around it explains it; a tab on its own cannot. */
    metaTitle: 'Write to me',
    metaDescription:
      'Write to me about the shelf: something I should try next, what a write up made you ' +
      'think of, or what you keep going back to.',
    /* Self-contained on purpose. "These things" assumed the reader already
       knew everything on the shelf; this only assumes they love something. */
    lede: 'I like hearing what other people love, and why.',
    promptsIntro: 'A few of the emails I enjoy most:',
    /* Things I enjoy getting, not questions to answer: as questions they read
       like a form to fill in. */
    prompts: [
      'Something I should try next, and what it gave you',
      'What a write up made you think of',
      'Something here you love for a different reason than I do',
      'Whatever you keep rewatching, rereading or replaying',
    ],
    closing: 'Email is the way to reach me, and [[I read every one]].',
    /* Already in the subject line, and people can change it. It tells me which
       half of the site an email came from before I open it. */
    subject: 'About the shelf',
  },

  disclaimer:
    'Cover and poster artwork on this page belongs to its creators and publishers. It is ' +
    'reproduced here to point you at the work, and is not presented as mine. Sources: ' +
    'TMDB, Steam, Amazon, MangaDex, Kyobo and WEBTOON.',

  /* Where the portfolio's footer lists what it is built with. The shelf is
     made of the thing its title is about. */
  colophon: 'Made of rewatches, rereads and replays',
};
