import type { AgentConfig } from './schema'

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

export interface ValidationError {
  path: string
  message: string
}

export interface AgentSearchResult {
  agent: AgentConfig
  agentId: string
  category: string
  score: number
}

export type { AgentConfig } from './schema'
