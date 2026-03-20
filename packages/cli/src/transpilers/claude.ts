import type { AgentConfig } from '../../../core/src/schema'

export function transpile(agent: AgentConfig & { _promptContent: string }, agentId: string): string {
  void agentId

  const domainsSection = agent.capabilities.knowledge_domains
    .map((domain) => `- **${domain.name}**: ${domain.description}`)
    .join('\n')
  const toolsSection = agent.capabilities.tools
    .map((tool) => `- **${tool.name}**: ${tool.description}`)
    .join('\n')

  return [
    `# ${agent.identity.name}`,
    '',
    agent._promptContent,
    '',
    '## Domain Pengetahuan',
    domainsSection,
    '',
    '## Alat yang Tersedia',
    toolsSection,
    '',
  ].join('\n')
}
