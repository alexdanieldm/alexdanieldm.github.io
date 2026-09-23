/**
 * @fileoverview The scroll reveal, as one inline script rather than a component.
 *
 * It runs as the first thing in <body>, which matters: it sets the attribute
 * that CSS keys the hidden state off, so content is already hidden the first
 * time anything paints and there is no flash of visible-then-hidden.
 *
 * Hiding and revealing deliberately live in the same script. A React component
 * would render the hidden state into the static HTML, and if the bundle then
 * failed to arrive the page would sit there blank forever. Here, if the script
 * does not run, the attribute is never set, the CSS never hides anything, and
 * the page is simply a page. It cannot fail in the direction that costs someone
 * the content.
 *
 * Two things it has to get right, both found by breaking them:
 *
 * A scroll sweep, not an IntersectionObserver. An observer only fires when an
 * element's intersection actually changes, so anything scrolled past between
 * two frames never intersects and stays hidden for good: press End, restore a
 * scroll position on reload, or follow a link into the middle of the page, and
 * the sections above it are gone. Re-checking what is left on each scroll
 * cannot strand anything, and the list only shrinks.
 *
 * And a MutationObserver, because the router swaps page content without a
 * reload. The first page's targets are all revealed, the listeners have
 * unbound themselves, and then a second page's hidden content arrives with
 * nothing watching it: navigate home from the case study and the page is
 * blank, scrolling included. Watching for new nodes is what makes the reveal
 * survive a route change.
 */
export const REVEAL_SCRIPT = `(function(){
try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return}catch(e){}
document.documentElement.setAttribute('data-reveal-ready','');
var pending=[],queued=false,bound=false;
function sweep(){
var edge=innerHeight*0.78,keep=[],i,el;
for(i=0;i<pending.length;i++){el=pending[i];
if(!el.isConnected)continue;
if(el.getBoundingClientRect().top<edge){el.setAttribute('data-revealed','')}else{keep.push(el)}}
pending=keep;
if(!pending.length&&bound){bound=false;removeEventListener('scroll',onMove);removeEventListener('resize',onMove)}}
function onMove(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;sweep()})}
function scan(){
pending=[].slice.call(document.querySelectorAll('[data-reveal]:not([data-revealed])'));
if(pending.length&&!bound){bound=true;addEventListener('scroll',onMove,{passive:true});addEventListener('resize',onMove)}
sweep()}
function go(){
scan();
new MutationObserver(function(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;scan()})})
.observe(document.body,{childList:true,subtree:true})}
document.readyState==='loading'?addEventListener('DOMContentLoaded',go):go();
})();`;
