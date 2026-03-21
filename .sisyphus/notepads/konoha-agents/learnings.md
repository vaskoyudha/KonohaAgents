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

## [2026-03-21] Wave 1 Completion (T1, T3, T4)

### Execution Summary
- **T1 PASS**: Git repo initialized, package.json created with all required fields, LICENSE and README scaffolds added, .gitignore configured
- **T3 PASS**: All 10 category directories created (gov-legal, business, finance, education, health, tech, agriculture, religion, culture, transport), agents/categories.json with 10 entries summing to 500 total agents
- **T4 PASS**: TypeScript setup complete (strict mode enabled), tsup dual ESM/CJS configuration, dev dependencies installed (typescript, tsup, @types/node)

### Key Observations
- Package manager: npm used (bun not available in environment); equivalent to `bun add -d`
- Build output: dist/index.mjs (ESM) + dist/index.cjs (CJS) + dist/cli.mjs (CLI with shebang)
- Root commit hash: af17167 (33 files committed)
- Git push requires authentication (SSH key or GitHub token needed in next session)

### Technical Details
- tsconfig.json strict mode: true, moduleResolution: bundler (modern best practice)
- Path aliases: @konoha/core → ./packages/core/src/index.ts
- CLI entry point: packages/cli/src/cli.ts (needs commander + chalk implementation)
- Core entry point: packages/core/src/index.ts (needs validation + loader implementation)

### Readiness for T2, T5, T6
- T2 (schema validation): Ready — can begin once dependent tasks align
- T5 (test fixtures): Depends on T2 schema; directory structure ready
- T6 (agent loader): Depends on T2 schema; infrastructure ready


## Wave 1 Foundation - T2/T5/T6 Schema & Fixtures (2025-03-21)

### Learnings

1. **Zod Schema Patterns for Agent Config**
   - Use `z.record(z.string(), z.unknown())` for flexible JSON objects (e.g., parameters_schema)
   - Regex validation for format enforcement: `z.string().regex(/pattern/, message)` 
   - Enum validation with `.enum(['a', 'b'])` for fixed categories
   - Min/max constraints: `.min(N, message)` provides custom error messages
   - Default values: `.default(value)` for optional fields

2. **Fixture Design for Validation Testing**
   - Valid fixture: Complete agent from real domain (OSS-KBLI govt/legal)
   - Invalid fixture: Deliberately empty arrays in required fields (tools: [], eval_criteria: [])
   - Edge-case fixture: All optional fields populated, boundary values, Unicode content, expert level
   - Each fixture includes 3 files: config.yaml (metadata), prompt.md (system), examples.json (conversations)

3. **TypeScript Error Handling in Zod**
   - Use `result.error.issues` (not `.errors`) for ZodError.issues array
   - Path can be partial: check `issue.path || []` before joining
   - SafeParse always returns `{ success: boolean, data?, error? }`

4. **YAML + TypeScript Integration**
   - `js-yaml.load()` returns `unknown` type, requires casting
   - Schema validation must happen AFTER YAML parsing
   - File references in YAML (e.g., system_prompt_file: "prompt.md") are strings, not paths

### Conventions

- Agent IDs: `{category-slug}/{agent-slug}` regex: `^[a-z-]+\/[a-z-]+$`
- Categories: gov-legal, business, finance, education, health, tech, agriculture, religion, culture, transport
- Version format: semver `^\d+\.\d+\.\d+$`
- Last updated format: `^\d{4}-\d{2}-\d{2}$` (ISO 8601)
- Bahasa Indonesia content: No English except technical terms and proper nouns
- Eval criteria: Minimum 2 per agent with question (10+ chars), expected_behavior (20+ chars), gold_standard_answer (20+ chars)
- System prompt files: Minimum 50 words, specific to agent domain

### Architecture Notes

- Schema lives in `schemas/agent.schema.ts` (root)
- Core package re-exports: `packages/core/src/{schema,types,loader,template,index}.ts`
- Loader functions: loadAgent(), loadAllAgents(), validateAgent() all handle file I/O
- Validation result type: `{ valid: boolean, errors: ValidationError[] }`

## [2026-03-21] CLI Core Entry + Validate Command

### Learnings
- `tsx/cjs` cannot load TypeScript files containing top-level `await`; CLI entry should call `void program.parseAsync(...)` under execution guard rather than top-level `await`.
- Commander + chalk integration works cleanly in ESM with TypeScript when imports use `import` syntax only.
- Validation UX is clearer with per-agent pass/fail lines and field-level error bullets (`path: message`).

### Command Behavior
- `validate` command walks nested `category/agent` directories and also accepts direct single-agent directories.
- Duplicate `identity.id` detection is implemented across discovered agents and reported as `identity.id` errors.
- Exit code behavior: `0` when all agents valid, `1` when any validation or duplicate errors are present.

