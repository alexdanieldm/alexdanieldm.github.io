import next from 'eslint-config-next/core-web-vitals';

/**
 * eslint-config-next ships a real flat config from v15.3, and its
 * core-web-vitals entry already pulls in the TypeScript rules. No FlatCompat
 * shim, which in v16 throws on a circular structure while validating anyway.
 */
const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'] },
  ...next,
];

export default config;
