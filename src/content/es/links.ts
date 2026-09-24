/** @fileoverview Copy de la página de enlaces, español. */

import type { LinksContent } from '../locales';

export const links: LinksContent = {
  eyebrow: 'Enlaces',
  metaDescription:
    'Todo donde estoy, en una página. Portfolio, email, y las dos cosas que llevo tiempo queriendo empezar.',

  /* Held to the same line count as the English: one line on a desktop and two
     on a phone. A third line here pushed the Everything else heading off an
     iPhone 13 mini, so the budget in LinksPage.module.scss only held in one
     of the two languages. */
  bio: 'Barcelona. Construyo cosas para la web, entreno casi a diario, y leo mucho manga.',

  listLabel: 'Dónde encontrarme',
  restLabel: 'Todo lo demás',

  rows: {
    portfolio: 'Portfolio',
    email: 'Email',
    music: 'Música',
    writing: 'Escribir',
    linkedin: 'LinkedIn',
    cv: 'CV',
    github: 'GitHub',
  },

  cvValue: 'Descargar PDF',

  pending: {
    musicValue: '[UNA LISTA DE SPOTIFY]',
    musicTag: 'Idea',
    writingValue: '[UN BLOG]',
    writingTag: 'Pronto',
  },
};
