import type { AgentConfig } from '../../../core/src/schema'

function escapeYamlString(value: string): string {
  return value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? value.slice(0, maxLength) : value
}

export function transpile(agent: AgentConfig & { _promptContent: string }, agentId: string): string {
  void agentId

  const description = `${agent.identity.name} — ${truncate(agent.instructions.mission, 100)}`
  const toolsSection = agent.capabilities.tools
    .map((tool) => `- ${tool.name}: ${tool.description}`)
    .join('\n')

  return [
    '---',
    `description: "${escapeYamlString(description)}"`,
    'globs: []',
    'alwaysApply: false',
    '---',
    '',
    agent._promptContent,
    '',
    '## Kapabilitas',
    toolsSection,
    '',
  ].join('\n')
}
