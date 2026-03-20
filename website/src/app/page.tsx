import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'

const categories = [
  { slug: 'gov-legal', name_id: 'Pemerintahan & Hukum', target_count: 75, icon: '🏛️', description: 'Perizinan, birokrasi, hukum, dan regulasi pemerintah Indonesia' },
  { slug: 'business', name_id: 'Bisnis & UMKM', target_count: 75, icon: '🏢', description: 'E-commerce, marketplace, pajak usaha, marketing, dan operasional bisnis' },
  { slug: 'finance', name_id: 'Keuangan & Perbankan', target_count: 75, icon: '💰', description: 'Perbankan, investasi, fintech, dan perlindungan konsumen OJK' },
  { slug: 'education', name_id: 'Pendidikan & Akademik', target_count: 60, icon: '📚', description: 'Kurikulum Merdeka, guru, siswa, ujian, dan manajemen sekolah' },
  { slug: 'health', name_id: 'Kesehatan & Kebugaran', target_count: 45, icon: '🏥', description: 'BPJS Kesehatan, layanan kesehatan, gaya hidup sehat, dan pengobatan tradisional' },
  { slug: 'tech', name_id: 'Teknologi & Pengembang', target_count: 40, icon: '💻', description: 'Startup Indonesia, API publik, developer tools, dan karir teknologi' },
  { slug: 'agriculture', name_id: 'Pertanian & Kelautan', target_count: 35, icon: '🌾', description: 'Pertanian, perkebunan, perikanan, dan kelautan Indonesia' },
  { slug: 'religion', name_id: 'Agama & Sosial', target_count: 35, icon: '🕌', description: 'Islam, Kristen, Hindu, Buddha, Konghucu, dan pelayanan sosial Indonesia' },
  { slug: 'culture', name_id: 'Budaya & Kreatif', target_count: 30, icon: '🎭', description: 'Seni, budaya, bahasa daerah, pariwisata, dan industri kreatif Indonesia' },
  { slug: 'transport', name_id: 'Transportasi & Logistik', target_count: 30, icon: '🚢', description: 'Transportasi antar pulau, logistik, ekspedisi, dan pengiriman Indonesia' },
]

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-3xl" />
        </div>
        <div className="relative space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <span>✨</span>
            <span>500 Agen AI Ultra-Detail untuk Indonesia</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-100 leading-tight">
            <span className="text-emerald-400">🍃</span> KonohaAgents
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-semibold">
            500 Agen AI Indonesia yang Sangat Detail
          </p>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Perpustakaan definisi agen AI terlengkap berbahasa Indonesia untuk Claude, ChatGPT, Cursor, dan GitHub Copilot.
            Dirancang dengan kedalaman domain nyata — bukan sekadar persona generik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/agents"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors text-base"
            >
              Jelajahi Agen →
            </Link>
            <code className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-mono text-sm transition-colors border border-slate-700 cursor-pointer select-all">
              npm install konoha-agents
            </code>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────── */}
      <section className="bg-slate-900 border-y border-slate-800 py-6 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '500', label: 'Agen AI' },
            { value: '10', label: 'Kategori' },
            { value: '4', label: 'Platform' },
            { value: 'MIT', label: 'License' },
          ].map(({ value, label }) => (
            <div key={label} className="space-y-1">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">{value}</div>
              <div className="text-sm text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Grid ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-slate-100">10 Kategori Agen</h2>
            <p className="text-slate-400">Setiap kategori dirancang khusus untuk konteks Indonesia</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/agents?category=${cat.slug}`}
                className="group flex flex-col gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/50 hover:bg-slate-800 transition-all"
              >
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <div className="font-semibold text-slate-100 text-sm leading-snug">{cat.name_id}</div>
                  <div className="text-xs text-emerald-400 mt-0.5">{cat.target_count} agen</div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-slate-100">Cara Penggunaan</h2>
            <p className="text-slate-400">Tiga langkah mudah untuk memulai</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔍', title: 'Temukan Agen', desc: 'Cari dari 500 agen AI berdasarkan kategori atau kata kunci yang relevan dengan kebutuhanmu' },
              { icon: '⚙️', title: 'Pilih Platform', desc: 'Ekspor ke Cursor, Claude, ChatGPT, atau GitHub Copilot dengan satu perintah CLI' },
              { icon: '🚀', title: 'Langsung Pakai', desc: 'Satu perintah untuk menginstal semua agen sekaligus dan langsung produktif' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center space-y-3 p-6 rounded-xl border border-slate-800 bg-slate-900">
                <div className="text-4xl">{icon}</div>
                <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLI Preview ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-slate-100">CLI yang Powerful</h2>
            <p className="text-slate-400">Kelola semua agen langsung dari terminal</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-slate-500 font-mono">terminal</span>
            </div>
            <div className="p-5 font-mono text-sm space-y-1.5">
              <div>
                <span className="text-emerald-400">$ </span>
                <span className="text-slate-100">konoha search </span>
                <span className="text-yellow-400">&quot;pajak&quot;</span>
              </div>
              <div className="text-emerald-400">✓ Ditemukan 12 agen untuk &quot;pajak&quot;:</div>
              <div className="text-slate-400 pl-4">→ business/sobat-pajak-umkm</div>
              <div className="text-slate-400 pl-4">→ gov-legal/pelaporan-spt-tahunan</div>
              <div className="text-slate-400 pl-4">→ finance/konsultan-ppn-pkp</div>
              <div className="text-slate-500 pl-4">... dan 9 lainnya</div>
              <div className="pt-2">
                <span className="text-emerald-400">$ </span>
                <span className="text-slate-100">konoha sync </span>
                <span className="text-yellow-400">--target cursor --agent business/sobat-pajak-umkm</span>
              </div>
              <div className="text-emerald-400">✓ Diekspor ke .cursor/rules/sobat-pajak-umkm.mdc</div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl px-5 py-4">
            <code className="font-mono text-sm text-emerald-400 flex-1 overflow-x-auto">
              npm install -g konoha-agents
            </code>
            <CopyButton text="npm install -g konoha-agents" />
          </div>
        </div>
      </section>

    </div>
  )
}
