# 🍃 KonohaAgents

> 500 Ultra-Detailed Indonesian AI Agents for Claude, ChatGPT, Cursor, and GitHub Copilot.

[![npm](https://img.shields.io/npm/v/konoha-agents?color=emerald&label=npm)](https://www.npmjs.com/package/konoha-agents)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Agents](https://img.shields.io/badge/agents-500-emerald)](https://github.com/vaskoyudha/KonohaAgents)
[![GitHub Stars](https://img.shields.io/github/stars/vaskoyudha/KonohaAgents?style=social)](https://github.com/vaskoyudha/KonohaAgents)

KonohaAgents is a comprehensive registry of 500 specialized AI agents designed specifically for the Indonesian context. Each agent is meticulously crafted with deep local knowledge, regulatory awareness, and cultural nuance to assist with everything from government procedures and legal advice to business growth and technical development.

Whether you're using Claude, ChatGPT, Cursor, or GitHub Copilot, KonohaAgents provides the precise prompt engineering required to turn generic AI into a local expert.

---

## Why KonohaAgents?

AI models often struggle with the specificities of Indonesian regulations, local business practices, and cultural expectations. KonohaAgents bridges this gap:

- **Hyper-Localized Knowledge**: Built on Indonesian laws (UU), government regulations (PP), and local industry standards.
- **Bilingual Support**: Agents understand and respond in professional, natural Bahasa Indonesia while remaining compatible with English workflows.
- **Ready for Production**: Use these agents in your daily coding with Cursor, or as system instructions for your customer service bots.
- **CLI-First**: Easily search, list, and sync agents directly to your project or AI tools using our dedicated command-line interface.

---

## Quick Start

Get started by installing the Konoha CLI globally.

```bash
npm install -g konoha-agents
konoha list
konoha search "pajak"
konoha validate agents/
konoha sync --target cursor --agent gov-legal/asisten-oss-kbli
```

---

## Agent Categories

Our 500 agents are organized into 10 key sectors to ensure you find exactly what you need.

| Category | Agen | Contoh |
|----------|------|--------|
| 🏛️ Pemerintahan & Hukum | 75 | OSS RBA, Sertifikat Tanah, KTP Elektronik |
| 🏢 Bisnis & UMKM | 75 | Tokopedia SEO, Pajak UMKM, Franchise |
| 💰 Keuangan & Perbankan | 75 | KPR, Saham IDX, Reksa Dana |
| 📚 Pendidikan & Akademik | 60 | Kurikulum Merdeka, SNBT, Beasiswa LPDP |
| 🏥 Kesehatan & Wellness | 45 | BPJS Kesehatan, Nutrisi, Telemedicine |
| 💻 Teknologi & Developer | 40 | API Banking, DevOps, Startup Indonesia |
| 🌾 Pertanian & Maritim | 35 | Budidaya Padi, Nelayan, Smart Farming |
| 🕌 Agama & Sosial | 35 | Haji, Zakat, Pernikahan KUA |
| 🎭 Budaya & Kreatif | 30 | Batik, Film Indonesia, Gamelan |
| 🚢 Transportasi & Logistik | 30 | Tol E-Money, KAI, Ekspedisi |

Full registry of agents can be found in [AGENTS.md](AGENTS.md).

---

## Agent Structure

Every agent in the Konoha registry follows a strict 3-file pattern to ensure consistency, reliability, and ease of integration:

1.  **`config.yaml`**: Contains metadata, versioning, and targeting information for the agent.
2.  **`prompt.md`**: The core system prompt, written with ultra-detail to guide the AI's behavior and knowledge boundaries.
3.  **`examples.json`**: High-quality few-shot examples that demonstrate the agent's tone, voice, and problem-solving approach.

---

## Integration

KonohaAgents is designed to be platform-agnostic. Use the CLI to sync agents directly to:

- **Cursor**: Export agents as `.cursorrules` or project-specific instructions.
- **GitHub Copilot**: Use the prompt content in your `.github/copilot-instructions.md`.
- **Claude & ChatGPT**: Copy and paste the contents of `prompt.md` into your Custom Instructions or System Prompt.

---

## Contributing

We welcome contributions from the community to keep our agents accurate and up-to-date with the latest Indonesian regulations and trends.

Please refer to [AGENTS.md](AGENTS.md) for the full list of existing agents. If you'd like to suggest a new agent or an update, feel free to open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Dalam Bahasa Indonesia

KonohaAgents adalah direktori lengkap berisi 500 agen AI spesialis untuk konteks Indonesia. Setiap agen dirancang dengan pemahaman mendalam tentang regulasi lokal, prosedur pemerintah, dan nuansa budaya untuk membantu berbagai kebutuhan mulai dari hukum, bisnis UMKM, hingga pengembangan teknologi.

Dukungan penuh untuk Claude, ChatGPT, Cursor, dan GitHub Copilot. Gunakan CLI kami untuk mencari dan mengintegrasikan agen ahli ke dalam alur kerja Anda dengan mudah.

**Fitur Utama:**
- 500 Agen di 10 Kategori Utama.
- Berbasis Regulasi dan Konteks Lokal Indonesia.
- Integrasi mudah dengan alat AI populer.
- Gratis dan Open Source di bawah lisensi MIT.
