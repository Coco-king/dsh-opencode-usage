/**
 * 客户端线路校验器（与服务端 zod 清单对应）与 Typert RPC 贡献清单。
 * 清单中的严格 codec 以 create() 返回线路校验器（宿主的 codec 契约）。
 */

function fail(path, expect) {
  throw new Error('dsh-opencode-usage: 服务端数据非法 (' + path + ': ' + expect + ')')
}
function needNum(v, path) {
  if (typeof v !== 'number' || !Number.isFinite(v)) fail(path, 'number')
  return v
}
function needStr(v, path) {
  if (typeof v !== 'string') fail(path, 'string')
  return v
}
const KINDS = ['percent', 'number', 'money', 'text']
const PRESETS = ['deepseek', 'opencode', 'custom']

function parseUsageItem(v, path) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) fail(path, 'object')
  const out = {
    key: needStr(v.key, path + '.key'),
    label: needStr(v.label, path + '.label'),
    kind: KINDS.includes(v.kind) ? v.kind : 'number',
    value: needNum(v.value, path + '.value'),
    resetsAt: typeof v.resetsAt === 'string' ? v.resetsAt : null,
  }
  if (typeof v.max === 'number' && Number.isFinite(v.max)) out.max = v.max
  if (typeof v.percent === 'number' && Number.isFinite(v.percent)) out.percent = v.percent
  return out
}

/** 提供方用量快照。 */
function usageCodec(v, path) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) fail(path, 'object')
  return {
    provider: needStr(v.provider, path + '.provider'),
    preset: PRESETS.includes(v.preset) ? v.preset : 'custom',
    status: v.status === 'ok' || v.status === 'error' || v.status === 'off' ? v.status : 'off',
    fetchedAt: needNum(v.fetchedAt, path + '.fetchedAt'),
    message: typeof v.message === 'string' ? v.message : '',
    items: Array.isArray(v.items) ? v.items.map((item, i) => parseUsageItem(item, path + '.items[' + i + ']')) : [],
  }
}

function parseCustomItem(v, path) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) fail(path, 'object')
  return {
    key: needStr(v.key, path + '.key'),
    label: needStr(v.label, path + '.label'),
    kind: KINDS.includes(v.kind) ? v.kind : 'number',
    path: needStr(v.path, path + '.path'),
    maxPath: v.maxPath === null || v.maxPath === undefined ? null : (typeof v.maxPath === 'string' || typeof v.maxPath === 'number' ? v.maxPath : null),
    resetsAtPath: v.resetsAtPath === null || v.resetsAtPath === undefined ? null : needStr(v.resetsAtPath, path + '.resetsAtPath'),
  }
}

function parseProvider(v, path) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) fail(path, 'object')
  const out = {
    enabled: v.enabled !== false,
    preset: PRESETS.includes(v.preset) ? v.preset : 'custom',
    refreshMinutes: typeof v.refreshMinutes === 'number' && Number.isFinite(v.refreshMinutes) ? v.refreshMinutes : 15,
    apiKey: typeof v.apiKey === 'string' ? v.apiKey : '',
  }
  if (v.custom !== undefined && v.custom !== null) {
    if (typeof v.custom !== 'object' || Array.isArray(v.custom)) fail(path + '.custom', 'object')
    out.custom = {
      url: needStr(v.custom.url, path + '.custom.url'),
      headers: typeof v.custom.headers === 'object' && v.custom.headers !== null && !Array.isArray(v.custom.headers) ? v.custom.headers : {},
      items: Array.isArray(v.custom.items) ? v.custom.items.map((it, i) => parseCustomItem(it, path + '.custom.items[' + i + ']')) : [],
    }
  }
  return out
}

/** 提供方绑定配置。 */
function configCodec(v, path) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) fail(path, 'object')
  const providers = {}
  if (v.providers !== null && typeof v.providers === 'object' && !Array.isArray(v.providers)) {
    for (const id of Object.keys(v.providers)) providers[id] = parseProvider(v.providers[id], path + '.providers.' + id)
  }
  return {
    version: typeof v.version === 'number' ? v.version : 1,
    locale: v.locale === 'zh' || v.locale === 'en' || v.locale === 'auto' ? v.locale : 'auto',
    providers,
  }
}

/** 提供方目录。 */
function providerListCodec(v, path) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) fail(path, 'object')
  return {
    providers: Array.isArray(v.providers)
      ? v.providers.map((p, i) => ({
        id: needStr(p?.id, path + '.providers[' + i + '].id'),
        name: typeof p?.name === 'string' && p.name.length > 0 ? p.name : needStr(p?.id, path + '.providers[' + i + '].name'),
      }))
      : [],
  }
}

/** 配置补丁：宿主自行校验，客户端只要求是对象。 */
function patchCodec(v, path) {
  if (v === null || typeof v !== 'object' || Array.isArray(v)) fail(path, 'object')
  return v
}

/** 严格编解码器：create() 惰性返回线路校验器。 */
function strictCodec(typeSymbol, parse) {
  return { mode: 'strict', typeSymbol, create: () => parse }
}
const stringCodec = v => {
  if (typeof v !== 'string') throw new Error('dsh-opencode-usage: 期望字符串')
  return v
}

const PKG = '@codecrab/dsh-opencode-usage'

/** 与服务端 ./typert 清单一一对应的 RPC 贡献清单。 */
const CONTRIBUTION = {
  package: PKG,
  descriptors: [
    {
      id: PKG + '#usageQuota/getProviderUsage', service: 'usageQuota', namespace: 'usageQuota', method: 'getProviderUsage',
      invocation: { kind: 'direct' },
      parameters: [{ name: 'providerId', wire: 'providerId', source: 'json', codec: strictCodec('string', stringCodec) }],
      result: strictCodec(PKG + '#ProviderUsage', usageCodec),
    },
    {
      id: PKG + '#usageQuota/refreshProvider', service: 'usageQuota', namespace: 'usageQuota', method: 'refreshProvider',
      invocation: { kind: 'direct' },
      parameters: [{ name: 'providerId', wire: 'providerId', source: 'json', codec: strictCodec('string', stringCodec) }],
      result: strictCodec(PKG + '#ProviderUsage', usageCodec),
    },
    {
      id: PKG + '#usageQuota/getConfig', service: 'usageQuota', namespace: 'usageQuota', method: 'getConfig',
      invocation: { kind: 'direct' }, parameters: [],
      result: strictCodec(PKG + '#UsageConfig', configCodec),
    },
    {
      id: PKG + '#usageQuota/updateConfig', service: 'usageQuota', namespace: 'usageQuota', method: 'updateConfig',
      invocation: { kind: 'direct' },
      parameters: [{ name: 'patch', wire: 'patch', source: 'json', codec: strictCodec(PKG + '#ConfigPatch', patchCodec) }],
      result: strictCodec(PKG + '#UsageConfig', configCodec),
    },
    {
      id: PKG + '#usageQuota/listProviders', service: 'usageQuota', namespace: 'usageQuota', method: 'listProviders',
      invocation: { kind: 'direct' }, parameters: [],
      result: strictCodec(PKG + '#ProviderList', providerListCodec),
    },
  ],
}

module.exports = { CONTRIBUTION }
