/**
 * @fileoverview Gurren Lagann, the first write-up.
 *
 * Its words are my manuscript's, unchanged and in its order. Until the
 * manuscript is in, everything that comes from it is a placeholder: drawn as a
 * visible box, and never deployed.
 */

import type { WriteUp } from './types';

export const gurrenLagann: WriteUp = {
  slug: 'gurren-lagann',
  lang: 'es',
  standfirst: { type: 'placeholder', note: 'the standfirst' },
  /* The shelf's credit for it, split into the rail's rows. */
  facts: [
    { label: 'studio', value: 'Gainax' },
    { label: 'director', value: 'Hiroyuki Imaishi' },
    { label: 'year', value: '2007' },
  ],
  body: [{ type: 'placeholder', note: 'the piece, from the manuscript' }],
};