### Dependency Notes
- Root dependencies now include `commander` and `chalk`.
- Root devDependencies include `tsx` so `.ts` CLI files can run without build.

## [2026-03-21] 17 Missing Agents — Business & Gov-Legal

### Execution Summary
- Created 15 business agents + 2 gov-legal agents (51 files total: config.yaml + prompt.md + examples.json each)
- Validation: 75/75 business ✅, 75/75 gov-legal ✅ — zero failures
- Commit: `content(agents): create 17 missing complete agents in business and gov-legal` pushed to master

### Key Learnings
- **examples.json format**: Golden reference uses `"turns"` key (NOT `"conversation"` as mentioned in task spec). Always follow golden reference over task description when they conflict.
- **Agent ID regex**: Allows digits — `^[a-z0-9-]+\/[a-z0-9-]+$` (e.g., `business/warehouse-fulfillment-3pl`)
- **prompt.md structure**: ~22 lines, 4 sections: Misi Utama, Alur Kerja (numbered), Pengetahuan Domain, Batasan. Min 300 words Bahasa Indonesia.
- **config.yaml platform_configs**: openai temperature 0.3, anthropic model claude-3-5-sonnet-20241022, cursor globs [] and alwaysApply false
- **Validation command**: `node --import tsx/esm packages/cli/src/cli.ts validate agents/{category}/`
- **Real law citations are mandatory**: Each agent references actual Indonesian regulations (UU, PP, Peraturan, KEP numbers)

## [2026-03-21] Finance Perbankan & Investasi Batch (24 Agents)

### Learnings
- Validasi efektif dilakukan per fase pembuatan, tetapi command `validate` hanya menerima satu path direktori; jadi gunakan `validate agents/finance/` berulang setelah tiap batch.
- Struktur `examples.json` wajib memakai key `turns`; format lain akan gagal terhadap standar repositori.
- Referensi regulasi Indonesia nyata perlu konsisten di `knowledge_domains.sources` untuk menjaga kualitas konten domain finance.
- Untuk task ini, target akhir yang benar adalah `26/26 agents valid` pada `agents/finance/` (2 existing + 24 baru).

- 2026-03-21: Menambahkan 25 agent finance fintech/digital keuangan dengan pola wajib 3 file (config.yaml, prompt.md, examples.json) dan semua examples memakai key "turns".
- 2026-03-21: Validasi CLI untuk agents/finance lulus 59/59 setelah batch 8+8+9, menandakan format YAML/JSON/prompt sesuai skema repo.
- 2026-03-21: Referensi regulasi efektif di knowledge_domains.sources untuk tema ini: POJK 10/2022, POJK 40/2024, PBI 20/2018, PBI 23/2021, UU 40/2014, Peraturan Bappebti 8/2021, UU ITE, UU TPPU.

## [2026-03-21] Finance Konsumen/OJK Batch (16 Agents)

### Learnings
- Berhasil membuat 16 agent finance baru (48 file) dengan format konsisten: config.yaml + prompt.md + examples.json.
- Semua `prompt.md` memenuhi syarat minimal 300 kata dan 4 section wajib (Misi Utama, Alur Kerja, Pengetahuan Domain, Batasan).
- Seluruh `examples.json` memakai key `turns` sesuai schema/validator, bukan `conversation`.
- Referensi hukum nyata per domain diterapkan: POJK 31/2020, UU 37/2004, KUHPerdata Buku II, UU 1/1974, UU 41/2004, UU 23/2011, UU 25/1992, PMK 84/2006, POJK 35/2018, UU 11/1992, PP 46/2015, UU 4/2016, UU 24/2011, PP 82/2019.
- Validasi akhir kategori finance lulus penuh: `75/75 agents valid`.
- Commit & push sukses: `content(finance): add 16 konsumen dan OJK finance agents` (279615d) ke `origin/master`.


## [2026-03-21] Education Kurikulum & Guru Batch (29 Agents)

### Learnings
- Berhasil menambahkan 29 agen education baru bertema kurikulum dan guru (87 file: config.yaml, prompt.md, examples.json) tanpa mengubah agen referensi .
- Seluruh  ditulis dalam Bahasa Indonesia dengan 4 section wajib (Misi Utama, Alur Kerja, Pengetahuan Domain, Batasan) dan panjang >= 300 kata.
- Seluruh  memakai key  (bukan ) dengan jawaban asisten >= 100 kata dan menyebut rujukan regulasi relevan.
- Rujukan regulasi pendidikan Indonesia yang digunakan konsisten sesuai domain: Permendikbudristek 16/2022, Permendiknas 16/2007, Permendikbudristek 40/2021, UU 14/2005, PP 41/2009, Permendikbud 79/2015, Permendikbudristek 2/2022, Permendikbud 1/2021, Permendikbud 137/2014, Permendikbud 13/2018, Permendiknas 70/2009.
- Validasi CLI sukses penuh:  pada  (termasuk 1 agen existing).
- LSP diagnostics bersih untuk file  dan  pada folder education (0 error);  tidak memiliki server LSP terkonfigurasi di environment ini.
- Commit dan push berhasil ke :  (ef977cb).


