/** @fileoverview Copy de la estantería, español. Las obras en sí están en `../shelf.ts`. */

import type { ShelfContent } from '../locales';

export const shelf: ShelfContent = {
  /* Not "Cosas a las que siempre vuelvo": at 30 characters it broke onto a
     second line on a 390px phone, where the English holds one, and cost the
     first poster 37px of the first screen. This is shorter and more natural. */
  title: 'A lo que siempre vuelvo',
  metaDescription:
    'El manga, el anime, los juegos, las películas y las series que más quiero, y lo que me ' +
    'enseñó cada uno.',

  back: 'Volver a lo aburrido',
  backToShelf: 'Volver a la estantería',
  lede:
    'Nada en esta página es trabajo. Son el manga, el anime, los juegos, las películas y las ' +
    'series que más quiero, los que he leído, jugado o visto tantas veces que me los sé de ' +
    'memoria, y [[lo que me enseñó cada uno]]. Prefiero contarte por qué quiero algo antes ' +
    'que darte una lista sin más.',
  ledeShort:
    'Nada en esta página es trabajo. Son el manga, el anime, los juegos, las películas y las ' +
    'series que más quiero, y [[lo que me enseñó cada uno]].',

  summary: {
    contentsLabel: 'Qué hay',
    onePage: 'una sola página, de momento',
    updatedLabel: 'Última actualización',
  },

  /* "Un anime" pero "una película": el uno concuerda con el sustantivo, así
     que cada unidad lleva su singular entero en vez de un número suelto. */
  counts: {
    words: [
      'cero',
      'uno',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'seis',
      'siete',
      'ocho',
      'nueve',
      'diez',
      'once',
      'doce',
      'trece',
      'catorce',
      'quince',
      'dieciséis',
      'diecisiete',
      'dieciocho',
      'diecinueve',
      'veinte',
    ],
    units: {
      anime: { one: 'un anime', other: '{n} animes' },
      manga: { one: 'un manga', other: '{n} mangas' },
      games: { one: 'un juego', other: '{n} juegos' },
      movies: { one: 'una película', other: '{n} películas' },
      television: { one: 'una serie', other: '{n} series' },
    },
  },

  /* Cada introducción cabe en dos líneas en los dos anchos, igual que en
     inglés. El español es más largo, así que estas se escribieron cortas a
     propósito, no traducidas palabra por palabra. */
  sections: {
    anime: {
      name: 'Anime',
      short: 'Anime',
      intro: 'Donde empezó todo para mí. Los quiero a todos, y a uno más de lo razonable.',
    },
    manga: {
      name: 'Manga',
      short: 'Manga',
      intro: 'Leo mucho manga. Estos son los que le paso a quien me dice que no lo lee.',
    },
    games: {
      name: 'Videojuegos',
      short: 'Juegos',
      intro: 'Juegos que terminé y en los que sigo pensando, y uno pequeño que merece más gente.',
    },
    movies: {
      name: 'Películas',
      short: 'Películas',
      intro: 'Películas de las que nunca me canso. Pídeme ver una contigo y te diré que sí.',
    },
    television: {
      name: 'Televisión',
      short: 'Series',
      intro: 'Series que he seguido hasta el final, y que volvería a empezar encantado.',
    },
  },

  eyebrows: {
    'gurren-lagann': 'A mí esta obra me cambió la vida',
    frieren: 'El primero que le paso a la gente',
    'what-remains-of-edith-finch': 'El que no paro de recomendar',
  },

  /* Mine, written in Spanish first. The English shelf shows these, marked as
     Spanish, until it has its own. */
  takes: {
    'gurren-lagann':
      'Esa escala absurda no oculta su temática profunda, sino que la refuerza, y lleva su ' +
      'acción absurda con sinceridad y orgullo. Esta obra jamás se avergüenza de su estética ' +
      '(o de sus momentos más sencillos y adorablemente estúpidos). Gurren Lagann ve el techo ' +
      'encima de nosotros y nos recuerda que hay un cielo infinito más allá, y que podemos ' +
      'seguir excavando.',
  },

  notes: {
    berserk: 'sin terminar',
    'the-boxer': 'es un webtoon, pero vive aquí',
  },

  wall: {
    label: 'Antes de que se me olvide',
    unwritten: 'aún no he escrito sobre estos',
  },

  readWriteUp: 'Leer el artículo',
  readWriteUpOther: 'Leer el artículo, en inglés',
  art: { poster: 'Póster de {title}', cover: 'Portada de {title}' },
  cardAlt: 'Pósteres y portadas de la estantería, dos de cada sección.',

  writeUp: {
    contents: 'Índice',
    facts: {
      studio: 'Estudio',
      director: 'Director',
      year: 'Año',
    },
    more: {
      titles: {
        anime: { long: 'Más anime en la estantería', short: 'Más anime' },
        manga: { long: 'Más manga en la estantería', short: 'Más manga' },
        games: { long: 'Más juegos en la estantería', short: 'Más juegos' },
        movies: { long: 'Más películas en la estantería', short: 'Más películas' },
        television: { long: 'Más series en la estantería', short: 'Más series' },
      },
      all: 'Toda la estantería',
      allShelf: 'Toda la estantería',
    },
    coda: {
      label: 'Escríbeme',
      line: 'Si también se te quedó, o te hizo pensar en algo que debería probar, cuéntamelo.',
      link: 'Escríbeme sobre {title}',
    },
  },

  closing: {
    title: 'Por qué existe esta página',
    paragraphs: [
      'El resto de esta web va de cómo trabajo. Esta es la otra mitad, y suele ser la que te ' +
        'dice si te apetecería sentarte al lado de la persona.',
      'Todo lo que hay aquí es algo que quiero y que me apetecía compartir. Los que tienen ' +
        'artículo se abren en un texto más largo sobre [[lo que me dio y por qué se quedó]].',
      'La voy ampliando poco a poco, pieza a pieza, así que nunca está del todo terminada.',
    ],
    cta: 'Dime qué debería probar ahora',
  },

  contact: {
    title: 'Te toca',
    metaTitle: 'Escríbeme',
    metaDescription:
      'Escríbeme sobre la estantería: algo que debería probar, lo que te hizo pensar un ' +
      'artículo o aquello a lo que siempre vuelves.',
    lede: 'Me gusta saber qué le encanta a la gente, y por qué.',
    promptsIntro: 'Algunos de los emails que más disfruto:',
    prompts: [
      'Algo que debería probar, y lo que te dio',
      'Lo que te hizo pensar un artículo',
      'Algo de aquí que te encante por un motivo distinto al mío',
      'Lo que tú vuelves a ver, a leer o a jugar',
    ],
    closing: 'El email es la manera de escribirme, y [[los leo todos]].',
    subject: 'Sobre la estantería',
  },

  disclaimer:
    'Todas las imágenes de esta página pertenecen a sus autores, estudios y editoriales. ' +
    'Están aquí para señalarte la obra, no como algo mío. Fuentes, entre otras: TMDB, ' +
    'Steam, Amazon, MangaDex, Kyobo y WEBTOON.',

  /* Echoes the title: "vuelvo" there, "volver a" here. */
  colophon: 'Hecho de volver a ver, a leer y a jugar',
};
