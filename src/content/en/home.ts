/**
 * @fileoverview Home page copy, English.
 *
 * `[[double brackets]]` mark a highlighted span. Everything here is prose; the
 * only structure is the shape of the page itself.
 */

export const home = {
  banner: {
    eyebrow: 'Full Stack Engineer',
    title: 'I build web applications, from the first conversation to the last release.',
    lede:
      'Based in Barcelona, working across the whole process: scoping and planning, the ' +
      'interface, the code, the integrations, and seeing it through to release.',
    seeWork: 'See the work',
    downloadCv: 'Download CV',
  },

  about: {
    heading: 'About',
    note: ['Barcelona, Spain', 'Spanish native, English C2', 'B.Eng. Computer Engineering'],
    paragraphs: [
      'Most of my work is in [[TypeScript, React and Next.js]]: custom frontends, headless ' +
        'architectures, and the GraphQL and REST integrations that connect them to real data, ' +
        'across web applications and e-commerce alike.',
      'I am comfortable in [[Figma]] as well as in code. I have designed an app end to end, ' +
        'every screen and interaction, and that left me a design sense I still use. I may not ' +
        'start a design from zero, but I can read one properly, see how it will behave once it ' +
        'is in a browser, and spot where it falls down on user experience, sizing or ' +
        'responsiveness. Telling a good design from a bad one matters more in agency work than ' +
        'it sounds.',
      'I’ve been involved across the whole process, not only the code: [[breaking a project ' +
        'down, estimating it, and handling the changes that always arrive halfway through]], ' +
        'along with [[the workflows, documentation and internal tooling]] that keep a team ' +
        'shipping consistently. That is the work I care most about.',
      'Outside work I train most days and I like putting myself in situations I’m not ' +
        'comfortable in yet, which turns out to be good practice for everything else. I read a ' +
        'lot of manga. [[Steal Like an Artist]] is still the book that shaped how I work: learn ' +
        'in the open, and give back what you borrowed.',
    ],
  },

  work: {
    heading: 'Selected work',
    kicker: 'Tooling, data, interface',
    readCaseStudy: 'Read the case study',
    alsoLabel: 'Also',

    cli: {
      index: '01',
      discipline: 'Developer tooling',
      stack: ['Node.js, TypeScript', 'Git internals', 'Release workflows'],
      title: 'A CLI the whole team ships through',
      lede: 'One command, so nobody has to wait on the tech lead to deploy safely.',
      paragraphs: [
        'Syncing a theme used to need someone senior watching, because a careless push destroys ' +
          'work someone else owns, a client or QA editing live, that git never had a copy of. I ' +
          'started this on my own initiative to take that bottleneck out. It keeps the two sides ' +
          'of a project separate, tags a backup before it writes anything, and [[stops dead at a ' +
          'live target]].',
        'The other half is consistency. The same tool installs our coding conventions, project ' +
          'scaffolding and AI rules into every repository from one source of truth, so [[the ' +
          'output looks the same whoever built it]]. Standards that ship with the tool do not ' +
          'drift the way a wiki page does, and they arrive with every update instead of being ' +
          'remembered.',
      ],
    },

    data: {
      index: '02',
      discipline: 'APIs & data',
      stack: ['GraphQL, REST APIs', 'Next.js, TypeScript'],
      title: 'Real data, from whatever platform holds it',
      lede: 'The frontend decides how things look. The API decides what is true.',
      paragraphs: [
        'A lot of my work is joining a custom interface to a system that already owns the data. ' +
          'I build the layer in between, so the platform keeps doing what it is genuinely good ' +
          'at and [[the interface owes it nothing else]]. Swap the backend and the interface ' +
          'barely notices.',
      ],
      diagram: {
        caption: 'One interface, several sources of truth',
        clientName: 'Custom frontend',
        clientStack: 'Next.js, React, TypeScript',
        sources: [
          { protocol: 'GraphQL', system: 'Commerce platform' },
          { protocol: 'REST', system: 'Backend services' },
          { protocol: 'Realtime', system: 'Chat & live updates' },
        ],
      },
    },

    mvp: {
      index: '03',
      discipline: 'Product frontend',
      stack: ['React, TypeScript', 'React Native', 'Figma'],
      title: 'From a design file to a full MVP',
      lede: 'Every screen, every state, web and mobile.',
      paragraphs: [
        'I built the frontend of a product platform from Figma designs in React and TypeScript: ' +
          'responsive desktop and mobile interfaces, authentication, multi step forms, map ' +
          'integrations and real time chat, plus a React Native companion app alongside it.',
        'I was building the interface well before the backend work started, so [[most of the ' +
          'time I defined the data contract]]. For the chat I specified exactly what I needed, ' +
          'which properties, and how it had to be shaped, then worked with the backend developer ' +
          'until the API matched. Deciding what the frontend actually needs, and saying so ' +
          'early, is most of what makes the rest of the build calm.',
      ],
      diagram: {
        caption: 'Interface surfaces, schematic rather than a screenshot',
        surfaces: ['Map & routing', 'Real time chat', 'Auth & forms'],
      },
    },

    also: [
      {
        title: 'Storefronts, zero to live',
        body:
          'Complete e-commerce builds taken from nothing to a live store, and the template they ' +
          'start from: modular, reusable, and isolated enough that a section can move to another ' +
          'project without dragging the rest along.',
        stack: 'Liquid, TypeScript, SCSS',
      },
      {
        title: 'Crypto',
        body:
          'A cross platform desktop app that encrypts and decrypts files of any size, using [[a ' +
          'hybrid public and private key system I designed]]. Built end to end, including the ' +
          'interface.',
        stack: 'Electron, Python, Node.js',
      },
      {
        title: 'Serverless monetization',
        body:
          'An AWS Lambda function that unlocked yearly membership purchases, adding a new ' +
          'revenue path without disturbing the architecture around it.',
        stack: 'AWS Lambda, Node.js',
      },
    ],
  },

  tech: {
    heading: 'What I build with',
    kicker: 'Tools, not identity',
  },

  approach: {
    heading: 'How I work',
    lede: 'Three things I believe, none of which are about a framework.',
    cards: [
      {
        index: '01',
        title: 'Write it for whoever comes next',
        body:
          'We over engineer things, and we forget that the person opening the file will not be ' +
          'us. I aim for code that is clean and modular enough that a piece can be lifted into ' +
          'another project without breaking, because good code does not fall apart once you take ' +
          'it out of its context. [[Finishing something genuinely maintainable]] is the part I ' +
          'am proudest of.',
      },
      {
        index: '02',
        title: 'Design and build are one job',
        body:
          'When you understand both sides properly, the design and the code [[speak the same ' +
          'language and aim at the same thing]]. I can read a Figma file, push back on it where ' +
          'it needs pushing back on, and build it without guessing what was meant. That is worth ' +
          'more than any handoff document.',
      },
      {
        index: '03',
        title: 'Be transparent, and be around',
        body:
          'Being clear about what I am doing, how it is going and where the team actually stands ' +
          'matters more than most technical decisions. And [[being present while someone works ' +
          'through a problem]] is worth more than we tend to give it credit for, as a developer ' +
          'and as a person.',
      },
    ],
  },

  cta: {
    title: 'Let’s talk about what you’re building.',
    lede: 'Happy to hear about a role, a project, or anything on this site you want to go deeper on.',
    button: 'Get in touch',
  },
};
