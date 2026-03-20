import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-6">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-100">
          <span className="text-emerald-400">🍃</span> KonohaAgents
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-slate-300">
          500 Agen AI Ultra-Detail untuk Indonesia
        </p>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          Perpustakaan definisi agen AI terlengkap berbahasa Indonesia untuk Claude, ChatGPT, Cursor, dan GitHub Copilot.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/agents" 
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition-colors"
          >
            Jelajahi Agen
          </Link>
          <Link 
            href="/guide" 
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium transition-colors border border-slate-700 hover:border-slate-600"
          >
            Panduan Penggunaan
          </Link>
        </div>
      </div>
    </div>
  );
}
