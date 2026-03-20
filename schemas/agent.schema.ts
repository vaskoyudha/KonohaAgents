import { z } from 'zod'

// Tool definition used by agents
const ToolSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  parameters_schema: z.record(z.string(), z.unknown()).optional(),
})

// Knowledge domain entry
const KnowledgeDomainSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(10),
  sources: z.array(z.string()).optional(),
})

// Eval criteria for quality testing
const EvalCriterionSchema = z.object({
  question: z.string().min(10),
  expected_behavior: z.string().min(20),
  gold_standard_answer: z.string().min(20),
})

// Example conversation turn
const ConversationTurnSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1),
})

// Handoff to another agent
const HandoffSchema = z.object({
  condition: z.string().min(10),
  target_agent_id: z.string().regex(/^[a-z-]+\/[a-z-]+$/),
  description: z.string().min(10),
})

// Platform-specific configs
const PlatformConfigsSchema = z.object({
  openai: z.object({
    model: z.string().default('gpt-4o'),
    temperature: z.number().min(0).max(2).default(0.7),
    top_p: z.number().min(0).max(1).default(1),
  }).optional(),
  anthropic: z.object({
    model: z.string().default('claude-3-5-sonnet-20241022'),
    max_tokens: z.number().positive().default(4096),
  }).optional(),
  cursor: z.object({
    globs: z.array(z.string()).default([]),
    alwaysApply: z.boolean().default(false),
  }).optional(),
})

// The main Agent schema
export const AgentSchema = z.object({
  identity: z.object({
    id: z.string().regex(/^[a-z-]+\/[a-z-]+$/, 'ID must be in format category-slug/agent-slug'),
    name: z.string().min(3, 'Agent name must be at least 3 characters'),
    name_en: z.string().min(3, 'English name must be at least 3 characters'),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be semver'),
    author: z.string().min(1),
    category: z.enum(['gov-legal', 'business', 'finance', 'education', 'health', 'tech', 'agriculture', 'religion', 'culture', 'transport']),
    tags: z.array(z.string()).min(1, 'At least 1 tag required'),
  }),
  persona: z.object({
    personality: z.string().min(20),
    tone: z.string().min(10),
    language: z.enum(['Bahasa Indonesia', 'Bahasa Indonesia + English']).default('Bahasa Indonesia'),
    communication_style: z.string().min(20),
  }),
  instructions: z.object({
    mission: z.string().min(50, 'Mission must be at least 50 characters'),
    rules: z.array(z.string()).min(1, 'At least 1 rule required'),
    style_guide: z.string().min(20),
  }),
  system_prompt_file: z.string().endsWith('.md', 'system_prompt_file must reference a .md file'),
  capabilities: z.object({
    tools: z.array(ToolSchema).min(1, 'At least 1 tool required'),
    knowledge_domains: z.array(KnowledgeDomainSchema).min(1, 'At least 1 knowledge domain required'),
  }),
  context_requirements: z.object({
    required_context: z.array(z.string()).default([]),
    optional_context: z.array(z.string()).default([]),
  }),
  handoffs: z.array(HandoffSchema).default([]),
  eval_criteria: z.array(EvalCriterionSchema).min(2, 'At least 2 eval criteria required'),
  examples_file: z.string().endsWith('.json', 'examples_file must reference a .json file'),
  platform_configs: PlatformConfigsSchema.default({}),
  metadata: z.object({
    difficulty_level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
    estimated_tokens: z.number().positive(),
    last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    related_agents: z.array(z.string()).default([]),
  }),
})

export type AgentConfig = z.infer<typeof AgentSchema>
export type Tool = z.infer<typeof ToolSchema>
export type EvalCriterion = z.infer<typeof EvalCriterionSchema>
export type ConversationTurn = z.infer<typeof ConversationTurnSchema>
