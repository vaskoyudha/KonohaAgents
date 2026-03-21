import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'

const installCommand = 'npm install -g konoha-agents'

const cliCommands = [
  {
    command: 'konoha list',
    description: 'Menampilkan semua agen yang tersedia berdasarkan ID.',
  },
  {
    command: 'konoha search "pajak"',
    description: 'Mencari agen berdasarkan kata kunci nama, tag, atau misi.',
  },
  {
    command: 'konoha validate agents/',
    description: 'Memvalidasi struktur dan konten agen agar sesuai schema.',
  },
  {
    command: 'konoha sync --target cursor --agent gov-legal/asisten-oss-kbli',
    description: 'Mengekspor agen ke target editor/asisten AI tertentu.',
  },
]

const exportSnippets = [
  {
    platform: 'Cursor',
    command: 'konoha sync --target cursor --agent business/sobat-pajak-umkm',
  },
  {
    platform: 'Claude',
    command: 'konoha sync --target claude --agent gov-legal/asisten-oss-kbli',
  },
  {
    platform: 'GitHub Copilot',
    command: 'konoha sync --target copilot --agent tech/indo-dev-api-guide',
  },
  {
    platform: 'OpenAI / ChatGPT',
    command: 'konoha sync --target openai --agent finance/waspada-pinjol',
  },
]

export default function GuidePage() {
  return (
    <div className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 md:text-5xl">
            <span className="text-emerald-400">📚</span> Panduan Penggunaan
          </h1>
          <p className="text-slate-400">
            Panduan ringkas untuk instalasi, penggunaan CLI, ekspor agen, dan kontribusi ke ekosistem KonohaAgents.
          </p>
        </div>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-100">1. Instalasi</h2>
          <p className="mb-4 text-slate-400">Pasang CLI secara global agar perintah <code className="text-emerald-400">konoha</code> tersedia di terminal.</p>
          <div className="flex flex-col gap-3 rounded-lg border border-slate-700 bg-slate-950 p-4 md:flex-row md:items-center md:justify-between">
            <code className="font-mono text-sm text-emerald-400">{installCommand}</code>
            <CopyButton text={installCommand} />
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-100">2. Perintah CLI</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-slate-300">
                  <th className="px-3 py-2 font-semibold">Perintah</th>
                  <th className="px-3 py-2 font-semibold">Fungsi</th>
                </tr>
              </thead>
              <tbody>
                {cliCommands.map((row) => (
                  <tr key={row.command} className="border-b border-slate-800/70">
                    <td className="px-3 py-2 font-mono text-emerald-400">{row.command}</td>
                    <td className="px-3 py-2 text-slate-400">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-100">3. Cara Ekspor</h2>
          <div className="space-y-4">
            {exportSnippets.map((snippet) => (
              <div key={snippet.platform} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <p className="mb-2 font-semibold text-slate-100">{snippet.platform}</p>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <code className="overflow-x-auto font-mono text-sm text-emerald-400">{snippet.command}</code>
                  <CopyButton text={snippet.command} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-100">4. Format Agent</h2>
          <p className="mb-4 text-slate-400">
            Setiap agen disimpan dalam folder terpisah dan minimal memiliki tiga file: <code className="text-emerald-400">config.yaml</code>,
            <code className="ml-1 text-emerald-400">prompt.md</code>, dan <code className="ml-1 text-emerald-400">examples.json</code>.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-950 p-4 text-xs text-slate-300">{`identity:
  id: "gov-legal/asisten-oss-kbli"
  name: "Asisten OSS KBLI Presisi"
  category: "gov-legal"
  tags: ["oss-rba", "kbli"]

instructions:
  mission: "Mengarahkan pelaku UMKM memilih KBLI paling tepat..."
  rules:
    - "Wajib menggali model bisnis sebelum memberi kode KBLI"

eval_criteria:
  - question: "Saya mau buka usaha katering rumahan..."
    expected_behavior: "Asisten memberi opsi KBLI dan risiko"
    gold_standard_answer: "Fokuskan KBLI utama pada jasa boga..."`}
          </pre>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-100">5. Kontribusi</h2>
          <p className="text-slate-400">
            Kontribusi sangat terbuka. Silakan baca struktur repository, tambahkan agen baru, lalu kirim pull request ke
            {' '}
            <a
              href="https://github.com/vaskoyudha/KonohaAgents"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              github.com/vaskoyudha/KonohaAgents
            </a>
            .
          </p>
          <div className="mt-4">
            <Link href="/agents/" className="text-emerald-400 hover:text-emerald-300">
              Jelajahi daftar agen →
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
