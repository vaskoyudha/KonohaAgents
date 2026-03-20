import * as fs from 'node:fs'
import * as path from 'node:path'
import chalk from 'chalk'
import type { Command } from 'commander'
import { loadAllAgents } from '../../../core/src/loader'

interface CategoryMeta {
  slug: string
  name: string
  name_id: string
  target_count: number
  icon: string
  description: string
}

function loadCategories(): CategoryMeta[] {
  const categoriesPath = path.resolve('agents/categories.json')
  if (!fs.existsSync(categoriesPath)) {
    return []
  }
  const content = fs.readFileSync(categoriesPath, 'utf-8')
  return JSON.parse(content) as CategoryMeta[]
}

export function registerListCommand(program: Command): void {
  program
    .command('list')
    .description('List available agents grouped by category')
    .option('-c, --category <slug>', 'Filter by category slug')
    .action(async (options: { category?: string }) => {
      try {
        const categories = loadCategories()

        const categoryLookup = new Map<string, CategoryMeta>()
        for (const cat of categories) {
          categoryLookup.set(cat.slug, cat)
        }

        if (options.category && !categoryLookup.has(options.category)) {
          console.log(chalk.red(`Unknown category: "${options.category}"`))
          const validSlugs = categories.map((c) => c.slug).join(', ')
          console.log(chalk.dim(`Valid categories: ${validSlugs}`))
          return
        }

        const agents = loadAllAgents('agents/')

        if (agents.length === 0) {
          console.log(chalk.yellow('No agents found.'))
          return
        }

        const grouped = new Map<string, typeof agents>()
        for (const agent of agents) {
          const cat = agent.identity.category
          if (!grouped.has(cat)) {
            grouped.set(cat, [])
          }
          grouped.get(cat)!.push(agent)
        }

        const slugsToShow = options.category
          ? [options.category]
          : categories.map((c) => c.slug)

        let totalShown = 0

        for (const slug of slugsToShow) {
          const catAgents = grouped.get(slug)
          if (!catAgents || catAgents.length === 0) {
            continue
          }

          const meta = categoryLookup.get(slug)
          const icon = meta?.icon ?? '📦'
          const displayName = meta?.name ?? slug
          const count = catAgents.length

          console.log('')
          console.log(chalk.bold(`${icon}  ${displayName} (${count} agent${count !== 1 ? 's' : ''})`))

          for (const agent of catAgents) {
            const agentSlug = agent.identity.id
            const name = agent.identity.name
            const mission = agent.instructions.mission
            const snippet = mission.length > 80 ? mission.slice(0, 77) + '...' : mission
            console.log(`  ${chalk.cyan(`[${agentSlug}]`)} ${name} ${chalk.dim('—')} ${chalk.dim(snippet)}`)
          }

          totalShown += count
        }

        if (totalShown === 0 && options.category) {
          console.log(chalk.yellow(`No agents found in category "${options.category}".`))
        }

        console.log('')
        console.log(chalk.dim(`Total: ${totalShown} agent${totalShown !== 1 ? 's' : ''}`))
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`${chalk.red('✗')} list failed: ${message}`)
        process.exitCode = 1
      }
    })
}
