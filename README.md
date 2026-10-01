# alexdanieldm.github.io

My personal site. Next.js, TypeScript and SCSS Modules, exported as static
files and served from GitHub Pages.

It replaces a Gatsby 4 build that had stopped being worth maintaining. The two
things I kept from it are the ground colour and the body face; everything else
is new.

## Running it

```bash
npm install
npm run dev
```

| Script              | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Dev server on :3000                               |
| `npm run build`     | Static export into `out/`                         |
| `npm run preview`   | Serves the built `out/` so I can check the export |
| `npm run typecheck` | `tsc --noEmit`                                    |
| `npm run lint`      | ESLint                                            |
| `npm run format`    | Prettier                                          |

`npm run shelf:placeholders` regenerates the shelf's blurred placeholders. Run
it after adding or replacing a poster.

Node 20.9 or newer.

## How it is laid out

```
src/
├── app/                  routes; each page owns its own .module.scss
│   ├── page.tsx          home
│   ├── contact/
│   ├── links/            the page a social bio points at
│   ├── shelf/            things I love, and what each of them taught me
│   ├── work/cli/         case study
│   └── global-not-found.tsx   exported as 404.html
├── components/
│   ├── icons/            every mark, drawn in currentColor
│   ├── layout/           header, mobile menu, footer, the animated ground
│   ├── sections/         the blocks a page is assembled from
│   └── ui/               button, link, card, terminal, headings
├── content/              data that more than one component renders
├── fonts/                self-hosted woff2
└── styles/               tokens, breakpoints, mixins
```

Prose lives in the section that renders it rather than in a content file. The
copy on this site _is_ the design, and moving it one directory away to look
tidy only adds a lookup.

## Conventions

The same ones I work to everywhere else, so nothing here surprises me in a
year.

- **A token before a number, always.** Colour, spacing, type and motion all
  resolve to custom properties in `globals.scss`. A literal in a module needs a
  comment saying why no token fits.
- **Desktop-first, three breakpoints:** 990 / 769 / 450. The comps were drawn
  at 1440 and narrowed, so the media queries read the same direction.
- **BEM-ish inside a module**, block named after the component. State is
  expressed with `data-*` attributes, which is also where JS hooks go. Classes
  are for styling; renaming one must never break behaviour.
- **`:focus-visible` is never suppressed.** Warm ring, so it never lands on the
  accent and disappears.
- **Every animation is wrapped in `prefers-reduced-motion`.** No exceptions,
  and there is a `@mixin reduced-motion` so there is no excuse.
- **One mechanism, defined once.** `.mark`, `.text-link`, `.glow` and
  `.skip-link` are global because more than one component needs them. Nothing
  re-implements them locally.

### Tokens

| Token                | Value               | Contrast on base    |
| -------------------- | ------------------- | ------------------- |
| `--color-base`       | `#021926`           | the ground          |
| `--color-foreground` | `#eaf2f6`           | 15.9:1              |
| `--color-muted`      | `#94acba`           | 7.6:1               |
| `--color-faint`      | `#7e95a4`           | 5.75:1              |
| `--color-accent`     | `#f75155`           | 5.33:1              |
| `--color-surface`    | `rgb(5 31 45 /66%)` | raised, translucent |

Raised surfaces are translucent on purpose: the background washes have to pass
through them, or every band edge reads as a seam while you scroll.

### The one knowing exception

White on coral in the tech band measures 2.96:1, under AA. It is deliberate and
there is a comment on the rule saying so. The band is twelve product names and
two headings, each also carried by a recognisable mark, at bold or display
sizes. Do not "fix" it by dropping the text to the ground colour.

## Motion

Everything that moves does so for a reason, and nothing moves fast.

- The background washes drift on a 24 to 31 second loop, each on its own clock
  so the field breathes rather than sliding as one sheet. They are separate
  elements moved with `translate3d`, so the compositor handles them.
- The dot grid never moves. If it drifted with the light the page would read as
  sliding instead of as light moving behind a fixed surface.
- Banner copy rises in on load, staggered by 80ms. On load rather than on
  scroll: it is above the fold at every viewport, and a load animation cannot
  leave the page blank if a bundle never arrives.
