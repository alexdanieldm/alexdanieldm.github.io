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
 * A scroll sweep rather than an IntersectionObserver, which is the obvious
 * choice and the wrong one. An observer only fires when an element's
 * intersection actually changes, so anything scrolled past between two frames
 * never intersects and stays hidden for good: press End, restore a scroll
 * position on reload, or follow a link into the middle of the page, and the
 * sections above it are gone. Measured exactly that on the first attempt, two
 * articles invisible at the bottom of the page. Re-checking what is left on
 * each scroll cannot strand anything, and the list only shrinks: once
 * everything has appeared the listeners remove themselves and the cost is nil.
 */
export const REVEAL_SCRIPT = `(function(){
try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return}catch(e){}
document.documentElement.setAttribute('data-reveal-ready','');
var pending=[],ticking=false;
function sweep(){
var edge=innerHeight*0.88,i,keep=[];
for(i=0;i<pending.length;i++){
if(pending[i].getBoundingClientRect().top<edge){pending[i].setAttribute('data-revealed','')}
else{keep.push(pending[i])}}
pending=keep;
if(!pending.length){removeEventListener('scroll',onMove);removeEventListener('resize',onMove)}}
function onMove(){if(ticking)return;ticking=true;requestAnimationFrame(function(){ticking=false;sweep()})}
function go(){
pending=[].slice.call(document.querySelectorAll('[data-reveal]'));
addEventListener('scroll',onMove,{passive:true});
addEventListener('resize',onMove);
sweep()}
document.readyState==='loading'?addEventListener('DOMContentLoaded',go):go();
})();`;
