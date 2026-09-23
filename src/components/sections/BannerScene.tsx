/**
 * @fileoverview The banner artwork: a road at dusk, drawn rather than
 * photographed.
 *
 * It is vector for three reasons. It weighs a couple of kilobytes instead of a
 * couple of hundred, it is sharp at any density without a srcset, and the sun
 * and the clouds take their colour from the accent token, so changing the
 * accent recolours the sky.
 *
 * There are two compositions, not one composition cropped. A 1440x660 scene
 * sliced into a phone viewport shows about a fifth of its width, which is sky
 * and one pylon. The tall version re-places the same elements for the shape.
 * Only one of them is ever rendered, so the hidden one costs parse time and
 * nothing else.
 *
 * The scene palette is literal hex. Those blues are illustration, not interface:
 * they are mixed against each other to read as distance, and they should not
 * move if the theme does. The accent is the exception, and it comes through CSS
 * because a custom property cannot be read from an SVG presentation attribute.
 */

import styles from './BannerScene.module.scss';

const ACCENT = 'var(--color-accent)';

type SceneProps = { className?: string };

/** 1440x660. The desktop and tablet composition. */
export function WideScene({ className }: SceneProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 660"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="w-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22304C" />
          <stop offset="46%" stopColor="#0D2A3E" />
          <stop offset="100%" stopColor="#03202F" />
        </linearGradient>
        <linearGradient id="w-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB38A" />
          <stop offset="52%" style={{ stopColor: ACCENT }} />
          <stop offset="100%" stopColor="#D33F52" />
        </linearGradient>
        <linearGradient id="w-trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EAF2F6" stopOpacity="0" />
          <stop offset="45%" stopColor="#EAF2F6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#EAF2F6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="w-trailC" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" style={{ stopColor: ACCENT }} stopOpacity="0" />
          <stop offset="50%" style={{ stopColor: ACCENT }} stopOpacity="0.9" />
          <stop offset="100%" style={{ stopColor: ACCENT }} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1440" height="660" fill="url(#w-sky)" />
      <circle cx="180" cy="70" r="1.6" fill="#EAF2F6" opacity="0.5" />
      <circle cx="320" cy="132" r="1.2" fill="#EAF2F6" opacity="0.35" />
      <circle cx="980" cy="58" r="1.5" fill="#EAF2F6" opacity="0.45" />
      <circle cx="1210" cy="140" r="1.2" fill="#EAF2F6" opacity="0.3" />
      <circle cx="640" cy="44" r="1.3" fill="#EAF2F6" opacity="0.4" />
      <circle cx="1188" cy="96" r="26" fill="#C9D9E2" opacity="0.5" />
      <circle cx="1176" cy="88" r="24" fill="#0D2A3E" opacity="0.85" />
      <circle cx="452" cy="268" r="148" fill="url(#w-sun)" />
      <ellipse cx="250" cy="196" rx="132" ry="13" style={{ fill: ACCENT }} opacity="0.55" />
      <ellipse cx="150" cy="232" rx="92" ry="9" style={{ fill: ACCENT }} opacity="0.38" />
      <ellipse cx="880" cy="186" rx="168" ry="14" style={{ fill: ACCENT }} opacity="0.48" />
      <ellipse cx="1108" cy="220" rx="126" ry="11" style={{ fill: ACCENT }} opacity="0.34" />
      <ellipse cx="612" cy="150" rx="104" ry="9" style={{ fill: ACCENT }} opacity="0.3" />
      <g stroke="#06283A" strokeWidth="3" fill="none" opacity="0.95">
        <path d="M596 196 L596 392 M566 226 L626 226 M572 262 L620 262 M560 320 L632 320 M596 196 L560 392 M596 196 L632 392" />
        <path d="M842 246 L842 402 M820 270 L864 270 M826 300 L858 300 M814 350 L870 350 M842 246 L814 402 M842 246 L870 402" />
        <path d="M1272 214 L1272 420 M1240 244 L1304 244 M1246 284 L1298 284 M1234 344 L1310 344 M1272 214 L1234 420 M1272 214 L1310 420" />
      </g>
      <g stroke="#06283A" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M0 246 Q300 286 596 226" />
        <path d="M596 226 Q720 286 842 270" />
        <path d="M842 270 Q1060 316 1272 244" />
        <path d="M1272 244 Q1360 262 1440 252" />
      </g>
      <path
        d="M0 400 L200 336 L352 388 L520 322 L700 392 L880 340 L1060 398 L1240 348 L1440 404 L1440 660 L0 660 Z"
        fill="#0E3A52"
      />
      <path
        d="M0 452 L168 404 L338 458 L520 398 L706 460 L900 412 L1094 466 L1290 418 L1440 462 L1440 660 L0 660 Z"
        fill="#0A2D42"
      />
      <path
        d="M0 512 L236 462 L448 518 L672 466 L900 522 L1140 470 L1440 520 L1440 660 L0 660 Z"
        fill="#071F2E"
      />
      <g className={styles.trails}>
        <path
          d="M-40 604 L1120 470"
          stroke="url(#w-trail)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M-40 628 L1180 486"
          stroke="url(#w-trailC)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M-40 580 L1000 462"
          stroke="url(#w-trail)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M120 660 L1330 496"
          stroke="url(#w-trail)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.45"
        />
      </g>
      <path
        d="M0 566 L300 534 L610 580 L940 532 L1240 582 L1440 552 L1440 660 L0 660 Z"
        fill="#041A27"
      />
    </svg>
  );
}

