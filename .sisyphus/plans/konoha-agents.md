# KonohaAgents — 500 Ultra-Detailed Indonesian AI Agents Library

## TL;DR

> **Quick Summary**: Build a star-worthy open-source library of 500 ultra-detailed AI agent definitions targeting Indonesian users, with a premium Next.js website, cross-platform CLI tool (transpiler for Cursor/Claude/Copilot/OpenAI), and npm package — all with authentic Indonesian domain expertise.
> 
> **Deliverables**:
> - 500 agent definitions (YAML metadata + Markdown prompts) across 10 Indonesian-specific categories
> - CLI tool: `konoha list`, `konoha search`, `konoha validate`, `konoha sync --target <platform>`
> - Premium Next.js website (dark mode, agent browser, search, copy-to-clipboard)
> - npm package: `konoha-agents`
> - Bilingual README (English + Bahasa Indonesia)
> - Deployed to Vercel + published to npm
> 
> **Estimated Effort**: XL
> **Parallel Execution**: YES — 6 waves, peak 23 concurrent tasks
> **Critical Path**: T1 → T2 → T10 → T13-31 → T37 → F1-F4

---

## Context

### Original Request
Build a "super powerful" open-source project (KonohaAgents) — a library of 500 AI agents targeting Indonesian users. Agents must be deeply detailed (NOT simple personas) with rich system prompts, knowledge domains, tools, and example conversations. Must work across Claude, ChatGPT, Cursor, Copilot. Include a premium website and CLI. Commit and push every step. Repository: https://github.com/vaskoyudha/KonohaAgents.git

### Interview Summary
**Key Discussions**:
- **Categories**: All 10 Indonesian-specific categories, weighted by demand (Gov/Business/Finance get 75 each)
- **Format**: YAML metadata + Markdown prompt body (two files per agent: `config.yaml` + `prompt.md`)
- **CLI**: Full cross-platform transpiler (`konoha sync --target cursor|claude|copilot|openai`)
- **Website**: Premium Next.js + Tailwind + dark mode on Vercel
- **Package**: `konoha-agents` on npm, MIT license
- **Language**: Agents in Bahasa Indonesia, website bilingual, README in English
- **Tests**: No automated tests; agents have built-in eval_criteria; `konoha validate` for schema validation
- **Quality**: Ultra-detailed agents — minimum 150 words system prompt, 2+ turn examples, specific eval criteria

**Research Findings**:
- Star-worthy repos use structured schemas, CLI tools, eval criteria, domain-driven directories
- Indonesian research: 10 categories mapped with authentic terminology, real pain points, specific agent ideas
- Transpiler pattern: convert neutral YAML → platform-specific formats (.mdc, CLAUDE.md, etc.)
- Recommended libraries: Commander.js (CLI), Zod (validation), tsup (bundling), js-yaml (parsing)

### Metis Review
**Identified Gaps** (all addressed in plan):
- Git repo not initialized — made Task 1
- Agent ID naming convention needed — `{category-slug}/{agent-slug}` pattern adopted
- `konoha validate` command essential — included as core CLI feature
- Schema-first approach (Zod as TDD anchor) — schema is Task 2, before any content
- Golden examples first (1 per category), then batch — Task 10 creates 10 golden agents
- Two files per agent (config.yaml + prompt.md) — cleaner than single YAML
- Website uses static export (`output: 'export'`) — zero-server deployment
- Anti-slop guardrails critical for 500 agents — detailed content quality gates defined
- npm package size concern — bundled JSON index + raw YAML/MD, target <10MB

---

## Work Objectives

### Core Objective
Create the definitive open-source library of Indonesian AI agents — 500 ultra-detailed, cross-platform agent definitions with a premium website and CLI tooling that makes the repo genuinely star-worthy.

### Concrete Deliverables
- `agents/` — 500 agent folders (10 categories), each with `config.yaml` + `prompt.md` + `examples.json`
- `packages/cli/` — CLI tool (`konoha` command) with list, search, validate, sync
- `packages/core/` — Core loader library for programmatic access
- `website/` — Next.js website deployed to Vercel
- `schemas/` — Zod schema + JSON Schema for agent validation
- `README.md` — Bilingual, with badges, screenshots, usage guide
- `AGENTS.md` — Auto-generated registry of all 500 agents

### Definition of Done
- [ ] `npx konoha validate agents/` exits 0 with "500/500 agents valid"
- [ ] `npx konoha list` displays all 500 agents grouped by category
- [ ] `npx konoha search "pajak"` returns relevant agents
- [ ] `npx konoha sync --target cursor --agent gov-legal/asisten-oss-kbli --dry-run` outputs valid .mdc
- [ ] Website loads at Vercel URL with all 500 agents browsable
- [ ] `npm install konoha-agents` installs successfully
- [ ] All agents have ≥150 word system prompts, ≥2 eval criteria, ≥1 example conversation
- [ ] Zero agents have placeholder or stub content

### Must Have
- 500 complete, ultra-detailed agents (not stubs)
- Every agent has: system prompt, persona, knowledge domains, tools, eval criteria, examples, platform configs
- CLI with validate, list, search, sync commands
- Cross-platform transpiler (Cursor .mdc, CLAUDE.md, copilot-instructions.md, OpenAI JSON)
- Premium dark-mode website with agent browser and search
- Authentic Indonesian terminology (real law numbers, real agency names, real form codes)
- MIT license
- Bilingual README

### Must NOT Have (Guardrails)
- **NO simple/generic personas** — every agent must have deep domain-specific knowledge and actionable capabilities
- **NO English in Bahasa content** — except proper nouns and established technical terms
- **NO duplicate agents** — each must solve a distinct problem (no cosmetic renaming across categories)
- **NO stub/placeholder content** — `konoha validate` must pass before any agent is committed
- **NO backend/API server** — website is static, CLI is offline-only
- **NO user accounts, favorites, or personalization** on website (v2)
- **NO playground or "try this agent"** feature (v2)
- **NO MCP server or executable tool definitions** (v2) — tool definitions are descriptive schemas only
- **NO agent handoff execution** (v2) — handoff fields are descriptive text only
- **NO extra target formats** beyond the 4 specified (no LangChain, CrewAI, AutoGen)
- **NO network calls in CLI** — fully offline, all agents bundled
- **NO analytics beyond basic Vercel Analytics**
- **NO tests framework** — validation via `konoha validate` + built-in eval_criteria

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (greenfield project)
- **Automated tests**: None — agents validated by `konoha validate` (Zod schema), CLI verified by command execution
- **Framework**: N/A
- **Quality Gate**: Every agent batch must pass `konoha validate` before commit

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Agent content**: Use Bash — `npx konoha validate agents/{category}/` → exit 0
- **CLI commands**: Use Bash — run command, assert output format and content
- **Website**: Use Playwright — navigate, interact, assert DOM, screenshot
- **Build/Package**: Use Bash — `npm pack`, extract, verify structure

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 6 parallel tasks, all quick):
├── T1: Git init + repo setup + package.json + LICENSE [quick]
├── T2: Agent Zod schema + TypeScript types [quick]
├── T3: Directory structure scaffolding [quick]
├── T4: TypeScript + tsup build configuration [quick]
├── T5: Test fixtures (valid/invalid/edge-case agents) [quick]
└── T6: Agent template + generation utilities [quick]

Wave 2 (CLI Core + Golden Examples + Website Init — 6 parallel tasks):
├── T7: CLI core + konoha validate command (depends: T2, T4) [deep]
├── T8: CLI browse: list + search commands (depends: T2, T4) [unspecified-high]
├── T9: All 4 transpilers + konoha sync command (depends: T2, T4) [deep]
├── T10: 10 Golden Reference Agents — 1 per category (depends: T2, T3, T6) [deep]
├── T11: Next.js website setup + Tailwind + dark mode (depends: T1) [visual-engineering]
└── T12: Website homepage: hero, stats, category grid (depends: T11) [visual-engineering]

Wave 3 (ALL Content + Website Pages — 23 parallel tasks, MAX PARALLEL):
├── T13: Gov & Legal: Perizinan & Birokrasi — 25 agents (depends: T2, T10) [unspecified-high]
├── T14: Gov & Legal: Hukum & Dokumen — 25 agents (depends: T2, T10) [unspecified-high]
├── T15: Gov & Legal: Regulasi & Kebijakan — 24 agents (depends: T2, T10) [unspecified-high]
├── T16: Business: E-commerce & Marketplace — 25 agents (depends: T2, T10) [unspecified-high]
├── T17: Business: Pajak & Keuangan Usaha — 25 agents (depends: T2, T10) [unspecified-high]
├── T18: Business: Marketing & Operasional — 24 agents (depends: T2, T10) [unspecified-high]
├── T19: Finance: Perbankan & Investasi — 25 agents (depends: T2, T10) [unspecified-high]
├── T20: Finance: Fintech & Digital — 25 agents (depends: T2, T10) [unspecified-high]
├── T21: Finance: Konsumen & OJK — 24 agents (depends: T2, T10) [unspecified-high]
├── T22: Education: Kurikulum & Guru — 30 agents (depends: T2, T10) [unspecified-high]
├── T23: Education: Siswa & Ujian — 29 agents (depends: T2, T10) [unspecified-high]
├── T24: Health: BPJS & Layanan — 22 agents (depends: T2, T10) [unspecified-high]
├── T25: Health: Gaya Hidup & Tradisional — 22 agents (depends: T2, T10) [unspecified-high]
├── T26: Tech: Startup & API Indonesia — 20 agents (depends: T2, T10) [unspecified-high]
├── T27: Tech: Developer Tools & Karir — 19 agents (depends: T2, T10) [unspecified-high]
├── T28: Agriculture & Maritime — 34 agents (depends: T2, T10) [unspecified-high]
├── T29: Religion & Social — 34 agents (depends: T2, T10) [unspecified-high]
├── T30: Culture & Creative — 29 agents (depends: T2, T10) [unspecified-high]
├── T31: Transport & Logistics — 29 agents (depends: T2, T10) [unspecified-high]
├── T32: Website: Agent listing page + search + filters (depends: T11, T10) [visual-engineering]
├── T33: Website: Agent detail page + copy (depends: T11, T10) [visual-engineering]
├── T34: Website: Indonesian guide/docs page (depends: T11) [visual-engineering]
└── T35: AGENTS.md auto-generated registry (depends: T2, T10) [quick]

Wave 4 (Polish & Deploy — 4 tasks):
├── T36: README.md bilingual + badges (depends: all content) [writing]
├── T37: Website: Static export + SEO + Vercel config (depends: T32, T33, T34) [quick]
├── T38: npm package preparation + .npmignore (depends: T7, T8, T9) [quick]
└── T39: Deploy: Vercel + npm publish + GitHub setup + final push (depends: T36, T37, T38) [quick]

Wave FINAL (Verification — 4 parallel tasks, then user okay):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA (unspecified-high + playwright)
└── F4: Scope fidelity check (deep)
→ Present results → Get explicit user okay
```

**Critical Path**: T1 → T2 → T10 → T13-31 (agent content) → T36 → T39 → F1-F4 → user okay
**Parallel Speedup**: ~80% faster than sequential
**Max Concurrent**: 23 (Wave 3)

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| T1 | — | T3, T4, T11 |
| T2 | — | T5, T6, T7-T10, T13-T35 |
| T3 | T1 | T10 |
| T4 | T1 | T7, T8, T9 |
| T5 | T2 | T7 |
| T6 | T2 | T10 |
| T7 | T2, T4, T5 | T38 |
| T8 | T2, T4 | T38 |
| T9 | T2, T4 | T38 |
| T10 | T2, T3, T6 | T13-T35 |
| T11 | T1 | T12, T32-T34 |
| T12 | T11 | T37 |
| T13-T31 | T2, T10 | T35, T36 |
| T32-T34 | T11, T10 | T37 |
| T35 | T2, T10 | T36 |
| T36 | all content | T39 |
| T37 | T12, T32-T34 | T39 |
| T38 | T7-T9 | T39 |
| T39 | T36-T38 | F1-F4 |
| F1-F4 | T39 | — |

### Agent Dispatch Summary

- **Wave 1**: **6** — T1-T6 → all `quick`
- **Wave 2**: **6** — T7 → `deep`, T8 → `unspecified-high`, T9 → `deep`, T10 → `deep`, T11-T12 → `visual-engineering`
- **Wave 3**: **23** — T13-T31 → all `unspecified-high`, T32-T34 → `visual-engineering`, T35 → `quick`
- **Wave 4**: **4** — T36 → `writing`, T37-T38 → `quick`, T39 → `quick`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

### Wave 1 — Foundation (6 parallel tasks)

- [ ] 1. Git Init + Repository Setup

  **What to do**:
  - Initialize git repo: `git init && git remote add origin https://github.com/vaskoyudha/KonohaAgents.git`
  - Create `package.json` with name `konoha-agents`, version `1.0.0`, MIT license, proper `exports` field for dual ESM/CJS
  - Create `LICENSE` (MIT)
  - Create `.gitignore` (node_modules, dist, .next, .env, *.tgz)
  - Create skeleton `README.md` (just title + "Coming soon" — full README is Task 36)
  - First commit + push to establish remote

  **Must NOT do**:
  - Do NOT write the full README yet (that's Task 36)
  - Do NOT add dependencies yet (other tasks handle that)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T2-T6)
  - **Blocks**: T3, T4, T11
  - **Blocked By**: None

  **References**:
  - Remote: `https://github.com/vaskoyudha/KonohaAgents.git`
  - npm dual ESM/CJS exports pattern: `"exports": { ".": { "import": "./dist/index.mjs", "require": "./dist/index.cjs" } }`

  **Acceptance Criteria**:
  - [ ] `.git/` exists with remote `origin` pointing to correct URL
  - [ ] `package.json` has correct name, version, license, exports
  - [ ] `LICENSE` file contains MIT license text
  - [ ] `.gitignore` covers node_modules, dist, .next
  - [ ] Initial commit pushed to remote

  **QA Scenarios**:
  ```
  Scenario: Repository initialization
    Tool: Bash
    Steps:
      1. Run: git remote -v
      2. Assert output contains: origin https://github.com/vaskoyudha/KonohaAgents.git
      3. Run: cat package.json | node -e "const p=require('fs').readFileSync('/dev/stdin','utf8');const j=JSON.parse(p);console.log(j.name,j.license)"
      4. Assert output: konoha-agents MIT
    Expected Result: Remote configured, package.json valid
    Evidence: .sisyphus/evidence/task-1-repo-init.txt
  ```

  **Commit**: YES
  - Message: `init: repository setup with package.json, tsconfig, LICENSE, and project structure`
  - Files: `package.json, LICENSE, .gitignore, README.md`

