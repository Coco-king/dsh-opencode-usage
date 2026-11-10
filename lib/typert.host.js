/**
 * dsh-opencode-usage 的 Host 面 Typert 清单（由 typert-loader 自动扫描注册）。
 * 手写清单，结构与 @deepseek-ai/dsh-typert-generator 产物一致：
 * `./typert` 导出 TYPERT，invocations 的 codec 必须是严格编解码器，
 * 并由 create() 工厂返回 zod v4 实例。
 */

import { z } from 'zod'

const num = z.number()

const customItemSchema = z.object({
  key: z.string(),
  label: z.string(),
  kind: z.enum(['percent', 'number', 'money', 'text']),
  path: z.string(),
  maxPath: z.union([z.string(), num, z.null()]),
  resetsAtPath: z.union([z.string(), z.null()]),
})

const customSchema = z.object({
  url: z.string(),
  headers: z.record(z.string(), z.string()),
  items: z.array(customItemSchema),
})

const providerSchema = z.object({
  enabled: z.boolean(),
  preset: z.enum(['deepseek', 'opencode', 'custom']),
  refreshMinutes: num,
  apiKey: z.string(),
  custom: customSchema.optional(),
})

const configSchema = z.object({
  version: num,
  locale: z.enum(['auto', 'zh', 'en']),
  providers: z.record(z.string(), providerSchema),
})

const usageItemSchema = z.object({
  key: z.string(),
  label: z.string(),
  kind: z.enum(['percent', 'number', 'money', 'text']),
  value: num,
  max: num.optional(),
  percent: num.optional(),
  resetsAt: z.union([z.string(), z.null()]),
})

const providerUsageSchema = z.object({
  provider: z.string(),
  preset: z.enum(['deepseek', 'opencode', 'custom']),
  status: z.enum(['off', 'ok', 'error']),
  fetchedAt: num,
  message: z.string(),
  items: z.array(usageItemSchema),
})

const providerListSchema = z.object({
  providers: z.array(z.object({ id: z.string(), name: z.string() })),
})

/** 严格编解码器：create() 惰性返回该字段的 zod v4 实例。 */
function strictCodec(typeSymbol, schema) {
  return { mode: 'strict', typeSymbol, create: () => schema }
}

const _config$codec = strictCodec('@codecrab/dsh-opencode-usage#UsageConfig', configSchema)
const _usage$codec = strictCodec('@codecrab/dsh-opencode-usage#ProviderUsage', providerUsageSchema)
const _patch$codec = strictCodec('@codecrab/dsh-opencode-usage#ConfigPatch', z.record(z.string(), z.unknown()))
const _list$codec = strictCodec('@codecrab/dsh-opencode-usage#ProviderList', providerListSchema)

export const TYPERT = {
  package: '@codecrab/dsh-opencode-usage',
  face: 'host',
  schemas: [],
  invocations: [
    {
      id: '@codecrab/dsh-opencode-usage#usageQuota/getProviderUsage',
      service: 'usageQuota',
      namespace: 'usageQuota',
      method: 'getProviderUsage',
      invocation: { kind: 'direct' },
      parameters: [
        { name: 'providerId', wire: 'providerId', source: 'json', codec: strictCodec('string', z.string()) },
      ],
      result: _usage$codec,
    },
    {
      id: '@codecrab/dsh-opencode-usage#usageQuota/refreshProvider',
      service: 'usageQuota',
      namespace: 'usageQuota',
      method: 'refreshProvider',
      invocation: { kind: 'direct' },
      parameters: [
        { name: 'providerId', wire: 'providerId', source: 'json', codec: strictCodec('string', z.string()) },
      ],
      result: _usage$codec,
    },
    {
      id: '@codecrab/dsh-opencode-usage#usageQuota/getConfig',
      service: 'usageQuota',
      namespace: 'usageQuota',
      method: 'getConfig',
      invocation: { kind: 'direct' },
      parameters: [],
      result: _config$codec,
    },
    {
      id: '@codecrab/dsh-opencode-usage#usageQuota/updateConfig',
      service: 'usageQuota',
      namespace: 'usageQuota',
      method: 'updateConfig',
      invocation: { kind: 'direct' },
      parameters: [
        { name: 'patch', wire: 'patch', source: 'json', codec: _patch$codec },
      ],
      result: _config$codec,
    },
    {
      id: '@codecrab/dsh-opencode-usage#usageQuota/listProviders',
      service: 'usageQuota',
      namespace: 'usageQuota',
      method: 'listProviders',
      invocation: { kind: 'direct' },
      parameters: [],
      result: _list$codec,
    },
  ],
  model: {
    services: [
      {
        description: 'dsh-opencode-usage 提供方用量服务（ctx.usageQuota）：查询 OpenCode Go 套餐额度、DeepSeek 官方余额或自定义 HTTP 用量，并读写提供方绑定配置。Provider usage service (ctx.usageQuota).',
        summary: 'dsh-opencode-usage 提供方用量服务（dsh-opencode-usage provider usage service）。',
        tags: [],
        jsDoc: '/** dsh-opencode-usage 提供方用量服务（ctx.usageQuota）。dsh-opencode-usage provider usage service (ctx.usageQuota). */',
        key: 'usageQuota',
        exportName: 'UsageQuotaService',
        members: [
          {
            kind: 'method',
            name: 'getProviderUsage',
            signature: 'getProviderUsage(providerId: string): ProviderUsage',
            summary: '查询指定提供方的用量（缓存命中或按需抓取）。Read a provider usage (cached or fetched on demand).',
            jsDoc: '/**\n * 查询指定提供方的用量（缓存命中或按需抓取）。\n * @param providerId - 模型提供方 id。\n * @returns 用量条目与状态。\n */',
          },
          {
            kind: 'method',
            name: 'refreshProvider',
            signature: 'refreshProvider(providerId: string): ProviderUsage',
            summary: '强制刷新指定提供方的用量。Force-refresh a provider usage.',
            jsDoc: '/**\n * 强制刷新指定提供方的用量。\n * @param providerId - 模型提供方 id。\n * @returns 刷新后的用量条目与状态。\n */',
          },
          {
            kind: 'method',
            name: 'getConfig',
            signature: 'getConfig(): UsageConfig',
            summary: '读取提供方绑定配置。Read the provider binding config.',
            jsDoc: '/**\n * 读取提供方绑定配置。\n * @returns 当前配置。\n */',
          },
          {
            kind: 'method',
            name: 'updateConfig',
            signature: 'updateConfig(patch: ConfigPatch): UsageConfig',
            summary: '应用一份配置补丁并持久化。Apply and persist a config patch.',
            jsDoc: '/**\n * 应用一份配置补丁并持久化。\n * @param patch - 配置补丁。\n * @returns 更新后的完整配置。\n */',
          },
          {
            kind: 'method',
            name: 'listProviders',
            signature: 'listProviders(): Promise<ProviderList>',
            summary: '读取设置→模型 的提供方目录（供配置页选择提供方）。Read the Settings → Models provider catalog.',
            jsDoc: '/**\n * 读取设置→模型 的提供方目录。\n * @returns 提供方列表。\n */',
          },
        ],
        types: [],
      },
    ],
    events: [],
    objects: [],
  },
}

export default TYPERT
