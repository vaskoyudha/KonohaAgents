import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { Star } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-100 hover:text-emerald-400 transition-colors">
          <span>🍃</span>
          <span>KonohaAgents</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-slate-100 transition-colors">Home</Link>
            <Link href="/agents" className="hover:text-slate-100 transition-colors">Agen</Link>
            <Link href="/guide" className="hover:text-slate-100 transition-colors">Panduan</Link>
          </div>
          <ThemeToggle />
          <a
            href="https://github.com/vaskoyudha/KonohaAgents"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg transition-colors"
          >
            <Star size={14} />
            <span>Star</span>
          </a>
        </div>
      </nav>
    </header>
  )
}