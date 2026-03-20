import chalk from 'chalk'
import type { Command } from 'commander'
import type { AgentConfig } from '../../../core/src/types'
import { loadAllAgents } from '../../../core/src/loader'

type LoadedAgent = AgentConfig & { _promptContent: string; _examples: unknown[]; _agentDir: string }

interface SearchMatch {
  agent: LoadedAgent
  matchField: string
  matchContext: string
}

function searchAgent(agent: LoadedAgent, query: string): SearchMatch | null {
  const q = query.toLowerCase()

  if (agent.identity.name.toLowerCase().includes(q)) {
    return { agent, matchField: 'name', matchContext: agent.identity.name }
  }

  for (const tag of agent.identity.tags) {
    if (tag.toLowerCase().includes(q)) {
      return { agent, matchField: 'tag', matchContext: `tag: ${tag}` }
    }
  }

  if (agent.instructions.mission.toLowerCase().includes(q)) {
    const idx = agent.instructions.mission.toLowerCase().indexOf(q)
    const start = Math.max(0, idx - 20)
    const end = Math.min(agent.instructions.mission.length, idx + query.length + 20)
    const snippet = (start > 0 ? '...' : '') +
      agent.instructions.mission.slice(start, end) +
      (end < agent.instructions.mission.length ? '...' : '')
    return { agent, matchField: 'mission', matchContext: snippet }
  }

  for (const domain of agent.capabilities.knowledge_domains) {
    if (domain.name.toLowerCase().includes(q)) {
      return { agent, matchField: 'knowledge_domain', matchContext: `domain: ${domain.name}` }
    }
    if (domain.description.toLowerCase().includes(q)) {
      return { agent, matchField: 'knowledge_domain', matchContext: `domain: ${domain.description.slice(0, 60)}...` }
    }
  }

  return null
}

export function registerSearchCommand(program: Command): void {
  program
    .command('search <query>')
    .description('Search agents by name, tags, mission, or knowledge domains')
    .action(async (query: string) => {
      try {
        const agents = loadAllAgents('agents/')

        if (agents.length === 0) {
          console.log(chalk.yellow(`No agents found matching "${query}"`))
          return
        }

        const matches: SearchMatch[] = []
        for (const agent of agents) {
          const match = searchAgent(agent, query)
          if (match) {
            matches.push(match)
          }
        }

        if (matches.length === 0) {
          console.log(chalk.yellow(`No agents found matching "${query}"`))
          return
        }

        console.log(chalk.bold(`Found ${matches.length} agent${matches.length !== 1 ? 's' : ''} matching "${query}":`))
        console.log('')

        for (const { agent, matchContext } of matches) {
          const id = agent.identity.id
          const name = agent.identity.name
          console.log(`  ${chalk.cyan(`[${id}]`)} ${name} ${chalk.dim('—')} ${chalk.dim(matchContext)}`)
        }

        console.log('')
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`${chalk.red('✗')} search failed: ${message}`)
        process.exitCode = 1
      }
    })
}