- [ ] 2. Agent Zod Schema + TypeScript Types

  **What to do**:
  - Install Zod: `bun add zod`
  - Create `schemas/agent.schema.ts` — the Zod schema defining ALL required fields for an agent:
    ```
    identity: { id, name, name_en, version, author, category, tags[] }
    persona: { personality, tone, language, communication_style }
    instructions: { mission, rules[], style_guide }
    system_prompt_file: string (relative path to prompt.md)
    capabilities: { tools[]: { name, description, parameters_schema }, knowledge_domains[] }
    context_requirements: { required_context[], optional_context[] }
    handoffs: { condition, target_agent_id, description }[]
    eval_criteria: { question, expected_behavior, gold_standard_answer }[] (min 2)
    examples_file: string (relative path to examples.json)
    platform_configs: { openai: { model, temperature, top_p }, anthropic: { model, max_tokens }, cursor: { globs[], alwaysApply } }
    metadata: { difficulty_level, estimated_tokens, last_updated, related_agents[] }
    ```
  - Create `schemas/agent.json-schema.json` — auto-generated JSON Schema from Zod (for IDE linting)
  - Create `packages/core/src/schema.ts` — export the schema + TypeScript types
  - Create `packages/core/src/types.ts` — exported TypeScript interfaces derived from Zod (`z.infer<typeof AgentSchema>`)

  **Must NOT do**:
  - Do NOT make any field optional that should be required (eval_criteria, system_prompt, tools are REQUIRED)
  - Do NOT use `z.any()` or `z.unknown()` for any field

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1, T3-T6)
  - **Blocks**: T5, T6, T7-T10, T13-T35
  - **Blocked By**: None

  **References**:
  **Pattern References**:
  - Cursor .mdc frontmatter fields: `description`, `globs`, `alwaysApply`
  - CLAUDE.md: plain Markdown, no frontmatter
  - copilot-instructions.md: Markdown at `.github/copilot-instructions.md`, optional `agent` + `description` frontmatter
  - OpenAI Assistants v2: `name`, `instructions`, `model`, `tools`, `tool_resources`

  **External References**:
  - Zod docs: https://zod.dev/?id=basic-usage
  - Agent schema fields from research (see Context > Research Findings)

  **Acceptance Criteria**:
  - [ ] `schemas/agent.schema.ts` exports a complete Zod schema with ALL fields listed above
  - [ ] `packages/core/src/types.ts` exports `AgentConfig` type derived from schema
  - [ ] Schema rejects objects missing required fields (eval_criteria, system_prompt, tools)
  - [ ] Schema accepts the test fixture valid agent (Task 5)

  **QA Scenarios**:
  ```
  Scenario: Schema validates correctly
    Tool: Bash
    Steps:
      1. Create a minimal test: bun -e "import { AgentSchema } from './schemas/agent.schema'; const result = AgentSchema.safeParse({}); console.log(result.success ? 'FAIL:accepted-empty' : 'PASS:rejected-empty')"
      2. Assert output contains: PASS:rejected-empty
    Expected Result: Empty object rejected by schema
    Evidence: .sisyphus/evidence/task-2-schema-validation.txt

  Scenario: Schema exports TypeScript types
    Tool: Bash
    Steps:
      1. Run: bun -e "import { AgentConfig } from './packages/core/src/types'; console.log(typeof AgentConfig === 'undefined' ? 'FAIL' : 'PASS')"
    Expected Result: Types importable without error
    Evidence: .sisyphus/evidence/task-2-types-export.txt
  ```

  **Commit**: YES (groups with T1)
  - Message: `feat(schema): add Zod agent schema with TypeScript types and JSON Schema`
  - Files: `schemas/*, packages/core/src/schema.ts, packages/core/src/types.ts`

- [ ] 3. Directory Structure Scaffolding

  **What to do**:
  - Create the complete directory structure:
    ```
    konoha-agents/
    ├── agents/
    │   ├── gov-legal/          # Government & Legal (75 agents)
    │   ├── business/           # Business & UMKM (75 agents)
    │   ├── finance/            # Finance & Banking (75 agents)
    │   ├── education/          # Education & Academic (60 agents)
    │   ├── health/             # Health & Wellness (45 agents)
    │   ├── tech/               # Tech & Developer (40 agents)
    │   ├── agriculture/        # Agriculture & Maritime (35 agents)
    │   ├── religion/           # Religion & Social (35 agents)
    │   ├── culture/            # Culture & Creative (30 agents)
    │   └── transport/          # Transportation & Logistics (30 agents)
    ├── packages/
    │   ├── cli/                # CLI tool source
    │   │   └── src/
    │   └── core/               # Core loader library
    │       └── src/
    ├── schemas/                # Zod + JSON Schema
    ├── website/                # Next.js website
    └── test-fixtures/          # Valid/invalid agent fixtures
    ```
  - Create `.gitkeep` in empty directories to preserve structure
  - Create `agents/categories.json` — metadata file listing all categories with:
    ```json
    [
      { "slug": "gov-legal", "name": "Government & Legal", "name_id": "Pemerintahan & Hukum", "target_count": 75, "icon": "🏛️" },
      ...
    ]
    ```

  **Must NOT do**:
  - Do NOT create agent content yet (that's Waves 2-3)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1-T2, T4-T6)
  - **Blocks**: T10
  - **Blocked By**: T1 (needs git repo)

  **Acceptance Criteria**:
  - [ ] All 10 category directories exist under `agents/`
  - [ ] `packages/cli/src/` and `packages/core/src/` exist
  - [ ] `agents/categories.json` has 10 entries with correct slugs and target counts
  - [ ] Total target_count in categories.json = 500

  **QA Scenarios**:
  ```
  Scenario: Directory structure complete
    Tool: Bash
    Steps:
      1. Run: ls agents/ | wc -l
      2. Assert output: 10 (or 11 with categories.json)
      3. Run: node -e "const c=require('./agents/categories.json');console.log(c.reduce((a,b)=>a+b.target_count,0))"
      4. Assert output: 500
    Expected Result: 10 category dirs, total 500 target count
    Evidence: .sisyphus/evidence/task-3-directory-structure.txt
  ```

  **Commit**: YES (groups with T1)
  - Message: `chore: create project directory structure and category metadata`
  - Files: `agents/*/`, `packages/*/`, `agents/categories.json`

- [ ] 4. TypeScript + tsup Build Configuration

  **What to do**:
  - Install dev dependencies: `bun add -d typescript tsup @types/node`
  - Create `tsconfig.json` with strict mode, ESM target, path aliases
  - Create `packages/cli/tsconfig.json` extending root
  - Create `packages/core/tsconfig.json` extending root
  - Create `packages/cli/tsup.config.ts` — bundles CLI to `dist/cli.mjs` with shebang
  - Create `packages/core/tsup.config.ts` — bundles core to dual ESM/CJS (`dist/index.mjs` + `dist/index.cjs`)
  - Add build scripts to `package.json`: `"build": "tsup"`, `"build:cli": "tsup --config packages/cli/tsup.config.ts"`

  **Must NOT do**:
  - Do NOT use tsc for building (use tsup only)
  - Do NOT add webpack, esbuild directly, or rollup

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1-T3, T5-T6)
  - **Blocks**: T7, T8, T9
  - **Blocked By**: T1 (needs package.json)

  **References**:
  - tsup dual format: `format: ['esm', 'cjs']`, `dts: true`
  - CLI shebang pattern: `banner: { js: '#!/usr/bin/env node' }`

  **Acceptance Criteria**:
  - [ ] `tsconfig.json` exists with `strict: true`
  - [ ] `bun run build` executes without errors (even if no source files yet)
  - [ ] tsup configs produce dual ESM/CJS output

  **QA Scenarios**:
  ```
  Scenario: TypeScript config valid
    Tool: Bash
    Steps:
      1. Run: bun tsc --noEmit --project tsconfig.json 2>&1 || echo "OK-no-source"
      2. Assert: no config errors (only "no input files" is acceptable)
    Expected Result: Valid TypeScript configuration
    Evidence: .sisyphus/evidence/task-4-tsconfig.txt
  ```

  **Commit**: YES (groups with T1)
  - Message: `chore: add TypeScript and tsup build configuration`
  - Files: `tsconfig.json, packages/*/tsconfig.json, packages/*/tsup.config.ts`

- [ ] 5. Test Fixtures (Valid, Invalid, Edge-Case Agents)

  **What to do**:
  - Create `test-fixtures/valid-agent/` — a complete, valid agent that passes schema:
    - `config.yaml`: All required fields filled with realistic Indonesian data
    - `prompt.md`: Full system prompt (~200 words, in Bahasa Indonesia)
    - `examples.json`: 2 example conversations (2+ turns each)
  - Create `test-fixtures/invalid-agent/` — deliberately missing required fields:
    - `config.yaml`: Missing `eval_criteria` and `tools` (should fail validation)
    - `prompt.md`: Empty file
  - Create `test-fixtures/edge-case-agent/` — tests boundary conditions:
    - `config.yaml`: Maximum-length fields, Unicode characters, all optional fields filled
    - `prompt.md`: 2000-word system prompt (upper boundary)
    - `examples.json`: 5 conversations (stress test)

  **Must NOT do**:
  - Do NOT use English for the valid agent content (use Bahasa Indonesia)
  - Do NOT use placeholder text like "Lorem ipsum"

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1-T4, T6)
  - **Blocks**: T7
  - **Blocked By**: T2 (needs schema to know required fields)

  **References**:
  - Schema from T2: all required fields must be present in valid fixture
  - Indonesian domain research: use "Asisten OSS-KBLI Expert" as the valid fixture topic

  **Acceptance Criteria**:
  - [ ] `test-fixtures/valid-agent/config.yaml` passes Zod schema validation
  - [ ] `test-fixtures/invalid-agent/config.yaml` FAILS Zod schema validation with specific field errors
  - [ ] `test-fixtures/edge-case-agent/config.yaml` passes schema (boundary values are valid)
  - [ ] All Bahasa Indonesia content is authentic (real terms, not translations)

  **QA Scenarios**:
  ```
  Scenario: Valid fixture passes schema
    Tool: Bash
    Steps:
      1. Run konoha validate on valid fixture (after T7 is built)
      2. Or: bun -e "import schema validation script against test-fixtures/valid-agent/"
      3. Assert: exit code 0, output contains "valid"
    Expected Result: Valid agent passes validation
    Evidence: .sisyphus/evidence/task-5-valid-fixture.txt

  Scenario: Invalid fixture fails schema
    Tool: Bash
    Steps:
      1. Run validation against test-fixtures/invalid-agent/
      2. Assert: exit code 1, error mentions "eval_criteria" and "tools"
    Expected Result: Missing required fields caught
    Evidence: .sisyphus/evidence/task-5-invalid-fixture.txt
  ```

  **Commit**: YES (groups with T2)
  - Message: `feat(schema): add test fixtures — valid, invalid, and edge-case agents`
  - Files: `test-fixtures/*/`

- [ ] 6. Agent Template + Generation Utilities

  **What to do**:
  - Create `packages/core/src/template.ts`:
    - `AGENT_TEMPLATE_YAML`: A YAML template string with all fields and inline comments explaining each
    - `AGENT_TEMPLATE_PROMPT_MD`: A Markdown template for the prompt.md file with section headers
    - `AGENT_TEMPLATE_EXAMPLES_JSON`: A JSON template for examples with structure
  - Create `packages/core/src/loader.ts`:
    - `loadAgent(agentDir: string): AgentConfig` — reads config.yaml + prompt.md + examples.json from a directory
    - `loadAllAgents(agentsRoot: string): AgentConfig[]` — loads all agents from all categories
    - `validateAgent(agent: AgentConfig): ValidationResult` — validates against Zod schema
  - Create `packages/core/src/index.ts` — barrel export of schema, types, loader, template
  - Install: `bun add js-yaml`; `bun add -d @types/js-yaml`

  **Must NOT do**:
  - Do NOT use `!include` YAML directives (non-standard)
  - Do NOT make the loader async if not necessary (sync file reads are fine for CLI)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with T1-T5)
  - **Blocks**: T10
  - **Blocked By**: T2 (needs schema/types)

  **References**:
  - Schema from T2: `AgentSchema` and `AgentConfig` type
  - js-yaml docs: `yaml.load(fileContent)` for parsing
  - Two-file pattern: `config.yaml` (metadata) + `prompt.md` (system prompt body)

  **Acceptance Criteria**:
  - [ ] `packages/core/src/loader.ts` exports `loadAgent` and `loadAllAgents` functions
  - [ ] `loadAgent` correctly merges config.yaml + prompt.md content
  - [ ] Template files have ALL schema fields with explanatory comments
  - [ ] `packages/core/src/index.ts` barrel-exports all modules

  **QA Scenarios**:
  ```
  Scenario: Loader reads test fixture
    Tool: Bash
    Steps:
      1. Run: bun -e "import { loadAgent } from './packages/core/src/loader'; const a = loadAgent('./test-fixtures/valid-agent'); console.log(a.identity.name)"
      2. Assert: outputs the agent name from valid fixture
    Expected Result: Agent loaded and parsed correctly
    Evidence: .sisyphus/evidence/task-6-loader.txt
  ```

  **Commit**: YES (groups with T2)
  - Message: `feat(core): add agent loader, template, and generation utilities`
  - Files: `packages/core/src/template.ts, packages/core/src/loader.ts, packages/core/src/index.ts`

