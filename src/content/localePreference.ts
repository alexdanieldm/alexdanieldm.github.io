/**
 * @fileoverview Picking a language on the visitor's behalf, and knowing when
 * not to.
 *
 * Static hosting means no server is there to read Accept-Language, so the
 * choice happens in the browser. The script runs first in `<body>`, before
 * anything paints, and redirects with `location.replace` so the back button
 * does not bounce.
 *
 * Three rules, and the second two are the ones that matter:
 *
 * An explicit choice always wins. The switcher writes it to localStorage and
 * this reads it, so picking English on a Spanish browser sticks instead of
 * being overridden on the next visit.
 *
 * Guessing only ever moves away from the default language, never toward it. A
 * Spanish link someone deliberately shared must not bounce an English-speaking
 * reader back to `/`; they asked for that page. Only `/` is a guess.
 *
 * Without JavaScript nothing happens and English is served, which is the right
 * thing to fall back to.
 */

export const LOCALE_STORAGE_KEY = 'adm.lang';

export const LOCALE_SCRIPT = `(function(){try{
var K='${LOCALE_STORAGE_KEY}',p=location.pathname,es=p==='/es'||p.indexOf('/es/')===0,want=null;
try{want=localStorage.getItem(K)}catch(e){}
if(want!=='en'&&want!=='es'){
if(es)return;
var l=(navigator.languages&&navigator.languages[0])||navigator.language||'';
want=String(l).toLowerCase().indexOf('es')===0?'es':'en'}
if(want==='es'&&!es){location.replace('/es'+(p==='/'?'/':p)+location.search+location.hash)}
else if(want==='en'&&es){location.replace((p.replace(/^\\/es/,'')||'/')+location.search+location.hash)}
}catch(e){}})();`;
