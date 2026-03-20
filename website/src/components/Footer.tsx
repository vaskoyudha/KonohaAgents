export function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <p>© 2026 KonohaAgents — MIT License</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/vaskoyudha/KonohaAgents" target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">GitHub</a>
          <a href="https://www.npmjs.com/package/konoha-agents" target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">npm</a>
          <span>Made for Indonesia 🇮🇩</span>
        </div>
      </div>
    </footer>
  )
}