### Wave 2 — CLI Core + Golden Examples (6 parallel tasks)

- [ ] 7. CLI Core + `konoha validate` Command

  **What to do**:
  - Install Commander: `bun add commander chalk`
  - Create `packages/cli/src/cli.ts` — main entry with Commander program setup
  - Register `konoha validate <path>` command:
    - Walks all agent directories under `<path>`
    - Loads each agent via `loadAgent()` from core
    - Validates against Zod schema
    - Reports: `✓ N/N agents valid` or `✗ M agents failed` with specific error details per agent
    - Exit code 0 if all valid, 1 if any fail
    - Also checks: no duplicate agent IDs, no duplicate system prompts (exact-match)
  - Add `bin` field to package.json: `"konoha": "./dist/cli.mjs"`
  - Verify against test fixtures: valid-agent passes, invalid-agent fails with correct errors

  **Must NOT do**:
  - Do NOT make network calls
  - Do NOT skip validation for any field
  - Do NOT silently ignore parse errors in YAML

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []
    - Reason: CLI validation logic requires careful error handling and reporting

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T8-T12)
  - **Blocks**: T38
  - **Blocked By**: T2 (schema), T4 (build config), T5 (fixtures)

  **References**:
  - Schema: `packages/core/src/schema.ts` — `AgentSchema` for validation
  - Loader: `packages/core/src/loader.ts` — `loadAgent()`, `loadAllAgents()`
  - Commander.js pattern: `program.command('validate <path>').action(async (path) => { ... })`
  - Test fixtures: `test-fixtures/valid-agent/`, `test-fixtures/invalid-agent/`

  **Acceptance Criteria**:
  - [ ] `bunx konoha validate test-fixtures/valid-agent/` → exit 0, shows "1/1 agents valid"
  - [ ] `bunx konoha validate test-fixtures/invalid-agent/` → exit 1, shows specific field errors
  - [ ] Duplicate detection works: two agents with same ID → error

  **QA Scenarios**:
  ```
  Scenario: Validate valid agent
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts validate test-fixtures/valid-agent/
      2. Assert exit code: 0
      3. Assert output contains: "1/1 agents valid" or "✓"
    Expected Result: Valid agent passes
    Evidence: .sisyphus/evidence/task-7-validate-valid.txt

  Scenario: Validate invalid agent
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts validate test-fixtures/invalid-agent/
      2. Assert exit code: 1
      3. Assert output contains error for missing "eval_criteria" or "tools"
    Expected Result: Invalid agent caught with specific errors
    Evidence: .sisyphus/evidence/task-7-validate-invalid.txt
  ```

  **Commit**: YES
  - Message: `feat(cli): add commander setup with validate command`
  - Files: `packages/cli/src/cli.ts, packages/cli/src/commands/validate.ts`

- [ ] 8. CLI Browse: `konoha list` + `konoha search` Commands

  **What to do**:
  - Implement `konoha list` command:
    - `konoha list` — lists ALL agents grouped by category with counts
    - `konoha list --category gov-legal` — lists agents in specific category
    - Output format: `[category] agent-slug — Agent Name (Bahasa description)`
    - Colorized with chalk: category headers in bold, agent names in cyan
  - Implement `konoha search <query>` command:
    - Searches agent names, descriptions, tags, and knowledge domains
    - Case-insensitive fuzzy matching
    - Returns matching agents with highlighted match context
    - `konoha search "pajak"` → returns all tax-related agents
  - Both commands use `loadAllAgents()` from core

  **Must NOT do**:
  - Do NOT add pagination (v2)
  - Do NOT make network calls
  - Do NOT add interactive mode (v2)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T7, T9-T12)
  - **Blocks**: T38
  - **Blocked By**: T2 (schema), T4 (build config)

  **References**:
  - Loader: `packages/core/src/loader.ts` — `loadAllAgents()`
  - Categories: `agents/categories.json` — for grouping in list output
  - chalk docs for colorized terminal output

  **Acceptance Criteria**:
  - [ ] `konoha list` shows agents grouped by category with counts
  - [ ] `konoha list --category gov-legal` filters to single category
  - [ ] `konoha search "pajak"` returns tax-related agents
  - [ ] Output is colorized and readable

  **QA Scenarios**:
  ```
  Scenario: List agents by category
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts list (after golden agents exist from T10)
      2. Assert output contains: "Government & Legal" or "gov-legal"
      3. Assert output contains at least 10 agent entries (golden agents)
    Expected Result: Agents listed with category grouping
    Evidence: .sisyphus/evidence/task-8-list.txt

  Scenario: Search returns relevant results
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts search "pajak"
      2. Assert output contains agent related to tax/pajak
      3. Assert output does NOT contain unrelated agents (e.g., health agents)
    Expected Result: Search is relevant, not just substring match on everything
    Evidence: .sisyphus/evidence/task-8-search.txt
  ```

  **Commit**: YES (groups with T7)
  - Message: `feat(cli): add list and search commands`
  - Files: `packages/cli/src/commands/list.ts, packages/cli/src/commands/search.ts`

- [ ] 9. Cross-Platform Transpilers + `konoha sync` Command

  **What to do**:
  - Create `packages/cli/src/transpilers/` directory with 4 transpiler modules:
  - **cursor.ts**: Converts agent → `.cursor/rules/{agent-slug}.mdc`
    - YAML frontmatter: `description` (from agent name + mission), `globs` (from platform_configs.cursor.globs), `alwaysApply` (from platform_configs.cursor.alwaysApply)
    - Body: system prompt from prompt.md
  - **claude.ts**: Converts agent → `CLAUDE.md`
    - Pure Markdown: agent name as H1, system prompt as body, tools as list, knowledge domains as context section
  - **copilot.ts**: Converts agent → `.github/copilot-instructions.md`
    - Optional frontmatter with `agent` and `description`, then Markdown body
  - **openai.ts**: Converts agent → OpenAI Assistants API v2 JSON
    - Fields: `name`, `instructions` (system prompt), `model`, `tools` (mapped from agent tools), `tool_resources`
  - Create `packages/cli/src/commands/sync.ts`:
    - `konoha sync --target cursor|claude|copilot|openai --agent <agent-id> [--dry-run] [--output <dir>]`
    - `--dry-run`: prints output to stdout instead of writing files
    - `--output`: custom output directory (default: current working directory)
    - Asks confirmation before overwriting existing files (unless `--force`)
  - All transpilers should handle edge cases: long prompts, Unicode, special YAML characters

  **Must NOT do**:
  - Do NOT add extra target formats (no LangChain, CrewAI, AutoGen)
  - Do NOT truncate prompts for any platform (warn about token counts instead)
  - Do NOT make network calls

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []
    - Reason: 4 transpilers with different output formats requires careful implementation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T7-T8, T10-T12)
  - **Blocks**: T38
  - **Blocked By**: T2 (schema), T4 (build config)

  **References**:
  **Pattern References** (CRITICAL — exact output formats):
  - Cursor .mdc: YAML frontmatter with `description`, `globs`, `alwaysApply` keys + Markdown body
  - CLAUDE.md: Plain Markdown in project root, no frontmatter
  - copilot-instructions.md: `.github/copilot-instructions.md`, optional `agent` + `description` frontmatter
  - OpenAI Assistants v2: JSON with `name`, `instructions`, `model`, `tools[]`, `tool_resources`

  **Acceptance Criteria**:
  - [ ] `konoha sync --target cursor --agent <id> --dry-run` outputs valid .mdc with YAML frontmatter
  - [ ] `konoha sync --target claude --agent <id> --dry-run` outputs valid CLAUDE.md
  - [ ] `konoha sync --target copilot --agent <id> --dry-run` outputs valid copilot-instructions.md
  - [ ] `konoha sync --target openai --agent <id> --dry-run` outputs valid JSON matching Assistants API
  - [ ] All 4 transpilers handle Unicode and long prompts correctly

  **QA Scenarios**:
  ```
  Scenario: Cursor transpiler output
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts sync --target cursor --agent gov-legal/asisten-oss-kbli --dry-run
      2. Assert output starts with: ---
      3. Assert output contains: description:
      4. Assert output contains: globs:
      5. Assert output contains the agent's system prompt text
    Expected Result: Valid .mdc format with YAML frontmatter + Markdown body
    Evidence: .sisyphus/evidence/task-9-cursor-transpiler.txt

  Scenario: OpenAI transpiler output
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts sync --target openai --agent gov-legal/asisten-oss-kbli --dry-run
      2. Pipe output to: node -e "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'))"
      3. Assert: valid JSON, contains "name", "instructions", "model" keys
    Expected Result: Valid OpenAI Assistants API JSON
    Evidence: .sisyphus/evidence/task-9-openai-transpiler.txt
  ```

  **Commit**: YES
  - Message: `feat(transpiler): add cross-platform transpilers and sync command`
  - Files: `packages/cli/src/transpilers/*.ts, packages/cli/src/commands/sync.ts`

  - Files: `packages/cli/src/transpilers/*.ts, packages/cli/src/commands/sync.ts`

- [ ] 10. 10 Golden Reference Agents (1 Per Category)

  **What to do**:
  Create ONE ultra-detailed reference agent per category (10 total). These serve as the GOLD STANDARD that all batch-generated agents must match in quality. Each golden agent gets its own directory under its category.

  **THE MOST IMPORTANT THING**: These are NOT simple personas. Each agent must be deeply detailed with:
  - **System prompt** (prompt.md): Minimum 300 words, written entirely in Bahasa Indonesia, with specific domain knowledge, step-by-step workflows, and cultural awareness
  - **Config** (config.yaml): ALL schema fields filled with authentic Indonesian data
  - **Examples** (examples.json): 2-3 multi-turn conversations showing the agent in action with realistic Indonesian scenarios

  **Golden agents to create** (one per category):
  1. `gov-legal/asisten-oss-kbli` — Membantu UMKM memilih kode KBLI dan mendaftar di OSS RBA sesuai PP 28/2025
  2. `business/sobat-pajak-umkm` — Menghitung kewajiban pajak UMKM (PPh Final 0.5%), mengingatkan tenggat SPT
  3. `finance/waspada-pinjol` — Memvalidasi legalitas aplikasi pinjaman via database OJK, edukasi anti-phishing
  4. `education/kurikulum-merdeka-copilot` — Membantu guru menyusun Modul Ajar & instrumen asesmen sesuai Kurikulum Merdeka
  5. `health/navigasi-sehat-bpjs` — Menjelaskan alur rujukan berjenjang BPJS, hak pasien, dan penjadwalan kontrol
  6. `tech/indo-dev-api-guide` — Membantu developer memahami API layanan publik Indonesia (OSS, SATUSEHAT)
  7. `agriculture/penyuluh-tani-digital` — Rekomendasi pemupukan dan pencegahan hama spesifik tanaman Indonesia
  8. `religion/halal-compliance-assistant` — Memandu pemilik F&B menyiapkan dokumen SJPH untuk sertifikat Halal BPJPH
  9. `culture/penerjemah-unggah-ungguh` — Menerjemahkan teks ke tingkat tutur bahasa daerah (Jawa: Ngoko→Kromo Inggil, Sunda: Kasar→Lemes)
  10. `transport/logistik-antar-pulau` — Menghitung estimasi biaya kirim lintas pulau, membandingkan ekspedisi (JNE, J&T, Lion Parcel)

  **For each golden agent, the system prompt MUST include**:
  - Clear mission statement in Bahasa Indonesia
  - Specific domain knowledge (real law numbers, real agency names, real processes)
  - Step-by-step workflow the agent follows
  - Boundaries (what the agent will NOT do)
  - Tone and communication style appropriate to Indonesian culture
  - References to real Indonesian institutions, forms, and procedures

  **Must NOT do**:
  - Do NOT write generic descriptions like "Membantu pengguna dengan pertanyaan tentang..."
  - Do NOT use English in the system prompts (except proper nouns like "BPJS", "OSS")
  - Do NOT create shallow prompts under 300 words
  - Do NOT skip any config.yaml field — ALL must be filled
  - Do NOT use placeholder example conversations

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []
    - Reason: Creating 10 ultra-detailed, culturally authentic agents requires deep domain knowledge

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T7-T9, T11-T12)
  - **Blocks**: T13-T35 (ALL content tasks use these as reference)
  - **Blocked By**: T2 (schema), T3 (directories), T6 (template)

  **References**:
  - Schema: `schemas/agent.schema.ts` — all required fields
  - Template: `packages/core/src/template.ts` — YAML/MD templates
  - Categories: `agents/categories.json` — category slugs
  - Indonesian domain research from Metis review:
    - Gov: OSS RBA, PP 28/2025, KBLI codes, NIB
    - Business: PPh Final 0.5%, SPT, QRIS, Faktur Pajak
    - Finance: OJK database, Pindar legal vs ilegal, POJK 40/2024
    - Education: Kurikulum Merdeka, Capaian Pembelajaran, P5, Modul Ajar
    - Health: BPJS Kesehatan, Faskes Tingkat 1, rujukan berjenjang
    - Tech: SATUSEHAT API, OSS API, Midtrans/Xendit
    - Agriculture: BMKG data, pupuk subsidi, masa tanam
    - Religion: BPJPH, SJPH, BAZNAS, Zakat Mal
    - Culture: Kromo Inggil, Sunda Halus, wastra, HKI
    - Transport: Last-mile, COD, resi, ekspedisi comparison

  **Acceptance Criteria**:
  - [ ] 10 agent directories created, each with config.yaml + prompt.md + examples.json
  - [ ] All 10 pass `konoha validate`
  - [ ] Every prompt.md is ≥300 words in Bahasa Indonesia
  - [ ] Every config.yaml has ALL schema fields filled (zero empty/placeholder values)
  - [ ] Every examples.json has ≥2 multi-turn conversations with realistic Indonesian scenarios
  - [ ] Zero English text in Bahasa content (except proper nouns)

  **QA Scenarios**:
  ```
  Scenario: All 10 golden agents pass validation
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts validate agents/
      2. Assert exit code: 0
      3. Assert output: "10/10 agents valid"
    Expected Result: All golden agents schema-valid
    Evidence: .sisyphus/evidence/task-10-golden-validate.txt

  Scenario: Prompt quality check
    Tool: Bash
    Steps:
      1. For each golden agent: wc -w agents/*/golden-*/prompt.md (or equivalent)
      2. Assert: every prompt.md has ≥300 words
      3. Spot check: grep for generic phrases "Membantu pengguna dengan" in any prompt
      4. Assert: zero matches (no generic descriptions)
    Expected Result: All prompts are substantial and specific
    Evidence: .sisyphus/evidence/task-10-golden-quality.txt

  Scenario: No English in Bahasa content
    Tool: Bash
    Steps:
      1. Check prompt.md files for common English words that shouldn't be there
      2. Grep for: "the ", "and ", "this ", "help ", "user " in prompt.md files
      3. Assert: zero matches (proper nouns like BPJS are OK)
    Expected Result: Content is authentically Bahasa Indonesia
    Evidence: .sisyphus/evidence/task-10-golden-language.txt
  ```

  **Commit**: YES
  - Message: `content: add 10 golden reference agents (1 per category)`
  - Files: `agents/gov-legal/asisten-oss-kbli/*, agents/business/sobat-pajak-umkm/*, ...`
  - Pre-commit: `bun packages/cli/src/cli.ts validate agents/`

