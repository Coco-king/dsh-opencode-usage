/**
 * 宿主端用户可见文案（zh/en）：用量查询结果里的提示与配置校验错误。
 * 客户端文案另见 lib/client-src/i18n.js（浏览器端另有语言探测）。
 */

/** 宿主端文案表。 */
const SERVER_MESSAGES = {
  zh: {
    // ── 用量查询 ──────────────────────────────────────────────────────────
    apiKeyMissing: '未配置 DeepSeek API Key（请在 设置→模型 中配置，或导出 {env} 环境变量）',
    balanceHttp: '余额接口 HTTP {code}',
    balanceNoInfos: '余额接口响应缺少 balance_infos',
    balanceEndpointNotOfficial: '余额查询仅支持官方端点（api.deepseek.com）：当前配置的 baseURL {url} 不是官方域名，为保护 API Key 已拒绝发起请求',
    balanceItemTotal: '总余额',
    balanceItemGranted: '赠送余额',
    balanceItemToppedUp: '充值余额',
    balanceTotalShort: '余额',
    goQuotaKeyMissing: '未找到 OpenCode Go API Key。有 Go 订阅的话：运行 opencode login、导出 OPENCODE_GO_API_KEY 环境变量，或在提供方配置中填写 Key；没有订阅可关闭「启用」开关。',
    goQuotaHttp: 'OpenCode Go 额度接口 HTTP {code}',
    goQuotaNoSub: '没有检测到生效的 OpenCode Go 订阅（接口返回 {code}），或 API Key 无效。没有订阅可关闭「启用」开关。',
    goQuotaNoUsage: 'OpenCode Go 额度响应缺少 usage 字段',
    goRollingLabel: '5小时',
    goWeeklyLabel: '本周',
    goMonthlyLabel: '本月',
    customHttp: '自定义用量接口 HTTP {code}',
    customNoUsage: '自定义用量接口响应无法解析为 JSON 对象',
    customUrlMissing: '自定义提供方缺少 url 配置',
    providerNotConfigured: '该提供方尚未配置用量查询',
    providerDisabled: '该提供方的用量查询已停用',
    // ── 配置校验 ──────────────────────────────────────────────────────────
    configPatchObject: '配置补丁必须是对象',
    configUnknownKey: '未知配置项：{key}',
    configLocale: 'locale 必须是 auto / zh / en',
    configProviders: 'providers 必须是「提供方 id → 配置」的对象',
    providerObject: 'providers.{id} 必须是对象',
    providerPreset: 'providers.{id}.preset 必须是 deepseek / opencode / custom',
    providerRefresh: 'providers.{id}.refreshMinutes 必须是 1-1440 的整数',
    providerKey: 'providers.{id}.apiKey 必须是字符串',
    providerCustomRequired: 'providers.{id} 为 custom 预设时必须提供 custom 配置',
    customUrl: 'providers.{id}.custom.url 必须是非空字符串',
    customHeaders: 'providers.{id}.custom.headers 必须是字符串到字符串的映射',
    customItems: 'providers.{id}.custom.items 必须是非空数组',
    itemObject: 'providers.{id}.custom.items[{i}] 非法',
    itemKey: 'providers.{id}.custom.items[{i}].key 必须是非空字符串',
    itemLabel: 'providers.{id}.custom.items[{i}].label 必须是非空字符串',
    itemKind: 'providers.{id}.custom.items[{i}].kind 必须是 percent / number / money / text',
    itemPath: 'providers.{id}.custom.items[{i}].path 必须是非空字符串',
    itemMaxPath: 'providers.{id}.custom.items[{i}].maxPath 必须是数字 / 字符串 / null',
    itemResetsAtPath: 'providers.{id}.custom.items[{i}].resetsAtPath 必须是字符串 / null',
    configRejected: '配置保存被拒绝：{errors}',
  },
  en: {
    apiKeyMissing: 'DeepSeek API key not configured (configure it in Settings → Models, or export the {env} environment variable)',
    balanceHttp: 'Balance API returned HTTP {code}',
    balanceNoInfos: 'Balance API response is missing balance_infos',
    balanceEndpointNotOfficial: 'Balance lookup only supports the official endpoint (api.deepseek.com): the configured baseURL {url} is not an official host, so the API key will not be sent there',
    balanceItemTotal: 'Total balance',
    balanceItemGranted: 'Granted balance',
    balanceItemToppedUp: 'Topped-up balance',
    balanceTotalShort: 'Balance',
    goQuotaKeyMissing: 'OpenCode Go API key not found. If you have a Go subscription: run opencode login, export OPENCODE_GO_API_KEY, or set the key in the provider config; otherwise turn off the Enable switch.',
    goQuotaHttp: 'OpenCode Go quota API returned HTTP {code}',
    goQuotaNoSub: 'No active OpenCode Go subscription detected (API returned {code}), or the API key is invalid. Turn off the Enable switch if you have no subscription.',
    goQuotaNoUsage: 'OpenCode Go quota response is missing the usage field',
    goRollingLabel: '5 hours',
    goWeeklyLabel: 'This week',
    goMonthlyLabel: 'This month',
    customHttp: 'Custom usage API returned HTTP {code}',
    customNoUsage: 'Custom usage API response is not a JSON object',
    customUrlMissing: 'Custom provider is missing the url config',
    providerNotConfigured: 'No usage query configured for this provider',
    providerDisabled: 'Usage query for this provider is disabled',
    configPatchObject: 'The config patch must be an object',
    configUnknownKey: 'Unknown config key: {key}',
    configLocale: 'locale must be auto / zh / en',
    configProviders: 'providers must map a provider id to its config',
    providerObject: 'providers.{id} must be an object',
    providerPreset: 'providers.{id}.preset must be deepseek / opencode / custom',
    providerRefresh: 'providers.{id}.refreshMinutes must be an integer from 1 to 1440',
    providerKey: 'providers.{id}.apiKey must be a string',
    providerCustomRequired: 'providers.{id} requires a custom config when preset is custom',
    customUrl: 'providers.{id}.custom.url must be a non-empty string',
    customHeaders: 'providers.{id}.custom.headers must be a string-to-string map',
    customItems: 'providers.{id}.custom.items must be a non-empty array',
    itemObject: 'providers.{id}.custom.items[{i}] is invalid',
    itemKey: 'providers.{id}.custom.items[{i}].key must be a non-empty string',
    itemLabel: 'providers.{id}.custom.items[{i}].label must be a non-empty string',
    itemKind: 'providers.{id}.custom.items[{i}].kind must be percent / number / money / text',
    itemPath: 'providers.{id}.custom.items[{i}].path must be a non-empty string',
    itemMaxPath: 'providers.{id}.custom.items[{i}].maxPath must be a number, string, or null',
    itemResetsAtPath: 'providers.{id}.custom.items[{i}].resetsAtPath must be a string or null',
    configRejected: 'Config save rejected: {errors}',
  },
}

/**
 * 取宿主端文案（zh/en），支持 {var} 插值。
 * @param locale - 'zh' | 'en'。
 * @param code - 文案键。
 * @param vars - 插值变量。
 */
export function tmsg(locale, code, vars) {
  const dict = locale === 'en' ? SERVER_MESSAGES.en : SERVER_MESSAGES.zh
  let text = dict[code] ?? code
  if (vars) for (const key of Object.keys(vars)) text = text.split(`{${key}}`).join(String(vars[key]))
  return text
}

/**
 * 从配置解析消息语言：'en' → en；auto/zh → zh（宿主端无法探测浏览器语言）。
 * @param config - 插件配置。
 */
export function localeOf(config) {
  return config?.locale === 'en' ? 'en' : 'zh'
}