## [2026-03-21] Education Kurikulum & Guru Batch (29 Agents) — Koreksi Catatan

### Learnings (Koreksi)
- Berhasil menambahkan 29 agen education baru bertema kurikulum dan guru (87 file: config.yaml, prompt.md, examples.json) tanpa mengubah agen referensi education/kurikulum-merdeka-copilot.
- Seluruh prompt.md ditulis dalam Bahasa Indonesia dengan 4 section wajib (Misi Utama, Alur Kerja, Pengetahuan Domain, Batasan) dan panjang >= 300 kata.
- Seluruh examples.json memakai key turns (bukan conversation) dengan jawaban asisten >= 100 kata dan menyebut rujukan regulasi relevan.
- Rujukan regulasi pendidikan Indonesia yang digunakan konsisten sesuai domain: Permendikbudristek 16/2022, Permendiknas 16/2007, Permendikbudristek 40/2021, UU 14/2005, PP 41/2009, Permendikbud 79/2015, Permendikbudristek 2/2022, Permendikbud 1/2021, Permendikbud 137/2014, Permendikbud 13/2018, Permendiknas 70/2009.
- Validasi CLI sukses penuh: 30/30 agents valid pada agents/education/ (termasuk 1 agen existing).
- LSP diagnostics bersih untuk file .yaml dan .json pada folder education (0 error); .md tidak memiliki server LSP terkonfigurasi di environment ini.
- Commit dan push berhasil ke master: content(education): add 29 kurikulum dan guru agents (ef977cb).

## [2026-03-21] Education Siswa & Ujian Batch (29 Agents)

### Learnings
- Berhasil membuat 29 agen baru pada `agents/education/` sesuai daftar slug siswa & ujian, masing-masing lengkap dengan `config.yaml`, `prompt.md`, dan `examples.json` (total 87 file).
- Struktur `examples.json` konsisten memakai key `turns` (bukan `conversation`) dan setiap contoh berisi jawaban asisten panjang (100+ kata) dalam Bahasa Indonesia.
- Seluruh `prompt.md` menggunakan 4 section wajib (Misi Utama, Alur Kerja, Pengetahuan Domain, Batasan) dengan panjang di atas 300 kata.
- Rujukan regulasi pendidikan yang dicantumkan konsisten untuk domain ini: Permendikbudristek No. 48/2022 (SPMB PTN SNBP/SNBT), PP No. 12/2021 + Permendikbud No. 10/2020 (KIP Kuliah), PMK No. 106/2021 (LPDP), Permendikbud No. 3/2020 (MBKM), UU No. 12/2012 (Pendidikan Tinggi), Permendikbud No. 5/2020 (Akreditasi), Permendikbud No. 81/2014 (Ijazah), Permendikbud No. 50/2020 (PKL SMK), dan Permendikbud No. 129/2014 (Sekolah Rumah).
- Validasi CLI sukses: `59/59 agents valid` untuk `agents/education/` setelah penambahan batch ini.
- LSP diagnostics bersih untuk ekstensi `.yaml` dan `.json` pada direktori education; `.md` belum memiliki server LSP terpasang pada environment saat ini.
- Commit dan push berhasil ke `origin/master` dengan pesan: `content(education): add 29 siswa dan ujian agents` (d71e7bd).

## [2026-03-21] Health BPJS & Layanan Batch (22 Agents)

### Learnings
- Berhasil menambahkan tepat 22 agent baru pada `agents/health/` sesuai daftar slug BPJS & layanan kesehatan, masing-masing berisi `config.yaml`, `prompt.md`, dan `examples.json` (66 file baru).
- Semua `config.yaml` mengikuti struktur wajib project (identity/persona/instructions/capabilities/context/handoffs/eval/platform_configs/metadata) dan seluruh konten menggunakan Bahasa Indonesia pada bagian naratif.
- Semua `prompt.md` memenuhi syarat minimal 300 kata dengan 4 section wajib: **Misi Utama**, **Alur Kerja** (bernomor), **Pengetahuan Domain**, dan **Batasan**.
- Semua `examples.json` menggunakan key `turns` (bukan `conversation`) dengan jawaban asisten panjang (100+ kata) dalam Bahasa Indonesia.
- Referensi regulasi kesehatan Indonesia digunakan konsisten dalam prompt, mencakup: UU 24/2011, Perpres 82/2018, Perpres 64/2020, Permenkes 43/2019, UU 44/2009, Permenkes 3/2020, Permenkes 290/2008, Permenkes 269/2008, Permenkes 12/2017, Permenkes 88/2013, Permenkes 71/2013, dan Permenkes 79/2014.
- Validasi CLI sukses penuh: `23/23 agents valid` untuk `agents/health/` (22 agent baru + 1 golden reference existing).
- Commit dan push berhasil ke `origin/master`: `content(health): add 22 BPJS dan layanan kesehatan agents` (0e8fd9d).

