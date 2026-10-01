/**
 * @fileoverview Picking a language on the visitor's behalf, and knowing when
 * not to.
 *
 * Static hosting means no server is there to read Accept-Language, so the
 * choice happens in the browser. The script runs first in `<body>`, before
 * anything paints, and redirects with `location.replace` so the back button
 * does not bounce.
 *
 * Each half of the site has its own first language at the root: English for
 * the portfolio, Spanish for the shelf (see `locales.ts`). Crossing from one
 * half to the other lands in that half's language, whichever one the reader
 * was in: the door into the shelf opens it in Spanish, and the way out lands
 * on the portfolio in English.
 *
 * An explicit choice always wins, on the half it was made on. The switcher
 * writes it to localStorage and this reads it, so picking English on the shelf
 * keeps the shelf in English on every visit after, and leaves the portfolio
 * alone; picking Spanish on the portfolio leaves the shelf alone.
 *
 * Without a choice, only the portfolio guesses. At its root the browser's
 * language decides, so a Spanish browser on `/` goes to `/es/`. The shelf does
 * not guess: it is in Spanish, for everyone, until they choose English on the
 * switch. A prefixed page is never second-guessed either; a link someone
 * deliberately shared, `/es/contact/` or `/en/shelf/`, must not bounce its
 * reader back, since they asked for that page.
 *
 * A page prefixed with the language it already lives in, `/es/shelf/` or
 * `/en/`, is sent to its root address, so an old or hand-typed link lands.
 *
 * Without JavaScript nothing happens and the root's language is served, which
 * is the right thing to fall back to.
 */

import { halfOf, type Half } from './locales';

/*
 * One key per half, since a choice holds for the half it was made on. The
 * portfolio's is the key the whole site used before the shelf existed, so a
 * choice made there before still holds.
 */
const STORAGE_KEYS: Record<Half, string> = { portfolio: 'adm.lang', shelf: 'adm.lang.shelf' };

/** Where the switch on a page keeps its choice: its own half's key. */
export function localeStorageKey(path: string): string {
  return STORAGE_KEYS[halfOf(path)];
}

/* m is the path's language prefix, if any; b the path without it; f whether b
   is on the shelf; h the language b lives in at the root; x the language
   being shown; w the one wanted. */
export const LOCALE_SCRIPT = `(function(){try{
var q=location.search+location.hash,p=location.pathname,s=p.split('/')[1],
m=s==='en'||s==='es'?s:null,b=m?p.slice(3)||'/':p,
f=b==='/shelf'||b.indexOf('/shelf/')===0,h=f?'es':'en',x=m||h,w=null;
if(m===h){location.replace(b+q);return}
try{w=localStorage.getItem(f?'${STORAGE_KEYS.shelf}':'${STORAGE_KEYS.portfolio}')}catch(e){}
if(w!=='en'&&w!=='es'){if(m||f)return;
var l=(navigator.languages&&navigator.languages[0])||navigator.language||'';
w=String(l).toLowerCase().indexOf('es')===0?'es':'en'}
if(w!==x)location.replace((w===h?b:'/'+w+b)+q)
}catch(e){}})();`;