- [ ] 11. Next.js Website Setup + Tailwind + Dark Mode

  **What to do**:
  - Initialize Next.js project in `website/` directory: `bunx create-next-app@latest website --typescript --tailwind --app --src-dir --no-import-alias`
  - Configure for static export: `output: 'export'` in `next.config.js`
  - Set up dark mode as DEFAULT:
    - `tailwind.config.ts`: `darkMode: 'class'`
    - Root layout: `<html className="dark">` by default
    - Add light/dark toggle component
  - Set up global styles:
    - Dark background: deep navy/charcoal (NOT pure black)
    - Accent color: warm orange or emerald green (Konoha theme)
    - Typography: Inter for body, JetBrains Mono for code
    - Smooth transitions on theme toggle
  - Create base layout with:
    - Responsive navbar: logo ("🍃 KonohaAgents"), nav links (Home, Agents, Guide), theme toggle, GitHub star button
    - Footer: MIT license, GitHub link, npm link, "Made for Indonesia 🇮🇩"
  - Install: `bun add next-themes lucide-react`

  **Must NOT do**:
  - Do NOT add user accounts, auth, or personalization
  - Do NOT add a backend or API routes
  - Do NOT use pure black (#000) for dark mode background
  - Do NOT add analytics beyond basic Vercel Analytics

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Premium dark-mode design requires careful visual engineering

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T7-T10, T12)
  - **Blocks**: T12, T32-T34
  - **Blocked By**: T1 (needs repo)

  **References**:
  - Next.js App Router docs for static export
  - next-themes for dark mode toggle
  - Tailwind dark mode class strategy
  - Premium dark-mode design patterns (deep backgrounds, subtle borders, glowing accents)

  **Acceptance Criteria**:
  - [ ] `website/` contains a working Next.js project
  - [ ] `bun run build` in website/ produces static export
  - [ ] Dark mode is the DEFAULT (page loads dark)
  - [ ] Theme toggle switches between dark/light
  - [ ] Navbar with logo, links, theme toggle, GitHub button renders correctly
  - [ ] Footer with license, links, "Made for Indonesia 🇮🇩" renders

  **QA Scenarios**:
  ```
  Scenario: Website builds and renders dark mode
    Tool: Playwright (playwright skill)
    Preconditions: cd website && bun run dev (running on localhost:3000)
    Steps:
      1. Navigate to http://localhost:3000
      2. Assert: document.documentElement has class "dark"
      3. Assert: background color is NOT white (#fff) — should be dark
      4. Find element: nav with text "KonohaAgents"
      5. Assert: nav element exists
      6. Find element: footer with text "Made for Indonesia"
      7. Assert: footer exists
      8. Screenshot: full page
    Expected Result: Dark mode default, navbar and footer present
    Evidence: .sisyphus/evidence/task-11-website-dark.png

  Scenario: Theme toggle works
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000
      2. Find and click: theme toggle button
      3. Assert: document.documentElement class changes (dark removed or light added)
      4. Assert: background color changes to light
      5. Screenshot: full page in light mode
    Expected Result: Toggle switches theme
    Evidence: .sisyphus/evidence/task-11-website-toggle.png
  ```

  **Commit**: YES
  - Message: `feat(web): Next.js project setup with Tailwind and dark mode`
  - Files: `website/*`

- [ ] 12. Website: Homepage (Hero, Stats, Category Grid)

  **What to do**:
  - Build the landing page at `website/src/app/page.tsx`:
  - **Hero Section**:
    - Large heading: "🍃 KonohaAgents" + tagline in Bahasa Indonesia & English
    - "500 Agen AI Indonesia yang Sangat Detail" / "500 Ultra-Detailed Indonesian AI Agents"
    - Two CTA buttons: "Jelajahi Agen →" (Browse Agents) + "npm install konoha-agents"
    - Subtle animated background (CSS gradient animation, NO heavy JS)
  - **Stats Bar**: "500 Agen | 10 Kategori | 4 Platform | MIT License"
  - **Category Grid**:
    - 10 category cards in responsive grid (2 cols mobile, 3 tablet, 5 desktop)
    - Each card: icon + name (Bahasa) + agent count + brief description
    - Cards link to `/agents?category={slug}`
    - Hover effect: subtle glow/lift
  - **"How It Works" Section**:
    - 3 steps: 1) Browse agents, 2) Choose platform, 3) Install with one command
    - Each step with icon and brief description
  - **CLI Preview**:
    - Styled terminal showing: `$ konoha search "pajak"` with sample output
    - Copy button for `npm install -g konoha-agents`
  - Read category data from `agents/categories.json` at build time

  **Must NOT do**:
  - Do NOT use heavy animations or JS-heavy effects (CSS only)
  - Do NOT add testimonials or social proof (not yet)
  - Do NOT add a newsletter signup

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with T7-T11)
  - **Blocks**: T37
  - **Blocked By**: T11 (needs website setup)

  **References**:
  - Categories: `agents/categories.json` — for category grid data
  - Design: Premium dark-mode landing pages (Linear, Vercel, Supabase as inspiration)
  - Bilingual content: Bahasa Indonesia primary, English secondary

  **Acceptance Criteria**:
  - [ ] Homepage renders with hero, stats, category grid, how-it-works, CLI preview
  - [ ] Category grid shows all 10 categories with correct names and icons
  - [ ] CTA buttons link correctly (Browse → /agents, npm install → copy)
  - [ ] Responsive: 2 cols mobile, 3 tablet, 5 desktop for category grid
  - [ ] Page loads under 3 seconds (no heavy assets)

  **QA Scenarios**:
  ```
  Scenario: Homepage renders all sections
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000
      2. Assert: h1 contains "KonohaAgents"
      3. Assert: text "500" appears on page (stats)
      4. Assert: 10 category cards visible (count elements with category card selector)
      5. Assert: "npm install konoha-agents" text visible
      6. Assert: "Jelajahi Agen" button/link exists
      7. Screenshot: full page scroll
    Expected Result: All sections present and correct
    Evidence: .sisyphus/evidence/task-12-homepage.png

  Scenario: Category cards link correctly
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000
      2. Click first category card
      3. Assert: URL contains "/agents?category=" or "/agents/"
    Expected Result: Navigation works
    Evidence: .sisyphus/evidence/task-12-category-nav.png
  ```

  **Commit**: YES (groups with T11)
  - Message: `feat(web): add homepage with hero, stats, and category grid`
  - Files: `website/src/app/page.tsx, website/src/components/*`

### Wave 3 — Agent Content + Website Pages (23 parallel tasks, MAX PARALLEL)

> **CRITICAL QUALITY MANDATE FOR ALL AGENT CONTENT TASKS (T13-T31)**:
>
> Every agent in this wave MUST match the quality standard set by the golden reference agents (T10).
> The MOST IMPORTANT THING about this entire project: agents must be DEEPLY DETAILED, NOT simple personas.
>
> **Per-Agent Quality Requirements**:
> - `config.yaml`: ALL schema fields filled — zero empty/placeholder values
> - `prompt.md`: Minimum 200 words, entirely in Bahasa Indonesia, with:
>   - Specific domain knowledge (real Indonesian law numbers, real agency names, real form codes, real processes)
>   - Step-by-step workflow the agent follows
>   - Clear boundaries (what the agent will NOT do)
>   - Tone appropriate to Indonesian culture (sopan, ramah, menggunakan "Anda")
> - `examples.json`: Minimum 1 multi-turn conversation (2+ turns) with realistic Indonesian scenarios
> - `eval_criteria`: Minimum 2 specific test cases with gold-standard answers (NOT generic "Agent responds helpfully")
> - `tools`: Minimum 1 tool definition with name, description, and parameters schema
> - `knowledge_domains`: Minimum 1 specific domain (NOT generic like "Indonesian knowledge")
>
> **Anti-Slop Rules**:
> - NO generic descriptions: "Membantu pengguna dengan pertanyaan tentang..." is FORBIDDEN
> - NO duplicate concepts: each agent solves a DISTINCT problem
> - NO English in Bahasa content (except proper nouns: BPJS, OSS, KTP, etc.)
> - NO placeholder data: every field must have real, meaningful content
> - Each agent ID follows pattern: `{category-slug}/{agent-slug}` with URL-safe slugs
>
> **Reference**: Use the golden agent in your category (from T10) as the quality template.
> **Validation**: Run `konoha validate agents/{category}/` after creating all agents — ALL must pass.

- [ ] 13. Government & Legal: Perizinan & Birokrasi (25 agents)

  **What to do**:
  Create 25 ultra-detailed agents focused on Indonesian permits, licensing, and bureaucratic processes.
  
  **Agent topic areas** (create unique agents for each — NOT generic versions):
  - Pendaftaran NIB (Nomor Induk Berusaha) untuk berbagai tingkat risiko
  - Pemilihan kode KBLI yang tepat per jenis usaha
  - Pengurusan SIUP, TDP, dan izin usaha lainnya
  - Perizinan khusus: izin lingkungan (AMDAL/UKL-UPL), izin konstruksi (PBG/SLF)
  - Pendaftaran merek dagang di DJKI
  - Pengurusan izin impor/ekspor (API-U/API-P)
  - Proses perizinan di tingkat daerah (Perda)
  - Izin tenaga kerja asing (RPTKA/IMTA)
  - Pengurusan legalitas yayasan dan koperasi
  - OSS RBA troubleshooting dan FAQ

  Each agent gets its own folder: `agents/gov-legal/{agent-slug}/config.yaml`, `prompt.md`, `examples.json`

  **Must NOT do**: See quality mandate above. Also: do NOT duplicate any golden agent from T10.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with T14-T35)
  - **Blocks**: T35, T36
  - **Blocked By**: T2, T10

  **References**:
  - Golden agent: `agents/gov-legal/asisten-oss-kbli/` — USE AS QUALITY TEMPLATE
  - Schema: `schemas/agent.schema.ts`
  - Indonesian gov domain research: OSS RBA, PP 28/2025, KBLI, NIB, UU Cipta Kerja, AMDAL, PBG/SLF, DJKI, API-U/API-P, RPTKA/IMTA

  **Acceptance Criteria**:
  - [ ] 25 agent directories created under `agents/gov-legal/`
  - [ ] ALL 25 pass `konoha validate agents/gov-legal/`
  - [ ] Zero duplicate agent IDs or system prompts
  - [ ] Every prompt.md ≥200 words in Bahasa Indonesia
  - [ ] Every config.yaml has all required fields filled

  **QA Scenarios**:
  ```
  Scenario: All 25 agents valid
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts validate agents/gov-legal/
      2. Assert exit code: 0
      3. Assert output: "26/26 agents valid" (25 + 1 golden = 26 in this category so far)
      4. Run: ls -d agents/gov-legal/*/ | wc -l
      5. Assert: 26
    Expected Result: All Government & Legal perizinan agents pass validation
    Evidence: .sisyphus/evidence/task-13-gov-perizinan.txt

  Scenario: No generic content
    Tool: Bash
    Steps:
      1. Grep all prompt.md files in agents/gov-legal/ for "Membantu pengguna dengan"
      2. Assert: 0 matches
      3. Spot-check 3 random prompt.md files: each should reference specific Indonesian regulations or form codes
    Expected Result: All prompts are domain-specific, not generic
    Evidence: .sisyphus/evidence/task-13-gov-quality.txt
  ```

  **Commit**: YES (groups with T14, T15 as one category commit)
  - Message: `content(gov-legal): add 25 perizinan & birokrasi agents`
  - Files: `agents/gov-legal/*/`
  - Pre-commit: `bun packages/cli/src/cli.ts validate agents/gov-legal/`

