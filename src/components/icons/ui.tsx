/**
 * @fileoverview Interface marks: arrows, the menu toggle, and the three glyphs
 * the previous site used that were worth keeping.
 *
 * The arrows are deliberately tiny geometry rather than an icon set. They are
 * four line segments each, they sit inside running text at 14px, and pulling in
 * a dependency to draw a diagonal line would be the wrong trade.
 */

import { Icon, type IconProps } from './Icon';

/** Points out and away. Marks a link that goes somewhere new. */
export const ArrowUpRightIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 14 14" variant="stroke">
    <path d="M3 11L11 3M11 3H5.5M11 3V8.5" />
  </Icon>
);

/** Points back. Marks a link that returns somewhere you have been. */
export const ArrowLeftIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 14 14" variant="stroke">
    <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" />
  </Icon>
);

/** Arrow onto a baseline: a file coming down to disk. */
export const DownloadIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 14 14" variant="stroke">
    <path d="M7 2.5V10M7 10L3.5 6.5M7 10L10.5 6.5M2.5 11.5H11.5" />
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 16 16" variant="stroke">
    <path d="M2 4.5H14M2 8H14M2 11.5H14" />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 16 16" variant="stroke">
    <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" />
  </Icon>
);

/** A playlist. Two note heads under a beam, so it reads at 21px. */
export const MusicIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 24 24" variant="stroke" strokeWidth={1.8}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </Icon>
);

/** A written page: a folded corner and two lines of text. */
export const DocumentIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 24 24" variant="stroke" strokeWidth={1.8}>
    <path d="M4 4h10l6 6v10H4z" />
    <path d="M14 4v6h6" />
    <path d="M8 14h8M8 17h5" />
  </Icon>
);

/** Carried over from the previous site, where it was also the favicon. */
export const TerminalIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 640 640">
    <path d="m257.98152,335.31375l-194.343,194.343c-9.373,9.373 -24.569,9.373 -33.941,0l-22.668,-22.667c-9.357,-9.357 -9.375,-24.522 -0.04,-33.901l154.022,-154.746l-154.021,-154.745c-9.335,-9.379 -9.317,-24.544 0.04,-33.901l22.667,-22.667c9.373,-9.373 24.569,-9.373 33.941,0l194.343,194.343c9.373,9.372 9.373,24.568 0,33.941zm382.019,183.029l0,-32c0,-13.255 -10.745,-24 -24,-24l-304,0c-13.255,0 -24,10.745 -24,24l0,32c0,13.255 10.745,24 24,24l304,0c13.255,0 24,-10.745 24,-24z" />
  </Icon>
);

/** Ionicons, carried over from the previous site. */
export const CodeSlashIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 512 512">
    <polygon points="161.98 397.63 0 256 161.98 114.37 189.63 145.98 64 256 189.63 366.02 161.98 397.63" />
    <polygon points="350.02 397.63 322.37 366.02 448 256 322.37 145.98 350.02 114.37 512 256 350.02 397.63" />
    <polygon points="222.15 442 182 430.08 289.85 70 330 81.92 222.15 442" />
  </Icon>
);

/**
 * Ionicons, carried over from the previous site. Its stroke is authored at 32
 * units in a 512 box, so it has to override the wrapper's default weight or it
 * would come out as a hairline next to its neighbours.
 */
export const CloudDownloadIcon = (props: IconProps) => (
  <Icon {...props} viewBox="0 0 512 512" variant="stroke" strokeWidth={32}>
    <path d="M320,336h76c55,0,100-21.21,100-75.6s-53-73.47-96-75.6C391.11,99.74,329,48,256,48c-69,0-113.44,45.79-128,91.2-60,5.7-112,35.88-112,98.4S70,336,136,336h56" />
    <polyline points="192 400.1 256 464 320 400.1" />
    <line x1="256" y1="224" x2="256" y2="448.03" />
  </Icon>
);
