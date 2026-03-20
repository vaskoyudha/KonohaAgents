# KonohaAgents — Architectural Decisions

## [2026-03-21] Decisions Made During Planning

### Agent File Format
- Decision: Two files per agent (config.yaml + prompt.md + examples.json)
- Rationale: Cleaner than single YAML, prompt.md can be long without YAML escaping issues
- NOT REVERSIBLE without breaking all content tasks

### Schema-First Approach
- Decision: Zod schema (T2) must be complete before any content tasks
- Rationale: All 500 agents are validated against this schema
- ALL eval_criteria, system_prompt, tools fields are REQUIRED (not optional)

### Build Tool: tsup
- Decision: tsup only, NOT tsc or webpack
- Rationale: Dual ESM/CJS, dts generation, tree-shaking in one tool

### Website: Static Export
- Decision: Next.js with output: 'export' (zero server)
- Rationale: Vercel hosting, no backend needed

### Package Manager: bun
- Decision: bun (not npm/yarn/pnpm)
- Rationale: Speed, consistency

### No Tests Framework
- Decision: No Jest/Vitest — quality via konoha validate + eval_criteria
- Rationale: User chose this, schema validation is the quality gate

### Website Dark Mode
- Decision: Dark mode is the DEFAULT (page loads dark)
- Rationale: Developer aesthetic, star-worthy repos use dark-first

### Transpiler Targets (EXACTLY 4, NO MORE)
- Cursor (.mdc), CLAUDE.md, copilot-instructions.md, OpenAI Assistants JSON
- NO LangChain, CrewAI, AutoGen, MCP

### npm Package Size Target
- Target: < 10MB packed
- Include: dist/, agents/, README.md, LICENSE
- Exclude: website/, .sisyphus/, test-fixtures/, .github/
