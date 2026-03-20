# KonohaAgents — Learnings & Conventions

## [2026-03-21] Session Start

### Project Structure
- Working dir: /home/vascosera/Documents/Github/KonohaAgents
- Stack: TypeScript + tsup (build), Commander.js + chalk (CLI), Zod (validation), js-yaml (parsing), Next.js (website)
- Package manager: bun
- Two files per agent: config.yaml + prompt.md + examples.json

### Agent ID Convention
- Format: `{category-slug}/{agent-slug}` (e.g., `gov-legal/asisten-oss-kbli`)
- Category slugs: gov-legal, business, finance, education, health, tech, agriculture, religion, culture, transport

### Category Distribution
- Gov & Legal: 75 agents (T13×25 + T14×25 + T15×24 + 1 golden)
- Business: 75 (T16×25 + T17×25 + T18×24 + 1 golden)
- Finance: 75 (T19×25 + T20×25 + T21×24 + 1 golden)
- Education: 60 (T22×30 + T23×29 + 1 golden)
- Health: 45 (T24×22 + T25×22 + 1 golden)
- Tech: 40 (T26×20 + T27×19 + 1 golden)
- Agriculture: 35 (T28×34 + 1 golden)
- Religion: 35 (T29×34 + 1 golden)
- Culture: 30 (T30×29 + 1 golden)
- Transport: 30 (T31×29 + 1 golden)
- TOTAL: 500

### Quality Mandates (CRITICAL)
- System prompts MINIMUM 200 words (golden: 300+), entirely in Bahasa Indonesia
- Real Indonesian law numbers, agency names, form codes required
- ZERO generic phrases: "Membantu pengguna dengan..."
- ZERO English in Bahasa content (except proper nouns like BPJS, OSS)
- ZERO duplicate agents
- ZERO placeholder content — konoha validate must pass before commit

### Build Tools
- tsup for bundling (NOT tsc, NOT webpack)
- Dual ESM/CJS output: dist/index.mjs + dist/index.cjs
- CLI shebang via tsup banner
- bun for running scripts

### GitHub Remote
- URL: https://github.com/vaskoyudha/KonohaAgents.git