- Sections do the same rise as they come into view: About, each Selected work
  article, How I work. Not the case study or contact, which are dense enough.
  It is an 870-byte inline script, not a component, because it has to run
  before first paint, and because hiding and revealing then live in the same
  place: if it never runs, nothing is ever hidden.
- It sweeps on scroll rather than using an IntersectionObserver. An observer
  only fires when intersection changes, so anything scrolled past between two
  frames never intersects and stays hidden for good.
- The header is fixed, hides on the way down past the banner and returns on any
  upward scroll. `:focus-within` cancels the hidden state so keyboard focus
  never lands off-screen.
- Vapour trails cross 32px over 16 seconds.
- The terminal cursor is still waiting for the theme ID.

## The link preview card

`public/og.png` is what WhatsApp, Slack and LinkedIn show when the link gets
pasted. It is the banner scene with my name and 作 over it, drawn by
rasterising the live `<svg>` from the page in a browser canvas rather than
authored separately, so it cannot drift away from the site it advertises.

It has to be a browser doing the drawing: the three faces are woff2 only, and
nothing here can rasterise woff2 outside one. To regenerate, open the site,
draw the scene plus type into a 1200x630 canvas, and re-encode the result with
`sharp().png({ effort: 10 })`: that took the canvas's 220KB default output
down to 33KB with no loss.

Every page builds its own card metadata through `pageMetadata()` in
`src/content/seo.ts`. That exists because Next shallow-merges metadata: a page
declaring its own `openGraph` replaces the parent's wholesale instead of
filling gaps, so without it every inner page advertised the home page's title
and URL.

## The link page

`/links/`, with `/es/links/` like every page of the portfolio. It is what an Instagram
or Twitter bio points at, so it carries no header and no footer of the site's
own: somebody arriving came from one link and wants another one, not a tour.
That leaves nowhere for the language switch, so it sits in the page's own
footer, and it is the only way across on a route nothing else links to.

The order is the design. Portfolio and the blog first, because those are the
two things worth showing, and the blog keeps second even though it does not
exist yet. Email and Instagram finish the top four, so everything up there
works. LinkedIn, the CV and GitHub sit under "Everything else", with music
last of all: it is further off than the blog and there is no date on it, so it
keeps its row and loses its place.

Music and writing do not exist yet. They are drawn anyway, dashed and tagged
"Idea" and "Soon", because a row that says where a playlist will go is more
honest than a gap, and it keeps the page the shape I want it to have.

It is deliberately not in the nav. `ROUTES.links` exists so nothing has to
spell the path out, but `navItems()` never returns it.

Two things on it differ from the rest of the site, both measured rather than
guessed. It uses the strip scene at every width, phones included, because the
tall composition is drawn to fill an 844px viewport and cropped into a 250px
band it shows the sun at four times the size it should be. And its "Everything
else" label is muted rather than the accent every other eyebrow uses: coral at
that size on the bare ground measures 4.85:1, and 4.06:1 where a glyph crosses
one of the ground's grid dots. Inside a row coral is fine, because the row's
own fill covers the dots.

## The shelf

`/shelf/`, in Spanish, with English at `/en/shelf/`. The manga, anime, games,
films and shows I love most, and what each of them taught me.

Each half of the site lives first in its own language. The portfolio is
English at `/` and Spanish under `/es/`, because my work has always been in
English. The shelf is the other way round, because it is the personal half and
Spanish is my first language; there the English is the translation, as the
Spanish is on the portfolio. One function, `localePath`, knows which half a path
belongs to, so every link, canonical and hreflang pair follows. At the root of
either half the browser's language still decides, and a choice made on the
switch sticks across both. It is the personal half of the site, so
it carries its own nav, just the shelf's five sections. The portfolio's nav has
a door in; the shelf's has no door back out. That is deliberate: the portfolio
is where people get sent into the write-ups, and once they are reading, the
page should not be offering them a way out to my work. For the same reason its
header keeps one icon, email, and its phone menu has no CV: someone writing to
me about a film is the one exit worth offering.

There is still a way out, one link in the footer, and it does not say "Back
home", because the shelf is a home too. It says "Back to the boring stuff",
which is honest about where it goes and does not make going there sound like
the better option. There used to be a second one above the title; it was the
first thing under the header, and someone who bookmarks the shelf and never
sees the portfolio is fine by me. Where the portfolio's footer lists what it is
built with, the shelf's says what it is made of: rewatches, rereads and
replays.

