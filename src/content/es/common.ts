/** @fileoverview Copy compartida por todas las páginas, español. */

import type { CommonContent } from '../locales';

export const common: CommonContent = {
  skipToContent: 'Saltar al contenido',
  mainNavLabel: 'Principal',
  siteNavLabel: 'Navegación del sitio',
  openMenu: 'Abrir menú',
  closeMenu: 'Cerrar menú',

  nav: {
    about: 'Sobre mí',
    work: 'Trabajo',
    tech: 'Tecnología',
    approach: 'Método',
    contact: 'Contacto',
  },

  footer: {
    location: 'Barcelona',
    locationLong: 'Barcelona, España',
    builtWith: 'Next.js, TypeScript, SCSS Modules',
    backHome: 'Volver al inicio',
  },

  notFound: {
    code: '404',
    title: 'Esta no existe.',
    lede:
      'O la moví yo o el enlace estaba mal. Todo el trabajo está en la página de inicio, y la ' +
      'forma más rápida de preguntarme algo es por email.',
    backHome: 'Volver al inicio',
    getInTouch: 'Contactar',
  },

  language: {
    label: 'Idioma',
    en: 'English',
    es: 'Español',
  },
};