- [ ] 14. Government & Legal: Hukum & Dokumen Kependudukan (25 agents)

  **What to do**:
  Create 25 ultra-detailed agents focused on Indonesian law and civil documentation.
  
  **Agent topic areas**:
  - Pengurusan KTP elektronik dan KK
  - Pembuatan akta kelahiran, akta kematian, akta nikah
  - Hukum perdata: perjanjian, sengketa tanah, waris
  - Hukum pidana: pelaporan ke polisi, proses hukum
  - Hukum ketenagakerjaan: PHK, upah minimum, BPJS Ketenagakerjaan
  - Pembuatan surat kuasa, surat pernyataan
  - Proses perceraian (Pengadilan Agama vs Pengadilan Negeri)
  - Hukum perlindungan konsumen (UU No. 8/1999)
  - Hak atas tanah: sertifikat (SHM, SHGB, AJB)
  - Notaris dan PPAT: proses dan biaya

  **Must NOT do**: See quality mandate. Do NOT duplicate T13 topics.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES — Wave 3
  - **Blocks**: T35, T36
  - **Blocked By**: T2, T10

  **References**:
  - Golden: `agents/gov-legal/asisten-oss-kbli/`
  - Indonesian law: KTP-el, KK, hukum perdata/pidana, UU Ketenagakerjaan, UU Perlindungan Konsumen No. 8/1999, SHM/SHGB/AJB, Pengadilan Agama

  **Acceptance Criteria**:
  - [ ] 25 agent directories created, all pass validation
  - [ ] Zero overlap with T13 topics
  - [ ] All prompts reference specific Indonesian laws, forms, or procedures

  **QA Scenarios**:
  ```
  Scenario: Validation + uniqueness
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts validate agents/gov-legal/
      2. Assert: all agents valid, no duplicate IDs
    Evidence: .sisyphus/evidence/task-14-gov-hukum.txt
  ```

  **Commit**: YES (groups with T13, T15)
  - Message: `content(gov-legal): add 25 hukum & dokumen kependudukan agents`

