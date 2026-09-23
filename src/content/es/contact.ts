/** @fileoverview Copy de la página de contacto, español. `[[…]]` resalta. */

import type { ContactContent } from '../locales';

export const contact: ContactContent = {
  eyebrow: 'Contacto',
  metaDescription:
    'Email, LinkedIn, GitHub y mi CV. Barcelona, híbrido o en remoto, en inglés o español.',
  title: 'Hablemos de lo que estás construyendo.',
  bodyLabel: 'Cómo contactarme',

  paragraphs: [
    'Un puesto, un proyecto, o una pregunta sobre algo de esta web. Prefiero tener la ' +
      'conversación que no tenerla.',
    'El email es la vía más rápida, y [[contesto a todo lo que no sea una plantilla]]. Si me ' +
      'encontraste por un trabajo concreto, dime cuál. Encantado de entrar en más detalle del que ' +
      'permite una página de portfolio, incluidas las partes que no salieron bien.',
    'Estoy en Barcelona y trabajo híbrido o en remoto, en [[inglés]] o [[español]].',
  ],

  channels: {
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'CV',
    cvValue: 'Descargar PDF',
  },

  entrust: {
    title: '嘱, encomendar',
    body:
      'Este carácter lleva en mi web desde la primera versión, y se queda. Significa encomendar ' +
      'algo a alguien, que es más o menos lo que es contratar a un ingeniero. Leo bastante manga, ' +
      'así que iba a acabar aquí en algún sitio.',
  },
};