## [2026-03-21] Health Gaya Hidup & Tradisional Batch (22 Agents)

### Learnings
- Berhasil menambahkan tepat 22 agent baru bertema gaya hidup, kesehatan mental, dan kesehatan tradisional di `agents/health/` (66 file: `config.yaml`, `prompt.md`, `examples.json`).
- Semua `prompt.md` ditulis dalam Bahasa Indonesia dengan 4 section wajib (**Misi Utama**, **Alur Kerja**, **Pengetahuan Domain**, **Batasan**) dan panjang memenuhi syarat minimum 300 kata.
- Semua `examples.json` menggunakan key `turns` (bukan `conversation`) dengan jawaban asisten panjang 100+ kata.
- Seluruh `handoffs.target_agent_id` diarahkan ke agen health yang sudah ada (`health/navigasi-sehat-bpjs`) sehingga konsisten dengan batasan relasi antar agent.
- Referensi hukum kesehatan gaya hidup/tradisional dicantumkan konsisten di konten, termasuk: UU No. 17/2023, UU No. 18/2014, PP No. 87/2014, Permenkes No. 41/2014, Permenkes No. 007/2012, Permenkes No. 1186/2011, dan Permenkes No. 20/2019.
- Validasi CLI berhasil penuh pada kategori health: `45/45 agents valid`.
- LSP diagnostics bersih untuk file `.yaml` dan `.json` pada `agents/health/` (0 error); `.md` belum ada server LSP terkonfigurasi di environment ini.
- Commit dan push berhasil ke `origin/master`: `content(health): add 22 gaya hidup dan tradisional health agents` (`cd3cc85`).
- 2026-03-21: Menambahkan 20 agen tech baru tema Startup & API Indonesia di `agents/tech/` dengan struktur `config.yaml`, `prompt.md`, `examples.json`.
- Seluruh `prompt.md` baru ditulis dalam Bahasa Indonesia, memiliki 4 bagian wajib (Misi Utama, Alur Kerja, Pengetahuan Domain, Batasan), dan panjang di atas 300 kata.
- Setiap `instructions.rules` pada config memasukkan aturan wajib commit/push; setiap `examples.json` memakai key `turns` sesuai skema.
- Validasi berhasil dengan perintah `node --import tsx/esm packages/cli/src/cli.ts validate agents/tech/` menghasilkan `21/21 agents valid`.

- 2026-03-21: Saat melengkapi agent religion baru, struktur wajib paling aman mengikuti pola config.yaml + prompt.md + examples.json dengan key "turns" di examples dan 4 section prompt (Misi Utama, Alur Kerja, Pengetahuan Domain, Batasan) minimal 300 kata Bahasa Indonesia.
- 2026-03-21: Validasi religion lulus 35/35 ketika tiap config memuat identity.id sesuai slug direktori, sources regulasi Indonesia yang konkret (UU/PP/Permenag/Permen), rules >=3, eval_criteria >=2, dan semua file terhubung benar lewat system_prompt_file/examples_file.

## [2026-03-21] Culture Batch (29 Agents)

### Learnings
- Pembuatan massal agent culture paling stabil jika memakai template config/prompt/examples seragam lalu mengisi parameter spesifik domain per slug (nama, tags, sumber hukum, deskripsi domain).
- Untuk konsistensi validasi, `identity.id` harus persis `culture/{slug}` dan setiap folder wajib hanya berisi `config.yaml`, `prompt.md`, `examples.json`.
- `examples.json` wajib menggunakan key `turns`; penggunaan key lain akan melanggar konvensi repo meskipun struktur percakapan terlihat benar.
- Prompt domain culture aman ketika mempertahankan 4 section wajib dan panjang >300 kata, serta menyebut sumber hukum nyata seperti UU/PP/Perpres/Permen agar jawaban tidak generik.
- Validasi akhir kategori culture berhasil penuh dengan perintah `node --import tsx/esm packages/cli/src/cli.ts validate agents/culture/` dan hasil `30/30 agents valid`.
