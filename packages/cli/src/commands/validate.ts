import * as fs from 'node:fs'
import * as path from 'node:path'
import { load as loadYaml } from 'js-yaml'
import chalk from 'chalk'
import type { Command } from 'commander'
import { validateAgent } from '../../../core/src/loader'

interface AgentValidationEntry {
  dir: string
  displayName: string
}

interface DuplicateError {
  path: string
  message: string
}

function collectAgentDirectories(rootPath: string): AgentValidationEntry[] {
  const resolvedRoot = path.resolve(rootPath)
  if (!fs.existsSync(resolvedRoot)) {
    throw new Error(`Path does not exist: ${resolvedRoot}`)
  }

  const stat = fs.statSync(resolvedRoot)
  if (!stat.isDirectory()) {
    throw new Error(`Path is not a directory: ${resolvedRoot}`)
  }

  const directConfig = path.join(resolvedRoot, 'config.yaml')
  if (fs.existsSync(directConfig)) {
    return [
      {
        dir: resolvedRoot,
        displayName: path.basename(resolvedRoot),
      },
    ]
  }

  const categories = fs
    .readdirSync(resolvedRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))

  const agentDirs: AgentValidationEntry[] = []

  for (const category of categories) {
    const categoryPath = path.join(resolvedRoot, category.name)

    const directAgentConfig = path.join(categoryPath, 'config.yaml')
    if (fs.existsSync(directAgentConfig)) {
      agentDirs.push({
        dir: categoryPath,
        displayName: category.name,
      })
      continue
    }

    const agents = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))

    for (const agent of agents) {
      const dir = path.join(categoryPath, agent.name)
      agentDirs.push({
        dir,
        displayName: `${category.name}/${agent.name}`,
      })
    }
  }

  return agentDirs
}

function readIdentityId(agentDir: string): string | undefined {
  const configPath = path.join(agentDir, 'config.yaml')
  if (!fs.existsSync(configPath)) {
    return undefined
  }

  try {
    const content = fs.readFileSync(configPath, 'utf-8')
    const parsed = loadYaml(content) as { identity?: { id?: unknown } } | undefined
    if (typeof parsed?.identity?.id === 'string') {
      return parsed.identity.id
    }
  } catch {
    return undefined
  }

  return undefined
}

function detectDuplicateIdentityIds(entries: AgentValidationEntry[]): Map<string, DuplicateError[]> {
  const idToEntries = new Map<string, AgentValidationEntry[]>()

  for (const entry of entries) {
    const id = readIdentityId(entry.dir)
    if (!id) {
      continue
    }

    const existing = idToEntries.get(id)
    if (existing) {
      existing.push(entry)
    } else {
      idToEntries.set(id, [entry])
    }
  }

  const duplicatesByDir = new Map<string, DuplicateError[]>()

  for (const [identityId, matchedEntries] of idToEntries.entries()) {
    if (matchedEntries.length < 2) {
      continue
    }

    const allPaths = matchedEntries.map((item) => item.displayName).join(', ')
    for (const entry of matchedEntries) {
      const errors = duplicatesByDir.get(entry.dir) ?? []
      errors.push({
        path: 'identity.id',
        message: `Duplicate identity.id "${identityId}" found in: ${allPaths}`,
      })
      duplicatesByDir.set(entry.dir, errors)
    }
  }

  return duplicatesByDir
}

export function registerValidateCommand(program: Command): void {
  program
    .command('validate <path>')
    .description('Validate agent definitions in category/agent subdirectories')
    .action(async (targetPath: string) => {
      try {
        const entries = collectAgentDirectories(targetPath)
        const duplicateErrorsByDir = detectDuplicateIdentityIds(entries)

        let validCount = 0
        let failedCount = 0

        for (const entry of entries) {
          const result = validateAgent(entry.dir)
          const duplicateErrors = duplicateErrorsByDir.get(entry.dir) ?? []
          const allErrors = [...result.errors, ...duplicateErrors]
          const isValid = allErrors.length === 0

          if (isValid) {
            validCount += 1
            console.log(`${chalk.green('✓')} ${entry.displayName}`)
            continue
          }

          failedCount += 1
          console.log(`${chalk.red('✗')} ${entry.displayName}`)
          for (const error of allErrors) {
            console.log(`  ${chalk.red('-')} ${error.path}: ${error.message}`)
          }
        }

        const total = entries.length
        if (failedCount === 0) {
          console.log(chalk.green(`${validCount}/${total} agents valid`))
          process.exitCode = 0
          return
        }

        console.log(chalk.red(`${failedCount}/${total} agents failed validation`))
        process.exitCode = 1
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`${chalk.red('✗')} validate failed: ${message}`)
        process.exitCode = 1
      }
    })
}