- [ ] 15. Government & Legal: Regulasi & Kebijakan Publik (24 agents)

  **What to do**:
  Create 24 ultra-detailed agents focused on Indonesian regulations, public policy, and civic participation.
  
  **Agent topic areas**:
  - Pemahaman UU Cipta Kerja dan implikasinya
  - Pajak daerah dan retribusi (PBB, BPHTB)
  - Regulasi lingkungan hidup
  - Kebijakan pendidikan (Kemendikbudristek)
  - Kebijakan kesehatan (Kemenkes)
  - Pemilu dan pilkada: prosedur, syarat calon
  - Otonomi daerah dan desentralisasi
  - Pengaduan masyarakat (LAPOR!, Ombudsman)
  - Regulasi media sosial dan UU ITE
  - Kebijakan energi dan transisi hijau

  **Must NOT do**: See quality mandate. Do NOT duplicate T13/T14 topics.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` — **Skills**: []

  **Parallelization**: Wave 3, parallel — **Blocks**: T35, T36 — **Blocked By**: T2, T10

  **References**: Golden: `agents/gov-legal/asisten-oss-kbli/` — UU Cipta Kerja, PBB, BPHTB, UU ITE, LAPOR!, Ombudsman

  **Acceptance Criteria**:
  - [ ] 24 agents created, all pass validation, zero overlap with T13/T14

  **QA Scenarios**:
  ```
  Scenario: Full category validation
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts validate agents/gov-legal/
      2. Assert: "75/75 agents valid" (25+25+24+1 golden = 75 total)
    Evidence: .sisyphus/evidence/task-15-gov-regulasi.txt
  ```

  **Commit**: YES (groups with T13, T14)
  - Message: `content(gov-legal): add 24 regulasi & kebijakan publik agents`

- [ ] 16. Business & UMKM: E-commerce & Marketplace (25 agents)

  **What to do**:
  Create 25 ultra-detailed agents for Indonesian e-commerce and marketplace operations.
  
  **Agent topic areas**:
  - Optimasi toko di Tokopedia (SEO produk, iklan TopAds)
  - Optimasi toko di Shopee (Shopee Ads, Flash Sale, free ongkir)
  - Strategi live selling di TikTok Shop
  - Manajemen multi-marketplace (sinkronisasi stok)
  - Pembuatan deskripsi produk yang menarik konsumen Indonesia
  - Fotografi produk untuk marketplace
  - Pengelolaan ulasan dan rating toko
  - Strategi COD vs non-COD
  - Dropship dan reseller management
  - Integrasi QRIS untuk pembayaran offline-to-online

  **Must NOT do**: See quality mandate.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3, parallel — **Blocks**: T35, T36 — **Blocked By**: T2, T10
  **References**: Golden: `agents/business/sobat-pajak-umkm/` — Tokopedia, Shopee, TikTok Shop, QRIS, TopAds

  **Acceptance Criteria**: 25 agents created, all pass validation, marketplace-specific content

  **QA Scenarios**:
  ```
  Scenario: Validation
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts validate agents/business/
      2. Assert: all agents valid
    Evidence: .sisyphus/evidence/task-16-biz-ecommerce.txt
  ```

  **Commit**: YES (groups with T17, T18)
  - Message: `content(business): add 25 e-commerce & marketplace agents`

- [ ] 17. Business & UMKM: Pajak & Keuangan Usaha (25 agents)

  **What to do**:
  Create 25 ultra-detailed agents for Indonesian UMKM tax compliance and business finance.
  
  **Agent topic areas**:
  - Perhitungan PPh Final 0.5% untuk UMKM
  - Pelaporan SPT Tahunan dan SPT Masa
  - Pembuatan Faktur Pajak elektronik (e-Faktur)
  - Pembukuan sederhana untuk UMKM (buku kas, laporan laba rugi)
  - Rekonsiliasi transaksi QRIS/e-wallet ke pembukuan
  - Penghitungan PPn dan PKP
  - Perpajakan untuk usaha online/freelancer
  - Perencanaan keuangan UMKM (budgeting, cash flow)
  - Akses pembiayaan: KUR, P2P lending, modal ventura
  - Pengurusan NPWP dan NIK-NPWP integration

  **Must NOT do**: See quality mandate. No overlap with T16.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3 — **Blocks**: T35, T36 — **Blocked By**: T2, T10
  **References**: Golden: `agents/business/sobat-pajak-umkm/` — PPh Final 0.5%, SPT, e-Faktur, KUR, P2P lending

  **Acceptance Criteria**: 25 agents, all valid, tax/finance-specific

  **QA Scenarios**: Same pattern as T16. **Evidence**: `.sisyphus/evidence/task-17-biz-pajak.txt`
  **Commit**: YES (groups with T16, T18)

- [ ] 18. Business & UMKM: Marketing & Operasional (24 agents)

  **What to do**:
  Create 24 ultra-detailed agents for Indonesian UMKM marketing and operations.
  
  **Agent topic areas**:
  - Social media marketing khusus pasar Indonesia (Instagram, TikTok, Facebook)
  - Copywriting dalam Bahasa Indonesia yang menarik
  - Branding UMKM: logo, identitas visual, packaging
  - Customer service template dalam Bahasa Indonesia
  - WhatsApp Business automation dan catalog
  - Google My Business untuk UMKM lokal
  - Event marketing: bazaar, pameran UMKM
  - Manajemen SDM UMKM: rekrutmen, kontrak kerja
  - Standar ISO dan SNI untuk produk UMKM
  - Perizinan halal self-declare untuk produk makanan

  **Must NOT do**: See quality mandate. No overlap with T16/T17.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3 — **Blocks**: T35, T36 — **Blocked By**: T2, T10
  **References**: Golden: `agents/business/sobat-pajak-umkm/` — WhatsApp Business, SNI, halal self-declare

  **Acceptance Criteria**: 24 agents, all valid. Total business category: 75 (25+25+24+1 golden)

  **QA Scenarios**:
  ```
  Scenario: Full business category
    Tool: Bash
    Steps:
      1. Run validation on agents/business/
      2. Assert: "75/75 agents valid"
    Evidence: .sisyphus/evidence/task-18-biz-marketing.txt
  ```

  **Commit**: YES (groups with T16, T17)

- [ ] 19. Finance & Banking: Perbankan & Investasi (25 agents)

  **What to do**:
  Create 25 ultra-detailed agents for Indonesian banking and investment.
  
  **Agent topic areas**:
  - Perbandingan produk tabungan (BCA, Mandiri, BRI, BNI, BSI)
  - Pengajuan KPR: syarat, simulasi cicilan, BI checking
  - Investasi reksa dana untuk pemula Indonesia
  - Saham: cara beli, analisis fundamental, IDX composite
  - Obligasi negara: SBN, ORI, Sukuk Ritel
  - Deposito: perbandingan bunga, pajak deposito
  - BI-FAST transfer dan biaya antar bank
  - Wealth management dan perencanaan pensiun
  - Asuransi: jiwa, kesehatan, kendaraan (perbandingan)
  - Investasi emas (Antam, Pegadaian digital)

  **Must NOT do**: See quality mandate.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3 — **Blocks**: T35, T36 — **Blocked By**: T2, T10
  **References**: Golden: `agents/finance/waspada-pinjol/` — BCA, Mandiri, BRI, BNI, BSI, BI-FAST, IDX, SBN, ORI, Sukuk, Antam

  **Acceptance Criteria**: 25 agents, all valid, banking/investment-specific
  **QA Scenarios**: Validation pattern. **Evidence**: `.sisyphus/evidence/task-19-fin-perbankan.txt`
  **Commit**: YES (groups with T20, T21)

- [ ] 20. Finance & Banking: Fintech & Pembayaran Digital (25 agents)

  **What to do**:
  Create 25 ultra-detailed agents for Indonesian fintech and digital payments.
  
  **Agent topic areas**:
  - GoPay, OVO, Dana, ShopeePay: fitur dan optimasi
  - QRIS merchant setup dan troubleshooting
  - PayLater comparison: Shopee PayLater, GoPay Later, Kredivo, Akulaku
  - Transfer bank real-time: BI-FAST vs SKN vs RTGS
  - Cryptocurrency di Indonesia: regulasi Bappebti, exchange terdaftar
  - Crowdfunding dan securities crowdfunding (SCF) di Indonesia
  - Open banking dan API perbankan Indonesia
  - Digital banking: Jago, Blu, Seabank, Neobank
  - Remittance: pengiriman uang dari/ke luar negeri
  - Pembayaran tagihan otomatis (auto-debit, direct debit)

  **Must NOT do**: See quality mandate. No overlap with T19.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3 — **Blocks**: T35, T36 — **Blocked By**: T2, T10
  **References**: Golden: `agents/finance/waspada-pinjol/` — GoPay, OVO, Dana, QRIS, Bappebti, Kredivo

  **Acceptance Criteria**: 25 agents, all valid
  **QA Scenarios**: Validation pattern. **Evidence**: `.sisyphus/evidence/task-20-fin-fintech.txt`
  **Commit**: YES (groups with T19, T21)

- [ ] 21. Finance & Banking: Perlindungan Konsumen & OJK (24 agents)

  **What to do**:
  Create 24 ultra-detailed agents for Indonesian financial consumer protection.
  
  **Agent topic areas**:
  - Cara cek legalitas lembaga keuangan di OJK
  - Pengenalan dan pencegahan scam: phishing, social engineering
  - Mediasi perbankan melalui OJK
  - Pelaporan fraud ke OJK dan kepolisian
  - Hak nasabah: bunga, biaya admin, transparansi
  - Regulasi pinjaman online (POJK 40/2024)
  - Perlindungan data pribadi nasabah (UU PDP)
  - Literasi keuangan untuk berbagai usia
  - Penanganan debt collection yang tidak etis
  - Edukasi anti-judi online dan investasi bodong

  **Must NOT do**: See quality mandate. No overlap with T19/T20.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3 — **Blocks**: T35, T36 — **Blocked By**: T2, T10

  **Acceptance Criteria**: 24 agents, all valid. Total finance category: 75 (25+25+24+1 golden)

  **QA Scenarios**:
  ```
  Scenario: Full finance category
    Tool: Bash
    Steps:
      1. Run: bun packages/cli/src/cli.ts validate agents/finance/
      2. Assert: "75/75 agents valid"
    Evidence: .sisyphus/evidence/task-21-fin-ojk.txt
  ```

  **Commit**: YES (groups with T19, T20)

- [ ] 22. Education: Kurikulum & Guru (30 agents)

  **What to do**:
  Create 30 ultra-detailed agents for Indonesian teachers and curriculum.
  
  **Agent topic areas**:
  - Penyusunan Modul Ajar Kurikulum Merdeka per jenjang (SD/SMP/SMA)
  - Instrumen asesmen diagnostik, formatif, sumatif
  - Projek P5 (Profil Pelajar Pancasila) — ide per tema
  - Diferensiasi pembelajaran (konten, proses, produk)
  - Administrasi guru: RPP, silabus, prota, prosem
  - Penelitian Tindakan Kelas (PTK)
  - E-learning: Google Classroom, Moodle untuk sekolah Indonesia
  - Asesmen Nasional: AKM (literasi & numerasi)
  - Pendidikan inklusif untuk ABK (Anak Berkebutuhan Khusus)
  - Pengembangan bahan ajar digital berbasis TPACK

  **Must NOT do**: See quality mandate.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3 — **Blocks**: T35, T36 — **Blocked By**: T2, T10
  **References**: Golden: `agents/education/kurikulum-merdeka-copilot/` — Kurikulum Merdeka, CP, P5, AKM, RPP

  **Acceptance Criteria**: 30 agents, all valid
  **QA Scenarios**: Validation pattern. **Evidence**: `.sisyphus/evidence/task-22-edu-guru.txt`
  **Commit**: YES (groups with T23)

- [ ] 23. Education: Siswa & Ujian (29 agents)

  **What to do**:
  Create 29 ultra-detailed agents for Indonesian students and exam preparation.
  
  **Agent topic areas**:
  - SNBT/UTBK preparation: TPS, TKA per bidang
  - Seleksi mandiri universitas top (UI, ITB, UGM, ITS, UNPAD)
  - Beasiswa: LPDP, Djarum, KIP Kuliah, Bidikmisi
  - Tugas akhir: skripsi, tesis — panduan penelitian
  - Bahasa Inggris: TOEFL/IELTS preparation khusus siswa Indonesia
  - Olimpiade Sains Nasional (OSN) per mata pelajaran
  - Pesantren education: kitab kuning, tahfidz
  - PAUD dan pendidikan anak usia dini
  - Homeschooling di Indonesia: legalitas dan kurikulum
  - Gap year dan perencanaan karir pasca SMA

  **Must NOT do**: See quality mandate. No overlap with T22.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3

  **Acceptance Criteria**: 29 agents, all valid. Total education: 60 (30+29+1 golden)
  **QA Scenarios**: Validation: "60/60 agents valid". **Evidence**: `.sisyphus/evidence/task-23-edu-siswa.txt`
  **Commit**: YES (groups with T22)

- [ ] 24. Health: BPJS & Layanan Kesehatan (22 agents)

  **What to do**:
  Create 22 ultra-detailed agents for Indonesian healthcare services.
  
  **Agent topic areas**:
  - Alur rujukan berjenjang BPJS (Faskes 1 → RS)
  - Klaim BPJS: kacamata, gigi, persalinan, operasi
  - Daftar Faskes Tingkat 1 dan cara pindah faskes
  - Rawat inap dengan BPJS: hak kamar, naik kelas
  - Puskesmas services dan jadwal pelayanan
  - Telemedicine di Indonesia: Halodoc, Alodokter
  - Kesehatan ibu dan anak (KIA): posyandu, imunisasi
  - Program stunting prevention
  - Penyakit tropis: DBD, malaria, TBC — pencegahan
  - Kesehatan mental: akses layanan, stigma di Indonesia

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3 — **Blocked By**: T2, T10
  **References**: Golden: `agents/health/navigasi-sehat-bpjs/` — BPJS, Faskes, rujukan, Halodoc, posyandu

  **Acceptance Criteria**: 22 agents, all valid
  **QA Scenarios**: Validation pattern. **Evidence**: `.sisyphus/evidence/task-24-health-bpjs.txt`
  **Commit**: YES (groups with T25)

- [ ] 25. Health: Gaya Hidup Sehat & Obat Tradisional (22 agents)

  **What to do**:
  Create 22 ultra-detailed agents for Indonesian healthy lifestyle and traditional medicine.
  
  **Agent topic areas**:
  - Jamu tradisional: resep, manfaat, interaksi obat
  - Herbal Indonesia: temulawak, kunyit, jahe — evidens ilmiah
  - Nutrisi dan diet sesuai makanan Indonesia
  - Olahraga dan fitness untuk iklim tropis
  - Kesehatan reproduksi dan KB (Keluarga Berencana)
  - BPOM: cek izin edar obat dan kosmetik
  - Vaksinasi dewasa dan anak (jadwal Kemenkes)
  - Pertolongan pertama (P3K) di rumah
  - Alergi makanan dan intoleransi umum di Indonesia
  - Pola hidup sehat untuk pekerja kantoran Indonesia

  **Must NOT do**: See quality mandate. No overlap with T24.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3

  **Acceptance Criteria**: 22 agents, all valid. Total health: 45 (22+22+1 golden)
  **QA Scenarios**: Validation: "45/45 agents valid". **Evidence**: `.sisyphus/evidence/task-25-health-lifestyle.txt`
  **Commit**: YES (groups with T24)

- [ ] 26. Tech & Developer: Startup & API Indonesia (20 agents)

  **What to do**:
  Create 20 ultra-detailed agents for Indonesian tech startup ecosystem and government APIs.
  
  **Agent topic areas**:
  - Integrasi Midtrans payment gateway (Snap, Core API)
  - Integrasi Xendit (invoice, disbursement, QRIS)
  - SATUSEHAT API (Kemenkes health data platform)
  - OSS API integrasi untuk aplikasi perizinan
  - Dukcapil API: verifikasi identitas (KTP, NIK)
  - E-materai API integration
  - Indonesian startup funding: angel, seed, series A landscape
  - Regulatory sandbox OJK untuk fintech startup
  - Data privacy compliance (UU PDP) untuk startup
  - Indonesian cloud hosting: IDCloudHost, Biznet Gio, Dewaweb

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3
  **References**: Golden: `agents/tech/indo-dev-api-guide/` — Midtrans, Xendit, SATUSEHAT, Dukcapil

  **Acceptance Criteria**: 20 agents, all valid
  **QA Scenarios**: Validation pattern. **Evidence**: `.sisyphus/evidence/task-26-tech-startup.txt`
  **Commit**: YES (groups with T27)

- [ ] 27. Tech & Developer: Developer Tools & Karir IT (19 agents)

  **What to do**:
  Create 19 ultra-detailed agents for Indonesian developer tools and IT careers.
  
  **Agent topic areas**:
  - Setup development environment untuk developer Indonesia (lokal language, timezone)
  - Indonesian developer communities: Discord, Telegram, meetup
  - Karir IT di Indonesia: gaji, skill demand, remote work
  - Digital Talent Scholarship (Kominfo) application guide
  - Sertifikasi IT yang diakui di Indonesia
  - Indonesian open source contribution guide
  - Bahasa pemrograman populer di Indonesia dan demand-nya
  - Freelance developer: platform, pricing, kontrak
  - Tech interview preparation untuk perusahaan Indonesia
  - Indonesian tech blog/content creation

  **Must NOT do**: See quality mandate. No overlap with T26.

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3

  **Acceptance Criteria**: 19 agents, all valid. Total tech: 40 (20+19+1 golden)
  **QA Scenarios**: Validation: "40/40 agents valid". **Evidence**: `.sisyphus/evidence/task-27-tech-career.txt`
  **Commit**: YES (groups with T26)

- [ ] 28. Agriculture & Maritime (34 agents)

  **What to do**:
  Create 34 ultra-detailed agents for Indonesian agriculture and maritime sectors.
  
  **Agent topic areas**:
  - Budidaya padi: varietas unggul, SRI, jadwal tanam
  - Kelapa sawit: best practices, sertifikasi ISPO/RSPO
  - Kopi Indonesia: proses pasca panen, grading, export
  - Kakao, teh, rempah-rempah: budidaya dan pemasaran
  - Pupuk subsidi: jenis, distribusi, cara mengakses
  - Pertanian organik dan sertifikasi organik Indonesia
  - Perikanan tangkap: zona tangkap, musim ikan, alat tangkap legal
  - Budidaya ikan air tawar: lele, nila, gurame
  - Budidaya udang vaname dan bandeng
  - Rumput laut cultivation
  - Smart farming: IoT untuk pertanian Indonesia
  - Prediksi cuaca BMKG untuk petani dan nelayan
  - Koperasi tani dan nelayan
  - Asuransi pertanian (AUTP) dan perikanan (AUIN)

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3
  **References**: Golden: `agents/agriculture/penyuluh-tani-digital/` — pupuk subsidi, BMKG, ISPO/RSPO, AUTP, AUIN

  **Acceptance Criteria**: 34 agents + 1 golden = 35 total, all valid
  **QA Scenarios**: Validation: "35/35 agents valid". **Evidence**: `.sisyphus/evidence/task-28-agriculture.txt`
  **Commit**: YES
  - Message: `content(agriculture): add 34 agriculture & maritime agents`

- [ ] 29. Religion & Social (34 agents)

  **What to do**:
  Create 34 ultra-detailed agents for Indonesian religious and social life.
  
  **Agent topic areas**:
  - Perhitungan zakat: mal, penghasilan, fitrah, emas, saham
  - Wakaf: prosedur, badan wakaf (BWI), wakaf produktif
  - Jadwal sholat dan arah kiblat per kota Indonesia
  - Panduan haji dan umrah: prosedur Kemenag, biaya, BPIH
  - Sertifikasi halal BPJPH: prosedur, dokumen, biaya
  - Pernikahan Islam: prosedur KUA, mahar, walimah
  - Pernikahan lintas agama: regulasi di Indonesia
  - Pendidikan agama: pesantren, madrasah
  - Tradisi gotong royong dan musyawarah
  - Toleransi beragama dan dialog antar umat
  - Hari besar keagamaan: Idul Fitri, Natal, Waisak, Nyepi, Imlek
  - Organisasi sosial: NU, Muhammadiyah, PHDI, Walubi
  - Bantuan sosial pemerintah: PKH, BPNT, BLT

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3
  **References**: Golden: `agents/religion/halal-compliance-assistant/` — BPJPH, BAZNAS, BWI, Kemenag, KUA

  **Acceptance Criteria**: 34 + 1 golden = 35 total, all valid
  **QA Scenarios**: Validation: "35/35 agents valid". **Evidence**: `.sisyphus/evidence/task-29-religion.txt`
  **Commit**: YES
  - Message: `content(religion): add 34 religion & social agents`

- [ ] 30. Culture & Creative (29 agents)

  **What to do**:
  Create 29 ultra-detailed agents for Indonesian culture and creative industries.
  
  **Agent topic areas**:
  - Batik: teknik tulis/cap/printing, motif per daerah, makna simbolik
  - Wayang: jenis (kulit, golek, orang), cerita, tokoh
  - Tarian tradisional per provinsi
  - Bahasa daerah: Jawa (Ngoko/Kromo), Sunda, Batak, Minang, Bali
  - Musik tradisional: gamelan, angklung, sasando
  - Film Indonesia: produksi, distribusi, festival
  - Sastra Indonesia: puisi, cerpen, novel — penulisan kreatif
  - Desain grafis untuk UMKM kreatif Indonesia
  - Hak cipta dan HKI untuk karya kreatif
  - Kuliner Indonesia per daerah: resep, sejarah, teknik
  - Pariwisata budaya: desa wisata, homestay
  - Fashion Indonesia: modest fashion, wastra nusantara

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3
  **References**: Golden: `agents/culture/penerjemah-unggah-ungguh/`

  **Acceptance Criteria**: 29 + 1 golden = 30 total, all valid
  **QA Scenarios**: Validation: "30/30 agents valid". **Evidence**: `.sisyphus/evidence/task-30-culture.txt`
  **Commit**: YES
  - Message: `content(culture): add 29 culture & creative agents`

- [ ] 31. Transportation & Logistics (29 agents)

  **What to do**:
  Create 29 ultra-detailed agents for Indonesian transportation and logistics.
  
  **Agent topic areas**:
  - Perbandingan ekspedisi: JNE, J&T, SiCepat, Lion Parcel, Anteraja
  - Pengiriman antar pulau: laut, udara, darat
  - COD management: pencegahan penolakan, template balasan
  - Tracking dan resi automation
  - TransJakarta: rute, jadwal, integrasi Jaklingko
  - KAI: pemesanan tiket, kelas layanan, rute populer
  - Penerbangan domestik: Lion Air, Garuda, Citilink — tips booking
  - Gojek/Grab: tips driver, GoSend/GrabExpress untuk UMKM
  - Mudik planning: rute, estimasi waktu, rest area
  - Aturan ganjil-genap Jakarta
  - Perpanjangan SIM dan STNK online
  - Pajak kendaraan bermotor dan balik nama
  - Warehouse dan fulfillment center untuk e-commerce

  **Recommended Agent Profile**: `unspecified-high` — **Skills**: []
  **Parallelization**: Wave 3
  **References**: Golden: `agents/transport/logistik-antar-pulau/`

  **Acceptance Criteria**: 29 + 1 golden = 30 total, all valid
  **QA Scenarios**: Validation: "30/30 agents valid". **Evidence**: `.sisyphus/evidence/task-31-transport.txt`
  **Commit**: YES
  - Message: `content(transport): add 29 transportation & logistics agents`

- [ ] 32. Website: Agent Listing Page + Search + Filters

  **What to do**:
  - Build `/agents` page at `website/src/app/agents/page.tsx`:
  - **Category filter sidebar/tabs**: All 10 categories as clickable filters, plus "All" option
  - **Search bar**: Real-time search across agent names, descriptions, and tags
  - **Agent grid**: Cards showing agent name, category badge, brief description, tool count, platform badges
  - **Card design**: Dark card with subtle border, hover glow effect, category-colored accent
  - **URL params**: `/agents?category=gov-legal&search=pajak` — shareable filtered URLs
  - **Responsive**: Stack filters above grid on mobile
  - **Empty state**: "Tidak ada agen ditemukan" with suggestions
  - Load agent data at build time from YAML files using a build script/loader

  **Must NOT do**:
  - Do NOT add pagination (load all 500 — they're lightweight cards)
  - Do NOT add sort options (v2)
  - Do NOT make network calls at runtime (static data)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 3, parallel — **Blocks**: T37 — **Blocked By**: T11, T10

  **References**:
  - Categories: `agents/categories.json`
  - Agent data: loaded from `agents/*/config.yaml` at build time
  - Design: Linear's changelog grid, Vercel's template browser

  **Acceptance Criteria**:
  - [ ] `/agents` page renders grid of agent cards
  - [ ] Category filter shows all 10 categories + "All"
  - [ ] Search filters agents in real-time
  - [ ] URL params persist filter state
  - [ ] Empty state shows Indonesian message

  **QA Scenarios**:
  ```
  Scenario: Agent listing with search
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/agents
      2. Assert: agent cards visible (count ≥10)
      3. Type "pajak" in search input
      4. Assert: filtered cards visible, count reduced
      5. Assert: visible cards contain "pajak" related text
      6. Screenshot: search results
    Expected Result: Search filters correctly
    Evidence: .sisyphus/evidence/task-32-agent-listing.png

  Scenario: Category filter
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/agents
      2. Click "Government & Legal" category filter
      3. Assert: URL contains "category=gov-legal"
      4. Assert: only gov-legal agents shown
      5. Screenshot: filtered view
    Expected Result: Category filter works
    Evidence: .sisyphus/evidence/task-32-category-filter.png
  ```

  **Commit**: YES (groups with T33, T34)
  - Message: `feat(web): add agent listing page with search and category filters`

- [ ] 33. Website: Agent Detail Page + Copy to Clipboard

  **What to do**:
  - Build `/agents/[category]/[slug]` page at `website/src/app/agents/[category]/[slug]/page.tsx`:
  - **Agent header**: Name, category badge, tags, description
  - **System prompt display**: Full prompt.md content in a styled code/prose block
  - **Copy button**: One-click copy system prompt to clipboard (with "Copied!" feedback)
  - **Platform install section**: 4 tabs (Cursor, Claude, Copilot, OpenAI) showing install instructions per platform
  - **Tools section**: List of agent tools with descriptions
  - **Examples section**: Expandable example conversations
  - **Eval criteria**: Test cases displayed as "How to verify this agent works"
  - **Related agents**: Links to agents in same category
  - **Breadcrumb**: Home > Agents > Category > Agent Name
  - Generate all agent pages statically at build time

  **Must NOT do**:
  - Do NOT add a "try this agent" playground
  - Do NOT add rating or comments

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 3, parallel — **Blocks**: T37 — **Blocked By**: T11, T10

  **References**:
  - Agent data: `agents/{category}/{slug}/config.yaml`, `prompt.md`, `examples.json`
  - Clipboard API: `navigator.clipboard.writeText()`

  **Acceptance Criteria**:
  - [ ] Agent detail page renders full system prompt
  - [ ] Copy button copies prompt to clipboard
  - [ ] Platform tabs show correct install instructions per platform
  - [ ] Breadcrumb navigation works
  - [ ] Page is statically generated

  **QA Scenarios**:
  ```
  Scenario: Agent detail renders
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/agents/gov-legal/asisten-oss-kbli
      2. Assert: h1 contains "Asisten OSS-KBLI"
      3. Assert: system prompt text visible (≥200 words)
      4. Assert: "Copy" button exists
      5. Click "Copy" button
      6. Assert: button text changes to "Copied!" or similar feedback
      7. Screenshot: detail page
    Expected Result: Full detail page with working copy
    Evidence: .sisyphus/evidence/task-33-agent-detail.png

  Scenario: Platform tabs
    Tool: Playwright
    Steps:
      1. Navigate to agent detail page
      2. Click "Cursor" tab
      3. Assert: content shows .mdc related instructions
      4. Click "Claude" tab
      5. Assert: content shows CLAUDE.md instructions
    Expected Result: All 4 platform tabs show correct content
    Evidence: .sisyphus/evidence/task-33-platform-tabs.png
  ```

  **Commit**: YES (groups with T32, T34)

- [ ] 34. Website: Indonesian Guide / Documentation Page

  **What to do**:
  - Build `/guide` page at `website/src/app/guide/page.tsx`:
  - **Panduan Lengkap KonohaAgents** (Comprehensive Guide in Bahasa Indonesia):
    - Apa itu KonohaAgents? (Introduction)
    - Cara Instalasi (Installation via npm)
    - Cara Menggunakan CLI (CLI usage with examples)
    - Cara Memasang Agen ke Platform:
      - Cursor (with screenshots/code blocks)
      - Claude (CLAUDE.md setup)
      - GitHub Copilot (copilot-instructions.md)
      - OpenAI API (JSON format)
    - Cara Menemukan Agen yang Tepat (browsing, search tips)
    - Kontribusi (how to contribute)
    - FAQ
  - All content in Bahasa Indonesia
  - Code blocks with copy buttons
  - Table of contents sidebar

  **Must NOT do**:
  - Do NOT write in English (this is the Indonesian guide)
  - Do NOT add video tutorials (v2)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 3, parallel — **Blocks**: T37 — **Blocked By**: T11

  **Acceptance Criteria**:
  - [ ] `/guide` page renders complete guide in Bahasa Indonesia
  - [ ] All code blocks have copy buttons
  - [ ] Table of contents navigates correctly
  - [ ] All sections present: install, CLI, platforms, search, contribute, FAQ

  **QA Scenarios**:
  ```
  Scenario: Guide page renders
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/guide
      2. Assert: heading contains "Panduan" or "KonohaAgents"
      3. Assert: section "Cara Instalasi" exists
      4. Assert: section "Cursor" exists
      5. Assert: code blocks visible (at least 3)
      6. Screenshot: full guide page
    Expected Result: Complete Indonesian guide
    Evidence: .sisyphus/evidence/task-34-guide.png
  ```

  **Commit**: YES (groups with T32, T33)

- [ ] 35. AGENTS.md Auto-Generated Registry

  **What to do**:
  - Create a build script `scripts/generate-registry.ts` that:
    - Reads ALL agents from `agents/` directories
    - Generates `AGENTS.md` — a browsable Markdown registry of all 500 agents
    - Format:
      ```markdown
      # KonohaAgents Registry — 500 Agen AI Indonesia
      
      ## Pemerintahan & Hukum (75 agen)
      | ID | Nama | Deskripsi | Tools |
      |---|---|---|---|
      | gov-legal/asisten-oss-kbli | Asisten OSS-KBLI | Membantu UMKM memilih kode KBLI... | 3 |
      
      ## Bisnis & UMKM (75 agen)
      ...
      ```
    - Include category headers with agent counts
    - Sort agents alphabetically within categories
    - Include total count at top
  - Add npm script: `"registry": "bun scripts/generate-registry.ts"`

  **Must NOT do**:
  - Do NOT manually write AGENTS.md (must be auto-generated)
  - Do NOT include full system prompts (only ID, name, short description, tool count)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**: Wave 3, parallel — **Blocks**: T36 — **Blocked By**: T2, T10

  **Acceptance Criteria**:
  - [ ] Script generates AGENTS.md from agent data
  - [ ] AGENTS.md lists all 500 agents organized by category
  - [ ] Agent counts match targets per category

  **QA Scenarios**:
  ```
  Scenario: Registry generation
    Tool: Bash
    Steps:
      1. Run: bun scripts/generate-registry.ts
      2. Assert: AGENTS.md exists
      3. Run: grep -c "^|" AGENTS.md (count table rows)
      4. Assert: ≥500 rows (agents + headers)
      5. Assert: file contains "500" somewhere (total count)
    Expected Result: Complete registry with 500 agents
    Evidence: .sisyphus/evidence/task-35-registry.txt
  ```

  **Commit**: YES
  - Message: `docs: auto-generate AGENTS.md registry with 500 agents`

### Wave 4 — Polish & Deploy (4 tasks)

- [ ] 36. README.md — Bilingual Documentation with Badges

  **What to do**:
  - Create `README.md` at project root in **English** (primary language per user decision)
  - Include sections: hero banner (text-only, no images), description, features list, installation (`npm i konoha-agents`), quick start code examples (JS + CLI), agent categories table with counts, CLI usage reference (validate/list/search/sync), cross-platform transpiler examples (Cursor, Claude, Copilot, OpenAI), contributing guidelines, license (MIT)
  - Add badges: npm version, npm downloads, license MIT, GitHub stars, agent count (500)
  - Add a **"Bahasa Indonesia"** section near the top with a 3-paragraph summary in Bahasa Indonesia explaining the project for Indonesian users — NOT a full translation, just a welcoming summary that points to the website for full Bahasa content
  - Include a "Why KonohaAgents?" section highlighting: ultra-detailed agents (not simple personas), real Indonesian regulations/terminology, cross-platform compatibility, offline CLI, 500 agents across 10 domains
  - Add a quick agent preview showing a snippet from one golden agent to demonstrate depth
  - Include link to the deployed website

  **Must NOT do**:
  - Do NOT create a separate README-ID.md — keep it one file, bilingual
  - Do NOT include images or screenshots (no assets exist yet)
  - Do NOT add contributing instructions beyond basics (no CLA, no complex process)
  - Do NOT write the Bahasa Indonesia section in English then translate — write natively
  - Do NOT use AI-slop phrases ("cutting-edge", "revolutionary", "game-changing")

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: This is documentation writing — prose-heavy, needs bilingual skill, formatting matters
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: README is markdown, not UI

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (sequential — needs all content to exist for accurate counts/examples)
  - **Blocks**: T39 (deploy)
  - **Blocked By**: T13-T35 (all content and website tasks must be complete)

  **References**:

  **Pattern References**:
  - `agents/gov-legal/` — Reference actual agent to include as preview snippet in README
  - `packages/cli/src/commands/` — CLI command names and flags for usage reference section

  **API/Type References**:
  - `package.json` — Package name, version, scripts for installation instructions

  **External References**:
  - https://shields.io — Badge URL format for npm version, license, downloads
  - https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes — GitHub README best practices

  **WHY Each Reference Matters**:
  - Agent directory: need actual file paths and real agent content for the preview snippet (must be authentic, not made up)
  - CLI commands: need exact command names/flags so README matches actual implementation
  - package.json: need exact package name for install instructions

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: README renders correctly on GitHub
    Tool: Bash
    Preconditions: README.md exists at project root
    Steps:
      1. Run `cat README.md | head -5` — verify first line is `# KonohaAgents`
      2. Run `grep -c "##" README.md` — verify at least 8 H2 sections exist
      3. Run `grep "npm i konoha-agents" README.md` — verify install command present
      4. Run `grep "npx konoha" README.md` — verify CLI usage examples present
      5. Run `grep "Bahasa Indonesia" README.md` — verify Bahasa section exists
      6. Run `grep -c "badge" README.md || grep -c "shields.io" README.md` — verify badges present
    Expected Result: All greps return matches; README has ≥8 sections, install command, CLI examples, badges, Bahasa section
    Failure Indicators: Missing sections, English-only without Bahasa summary, no badges, wrong package name
    Evidence: .sisyphus/evidence/task-36-readme-structure.txt

  Scenario: Bahasa Indonesia section is authentic
    Tool: Bash
    Preconditions: README.md exists
    Steps:
      1. Extract text between "## Bahasa Indonesia" and next "##" header
      2. Verify no English sentences in that section (allow technical terms like "CLI", "npm", "agent")
      3. Verify section is ≥100 words
      4. Verify section contains link to website
    Expected Result: Bahasa section is ≥100 words, in Indonesian, contains website link
    Failure Indicators: Section is in English, too short, or missing website link
    Evidence: .sisyphus/evidence/task-36-readme-bahasa.txt
  ```

  **Evidence to Capture:**
  - [ ] task-36-readme-structure.txt — Section count and content verification
  - [ ] task-36-readme-bahasa.txt — Bahasa section authenticity check

  **Commit**: YES
  - Message: `docs: add bilingual README with badges and usage guide`
  - Files: `README.md`
  - Pre-commit: `cat README.md | wc -l` (expect ≥150 lines)

- [ ] 37. Website SEO + Static Export Configuration

  **What to do**:
  - Configure `next.config.js` with `output: 'export'` for Vercel static hosting
  - Add comprehensive metadata in `website/app/layout.tsx`:
    - `<title>`: "KonohaAgents — 500 AI Agent untuk Indonesia"
    - `<meta description>`: Bahasa Indonesia description (≥150 chars)
    - Open Graph tags: title, description, type, locale (id_ID)
    - Twitter card tags
  - Add `robots.txt` and `sitemap.xml` generation (static — list all agent detail pages)
  - Verify `next build` produces static HTML in `out/` directory
  - Add `<html lang="id">` to root layout
  - Ensure all pages have proper `<head>` metadata

  **Must NOT do**:
  - Do NOT add Google Analytics or third-party tracking (Vercel Analytics only, already in layout)
  - Do NOT add server-side features (getServerSideProps, API routes) — must remain static
  - Do NOT add complex sitemap generation — simple static list is fine
  - Do NOT add structured data / JSON-LD (over-engineering for v1)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuration changes in 2-3 files — small scope, well-defined
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: This is config, not UI design

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (parallel with T36, T38)
  - **Blocks**: T39 (deploy)
  - **Blocked By**: T11 (website project must exist)

  **References**:

  **Pattern References**:
  - `website/next.config.js` — Existing Next.js config to extend with `output: 'export'`
  - `website/app/layout.tsx` — Root layout where metadata and `<html lang>` go

  **External References**:
  - https://nextjs.org/docs/app/building-your-application/deploying/static-exports — Static export configuration
  - https://nextjs.org/docs/app/api-reference/functions/generate-metadata — Metadata API

  **WHY Each Reference Matters**:
  - next.config.js: Must add `output: 'export'` without breaking existing config
  - layout.tsx: Root metadata affects all pages — need to see current structure before adding SEO tags

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Static export builds successfully
    Tool: Bash
    Preconditions: Website project exists with all pages
    Steps:
      1. Run `cd website && npm run build` (or `next build`)
      2. Verify `out/` directory is created
      3. Run `ls out/index.html` — verify homepage HTML exists
      4. Run `ls out/robots.txt` — verify robots.txt exists
      5. Run `grep "lang=\"id\"" out/index.html` — verify Indonesian language tag
      6. Run `grep "og:title" out/index.html` — verify Open Graph tags present
    Expected Result: Build succeeds, `out/` directory with index.html containing lang="id" and OG tags
    Failure Indicators: Build fails, no out/ directory, missing lang tag, missing OG tags
    Evidence: .sisyphus/evidence/task-37-static-build.txt

  Scenario: SEO metadata is correct
    Tool: Bash
    Preconditions: Static build completed
    Steps:
      1. Run `grep "<title>" out/index.html` — verify title contains "KonohaAgents"
      2. Run `grep "description" out/index.html` — verify meta description exists and is in Bahasa
      3. Run `grep "id_ID" out/index.html` — verify Indonesian locale in OG tags
    Expected Result: Title contains project name, description in Bahasa, locale is id_ID
    Failure Indicators: English-only metadata, missing description, wrong locale
    Evidence: .sisyphus/evidence/task-37-seo-metadata.txt
  ```

  **Evidence to Capture:**
  - [ ] task-37-static-build.txt — Build output and file verification
  - [ ] task-37-seo-metadata.txt — Metadata content verification

  **Commit**: YES
  - Message: `feat(web): static export, SEO metadata, and Vercel config`
  - Files: `website/next.config.js`, `website/app/layout.tsx`, `website/public/robots.txt`
  - Pre-commit: `cd website && npm run build` (expect success)

- [ ] 38. npm Package Preparation

  **What to do**:
  - Create `.npmignore` at project root excluding: `website/`, `.sisyphus/`, `test-fixtures/`, `.github/`, `*.md` (except README), `out/`, `.next/`, `node_modules/`
  - Update `package.json` fields:
    - `"name": "konoha-agents"`
    - `"version": "1.0.0"`
    - `"description"`: English description of the package
    - `"main": "dist/index.js"` (CJS entry)
    - `"module": "dist/index.mjs"` (ESM entry)
    - `"types": "dist/index.d.ts"`
    - `"exports"` field with proper dual ESM/CJS paths
    - `"bin": { "konoha": "dist/cli.js" }`
    - `"files"`: `["dist/", "agents/", "README.md", "LICENSE"]`
    - `"keywords"`: `["ai-agents", "indonesia", "llm", "prompt-engineering", "cursor", "claude", "chatgpt", "konoha"]`
    - `"repository"`, `"homepage"`, `"bugs"` pointing to GitHub repo
    - `"license": "MIT"`
  - Run `npm pack --dry-run` to verify package contents and size (target < 10MB)
  - Verify `dist/` exists from prior build step (tsup output)
  - Verify the package can be required: `node -e "require('./dist/index.js')"`

  **Must NOT do**:
  - Do NOT publish to npm (that's T39's job)
  - Do NOT change the build toolchain (tsup already configured in T1)
  - Do NOT add postinstall scripts
  - Do NOT include website assets in npm package
  - Do NOT exceed 10MB package size

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Configuration file edits — .npmignore and package.json updates, small scope
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None relevant

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (parallel with T36, T37)
  - **Blocks**: T39 (deploy)
  - **Blocked By**: T1 (package.json exists), T4 (build config exists), T6 (CLI built)

  **References**:

  **Pattern References**:
  - `package.json` — Existing package.json to update with npm-specific fields
  - `tsconfig.json` — Build output paths to reference for `main`/`module`/`types` fields

  **API/Type References**:
  - `packages/core/src/index.ts` — Main entry point export shape (what consumers import)
  - `packages/cli/src/index.ts` — CLI entry point for `bin` field

  **External References**:
  - https://docs.npmjs.com/cli/v10/configuring-npm/package-json — package.json field reference
  - https://docs.npmjs.com/cli/v10/using-npm/developers#keeping-files-out-of-your-package — .npmignore patterns

  **WHY Each Reference Matters**:
  - package.json: Need current state to know what fields already exist vs need adding
  - Build output paths: `main`/`module`/`types` must match actual tsup output paths
  - Entry points: Need to verify exports match what tsup builds

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: npm pack produces valid package
    Tool: Bash
    Preconditions: Build completed (dist/ exists), .npmignore created
    Steps:
      1. Run `npm pack --dry-run 2>&1` — capture file listing
      2. Verify output does NOT include `website/`, `.sisyphus/`, `test-fixtures/`
      3. Verify output DOES include `dist/`, `agents/`, `README.md`, `LICENSE`
      4. Check package size from output — must be < 10MB
      5. Run `npm pack` to create actual .tgz
      6. Run `tar tzf konoha-agents-1.0.0.tgz | head -20` — verify contents
    Expected Result: Package < 10MB, includes dist/ + agents/ + README + LICENSE, excludes website/ and dev files
    Failure Indicators: Package > 10MB, includes website/, missing agents/ or dist/
    Evidence: .sisyphus/evidence/task-38-npm-pack.txt

  Scenario: Package is requireable
    Tool: Bash
    Preconditions: dist/ built by tsup
    Steps:
      1. Run `node -e "const k = require('./dist/index.js'); console.log(typeof k)"` — verify exports
      2. Run `node -e "const k = require('./dist/index.js'); console.log(Object.keys(k).length > 0)"` — verify non-empty exports
    Expected Result: require() succeeds, exports are non-empty object
    Failure Indicators: require() throws, empty exports
    Evidence: .sisyphus/evidence/task-38-npm-require.txt
  ```

  **Evidence to Capture:**
  - [ ] task-38-npm-pack.txt — Pack dry-run output with file listing and size
  - [ ] task-38-npm-require.txt — require() output

  **Commit**: YES
  - Message: `chore: npm package preparation with .npmignore and package.json metadata`
  - Files: `.npmignore`, `package.json`
  - Pre-commit: `npm pack --dry-run` (expect success, < 10MB)

- [ ] 39. Deploy: Vercel + npm publish + GitHub Setup + Final Push

  **What to do**:
  - **GitHub Repository Setup**:
    - Verify remote is set to `https://github.com/vaskoyudha/KonohaAgents.git`
    - Push all code with full commit history (all waves should already be pushed per commit strategy)
    - Add GitHub topics: `ai-agents`, `indonesia`, `llm`, `prompt-engineering`, `cursor`, `claude`, `chatgpt`
    - Create a GitHub release v1.0.0 with changelog summary
  - **Vercel Deployment**:
    - Deploy website from `website/` directory using `npx vercel --prod` (or Vercel CLI)
    - Configure: Framework = Next.js, Root = `website/`, Output = static
    - Verify deployed URL loads correctly
  - **npm Publish**:
    - Run `npm publish --access public` to publish `konoha-agents@1.0.0`
    - Verify: `npm info konoha-agents` returns package info
    - Test install: `npm install konoha-agents` in a temp directory
  - **Final Verification**:
    - All 500 agents accessible via npm package
    - CLI works after install: `npx konoha-agents validate`
    - Website live and browsable
    - GitHub repo has proper description, topics, README rendering

  **Must NOT do**:
  - Do NOT force push — regular push only
  - Do NOT create multiple GitHub releases (just v1.0.0)
  - Do NOT set up custom domain (Vercel default URL is fine for v1)
  - Do NOT add GitHub Actions / CI (not in scope)
  - Do NOT add GitHub Pages (using Vercel instead)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Deployment commands — `vercel`, `npm publish`, `gh release` — are well-defined CLI operations
  - **Skills**: [`git-master`]
    - `git-master`: Handles git push, tagging, GitHub release creation via gh CLI

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (final task, after T36-T38)
  - **Blocks**: F1-F4 (Final Verification Wave)
  - **Blocked By**: T36, T37, T38

  **References**:

  **Pattern References**:
  - `package.json` — Version and name for npm publish
  - `.git/config` — Verify remote URL

  **External References**:
  - https://vercel.com/docs/cli — Vercel CLI deployment commands
  - https://docs.npmjs.com/cli/v10/commands/npm-publish — npm publish reference
  - https://cli.github.com/manual/gh_release_create — GitHub release creation

  **WHY Each Reference Matters**:
  - package.json: npm publish uses name+version from here — must be correct
  - Vercel docs: deployment command flags for static Next.js site

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Vercel deployment is live
    Tool: Bash (curl)
    Preconditions: Website built and deployed via Vercel CLI
    Steps:
      1. Run `curl -s -o /dev/null -w "%{http_code}" https://<vercel-url>/` — verify 200
      2. Run `curl -s https://<vercel-url>/ | grep "KonohaAgents"` — verify content loads
      3. Run `curl -s -o /dev/null -w "%{http_code}" https://<vercel-url>/agents` — verify agents page loads (200)
    Expected Result: All pages return 200, content contains "KonohaAgents"
    Failure Indicators: 404/500 errors, empty response, wrong content
    Evidence: .sisyphus/evidence/task-39-vercel-deploy.txt

  Scenario: npm package is published and installable
    Tool: Bash
    Preconditions: npm publish completed
    Steps:
      1. Run `npm info konoha-agents version` — verify returns "1.0.0"
      2. Create temp dir: `mktemp -d`
      3. Run `cd <tmpdir> && npm init -y && npm install konoha-agents`
      4. Run `node -e "const k = require('konoha-agents'); console.log(Object.keys(k.agents).length)"` — expect 500
      5. Run `npx konoha validate` — expect "500/500 agents valid"
      6. Cleanup temp dir
    Expected Result: Package installs, exports 500 agents, CLI validate passes
    Failure Indicators: npm info fails, install fails, agent count wrong, CLI broken
    Evidence: .sisyphus/evidence/task-39-npm-install.txt

  Scenario: GitHub repository is properly configured
    Tool: Bash
    Preconditions: All code pushed
    Steps:
      1. Run `gh repo view vaskoyudha/KonohaAgents --json name,description` — verify exists
      2. Run `gh release view v1.0.0 --repo vaskoyudha/KonohaAgents` — verify release exists
      3. Run `git log --oneline | wc -l` — verify ≥20 commits (wave-by-wave history)
    Expected Result: Repo exists, v1.0.0 release created, full commit history present
    Failure Indicators: Repo not found, no release, squashed history
    Evidence: .sisyphus/evidence/task-39-github-setup.txt
  ```

  **Evidence to Capture:**
  - [ ] task-39-vercel-deploy.txt — Deployment URL and curl responses
  - [ ] task-39-npm-install.txt — npm install and validation output
  - [ ] task-39-github-setup.txt — GitHub repo and release verification

  **Commit**: YES
  - Message: `deploy: Vercel deployment, npm publish v1.0.0, GitHub release`
  - Files: (deployment artifacts, no source changes)
  - Pre-commit: N/A (deployment step)

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read agent files, run CLI commands, check website). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.sisyphus/evidence/`. Verify: 500 agents exist, all pass `konoha validate`, CLI commands work, website loads. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + `npx konoha validate agents/`. Review CLI source for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code. Check agent content for AI slop: generic descriptions ("Membantu pengguna dengan..."), duplicate system prompts, English in Bahasa content. Spot-check 20 random agents for authenticity.
  Output: `Build [PASS/FAIL] | Validate [N/N pass] | Code [N clean/N issues] | Content [N/N authentic] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Test CLI: `konoha list`, `konoha search "pajak"`, `konoha validate agents/`, `konoha sync --target cursor --agent gov-legal/asisten-oss-kbli --dry-run`. Test website via Playwright: homepage loads, agent browser works, search filters, agent detail shows full prompt, copy button works, dark mode works. Test npm: `npm pack`, verify structure.
  Output: `CLI [N/N pass] | Website [N/N] | npm [PASS/FAIL] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual files/diff. Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Count agents per category (must match targets: Gov 75, Business 75, Finance 75, Education 60, Health 45, Tech 40, Agriculture 35, Religion 35, Culture 30, Transport 30). Detect unaccounted files.
  Output: `Tasks [N/N compliant] | Agent Count [500/500] | Categories [10/10 correct] | VERDICT`

---

## Commit Strategy

| Wave | Commit | Message | Files |
|------|--------|---------|-------|
| 1 | 1 | `init: repository setup with package.json, tsconfig, LICENSE, and project structure` | package.json, tsconfig.json, LICENSE, .gitignore, directory scaffold |
| 1 | 2 | `feat(schema): add Zod agent schema with TypeScript types and JSON Schema` | schemas/, packages/core/src/schema.ts |
| 1 | 3 | `feat(schema): add test fixtures and agent template utilities` | test-fixtures/, packages/core/src/template.ts |
| 2 | 4 | `feat(cli): add commander setup with validate, list, search commands` | packages/cli/ |
| 2 | 5 | `feat(transpiler): add cross-platform transpilers and sync command` | packages/cli/src/transpilers/ |
| 2 | 6 | `content: add 10 golden reference agents (1 per category)` | agents/*/golden/ |
| 2 | 7 | `feat(web): Next.js project setup with Tailwind and dark mode` | website/ |
| 3 | 8 | `content(gov-legal): add 74 Government & Legal agents` | agents/gov-legal/ |
| 3 | 9 | `content(business): add 74 Business & UMKM agents` | agents/business/ |
| 3 | 10 | `content(finance): add 74 Finance & Banking agents` | agents/finance/ |
| 3 | 11 | `content(education): add 59 Education & Academic agents` | agents/education/ |
| 3 | 12 | `content(health): add 44 Health & Wellness agents` | agents/health/ |
| 3 | 13 | `content(tech): add 39 Tech & Developer agents` | agents/tech/ |
| 3 | 14 | `content(agriculture): add 34 Agriculture & Maritime agents` | agents/agriculture/ |
| 3 | 15 | `content(religion): add 34 Religion & Social agents` | agents/religion/ |
| 3 | 16 | `content(culture): add 29 Culture & Creative agents` | agents/culture/ |
| 3 | 17 | `content(transport): add 29 Transport & Logistics agents` | agents/transport/ |
| 3 | 18 | `feat(web): add agent listing, detail pages, and Indonesian guide` | website/app/ |
| 3 | 19 | `docs: auto-generate AGENTS.md registry` | AGENTS.md |
| 4 | 20 | `docs: add bilingual README with badges and usage guide` | README.md |
| 4 | 21 | `feat(web): static export, SEO, Vercel config` | website/next.config.js, website/app/layout.tsx |
| 4 | 22 | `chore: npm package preparation` | .npmignore, package.json |
| 4 | 23 | `deploy: Vercel deployment and GitHub setup` | — |
| PUSH | — | Push after each wave completion | — |

---

## Success Criteria

### Verification Commands
```bash
npx konoha validate agents/          # Expected: "✓ 500/500 agents valid"
npx konoha list | wc -l              # Expected: ≥500 lines
npx konoha search "pajak"            # Expected: ≥3 agents returned
npx konoha sync --target cursor --agent gov-legal/asisten-oss-kbli --dry-run  # Expected: valid .mdc output
npm pack                              # Expected: konoha-agents-1.0.0.tgz < 10MB
node -e "const k = require('konoha-agents'); console.log(Object.keys(k.agents).length)"  # Expected: 500
```

### Final Checklist
- [ ] All 500 agents pass schema validation
- [ ] Zero agents have generic/placeholder content
- [ ] CLI commands all functional (validate, list, search, sync × 4 targets)
- [ ] Website deployed and browsable with all 500 agents
- [ ] npm package published and installable
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] README is bilingual and has badges/usage guide
- [ ] AGENTS.md auto-generated with all 500 agents listed
