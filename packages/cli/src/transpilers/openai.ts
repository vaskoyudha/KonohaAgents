import type { AgentConfig } from '../../../core/src/schema'

export function transpile(agent: AgentConfig & { _promptContent: string }, agentId: string): string {
  void agentId

  const payload = {
    name: agent.identity.name,
    instructions: agent._promptContent,
    model: agent.platform_configs.openai?.model ?? 'gpt-4o',
    temperature: 0.7,
    tools: agent.capabilities.tools.map((tool) => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description,
        parameters: {
          type: 'object',
          properties: {},
        },
      },
    })),
    metadata: {
      konoha_agent_id: agent.identity.id,
      category: agent.identity.category,
      version: agent.identity.version,
    },
  }

  return JSON.stringify(payload, null, 2)
}
