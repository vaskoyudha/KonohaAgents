import Link from 'next/link';

export default function GuidePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-6">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">
          <span className="text-emerald-400">📚</span> Panduan Penggunaan
        </h1>
        <p className="text-xl text-slate-400">
          Panduan lengkap sedang disiapkan...
        </p>
        
        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            ← Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
