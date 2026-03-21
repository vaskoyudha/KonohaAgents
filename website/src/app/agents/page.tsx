import { AGENTS, CATEGORIES } from '@/lib/agents-data'
import { AgentsClient } from './AgentsClient'

export default function AgentsPage() {
  return <AgentsClient agents={AGENTS} categories={CATEGORIES} />
}
