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

Node 20.9 or newer.

## How it is laid out

```
src/
├── app/                  routes; each page owns its own .module.scss
│   ├── page.tsx          home
│   ├── contact/
│   ├── links/            the page a social bio points at
│   ├── work/cli/         case study
│   └── not-found.tsx     exported as 404.html
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
| `--color-faint`      | `#6e8798`           | 4.78:1              |
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
`sharp().png({ effort: 10 })` — that took the canvas's 220KB default output
down to 33KB with no loss.

Every page builds its own card metadata through `pageMetadata()` in
`src/content/seo.ts`. That exists because Next shallow-merges metadata: a page
declaring its own `openGraph` replaces the parent's wholesale instead of
filling gaps, so without it every inner page advertised the home page's title
and URL.

## The link page

`/links/`, with `/es/links/` like every other route. It is what an Instagram
or Twitter bio points at, so it carries no header and no footer of the site's
own: somebody arriving came from one link and wants another one, not a tour.
That leaves nowhere for the language switch, so it sits in the page's own
footer, and it is the only way across on a route nothing else links to.

The order is the design. Portfolio and the blog first, because those are the
two things worth showing, and the blog keeps second place even though it does
not exist yet. Email and music follow. Instagram, LinkedIn, the CV and GitHub
sit under "Everything else": Instagram leads that group because the page is
what my Instagram bio points at, so the handle belongs on it without costing
one of the top four.

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

## Deploying

Push to `master`. The workflow typechecks, lints, builds and hands `out/` to
Pages. No build output is committed.

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