/** 390x844. The phone composition, with the horizon dropped and the sun moved left. */
export function TallScene({ className }: SceneProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="t-msky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22304C" />
          <stop offset="50%" stopColor="#0C2839" />
          <stop offset="100%" stopColor="#03202F" />
        </linearGradient>
        <linearGradient id="t-msun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB38A" />
          <stop offset="55%" style={{ stopColor: ACCENT }} />
          <stop offset="100%" stopColor="#D33F52" />
        </linearGradient>
        <linearGradient id="t-mtrail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EAF2F6" stopOpacity="0" />
          <stop offset="48%" stopColor="#EAF2F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EAF2F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="390" height="844" fill="url(#t-msky)" />
      <circle cx="126" cy="292" r="104" fill="url(#t-msun)" />
      <circle cx="326" cy="126" r="19" fill="#C9D9E2" opacity="0.5" />
      <circle cx="316" cy="118" r="18" fill="#0D2A3E" opacity="0.85" />
      <circle cx="58" cy="92" r="1.5" fill="#EAF2F6" opacity="0.45" />
      <circle cx="214" cy="62" r="1.3" fill="#EAF2F6" opacity="0.35" />
      <circle cx="300" cy="236" r="1.2" fill="#EAF2F6" opacity="0.3" />
      <ellipse cx="68" cy="228" rx="86" ry="9" style={{ fill: ACCENT }} opacity="0.5" />
      <ellipse cx="282" cy="300" rx="104" ry="10" style={{ fill: ACCENT }} opacity="0.4" />
      <ellipse cx="180" cy="366" rx="76" ry="8" style={{ fill: ACCENT }} opacity="0.3" />
      <g stroke="#06283A" strokeWidth="2.6" fill="none" opacity="0.95">
        <path d="M264 286 L264 470 M244 312 L284 312 M248 342 L280 342 M238 392 L290 392 M264 286 L238 470 M264 286 L290 470" />
      </g>
      <g stroke="#06283A" strokeWidth="1.8" fill="none" opacity="0.8">
        <path d="M0 340 Q132 382 264 312" />
        <path d="M264 312 Q330 342 390 328" />
      </g>
      <path
        d="M0 502 L70 456 L150 508 L230 446 L310 504 L390 462 L390 844 L0 844 Z"
        fill="#0E3A52"
      />
      <path d="M0 570 L88 524 L188 578 L288 520 L390 570 L390 844 L0 844 Z" fill="#0A2D42" />
      <path d="M0 642 L110 596 L240 648 L390 594 L390 844 L0 844 Z" fill="#071F2E" />
      <path
        d="M-20 764 L332 628"
        stroke="url(#t-mtrail)"
        className={styles.trails}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M-20 796 L362 644"
        stroke="url(#t-mtrail)"
        className={styles.trails}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path d="M0 722 L130 694 L270 736 L390 698 L390 844 L0 844 Z" fill="#041A27" />
    </svg>
  );
}

/** 1440x420. The short strip an inner page uses instead of a full banner. */
export function StripScene({ className }: SceneProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="c-csky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22304C" />
          <stop offset="55%" stopColor="#0C2839" />
          <stop offset="100%" stopColor="#03202F" />
        </linearGradient>
        <linearGradient id="c-csun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB38A" />
          <stop offset="55%" style={{ stopColor: ACCENT }} />
          <stop offset="100%" stopColor="#D33F52" />
        </linearGradient>
        <linearGradient id="c-ctrail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EAF2F6" stopOpacity="0" />
          <stop offset="48%" stopColor="#EAF2F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EAF2F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1440" height="420" fill="url(#c-csky)" />
      <circle cx="1108" cy="150" r="104" fill="url(#c-csun)" />
      <ellipse cx="1240" cy="112" rx="112" ry="10" style={{ fill: ACCENT }} opacity="0.45" />
      <ellipse cx="960" cy="188" rx="140" ry="11" style={{ fill: ACCENT }} opacity="0.36" />
      <ellipse cx="300" cy="126" rx="150" ry="11" style={{ fill: ACCENT }} opacity="0.3" />
      <path
        d="M0 250 L210 206 L400 254 L610 200 L820 256 L1040 208 L1250 258 L1440 214 L1440 420 L0 420 Z"
        fill="#0E3A52"
      />
      <path
        d="M0 300 L250 262 L500 308 L760 258 L1020 310 L1280 264 L1440 302 L1440 420 L0 420 Z"
        fill="#0A2D42"
      />
      <path
        d="M-40 380 L1180 282"
        stroke="url(#c-ctrail)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M-40 400 L1240 296"
        stroke="url(#c-ctrail)"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path d="M0 348 L330 322 L660 362 L1000 318 L1440 356 L1440 420 L0 420 Z" fill="#05202F" />
    </svg>
  );
}
