/**
 * Tells search engines which pages a deploy changed, through IndexNow.
 *
 * IndexNow is a ping: a site posts the addresses that changed, and Bing,
 * Yandex, Seznam, Naver and the protocol's other members recrawl them instead
 * of waiting to come round on their own. One post to api.indexnow.org reaches
 * all of them. The site proves the addresses are its own by serving the key at
 * `/<key>.txt`, which is why the key is public.
 *
 * It is told only what changed, as IndexNow asks: a site that posts every page
 * on every deploy gets its pings ignored. What changed is worked out by
 * comparing each page the build made with the same page live, before the deploy
 * replaces it. Not byte for byte: every build renames its scripts and styles,
 * so every page would differ. What a search engine reads instead: the title,
 * the meta tags, the canonical and its twins, the structured data, the text,
 * the image descriptions and where the links go. A page the live site does not
 * have yet is new; one the live sitemap has and this build does not is gone,
 * and is posted too, so its 404 gets read.
 *
 *   node scripts/indexnow.mjs changed   what this build changes, as JSON
 *   node scripts/indexnow.mjs all       every address in the sitemap, as JSON
 *   node scripts/indexnow.mjs submit    posts the JSON list it reads on stdin
 *
 * `changed` and `all` read the build in `out/`. Neither a page that cannot be
 * fetched nor a post that fails ever stops a deploy: the site goes up either
 * way, and a warning says what was missed. A key file that does not match the
 * key here does stop it, because then every post would be refused.
 */

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const HOST = 'alexdanieldm.com';
const SITE = `https://${HOST}`;
const KEY = '739d24de76dbda9054b571186e1b21da';
const KEY_FILE = path.join('public', `${KEY}.txt`);
const OUT = 'out';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/* Logs go to stderr: stdout is the JSON the workflow captures. */
const warn = (message) => console.error(`::warning::IndexNow: ${message}`);

function checkKey() {
  if (!existsSync(KEY_FILE) || readFileSync(KEY_FILE, 'utf8').trim() !== KEY) {
    throw new Error(`${KEY_FILE} must exist and hold the key, or every post is refused.`);
  }
}

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const builtSitemap = () => locs(readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8'));

/** The page the build made for an address: `/es/contact/` is `out/es/contact/index.html`. */
const builtPage = (url) =>
  readFileSync(path.join(OUT, new URL(url).pathname, 'index.html'), 'utf8');

const all = (html, pattern) => [...html.matchAll(pattern)].map((match) => match.slice(1).join('='));

/** What a search engine reads on a page, and nothing a rebuild alone changes. */
function readable(html) {
  const data = all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  const page = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const body = page.slice(page.indexOf('<body'));
  const read = {
    title: all(page, /<title>([\s\S]*?)<\/title>/g),
    /* Sorted, and without Next's own tags: two builds of the same commit put
       next-size-adjust, the font loader's marker, in different places. Neither
       the order of the tags nor that one says anything to a search engine. */
    meta: all(page, /<meta (?:name|property)="([^"]+)" content="([^"]*)"/g)
      .filter((tag) => !tag.startsWith('next-'))
      .sort(),
    links: all(page, /<link rel="(canonical|alternate)"([^>]*)>/g).sort(),
    data,
    alt: all(body, /\salt="([^"]*)"/g),
    hrefs: all(body, /<a\s[^>]*?href="([^"]*)"/g),
    text: body
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  };
  return createHash('sha256').update(JSON.stringify(read)).digest('hex');
}

/** The live page at an address: its HTML, `null` while it does not exist yet, or `undefined` if it cannot be told. */
async function live(url) {
  try {
    const response = await fetch(url, { redirect: 'manual' });
    if (response.status === 404) return null;
    if (!response.ok) {
      warn(`${url} answered ${response.status}, so it is left out`);
      return undefined;
    }
    return await response.text();
  } catch (error) {
    warn(`${url} could not be fetched (${error.message}), so it is left out`);
    return undefined;
  }
}

async function changed() {
  const built = builtSitemap();
  const liveSitemap = await live(`${SITE}/sitemap.xml`);
  const gone = liveSitemap ? locs(liveSitemap).filter((url) => !built.includes(url)) : [];

  const pages = await Promise.all(
    built.map(async (url) => {
      const html = await live(url);
      if (html === undefined) return [];
      if (html === null) return [url];
      return readable(html) === readable(builtPage(url)) ? [] : [url];
    }),
  );
  return [...pages.flat(), ...gone];
}

async function submit(urls) {
  if (urls.length === 0) {
    console.error('IndexNow: this deploy changed nothing a search engine reads.');
    return;
  }
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `${SITE}/${KEY}.txt`,
        urlList: urls,
      }),
    });
    /* 200 is received; 202 is received while the key is still being checked,
       which is how a first post usually comes back. */
    if (response.ok) {
      console.error(`IndexNow: ${response.status}, told about ${urls.length}:\n${urls.join('\n')}`);
    } else {
      warn(`the post came back ${response.status}: ${(await response.text()).slice(0, 300)}`);
    }
  } catch (error) {
    warn(`the post failed (${error.message})`);
  }
}

checkKey();

const mode = process.argv[2];
if (mode === 'changed') {
  console.log(JSON.stringify(await changed()));
} else if (mode === 'all') {
  console.log(JSON.stringify(builtSitemap()));
} else if (mode === 'submit') {
  await submit(JSON.parse(readFileSync(0, 'utf8') || '[]'));
} else {
  throw new Error('Say what to do: changed, all or submit.');
}
