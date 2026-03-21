'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { AgentCategory, AgentData } from '@/lib/agents-data'

type AgentsClientProps = {
  agents: AgentData[]
  categories: AgentCategory[]
}

export function AgentsClient({ agents, categories }: AgentsClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')

  const filteredAgents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return agents.filter((agent) => {
      const matchCategory = activeCategory === 'all' || agent.category === activeCategory
      const matchQuery =
        normalizedQuery.length === 0 ||
        agent.name.toLowerCase().includes(normalizedQuery) ||
        agent.mission.toLowerCase().includes(normalizedQuery)

      return matchCategory && matchQuery
    })
  }, [agents, activeCategory, query])

  return (
    <div className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 md:text-5xl">
            <span className="text-emerald-400">🗂️</span> Semua Agen
          </h1>
          <p className="max-w-3xl text-slate-400">
            Jelajahi 500 agen AI ultra-detail untuk konteks Indonesia. Filter kategori dan cari berdasarkan nama atau misi agen.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-emerald-500/50 hover:text-slate-100'
            }`}
          >
            Semua
            <span className="ml-1 text-slate-400">({agents.length})</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActiveCategory(category.slug)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                activeCategory === category.slug
                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-emerald-500/50 hover:text-slate-100'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name_id}
              <span className="ml-1 text-slate-400">({category.count})</span>
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <label htmlFor="agent-search" className="mb-2 block text-sm font-medium text-slate-300">
            Cari agen
          </label>
          <input
            id="agent-search"
            type="text"
            placeholder="Contoh: pajak, BPJS, kurikulum, OSS, logistik..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-emerald-500/40 placeholder:text-slate-500 focus:ring-2"
          />
        </div>

        {filteredAgents.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-lg font-semibold text-slate-100">Tidak ada agen yang cocok.</p>
            <p className="mt-2 text-slate-400">Coba ubah kata kunci atau pilih kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAgents.map((agent) => {
              const category = categories.find((item) => item.slug === agent.category)
              return (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.category}/${agent.slug}/`}
                  className="group rounded-xl border border-slate-800 bg-slate-900 p-4 transition-colors hover:border-emerald-500/50"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-2xl">{category?.icon ?? '🤖'}</span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                      {category?.name_id ?? agent.category}
                    </span>
                  </div>
                  <h2 className="line-clamp-2 text-base font-bold text-slate-100 group-hover:text-emerald-300">{agent.name}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{agent.mission}</p>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