That footer is the only door out, and answering the shelf does not open
another. Its closing asks what I should try next, and that leads to
`/shelf/contact/`, the personal half's contact page, not to `/contact/`, which
is about work. It wears the shelf's header and footer, and its footer's way
back says "Back to the shelf" and goes there, as every page under the shelf
should. It is a route of its own rather than `/contact/` switching by where you
came from, because on a static site that switch could only happen in the
browser, and without JavaScript it would show the work page.

It says "Your turn", lists a few of the emails I enjoy most, and offers email
and nothing else, with the subject already written so a shelf email is
recognisable before I open it. The email row is the contact page's, made
quieter through the custom properties `LinkRow` already has for that, because
by then the reader has chosen to write. Beside it are ten posters, the first
two of each section in the shelf's order. They take the shelf's link rule from
the other side: on the shelf, a poster with nothing written about it goes
nowhere, because you are already where it lives; from this page it leads to its
section there, and one with a write-up leads to that. On a phone the posters
and the email row come straight after the first line, which keeps the row on
the first screen.

Everything on it is conditional on what I have written, and no tier is stored:

- An item with a take in `src/content/{en,es}/shelf.ts` is a highlight. A
  highlight marked `featured` in `src/content/shelf.ts` leads its section.
  Everything else is the wall. Takes are written in Spanish first, and one
  with no English yet shows on the English shelf in Spanish, marked as such,
  so both shelves keep the same shape.
- An item gets a "Read the write up" button only once its piece is in
  `src/content/write-ups/`, and then its poster links there too, because on a phone the button can sit a
  screen below the poster. The poster's link is for pointers: keyboards and
  screen readers get the one link with words on it, the button. A card with
  nothing behind it is not a link at all: no pointer cursor and nowhere to go,
  but the same hover lift.
- The wall says "no write up on these yet" only while every card on it is
  unwritten, and only when something sits above it.

So publishing is data, never layout: write the take, add the piece. Frieren and
Edith Finch are already marked `featured`, so each leads its section the day it
gets a take.

What ships first is day one: Gurren Lagann written up and featured, the other
thirty three on the walls. Nothing on the item says it is written up; its piece
existing is what gives it a button. So the shelf and that article ship
together, and there is no flag that could ever point at a page that is not
there.

The count on desktop ("Ten anime, six manga…") and the phone's row of numbers
are built from the data, singular and gender included in Spanish. The date in
"Last updated" is `SHELF_UPDATED`, and it is set by hand.

The posters are WebP at 360, 480 and 720 wide in `public/shelf/`, every one
cropped to the same 2:3 frame. They go through a hand-made `srcset` on a plain
`<img>`, because static export has no image optimiser and `next/image` would
ship one source to every screen. 480 exists for the laptop: a wall card is
204px, which on a retina screen used to round up to the 720 file. A big
monitor gets the 720 anyway. The cards are no bigger there, since the page
stops at its container, but each pixel is physically larger and the 480 looks
soft, so past 1800px, which laptops do not reach at their default scaling, the
`sizes` claim the slot at 720. The art belongs to its creators; the footer says
so and names where it came from.

Until its file arrives, every card shows its own poster blurred: a 12x18 copy,
inlined in the page as a data URI, drawn under the image. All thirty four cost
the page about 10KB compressed, half of it in the copy of the markup Next
appends for hydration, which comes after everything a first paint needs. In
exchange, scrolling faster than the network shows colour that sharpens, never
an empty frame. The copies live in
`src/content/shelf-placeholders.ts`, which `npm run shelf:placeholders` writes
from the 360 files, so it has to be run again whenever a poster changes.

Two things on it were measured rather than drawn. On a 1440 by 810 laptop the
first screen shows 195px of the Gurren Lagann poster, and on a 390 by 844 phone
212px of it; the shelf's type sizes, which have no token on the site's scale,
are declared once in `ShelfPage.module.scss` with that reason. And the
portfolio's six items do not fit beside the header's icons below 1127px in
Spanish, so between the menu and 1180 its icons leave the header and the nav
keeps the room. The shelf's five items and one icon fit at every desktop width,
so its email stays, and its nav is laid out on three columns so it sits at the
page's centre instead of 58px right of it.

