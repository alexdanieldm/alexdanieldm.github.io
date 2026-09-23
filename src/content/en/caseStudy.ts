/** @fileoverview CLI case study copy, English. `[[…]]` marks a highlight. */

export const caseStudy = {
  back: 'Back to work',
  metaDescription:
    'One command that makes a deploy safe and puts the same standards in every repository ' +
    'while it is at it. Node.js and TypeScript.',
  eyebrow: 'Developer tooling',
  title: 'A CLI the whole team ships through',
  lede:
    'One command that makes a deploy safe, and puts the same standards in every repository ' +
    'while it is at it.',

  facts: [
    { label: 'Role', value: 'Author and maintainer', note: 'my own initiative' },
    { label: 'Built with', value: 'Node.js, TypeScript', note: 'git internals, platform APIs' },
    { label: 'Used by', value: 'The engineering team', note: 'on every client project' },
    { label: 'Status', value: 'Actively maintained', note: 'versioned and documented' },
  ],

  why: {
    heading: 'Why it exists',
    paragraphs: [
      'Two problems, both worth solving once rather than every week.',
      'Neither looked like a problem from outside. Nothing was broken, nothing was on fire, and ' +
        'both had a workaround a careful person could hold in their head. That is what made them ' +
        'expensive: [[the cost was spread thin across every week and every person]], so it never ' +
        'arrived as something to fix, only as something to be careful about.',
      'The first is that a project can have [[two owners writing into one file tree]]. Developers ' +
        'own the code, while someone else, a client or a QA reviewer, owns the configuration they ' +
        'edit through a live editor, and git only ever had a copy of one of those. Deploy a ' +
        'branch over the top and [[the half you do not own is gone, silently]]. Everyone knew the ' +
        'rule. It was written down. It still went wrong, because knowing a rule and remembering ' +
        'it at 6pm on a Friday are different things. So syncing needed a senior developer ' +
        'watching, which meant waiting for one.',
      'The second is consistency. Across a lot of client projects, conventions drift: different ' +
        'folder structures, different patterns, different AI rules, [[different output depending ' +
        'on who picked the job up]]. Code review catches that eventually, which is a slow and ' +
        'expensive place to catch it.',
      'I started building this on my own initiative to fix both, because they turned out to be ' +
        'the same problem: [[things the team is supposed to remember should be things the tool ' +
        'already does]].',
      'Most of the work was not the code. It was watching where the time actually went, ' +
        'separating the part that was genuinely different per client from the part we were ' +
        'rebuilding every time, and deciding [[what the tool should refuse to do]] rather than ' +
        'only what it should make easy. Writing the commands afterwards was the short part.',
      'None of it is specific to one platform. The shape of it, two owners writing into one tree ' +
        'and conventions drifting apart across projects, turns up anywhere a team runs more than ' +
        'a handful of repositories.',
    ],
  },

  terminals: {
    label: 'The tool running',
    safeSync: 'the safe sync',
    standards: 'the standards',
    standardsNote: ['One source of truth, shipped with', 'the tool instead of remembered.'],
  },

  guarantees: {
    heading: 'What it guarantees',
    note:
      'Two promises about safety, two about consistency. Each one is something nobody has to ' +
      'hold in their head any more.',
    cards: [
      {
        title: 'Nothing overwrites what it does not own',
        body:
          'Whatever someone else edited moves one way, code moves the other. The tool will not ' +
          'perform the write that crosses that line, whatever you ask it for.',
      },
      {
        title: 'There is always a way back',
        body:
          'The remote state is committed and tagged before anything is written, so the version ' +
          'that existed before a sync stays in git history and can be pushed back in one command.',
      },
      {
        title: 'Conventions arrive with the tool',
        body:
          'Every client is its own thing, so no two builds are identical. What does not need ' +
          'reinventing each time is the shared groundwork: patterns, structure and scaffolding ' +
          'are installed rather than copied out of whichever repository someone last had open.',
      },
      {
        title: 'The AI rules travel with it',
        body:
          'Our coding standards and agent definitions are distributed into every repository from ' +
          '[[one source of truth]], so everyone’s AI assistance follows the same conventions and ' +
          'the output stays consistent across the team.',
      },
    ],
  },

  matters: {
    heading: 'Why this matters on a team',
    paragraphs: [
      'Nobody asked me to build this. I noticed the same problem happening repeatedly, and that ' +
        'the cost of it was being paid by whoever was most senior and least available.',
      'That is the part worth knowing about me. [[I will notice the thing the team keeps working ' +
        'around]], and I will go and fix it properly rather than getting better at avoiding it. ' +
        'It means a junior developer can deploy without supervision, a new project is consistent ' +
        'on day one, and the senior people get their afternoons back.',
      'It also means I am comfortable [[owning something end to end and then continuing to own ' +
        'it]]: designing it, building it, versioning it, documenting it, and keeping it working ' +
        'while other people depend on it every day. Building it took weeks. Maintaining it is ' +
        'ongoing, and that is the part that decides whether a tool like this survives contact ' +
        'with a real team.',
    ],
    cta: 'Talk about this project',
  },
};
