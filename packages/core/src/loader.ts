import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'
import { AgentSchema, type AgentConfig } from './schema'
import type { ValidationResult, ValidationError } from './types'

export function loadAgent(agentDir: string): AgentConfig & { _promptContent: string; _examples: unknown[] } {
  const absoluteDir = path.resolve(agentDir)
  
  const configPath = path.join(absoluteDir, 'config.yaml')
  if (!fs.existsSync(configPath)) {
    throw new Error(`config.yaml not found in ${absoluteDir}`)
  }
  const configContent = fs.readFileSync(configPath, 'utf-8')
  const rawConfig = yaml.load(configContent) as Record<string, unknown>
  
  const promptPath = path.join(absoluteDir, 'prompt.md')
  let promptContent = ''
  if (fs.existsSync(promptPath)) {
    promptContent = fs.readFileSync(promptPath, 'utf-8')
  }
  
  const examplesPath = path.join(absoluteDir, 'examples.json')
  let examples: unknown[] = []
  if (fs.existsSync(examplesPath)) {
    const examplesContent = fs.readFileSync(examplesPath, 'utf-8')
    examples = JSON.parse(examplesContent) as unknown[]
  }
  
  const result = AgentSchema.safeParse(rawConfig)
  if (!result.success) {
    const errors = result.error.issues.map((e: any) => `${(e.path || []).join('.')}: ${e.message}`).join(', ')
    throw new Error(`Invalid agent config in ${absoluteDir}: ${errors}`)
  }
  
  return {
    ...result.data,
    _promptContent: promptContent,
    _examples: examples,
  }
}

export function loadAllAgents(agentsRoot: string): Array<AgentConfig & { _promptContent: string; _examples: unknown[]; _agentDir: string }> {
  const absoluteRoot = path.resolve(agentsRoot)
  const agents: Array<AgentConfig & { _promptContent: string; _examples: unknown[]; _agentDir: string }> = []
  
  if (!fs.existsSync(absoluteRoot)) {
    return agents
  }
  
  const categoryDirs = fs.readdirSync(absoluteRoot, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
  
  for (const categoryDir of categoryDirs) {
    const categoryPath = path.join(absoluteRoot, categoryDir.name)
    const agentDirs = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    
    for (const agentDir of agentDirs) {
      const agentPath = path.join(categoryPath, agentDir.name)
      try {
        const agent = loadAgent(agentPath)
        agents.push({ ...agent, _agentDir: agentPath })
      } catch {
        // Skip invalid agents silently in loadAllAgents — validate command handles errors
      }
    }
  }
  
  return agents
}

export function validateAgent(agentDir: string): ValidationResult {
  const errors: ValidationError[] = []
  
  try {
    const absoluteDir = path.resolve(agentDir)
    const configPath = path.join(absoluteDir, 'config.yaml')
    
    if (!fs.existsSync(configPath)) {
      errors.push({ path: 'config.yaml', message: 'File not found' })
      return { valid: false, errors }
    }
    
    const configContent = fs.readFileSync(configPath, 'utf-8')
    let rawConfig: unknown
    try {
      rawConfig = yaml.load(configContent)
    } catch (yamlError) {
      errors.push({ path: 'config.yaml', message: `YAML parse error: ${yamlError}` })
      return { valid: false, errors }
    }
    
    const result = AgentSchema.safeParse(rawConfig)
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          path: (issue.path || []).join('.') || 'root',
          message: issue.message,
        })
      }
    }
    
    const promptPath = path.join(absoluteDir, 'prompt.md')
    if (!fs.existsSync(promptPath)) {
      errors.push({ path: 'prompt.md', message: 'File not found' })
    } else {
      const content = fs.readFileSync(promptPath, 'utf-8')
      const wordCount = content.trim().split(/\s+/).length
      if (wordCount < 50) {
        errors.push({ path: 'prompt.md', message: `Too short: ${wordCount} words (minimum 50)` })
      }
    }
    
    const examplesPath = path.join(absoluteDir, 'examples.json')
    if (!fs.existsSync(examplesPath)) {
      errors.push({ path: 'examples.json', message: 'File not found' })
    } else {
      try {
        const content = fs.readFileSync(examplesPath, 'utf-8')
        JSON.parse(content)
      } catch {
        errors.push({ path: 'examples.json', message: 'Invalid JSON' })
      }
    }
    
  } catch (error) {
    errors.push({ path: 'unknown', message: String(error) })
  }
  
  return { valid: errors.length === 0, errors }
}
