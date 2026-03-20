import { defineConfig } from 'tsup'

export default defineConfig([
  // Core library
  {
    entry: { index: 'packages/core/src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    clean: true,
    outDir: 'dist',
  },
  // CLI tool
  {
    entry: { cli: 'packages/cli/src/cli.ts' },
    format: ['esm'],
    dts: false,
    splitting: false,
    outDir: 'dist',
    banner: { js: '#!/usr/bin/env node' },
  },
])
