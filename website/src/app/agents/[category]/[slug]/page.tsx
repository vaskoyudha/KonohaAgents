import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CopyButton } from '@/components/CopyButton'
import { AGENTS, CATEGORIES } from '@/lib/agents-data'

type AgentPageProps = {
  params: Promise<{
    category: string
    slug: string
  }>
}

export function generateStaticParams() {
  return AGENTS.map((agent) => ({
    category: agent.category,
    slug: agent.slug,
  }))
}

export default async function AgentDetailPage({ params }: AgentPageProps) {
  const { category, slug } = await params
  const agent = AGENTS.find((item) => item.category === category && item.slug === slug)

  if (!agent) {
    notFound()
  }

  const categoryMeta = CATEGORIES.find((item) => item.slug === agent.category)
  const syncCommand = `konoha sync --target cursor --agent ${agent.id}`

  return (
    <div className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link href="/agents/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300">
          ← Kembali ke daftar agen
        </Link>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl">{categoryMeta?.icon ?? '🤖'}</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                {categoryMeta?.name_id ?? agent.category}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 md:text-4xl">{agent.name}</h1>
            <p className="text-slate-400">{agent.id}</p>
            <p className="leading-relaxed text-slate-300">{agent.mission}</p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-xl font-bold text-slate-100">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {agent.tags.length > 0 ? (
              agent.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-300">
                  #{tag}
                </span>
              ))
            ) : (
              <p className="text-slate-400">Belum ada tag.</p>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-xl font-bold text-slate-100">Eval Criteria</h2>
          <div className="space-y-4">
            {agent.eval_criteria.length > 0 ? (
              agent.eval_criteria.map((criterion, index) => (
                <article key={`${criterion.question}-${index}`} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <h3 className="font-semibold text-emerald-300">{index + 1}. {criterion.question}</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    <span className="font-medium text-slate-100">Expected behavior:</span> {criterion.expected_behavior}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    <span className="font-medium text-slate-200">Gold answer:</span> {criterion.gold_standard_answer}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-slate-400">Belum ada eval criteria.</p>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-xl font-bold text-slate-100">Cara Pakai (CLI)</h2>
          <div className="flex flex-col gap-3 rounded-lg border border-slate-700 bg-slate-950 p-4 md:flex-row md:items-center md:justify-between">
            <code className="overflow-x-auto font-mono text-sm text-emerald-400">{syncCommand}</code>
            <CopyButton text={syncCommand} />
          </div>
        </section>
      </div>
    </div>
  )
}
