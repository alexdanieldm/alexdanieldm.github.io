import next from 'eslint-config-next/core-web-vitals';

/**
 * eslint-config-next ships a real flat config from v15.3, and its
 * core-web-vitals entry already pulls in the TypeScript rules. No FlatCompat
 * shim, which in v16 throws on a circular structure while validating anyway.
 */
const config = [
  {
    /* Globbed at any depth, not just the root. A sibling session working in a
       .claude/worktrees/<name> checkout has its own .next, and the root-only
       pattern happily linted forty files of someone else's build output. */
    ignores: ['**/.next/**', '**/out/**', '**/node_modules/**', '.claude/**', 'next-env.d.ts'],
  },
  ...next,
];

export default config;
