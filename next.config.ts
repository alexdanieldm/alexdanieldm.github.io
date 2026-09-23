import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * Static export, because the host is GitHub Pages: there is no Node process at
 * runtime, only files. Everything below follows from that.
 *
 * No `basePath`. This repo is `alexdanieldm.github.io`, a user site served from
 * the domain root, not a project site served from `/<repo>/`. The Gatsby config
 * this replaces carried `pathPrefix: "/alexdanieldm.github.io"`, left over from
 * when the repo was named `alexdanieldm.com`; it was wrong and it stays gone.
 */
const nextConfig: NextConfig = {
  output: 'export',

  /* Pages has no image optimiser to call, so the loader has to be a no-op. */
  images: { unoptimized: true },

  /* `/contact/` is emitted as `contact/index.html`. Pages serves a directory's
     index without a rewrite rule, which a bare `contact.html` would need. */
  trailingSlash: true,

  reactStrictMode: true,

  sassOptions: {
    /* Lets every module say `@use 'abstracts' as *` regardless of its depth. */
    loadPaths: [path.join(process.cwd(), 'src/styles')],
    additionalData: `@use 'abstracts' as *;\n`,
  },
};

export default nextConfig;