## The write-ups

`/shelf/<slug>/`, with `/en/shelf/<slug>/`: the longer piece behind a card on
the shelf. They are pages under the shelf, so they wear its header and footer,
and both ways back, above the piece and in the footer, lead to the shelf rather
than out of it.

A piece is written in one language and is not translated. Gurren Lagann is in
Spanish, and both routes show it: the page around it is in the reader's
language and the piece in its own, marked with `lang`, so a screen reader reads
the Spanish in Spanish under the English header and switches back for the
footer. Both routes name the Spanish URL as the canonical and declare no
alternates, because the English one is the same text, not a translation. The
language switch, the guess from the browser's language and a choice someone
has made all keep working, because every write-up exists at both paths. The
English shelf says so before anyone follows it: "Read the write up, in
Spanish".

Each piece is a typed module in `src/content/write-ups/`, named by its slug:
its language, its standfirst, the rail's facts, and the manuscript as a list of
blocks in the manuscript's order: paragraphs, headings, stills, and the large
type. The large type comes in three kinds that look alike and are not. A
standout is one of my own sentences set large where it falls, said once, so a
screen reader reads it like any paragraph. A pull quote repeats one, so it is
hidden from screen readers. A quotation is somebody else's words, a real
`<blockquote>` with a grey rule where mine are coral. A closing paragraph
is set a step larger, and a sign-off ends the piece. Its title, credit and
poster are the shelf item's. The prose is
plain strings, with the marker's `[[double brackets]]` plus `*emphasis*` and
`[links](/like/this/)`. That parser sits beside the site's one-treatment one
rather than inside it, so nothing already written for that one reads any
differently. A piece being in that folder is what makes its item written up:
there is no flag to set, so a card can never lead to a page that is not there.

The registry checks every piece whenever it loads, so the build fails on a slug
that is not on the shelf or that collides with a page under it, two headings
with one id, a still without alt text or its files, and a pull quote that is
not a sentence of the piece. That last one matters because a pull quote is
hidden from screen readers, which is only fair when they have just read it.
Anything the manuscript has not supplied yet is a placeholder: a dashed box
that builds on my machine, so the page can be looked at, and fails the build
under CI, so it can never be deployed.

The layout is the write-up canvas's Current draft. One grid: the rail, with the
poster, the facts and the contents, spans both rows on the left and sticks while
the title and the text share the right column. It sticks 30px from the top, but
the header comes back over that space on any upward scroll, so while the header
is in, the rail sits under it, moving on the header's own duration and curve.
Its height is capped at the window, and when a piece's contents do not fit, the
list scrolls and the poster stays put. The section being read is marked as the
reader goes, found by sweeping the headings on scroll for the same reason the
reveal script sweeps. On a phone there is no rail: the poster and the facts sit
under the title, and there is no contents list.

A 3px bar across the top fills as the piece is read. It measures the text, not
the page, so it is full at the last paragraph rather than at the footer. It is
there instead of pages, which would break find in page, a link to a passage and
the scroll position. There is no reading time either: a word count over an
assumed speed is a guess about a stranger.

Every piece ends the same way: one line and a link to the shelf's own page for
writing to me, then four more from its section in the shelf's order.

No piece has a recording yet, so there is no player. One is designed, and it
gets built against the first real recording.

## Deploying

Push to `master`. The workflow typechecks, lints, builds and hands `out/` to
Pages. No build output is committed.

A pull request into `master` runs the same install, checks and build, and
stops there. So a branch that would break the site shows it on the PR, before
anything reaches `master`.

It needs **Settings → Pages → Source** set to **GitHub Actions**. Until that is
switched over the deploy job fails and whatever is published stays up.

## The CV

`public/cv.pdf` is the ATS version, linked from the banner and the contact
page. It carries my email and LinkedIn and nothing else personal, which is the
bar for anything in `public/`. Replacing it is a file swap; no code references
its contents.

It downloads as `Alex Duran - Full Stack Engineer - CV.pdf` rather than
`cv.pdf`, because that is what someone has to find again in a folder of twenty.
The name lives on `CV.filename` in `src/content/navigation.ts`.

It does name employers, which the site copy deliberately does not. That is the
intended split: the CV is a document I hand to a specific person, the site is
open to anyone.
