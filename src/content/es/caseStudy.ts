/** @fileoverview Copy del caso de estudio del CLI, español. `[[…]]` resalta. */

import type { CaseStudyContent } from '../locales';

export const caseStudy: CaseStudyContent = {
  back: 'Volver al trabajo',
  metaDescription:
    'Un comando que hace seguro un despliegue y que deja los mismos estándares en todos los ' +
    'repositorios. Node.js y TypeScript.',
  eyebrow: 'Tooling de desarrollo',
  title: 'Un CLI por el que despliega todo el equipo',
  lede:
    'Un comando que hace que un despliegue sea seguro, y que de paso deja los mismos estándares ' +
    'en todos los repositorios.',

  facts: [
    { label: 'Rol', value: 'Autor y responsable', note: 'iniciativa propia' },
    { label: 'Construido con', value: 'Node.js, TypeScript', note: 'internals de git, APIs' },
    { label: 'Lo usa', value: 'El equipo de ingeniería', note: 'en cada proyecto de cliente' },
    { label: 'Estado', value: 'En mantenimiento activo', note: 'versionado y documentado' },
  ],

  why: {
    heading: 'Por qué existe',
    paragraphs: [
      'Dos problemas, y los dos merecían resolverse una vez en lugar de cada semana.',
      'Ninguno parecía un problema desde fuera. Nada estaba roto, nada estaba ardiendo, y los ' +
        'dos tenían un apaño que una persona cuidadosa podía llevar en la cabeza. Eso es justo lo ' +
        'que los hacía caros: [[el coste estaba repartido en fino entre cada semana y cada ' +
        'persona]], así que nunca llegaba como algo que arreglar, solo como algo con lo que tener ' +
        'cuidado.',
      'El primero es que un proyecto puede tener [[dos dueños escribiendo en el mismo árbol de ' +
        'archivos]]. Los desarrolladores son dueños del código, mientras otra persona, un cliente ' +
        'o alguien de QA, es dueña de la configuración que edita desde un editor en vivo, y git ' +
        'solo tuvo copia de una de las dos. Despliega una rama por encima y [[la mitad que no es ' +
        'tuya desaparece, en silencio]]. Todo el mundo conocía la regla. Estaba escrita. ' +
        'Igualmente salía mal, porque saber una regla y acordarse de ella un viernes a las seis ' +
        'son cosas distintas. Así que sincronizar necesitaba a un desarrollador senior mirando, ' +
        'lo que significaba esperar a que hubiera uno.',
      'El segundo es la consistencia. A lo largo de muchos proyectos de cliente, las convenciones ' +
        'se desvían: estructuras de carpetas distintas, patrones distintos, reglas de IA ' +
        'distintas, [[un resultado distinto según quién cogiera el trabajo]]. La revisión de ' +
        'código lo acaba pillando, que es un sitio lento y caro donde pillarlo.',
      'Empecé a construir esto por iniciativa propia para arreglar los dos, porque resultaron ser ' +
        'el mismo problema: [[lo que se supone que el equipo tiene que recordar debería ser algo ' +
        'que la herramienta ya hace]].',
      'La mayor parte del trabajo no fue el código. Fue mirar dónde se iba realmente el tiempo, ' +
        'separar la parte que de verdad cambiaba de un cliente a otro de la parte que ' +
        'reconstruíamos siempre, y decidir [[qué debía negarse a hacer la herramienta]] en lugar ' +
        'de solo qué debía facilitar. Escribir los comandos después fue la parte corta.',
      'Nada de esto es específico de una plataforma. La forma del problema, dos dueños ' +
        'escribiendo en un mismo árbol y convenciones que se separan entre proyectos, aparece en ' +
        'cualquier equipo que lleve más de un puñado de repositorios.',
    ],
  },

  terminals: {
    label: 'La herramienta en marcha',
    safeSync: 'el sync seguro',
    standards: 'los estándares',
    standardsNote: [
      'Una única fuente de verdad, que viaja con',
      'la herramienta en vez de recordarse.',
    ],
  },

  guarantees: {
    heading: 'Qué garantiza',
    note:
      'Dos promesas sobre seguridad, dos sobre consistencia. Cada una es algo que ya nadie tiene ' +
      'que llevar en la cabeza.',
    cards: [
      {
        title: 'Nada sobrescribe lo que no le pertenece',
        body:
          'Lo que editó otra persona va en un sentido, el código va en el otro. La herramienta no ' +
          'hace la escritura que cruza esa línea, se lo pidas como se lo pidas.',
      },
      {
        title: 'Siempre hay vuelta atrás',
        body:
          'El estado remoto se commitea y se etiqueta antes de escribir nada, así que la versión ' +
          'que existía antes de un sync se queda en el historial de git y se puede devolver con ' +
          'un solo comando.',
      },
      {
        title: 'Las convenciones llegan con la herramienta',
        body:
          'Cada cliente es su propia cosa, así que no hay dos proyectos iguales. Lo que no hace ' +
          'falta reinventar cada vez es la base compartida: los patrones, la estructura y el ' +
          'scaffolding se instalan en lugar de copiarse del repositorio que alguien tuviera ' +
          'abierto por última vez.',
      },
      {
        title: 'Las reglas de IA viajan con ella',
        body:
          'Nuestros estándares de código y las definiciones de agentes se distribuyen a cada ' +
          'repositorio desde [[una única fuente de verdad]], así que la asistencia de IA de todo ' +
          'el mundo sigue las mismas convenciones y el resultado se mantiene consistente en todo ' +
          'el equipo.',
      },
    ],
  },

  matters: {
    heading: 'Por qué esto importa en un equipo',
    paragraphs: [
      'Nadie me pidió que construyera esto. Vi el mismo problema repitiéndose, y que el coste lo ' +
        'pagaba siempre quien era más senior y menos disponible.',
      'Esa es la parte que merece la pena saber de mí. [[Voy a notar aquello que el equipo lleva ' +
        'tiempo esquivando]], y voy a ir a arreglarlo bien en lugar de volverme mejor ' +
        'esquivándolo. Significa que un desarrollador junior puede desplegar sin supervisión, que ' +
        'un proyecto nuevo es consistente desde el primer día, y que la gente senior recupera sus ' +
        'tardes.',
      'También significa que estoy cómodo [[siendo responsable de algo de principio a fin y ' +
        'siguiendo siéndolo después]]: diseñarlo, construirlo, versionarlo, documentarlo, y ' +
        'mantenerlo funcionando mientras otras personas dependen de ello cada día. Construirlo ' +
        'llevó semanas. Mantenerlo es continuo, y esa es la parte que decide si una herramienta ' +
        'así sobrevive al contacto con un equipo real.',
    ],
    cta: 'Hablemos de este proyecto',
  },
};
