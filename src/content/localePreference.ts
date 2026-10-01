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
 * the portfolio, Spanish for the shelf (see `locales.ts`). The rules are the
 * same for both, and the second two are the ones that matter:
 *
 * An explicit choice always wins. The switcher writes it to localStorage and
 * this reads it, so picking English on a Spanish browser sticks, on both
 * halves, instead of being overridden on the next visit.
 *
 * Guessing only happens at the root, never on a prefixed page. A prefixed
 * link someone deliberately shared, `/es/contact/` or `/en/shelf/`, must not
 * bounce its reader back; they asked for that page. At the root the reader's
 * browser language decides, so a Spanish browser on `/` goes to `/es/`, and an
 * English one on `/shelf/` goes to `/en/shelf/`.
 *
 * A page prefixed with the language it already lives in, `/es/shelf/` or
 * `/en/`, is sent to its root address, so an old or hand-typed link lands.
 *
 * Without JavaScript nothing happens and the root's language is served, which
 * is the right thing to fall back to.
 */

export const LOCALE_STORAGE_KEY = 'adm.lang';

/* m is the path's language prefix, if any; b the path without it; h the
   language b lives in at the root; x the language being shown; w the one
   wanted. */
export const LOCALE_SCRIPT = `(function(){try{
var K='${LOCALE_STORAGE_KEY}',q=location.search+location.hash,p=location.pathname,s=p.split('/')[1],
m=s==='en'||s==='es'?s:null,b=m?p.slice(3)||'/':p,
h=b==='/shelf'||b.indexOf('/shelf/')===0?'es':'en',x=m||h,w=null;
if(m===h){location.replace(b+q);return}
try{w=localStorage.getItem(K)}catch(e){}
if(w!=='en'&&w!=='es'){if(m)return;
var l=(navigator.languages&&navigator.languages[0])||navigator.language||'';
w=String(l).toLowerCase().indexOf('es')===0?'es':'en'}
if(w!==x)location.replace((w===h?b:'/'+w+b)+q)
}catch(e){}})();`;
