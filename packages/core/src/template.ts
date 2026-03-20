export const AGENT_TEMPLATE_YAML = `# Agent Configuration Template
# Copy this file to agents/{category}/{agent-slug}/config.yaml and fill in all fields

identity:
  id: "{category}/{agent-slug}"          # Format: category-slug/agent-slug (e.g., gov-legal/asisten-oss-kbli)
  name: "{Agent Name in Bahasa}"          # Name in Bahasa Indonesia (min 3 chars)
  name_en: "{Agent Name in English}"      # English translation of name
  version: "1.0.0"                       # Semantic version
  author: "KonohaAgents Contributors"    # Author or organization
  category: "{category}"                 # One of: gov-legal, business, finance, education, health, tech, agriculture, religion, culture, transport
  tags: ["{tag1}", "{tag2}"]            # At least 1 tag, relevant keywords in Bahasa

persona:
  personality: "{Deskripsi karakter agen...}"  # At least 20 chars, describe the agent's character
  tone: "{Gaya komunikasi...}"                  # At least 10 chars, e.g., "Profesional dan ramah"
  language: "Bahasa Indonesia"                  # "Bahasa Indonesia" or "Bahasa Indonesia + English"
  communication_style: "{Gaya berkomunikasi...}" # At least 20 chars

instructions:
  mission: "{Misi utama agen dalam menjelaskan apa yang dilakukan...}"  # At least 50 chars
  rules:
    - "{Aturan 1...}"    # At least 1 rule
    - "{Aturan 2...}"
  style_guide: "{Panduan gaya penulisan respons...}"  # At least 20 chars

system_prompt_file: "prompt.md"  # Always "prompt.md"

capabilities:
  tools:
    - name: "{tool_name}"           # Tool identifier (snake_case)
      description: "{Deskripsi alat yang digunakan agen...}"  # At least 10 chars
      parameters_schema:
        {parameter}:
          type: "string"
          description: "{Deskripsi parameter...}"
  knowledge_domains:
    - name: "{Nama Domain Pengetahuan}"      # Knowledge area name
      description: "{Penjelasan domain pengetahuan...}"   # At least 10 chars
      sources: ["{Sumber referensi}"]

context_requirements:
  required_context:
    - "{Konteks yang harus diberikan pengguna}"
  optional_context:
    - "{Konteks opsional yang membantu}"

handoffs: []  # List agent handoffs or leave empty

eval_criteria:
  - question: "{Pertanyaan test case 1}"    # At least 10 chars
    expected_behavior: "{Perilaku yang diharapkan dari agen...}"  # At least 20 chars
    gold_standard_answer: "{Jawaban contoh yang ideal...}"         # At least 20 chars
  - question: "{Pertanyaan test case 2}"    # REQUIRED: At least 2 eval criteria
    expected_behavior: "{Perilaku yang diharapkan...}"
    gold_standard_answer: "{Jawaban ideal...}"

examples_file: "examples.json"  # Always "examples.json"

platform_configs:
  openai:
    model: "gpt-4o"
    temperature: 0.7
    top_p: 1
  anthropic:
    model: "claude-3-5-sonnet-20241022"
    max_tokens: 4096
  cursor:
    globs: []
    alwaysApply: false

metadata:
  difficulty_level: "intermediate"   # One of: beginner, intermediate, advanced, expert
  estimated_tokens: 2000             # Approximate token count of system prompt
  last_updated: "2025-01-15"        # Date last updated (YYYY-MM-DD)
  related_agents: []                  # List of related agent IDs
`

export const AGENT_TEMPLATE_PROMPT_MD = `# {Agent Name}

Anda adalah {nama agen}, {deskripsi singkat peran agen}.

## Misi Utama

{Jelaskan misi utama agen dalam 2-3 kalimat. Harus spesifik dan actionable, bukan generic.}

## Alur Kerja

1. **{Langkah 1}**: {Deskripsi langkah pertama}
2. **{Langkah 2}**: {Deskripsi langkah kedua}
3. **{Langkah 3}**: {Deskripsi langkah ketiga}

## Pengetahuan Domain

- **{Domain 1}**: {Penjelasan pengetahuan spesifik termasuk referensi hukum/regulasi jika relevan}
- **{Domain 2}**: {Penjelasan pengetahuan spesifik}

## Batasan

- {Apa yang TIDAK dilakukan agen}
- {Kapan harus menyarankan ke ahli lain}
`

export const AGENT_TEMPLATE_EXAMPLES_JSON = `[
  {
    "title": "{Judul Percakapan Contoh}",
    "turns": [
      {
        "role": "user",
        "content": "{Pertanyaan realistis dari pengguna Indonesia}"
      },
      {
        "role": "assistant", 
        "content": "{Jawaban detail dari agen dalam Bahasa Indonesia}"
      },
      {
        "role": "user",
        "content": "{Pertanyaan lanjutan}"
      },
      {
        "role": "assistant",
        "content": "{Jawaban lanjutan}"
      }
    ]
  }
]
`
