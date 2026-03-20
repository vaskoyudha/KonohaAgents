import type { AgentConfig } from '../../../core/src/schema'

function escapeYamlString(value: string): string {
  return value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? value.slice(0, maxLength) : value
}

export function transpile(agent: AgentConfig & { _promptContent: string }, agentId: string): string {
  void agentId

  const description = `${agent.identity.name} — ${truncate(agent.instructions.mission, 120)}`

  return [
    '---',
    `agent: "${escapeYamlString(agent.identity.id)}"`,
    `description: "${escapeYamlString(description)}"`,
    '---',
    '',
    agent._promptContent,
    '',
  ].join('\n')
}
