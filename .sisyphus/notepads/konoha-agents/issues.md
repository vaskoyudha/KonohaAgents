# KonohaAgents — Issues & Gotchas

## [2026-03-21] Pre-execution Notes

### Known Constraints
- npm publish in T39 requires `npm login` before execution — executor must handle this
- Vercel deploy URL is unknown until T39 runs — placeholder `<vercel-url>` used in QA
- bun is the package manager — use `bun add` not `npm install`
- tsup must produce: dist/cli.mjs (CLI) + dist/index.mjs + dist/index.cjs (core)
- GitHub remote requires authentication — executor must have git credentials configured
- `create-next-app` goes inside `website/` subdirectory, NOT project root

### Wave 1 Parallelization Note
- T1 (git init) and T2 (schema) are FULLY independent
- T3 (dir structure) depends on T1, T5 (fixtures) depends on T2, T6 (loader) depends on T2
- T4 (build config) depends on T1 (needs package.json to add scripts to)
- In practice: T1 + T2 can start simultaneously; T3/T4 start after T1, T5/T6 after T2
