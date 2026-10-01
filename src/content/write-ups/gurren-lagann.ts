/**
 * @fileoverview Gurren Lagann, the first write-up.
 *
 * Its words are my manuscript's, version 11, in its order, with five fixes I
 * made after it: "solo él puede" for "solo el puede", a full stop closing the
 * paragraphs that end "de esto" and "él mismo", and opening quote marks on
 * "El taladro…" and the second "No creas en…". Each paragraph is one string
 * on one line, so a change to the manuscript is a change to one line here.
 *
 * The highlights, the sentences set large, the lines from the show and the
 * thanks at the end are the treatments I chose for it. The still is the one
 * the preview places after "se ve y se siente en cada fotograma". The
 * standfirst is one of the piece's own paragraphs, chosen to open it too.
 */

import type { WriteUp } from './types';

export const gurrenLagann: WriteUp = {
  slug: 'gurren-lagann',
  lang: 'es',
  standfirst:
    'Gurren Lagann te dice una y otra y otra vez a tu cara que no hay nada más poderoso que el indomable espíritu humano.',
  /* The shelf's credit for it, split into the rail's rows. */
  facts: [
    { label: 'studio', value: 'Gainax' },
    { label: 'director', value: 'Hiroyuki Imaishi' },
    { label: 'year', value: '2007' },
  ],
  /* The landscape from the show itself, rather than the poster, which is
     portrait and would be cropped to a strip. */
  linkPreview: 'scene',
  body: [
    {
      type: 'paragraph',
      text: 'Dentro de una caverna subterránea existe una aldea cuya creencia fundamental es “no existe nada más allá de la caverna”. El mundo es solo la caverna y su cielo es el techo de piedra que arropa la aldea. Es aquí donde conocemos a [[Kamina y Simon]], nuestros protagonistas, quienes se rehúsan a aceptar esta creencia como absoluta, se rehúsan a aceptar que todo lo que existe es la caverna y deciden excavar hacia arriba, deciden buscar [[“los cielos más allá del cielo”]].',
    },
    {
      type: 'paragraph',
      text: 'Quien excava es Simon, mientras que atrás está siempre Kamina empujándolo con sus palabras y Simon, por amor a su hermano sigue excavando, hasta que por fin un día logran atravesar el techo y las creencias de toda la aldea, y logran demostrar que existe un cielo más allá del cielo de la aldea.',
    },
    {
      type: 'paragraph',
      text: 'He aquí donde comienza la historia de Kamina y Simon, cómo descubrieron un nuevo mundo y el cielo infinito arriba de ellos, cómo lograron romper el techo de lo que creían posible y cómo siguieron excavando para llegar más allá de los cielos.',
    },
    {
      type: 'paragraph',
      text: 'Comienza con dos hermanos que se atreven a soñar, que se atreven a intentarlo, que se atreven a seguir sus sueños sin importar lo que el mundo les diga, sin importar si se ven ridículos en el proceso, sin importar si parece imposible.',
    },
    {
      type: 'paragraph',
      text: 'La obra se atreve a preguntar: [[¿qué importa si es imposible?]] ¿qué importa si las probabilidades están en tu contra? ¿qué importa si no tiene sentido? [[Hazlo igualmente.]]',
    },
    {
      type: 'paragraph',
      text: 'Gurren Lagann te dice una y otra y otra vez a tu cara que no hay nada más poderoso que el indomable espíritu humano.',
    },
    {
      type: 'paragraph',
      text: 'Para mí Gurren Lagann es una hermosa historia que sirve a su vez como litmus test: [[¿Podemos apreciar la profundidad de una obra orgullosa de su estética absurda?]]',
    },
    {
      type: 'paragraph',
      text: 'Porque superficialmente solo se ve un simple anime de mecha, acción, aventura y una escala de poder que crece y crece hasta llegar a lo absurdo (terminan lanzándose galaxias como frisbee en la batalla final); y en verdad ese es el punto.',
    },
    {
      type: 'paragraph',
      text: 'Esa escala absurda no oculta su temática profunda, sino que la refuerza, y lleva su acción absurda con sinceridad y orgullo.',
    },
    {
      type: 'standout',
      text: 'Gurren Lagann ve el techo encima de nosotros y nos recuerda que hay un cielo infinito más allá, y que podemos seguir excavando.',
    },
    {
      type: 'paragraph',
      text: 'Aquí es donde comienza lo que más amo de Gurren Lagann: que nunca toma su positivismo, su filosofía y su estética absurdista, como un chiste, se lo toma en serio, se lo toma como un canto a la vida, como una medicina ante desafíos de la vida, y sobre todo, como un credo para atravesar los límites del mundo que nos rodea.',
    },
    {
      type: 'paragraph',
      text: 'Al igual que sus protagonistas, la obra no se queda aquí, sigue excavando más de sus ideas, ya que, como mencionamos antes, [[la narrativa se desafía a sí misma]], y pone en jaque los ideales que pasa la mitad de sus episodios defendiendo.',
    },
    {
      type: 'paragraph',
      text: 'Para mí esta historia se divide en dos: “Gurren Lagann” y “Gurren Lagann: Shippuden”, te presenta la historia detrás de las consecuencias de la aventura.',
    },
    {
      type: 'paragraph',
      text: 'Gurren Lagann tiene un prólogo y un epílogo, pero aún entre medio de esos dos puntos, narra dos historias: el Gurren Lagann de Simon y Kamina y el Gurren Lagann del mundo que crean sus acciones.',
    },
    {
      type: 'paragraph',
      text: '[[¿Qué pasa después de que rompes los esquemas preestablecidos?]] ¿Qué pasa con los sistemas? ¿Qué pasa con la sociedad? ¿Qué pasa con su gente? ¿Qué pasa sin las estructuras que, aun siendo limitantes, mantenían el orden?',
    },
    {
      type: 'paragraph',
      text: 'Gurren Lagann toma los ideales que al principio se sienten tan de anime, tan de fantasía, tan de aventura, y se atreve a recontextualizarlos sin aviso y sin pedir permiso, y nos coloca en un contexto más cercano a nuestro mundo.',
    },
    {
      type: 'paragraph',
      text: 'Metrópolis, gobiernos, políticas internas, ciudadanía, y estructuras que requieren de más que el positivismo y la tenacidad que las llevó a existir en primer lugar. La obra se atreve a desafiarse a sí misma.',
    },
    {
      type: 'paragraph',
      text: 'Así es como el [[litmus test]] se vuelve más aparente, dejar a Gurren Lagann solo como un mecha de acción y aventura, es perderse de lo que son, para mí, sus mejores partes, es perderse de lo que la propia estructura narrativa se propone demostrar.',
    },
    {
      type: 'paragraph',
      text: '[[Rossiu]] es el personaje que de manera más clara y transparente presenta las temáticas más profundas de Gurren Lagann, es introducido en uno de los primeros arcos del anime.',
    },
    {
      type: 'paragraph',
      text: 'Arco durante el cual se exploran temas como la teología, sistemas de gobierno utilitarios, y en el que se propone una pregunta:',
    },
    {
      type: 'standout',
      text: '¿Actuamos como lo hacemos porque creemos que es lo correcto o creemos que es lo correcto porque actuamos como lo hacemos?',
      question: true,
    },
    {
      type: 'paragraph',
      text: 'Esta pregunta no se responde con simple rebeldía o superioridad moral, la obra toma la premisa y la antepone ante una realidad complicada.',
    },
    {
      type: 'paragraph',
      text: 'Acciones que pueden ser consideradas nefastas, crueles o dañinas pueden ser perpetuadas desde el cariño de un líder por su comunidad, un líder no necesariamente sabrá más que aquellos que lo siguen, debido a que al final del día es [[un ser humano como cualquier otro, con virtudes y defectos]].',
    },
    {
      type: 'paragraph',
      text: 'Es Rossiu quien nos permite explorar esto, es él quien tuvo que confrontar todas estas incertidumbres y la complejidad de un sistema que por años siguió lealmente, cuando este sistema se desmorona ante él y la realidad se presenta claramente, es ahí cuando decide salir de la caverna y forja un credo de no repetir los errores del líder que amenazó lo que él amaba.',
    },
    {
      type: 'paragraph',
      text: 'Sin embargo un credo es fácil de forjar pero difícil de mantener, los valores solo pueden verse como virtudes cuando nos cuestan algo, y el camino que recorrió Rossiu estuvo plagado de justificantes, [[Rossiu sale de la caverna pero la caverna no salió de él]], y no es hasta años más tarde que se da cuenta de esto.',
    },
    {
      type: 'paragraph',
      text: 'Un líder, sea quien sea, no es más que un humano intentando hacer su mejor esfuerzo, y aun así debemos reconocer, al igual que Rossiu, que un líder con las mejores intenciones puede ser cruel y puede provocar daños irreparables, y aun más atemorizante, reconocer que siempre podemos encontrarnos siendo ese líder.',
    },
    {
      type: 'paragraph',
      text: 'La obra a través de Rossiu nos pregunta [[¿Qué hacemos para evitar convertirnos en el reflejo de quien nos hirió?]] Y tal vez aun más importante ¿Qué hacemos cuando nos vemos siendo ese reflejo? He ahí el verdadero desafío, nos resulta fácil creer que podemos escapar de los patrones en los que crecimos pero ¿Cómo aceptamos los errores del pasado y corregimos las acciones del futuro?',
    },
    {
      type: 'paragraph',
      text: 'Rossiu nos demuestra que siempre existirán consecuencias que no podremos reparar, y que aun así existe [[un valor intrínsecamente poético en el cambio]], y nos recuerda que quiénes somos es una decisión que se toma cada día, y [[siempre estaremos a tiempo de ser mejores y de forjar un mejor futuro]].',
    },
    {
      type: 'paragraph',
      text: 'Gurren Lagann nos hace vivir grandes peleas llenas de adrenalina, y las presenta con una hermosa animación, icónico diseño de personajes y un arte digno del género shonen, esta obra jamás se avergüenza de su estética (o de sus momentos más sencillos y adorablemente estúpidos).',
    },
    {
      type: 'paragraph',
      text: 'Estudio Gainax fue el responsable de la creación de estos personajes y el mundo donde seguimos sus historias, el equipo dejó todo su esfuerzo, dedicación y pasión durante la producción del anime, lo cual [[se ve y se siente en cada fotograma]].',
    },
    {
      type: 'figure',
      image: 'scene',
      alt: 'Yoko con su rifle, Kamina con la espada al hombro, Simon con su taladro colgado del cuello, la bandera del equipo Gurren ondeando y un cielo estrellado.',
    },
    {
      type: 'paragraph',
      text: 'Gurren Lagann es un anime que [[me hizo llorar]] en más de una ocasión, gran parte de esto se debe a personajes memorables como lo son Kamina, Simon, Nia, Rossiu y muchos otros que faltarán por mencionar, personajes que se sienten más grandes que la vida misma y aun así se sienten sumamente reales y entrañables.',
    },
    {
      type: 'paragraph',
      text: 'La obra presenta una medicina ante el existencialismo cínico, una medicina ante la apatía de la vida, un camino para romper los límites que se nos han impuesto, y al igual que su escala de poder que nunca deja de crecer, al igual que Simon, al igual que Kamina, al igual que toda la aventura que hemos seguido, la historia sigue y sigue escalando, excavando y atravesando cielos.',
    },
    { type: 'quotation', text: '“El taladro que atravesará los cielos”' },
    {
      type: 'paragraph',
      text: 'Porque Gurren Lagann es eso: es un ideal que atraviesa los cielos, atraviesa lo que se supone que es infinito y descubre lo que hay más allá. [[Nos planta sus ideas en el corazón]] y además nos toma de la mano y nos muestra los posibles desafíos que se nos pueden presentar en el mundo material que nos rodea, pone en vista lo que nos espera y nos grita: [[HAZLO]].',
    },
    {
      type: 'paragraph',
      text: 'Gainax fue el estudio detrás de Neon Genesis Evangelion, obra cuya influencia en el medio del anime se siente hasta el día de hoy, dicho anime lidia con temas de depresión, autoestima y trauma familiar.',
    },
    {
      type: 'paragraph',
      text: 'Aquí entra Gurren Lagann como la contraparte, como el contrapeso ante ese existencialismo casi cínico de lo que vino antes, como si alguien hubiera visto Neon Genesis Evangelion y decidiera gritarle al mundo: “[[¡El espíritu humano es indomable; puede soportar cualquier tormenta!]]”, y eso es otro de los aspectos profundamente hermosos de Gurren Lagann.',
    },
    {
      type: 'paragraph',
      text: 'Para dejar en claro lo importante y profunda que puede llegar a ser una historia sobre robots gigantes que se tiran galaxias unos a otros, el capítulo 1 de Gurren Lagann tal y como está descrito al principio de este artículo es también, en parte, muy parecido al “mito de la caverna” descrito por Platón: una caverna y un pueblo en su interior que solo conocen las sombras enfrente de ellos, donde fue una sola persona la que se atrevió a salir de la caverna y ver la luz.',
    },
    {
      type: 'paragraph',
      text: 'Esta alegoría no solo se ve plasmada en pantalla durante el capítulo 1 con Simon y Kamina; se aprecia también en cada uno de sus personajes principales y el desarrollo de sus arcos. Constantemente estamos viendo seres humanos, comunidades y creencias ser desafiadas, preguntándose:',
    },
    {
      type: 'standout',
      text: '¿Qué existe detrás de su cotidianidad? ¿Son sus creencias la única opción? ¿Son correctas o tan siquiera justas?',
      question: true,
    },
    {
      type: 'paragraph',
      text: 'Existen temas en la obra que no hemos podido excavar, como pueden ser la propaganda política, las dinámicas sociales, la ciudadanía y uno que especialmente quiero mencionar, [[el impacto de las relaciones humanas y el amor en nuestras vidas]].',
    },
    {
      type: 'paragraph',
      text: 'Esto se ve representado en la relación entre Simon y Nia, siendo esta última un personaje cuya introducción en la narrativa marca un claro antes y después, no solo en la obra, sino también en la vida de Simon.',
    },
    {
      type: 'paragraph',
      text: '[[La historia de Simon y Nia es una historia de amor]], del impacto que puede llegar a tener este sentimiento en nuestra vida. Ella entra en un momento en el que nuestro héroe se ha aislado completamente de su entorno, y es Nia, la nueva integrante del cast que desconoce todo del mundo a su alrededor, la única capaz de conectar con Simon.',
    },
    {
      type: 'paragraph',
      text: 'Conecta al verlo no como el hermano de Kamina sino como Simon “El excavador”, ama no las partes de Simon de Kamina sino a Simon por Simon, y son estas acciones tan simples y a la vez tan profundamente hermosas las que le permiten a Simon encontrar un nuevo camino para seguir avanzando y le recuerdan que se impulsa por el ayer, viaja por el mañana, pero [[vive en el ahora]].',
    },
    {
      type: 'paragraph',
      text: 'Kamina, el ideal que nos enseñó a salir de la caverna, a no aceptar las sombras, a atravesar los cielos y ver lo imposible posible, y nos deja tatuada una frase en el corazón:',
    },
    {
      type: 'quotation',
      text: '“No creas en ti mismo. ¡Cree en mí! ¡Cree en el yo que cree en ti!”',
    },
    {
      type: 'paragraph',
      text: 'Kamina es el recuerdo constante de que [[a veces lo único que necesitamos es que alguien crea en nosotros]].',
    },
    {
      type: 'paragraph',
      text: 'No hay nada más difícil que entender que muchas veces no somos capaces de ver cómo los demás nos perciben, por eso es que tener una persona detrás que te lo diga a la cara hace un cambio inmensurable en tu vida, aun si tú no te lo crees, aun cuando tú mismo no te ves a ti como esa persona te ve, que haya una persona a tu lado que te diga que te ve así, da un valor y un ímpetu que sin darte cuenta te transforma en eso que ve que tú no ves.',
    },
    {
      type: 'paragraph',
      text: 'Te transforma en el potencial que ve esa persona en ti y te transforma en lo que tú siempre quisiste ser, solo porque confiaste no en esa persona sino en [[el ti que esa persona ve]], porque esa es la única confianza que necesitas. Necesitas confiar en esa persona que te quiere y que tú quieres, confiar en que lo que dice es por algo, aun si tú no lo ves.',
    },
    {
      type: 'paragraph',
      text: 'Simon, quien recibe todos estos mensajes, no solo toma estas lecciones de vida sino que con él vemos la evolución de las mismas. Atravesamos junto a él un proceso de luto, el cual no se resuelve en un solo episodio, nos arroja la idea de qué sucede cuando ya no tienes esa persona, cuando esa persona ya no es suficiente, y nos recuerda que necesitamos ser nuestra propia persona.',
    },
    {
      type: 'quotation',
      text: '“No creas en el tú que cree en mí. No creas en el yo que cree en ti. Cree en el tú que cree en ti”',
    },
    {
      type: 'paragraph',
      text: 'Simon se transforma en un “Kamina” y al seguir creciendo, lo supera. No al ser mejor que Kamina sino al seguir siendo Simon y porque ve lo que todo el mundo veía en él, entiende el valor que solo él puede aportar a quienes lo rodean, se ve al espejo y decide no convertirse solo en el producto de su entorno, [[se convierte en él mismo]].',
    },
    {
      type: 'paragraph',
      text: 'Porque el hecho de que se convierta en Simon, el que supere a Kamina, no le quita valor a Kamina y no le quita valor a Simon, Simon se parece a Kamina al crecer porque Simon ama a Kamina, porque Simon cree y hereda el legado de Kamina, porque Simon tiene los valores de Kamina, y aquí vemos que [[Kamina tiene los valores de Simon]].',
    },
    {
      type: 'paragraph',
      text: 'Porque sí, Simon siguió excavando porque Kamina siempre estaba detrás de él dándole la confianza para continuar pero Kamina siguió teniendo esperanza porque [[veía la espalda de Simon]] que seguía excavando sin importar nada.',
    },
    {
      type: 'paragraph',
      text: 'Porque dos personas que creen mutuamente en el otro, aun sin darse cuenta, se hacen mejores mutuamente y ese amor hace que el otro se convierta en la persona que el otro necesita, creándose [[una rueda de reciprocidad hermosa]].',
    },
    {
      type: 'paragraph',
      text: 'Gurren Lagann no es más que absurdismo hecho anime, una filosofía de absurdismo que te dice: “sí, el universo es indiferente, sí, habrá gente en tu contra, sí, tal vez es imposible, sí, todas las probabilidades están en tu contra, hazlo igualmente, hazlo porque es absurdo y hazlo porque tu espíritu te lo implora, [[hazlo por el indomable espíritu humano]]”.',
    },
    {
      type: 'paragraph',
      text: 'Gurren Lagann es todas las cosas que yo acabo de escribir y al mismo tiempo es una historia de mechas, acción y aventura llena de adrenalina a más no poder, y amo cada una de sus batallas, amo cada robot gigante, amo cada grito, amo la combinación ilógica entre un robot y la luna que después termina lanzando galaxias como frisbees.',
    },
    {
      type: 'paragraph',
      text: 'También amo esa parte de Gurren Lagann, son esas peleas absurdas las que le otorgan una preciosura a su profundidad temática y de verdad desearía que todo el que lea esto lo pueda llegar a ver como yo.',
    },
    {
      type: 'paragraph',
      text: '[[A mí esta obra me cambió la vida]], me enseñó que el indomable espíritu humano tiene poder, que no necesito creer en mí, necesito creer en la versión de mí en la que cree la gente y que eventualmente ya no necesito creer ni en ellos ni en mí, pero creer en la versión de mí que ya cree en mí.',
      closing: true,
    },
    {
      type: 'paragraph',
      text: 'Gurren Lagann es una serie que me enseñó que ante la indiferente realidad del universo tienes el poder de seguir adelante, de que el propósito lo creas tú mismo, de que todo vale la pena y que nada es imposible, porque aun 99% de probabilidad de fracaso significa que existe un 1% de probabilidad de éxito, y te mereces y [[te debes a ti mismo el intentarlo, el seguir adelante y el forjar tu propio taladro capaz de atravesar los cielos]].',
      closing: true,
    },
    {
      type: 'signoff',
      lines: [
        'Gracias Gainax, Gracias Gurren Lagann, Gracias Kamina',
        'y sobre todo *Gracias Simon*.',
      ],
    },
  ],
};
