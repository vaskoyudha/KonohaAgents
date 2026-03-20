import * as fs from 'node:fs'
import * as path from 'node:path'
import chalk from 'chalk'
import type { Command } from 'commander'
import { loadAgent } from '../../../core/src/loader'
import { transpile as transpileCursor } from '../transpilers/cursor'
import { transpile as transpileClaude } from '../transpilers/claude'
import { transpile as transpileCopilot } from '../transpilers/copilot'
import { transpile as transpileOpenai } from '../transpilers/openai'

type SyncTarget = 'cursor' | 'claude' | 'copilot' | 'openai'

interface SyncOptions {
  target: SyncTarget
  agentDir: string
  dryRun?: boolean
}

function resolveAgentSlug(agentId: string): string {
  const parts = agentId.split('/')
  return parts[parts.length - 1] ?? agentId
}

function getTargetFilename(target: SyncTarget, agentId: string): string {
  const agentSlug = resolveAgentSlug(agentId)

  if (target === 'cursor') {
    return `${agentSlug}.mdc`
  }
  if (target === 'claude') {
    return 'CLAUDE.md'
  }
  if (target === 'copilot') {
    return 'copilot-instructions.md'
  }
  return `${agentSlug}-openai.json`
}

function transpileByTarget(
  target: SyncTarget,
  agent: ReturnType<typeof loadAgent>,
  agentId: string,
): string {
  if (target === 'cursor') {
    return transpileCursor(agent, agentId)
  }
  if (target === 'claude') {
    return transpileClaude(agent, agentId)
  }
  if (target === 'copilot') {
    return transpileCopilot(agent, agentId)
  }
  return transpileOpenai(agent, agentId)
}

export function registerSyncCommand(program: Command): void {
  program
    .command('sync')
    .description('Sync an agent to a specific platform format')
    .requiredOption('--target <target>', 'Target platform: cursor|claude|copilot|openai')
    .requiredOption('--agent-dir <path>', 'Path to agent directory containing config.yaml and prompt.md')
    .option('--dry-run', 'Print transpiled output instead of writing file')
    .action(async (options: SyncOptions) => {
      try {
        const supportedTargets: SyncTarget[] = ['cursor', 'claude', 'copilot', 'openai']
        if (!supportedTargets.includes(options.target)) {
          throw new Error(`Unsupported target "${options.target}". Use one of: ${supportedTargets.join(', ')}`)
        }

        const agent = loadAgent(options.agentDir)
        const agentId = agent.identity.id
        const output = transpileByTarget(options.target, agent, agentId)

        if (options.dryRun) {
          process.stdout.write(output)
          if (!output.endsWith('\n')) {
            process.stdout.write('\n')
          }
          return
        }

        const filename = getTargetFilename(options.target, agentId)
        const outputPath = path.resolve(process.cwd(), filename)
        fs.writeFileSync(outputPath, output, 'utf-8')
        console.log(`${chalk.green('✓')} Wrote ${filename}`)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`${chalk.red('✗')} sync failed: ${message}`)
        process.exitCode = 1
      }
    })
}
