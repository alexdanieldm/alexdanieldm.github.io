/**
 * @fileoverview Copy de la home, español.
 *
 * `[[dobles corchetes]]` marcan un fragmento resaltado. Todo lo de aquí es
 * prosa; la única estructura es la de la propia página.
 */

import type { HomeContent } from '../locales';

export const home: HomeContent = {
  banner: {
    eyebrow: 'Full Stack Engineer',
    title: 'Construyo aplicaciones web, desde la primera conversación hasta la última release.',
    lede:
      'Afincado en Barcelona, trabajo en todo el proceso: definir y planificar, la interfaz, ' +
      'el código, las integraciones, y llevarlo hasta producción.',
    seeWork: 'Ver el trabajo',
    downloadCv: 'Descargar CV',
  },

  about: {
    heading: 'Sobre mí',
    note: ['Barcelona, España', 'Español nativo, inglés C2', 'Ingeniería en Computación'],
    paragraphs: [
      'La mayor parte de mi trabajo es en [[TypeScript, React y Next.js]]: frontends a medida, ' +
        'arquitecturas headless, y las integraciones GraphQL y REST que los conectan con datos ' +
        'reales, tanto en aplicaciones web como en e-commerce.',
      'Me manejo en [[Figma]] igual que en el código. He diseñado una app de principio a fin, ' +
        'cada pantalla y cada interacción, y eso me dejó un criterio de diseño que sigo usando. ' +
        'Puede que no empiece un diseño desde cero, pero sé leerlo bien, ver cómo se va a ' +
        'comportar en el navegador, y detectar dónde falla en experiencia de usuario, en tamaños ' +
        'o en responsive. Distinguir un buen diseño de uno malo cuenta más en una agencia de lo ' +
        'que parece.',
      'He estado metido en todo el proceso, no solo en el código: [[desglosar un proyecto, ' +
        'estimarlo, y gestionar los cambios que siempre llegan a mitad de camino]], además de ' +
        '[[los flujos de trabajo, la documentación y el tooling interno]] que mantienen a un ' +
        'equipo entregando de forma consistente. Ese es el trabajo que más me importa.',
      'Fuera del trabajo entreno casi todos los días y me gusta meterme en situaciones en las ' +
        'que todavía no estoy cómodo, que resulta ser buen entrenamiento para todo lo demás. Leo ' +
        'bastante manga. [[Steal Like an Artist]] sigue siendo el libro que marcó cómo trabajo: ' +
        'aprender a la vista de todos, y devolver lo que tomaste prestado.',
    ],
  },

  work: {
    heading: 'Trabajo seleccionado',
    kicker: 'Tooling, datos, interfaz',
    readCaseStudy: 'Leer el caso de estudio',
    alsoLabel: 'También',

    cli: {
      index: '01',
      discipline: 'Tooling de desarrollo',
      stack: ['Node.js, TypeScript', 'Internals de git', 'Flujos de release'],
      title: 'Un CLI por el que despliega todo el equipo',
      lede: 'Un solo comando, para que nadie espere al tech lead para desplegar con seguridad.',
      paragraphs: [
        'Sincronizar un tema requería que alguien senior estuviera mirando, porque un push ' +
          'descuidado destruye trabajo que pertenece a otra persona, un cliente o QA editando en ' +
          'vivo, del que git nunca tuvo copia. Empecé esto por iniciativa propia para quitar ese ' +
          'cuello de botella. Mantiene separados los dos lados de un proyecto, etiqueta un backup ' +
          'antes de escribir nada, y [[se detiene en seco ante un destino en producción]].',
        'La otra mitad es la consistencia. La misma herramienta instala nuestras convenciones de ' +
          'código, el scaffolding de proyecto y las reglas de IA en cada repositorio desde una ' +
          'única fuente de verdad, así que [[el resultado se parece lo construya quien lo ' +
          'construya]]. Los estándares que viajan con la herramienta no se desvían como lo hace ' +
          'una página de wiki, y llegan con cada actualización en lugar de tener que recordarlos.',
      ],
    },

    data: {
      index: '02',
      discipline: 'APIs y datos',
      stack: ['GraphQL, APIs REST', 'Next.js, TypeScript'],
      title: 'Datos reales, venga de la plataforma que venga',
      lede: 'El frontend decide cómo se ve. La API decide qué es verdad.',
      paragraphs: [
        'Buena parte de mi trabajo es unir una interfaz a medida con un sistema que ya es dueño ' +
          'de los datos. Construyo la capa intermedia, para que la plataforma siga haciendo ' +
          'aquello en lo que es realmente buena y [[la interfaz no le deba nada más]]. Cambia el ' +
          'backend y la interfaz apenas se entera.',
      ],
      diagram: {
        caption: 'Una interfaz, varias fuentes de verdad',
        clientName: 'Frontend a medida',
        clientStack: 'Next.js, React, TypeScript',
        sources: [
          { protocol: 'GraphQL', system: 'Plataforma de comercio' },
          { protocol: 'REST', system: 'Servicios de backend' },
          { protocol: 'Tiempo real', system: 'Chat y actualizaciones' },
        ],
      },
    },

    mvp: {
      index: '03',
      discipline: 'Frontend de producto',
      stack: ['React, TypeScript', 'React Native', 'Figma'],
      title: 'De un archivo de Figma a un MVP completo',
      lede: 'Cada pantalla, cada estado, web y móvil.',
      paragraphs: [
        'Construí el frontend de una plataforma de producto a partir de diseños en Figma, con ' +
          'React y TypeScript: interfaces responsive de escritorio y móvil, autenticación, ' +
          'formularios de varios pasos, integraciones de mapas y chat en tiempo real, más una app ' +
          'complementaria en React Native.',
        'Estaba construyendo la interfaz bastante antes de que empezara el trabajo de backend, ' +
          'así que [[la mayor parte del tiempo definí yo el contrato de datos]]. Para el chat ' +
          'especifiqué exactamente qué necesitaba, qué propiedades, y con qué forma, y después ' +
          'trabajé con el desarrollador de backend hasta que la API encajó. Decidir qué necesita ' +
          'de verdad el frontend, y decirlo pronto, es casi todo lo que hace que el resto del ' +
          'desarrollo vaya tranquilo.',
      ],
      diagram: {
        caption: 'Superficies de la interfaz, esquemáticas en lugar de capturas',
        surfaces: ['Mapa y rutas', 'Chat en tiempo real', 'Acceso y formularios'],
      },
    },

    also: [
      {
        title: 'Tiendas, de cero a producción',
        body:
          'E-commerce completos llevados desde nada hasta una tienda en producción, y la ' +
          'plantilla de la que parten: modular, reutilizable, y lo bastante aislada como para ' +
          'que una sección pueda moverse a otro proyecto sin arrastrar el resto.',
        stack: 'Liquid, TypeScript, SCSS',
      },
      {
        title: 'Crypto',
        body:
          'Una app de escritorio multiplataforma que cifra y descifra archivos de cualquier ' +
          'tamaño, usando [[un sistema híbrido de clave pública y privada que diseñé]]. ' +
          'Construida de principio a fin, interfaz incluida.',
        stack: 'Electron, Python, Node.js',
      },
      {
        title: 'Monetización serverless',
        body:
          'Una función Lambda de AWS que habilitó la compra de membresías anuales, añadiendo una ' +
          'nueva vía de ingresos sin tocar la arquitectura de alrededor.',
        stack: 'AWS Lambda, Node.js',
      },
    ],
  },

  tech: {
    heading: 'Con qué construyo',
    kicker: 'Herramientas, no identidad',
  },

  approach: {
    heading: 'Cómo trabajo',
    lede: 'Tres cosas en las que creo, y ninguna va de un framework.',
    cards: [
      {
        index: '01',
        title: 'Escríbelo para quien venga después',
        body:
          'Sobreingenierizamos las cosas, y se nos olvida que quien abra el archivo no vamos a ' +
          'ser nosotros. Busco código limpio y modular hasta el punto de que una pieza pueda ' +
          'llevarse a otro proyecto sin romperse, porque el buen código no se cae a trozos cuando ' +
          'lo sacas de su contexto. [[Terminar algo que de verdad se pueda mantener]] es la parte ' +
          'de la que estoy más orgulloso.',
      },
      {
        index: '02',
        title: 'Diseño y desarrollo son un mismo trabajo',
        body:
          'Cuando entiendes bien los dos lados, el diseño y el código [[hablan el mismo idioma y ' +
          'apuntan a lo mismo]]. Sé leer un archivo de Figma, discutirlo donde hay que ' +
          'discutirlo, y construirlo sin adivinar qué se quería decir. Eso vale más que cualquier ' +
          'documento de handoff.',
      },
      {
        index: '03',
        title: 'Sé transparente, y estate ahí',
        body:
          'Ser claro sobre qué estoy haciendo, cómo va y dónde está realmente el equipo importa ' +
          'más que la mayoría de las decisiones técnicas. Y [[estar presente mientras alguien ' +
          'saca adelante un problema]] vale más de lo que solemos reconocer, como desarrollador y ' +
          'como persona.',
      },
    ],
  },

  cta: {
    title: 'Hablemos de lo que estás construyendo.',
    lede:
      'Encantado de escuchar sobre un puesto, un proyecto, o cualquier cosa de esta web sobre la ' +
      'que quieras profundizar.',
    button: 'Contactar',
  },
};
