/**
 * usageQuota 服务：按提供方查询用量（DeepSeek 官方余额 / OpenCode Go 套餐 /
 * 自定义 HTTP），维护进程内缓存，并把配置读写经 Typert 暴露给浏览器半。
 * 手写 `typertRemote` 绑定（service/serviceKey/namespace）满足 Typert 网关校验。
 */

import { tmsg, localeOf } from './messages.js'
import { queryBalance, queryCustom, queryGoQuota } from './queries.js'
import { baseProviderId } from './provider-alias.js'

/** DeepSeek 官方在 dsh 模型目录中的 provider id（dsh-llm-deepseek 的路由名）。 */
const BUILTIN_DEEPSEEK_ID = 'deepseek-official'

/**
 * id 是否属 OpenCode Go 提供方（纯字符串推断；dsh 无 opencode 专用目录）。
 * 与客户端「按 id 推导默认预设」同口径，大小写不敏感。
 * @param id - 提供方 id。
 */
function isOpenCodeGoId(id) {
  return typeof id === 'string' && /opencode/i.test(id)
}

/** 组装对客户端的提供方用量快照。 */
function buildProviderUsage(providerId, provider, value, status, message, fetchedAt) {
  return {
    provider: providerId,
    preset: provider?.preset ?? 'custom',
    status,
    fetchedAt,
    message,
    items: value?.items ?? [],
  }
}

/** 空用量（未配置/停用/查询失败降级）。 */
function emptyUsage(providerId, provider, status, message) {
  return buildProviderUsage(providerId, provider, { items: [] }, status, message, Date.now())
}

/**
 * 创建 usageQuota 服务对象。
 * @param ctx - 宿主插件上下文。
 * @param store - 配置存储。
 * @returns 服务对象（带 typertRemote 绑定）。
 */
export function createUsageService(ctx, store) {
  // 每提供方独立的进程内用量缓存：按 refreshMinutes 过期；失败落 error/off 状态。
  const usageCaches = new Map()

  const providerOf = providerId => {
    const providers = store.config?.providers
    if (providers === null || typeof providers !== 'object') return undefined
    return providers[providerId]
  }

  /** 按需抓取并缓存某提供方用量（过期或 force）；未配置/停用/失败均落空或 error/off 状态。 */
  const ensureUsage = async (providerId, force = false) => {
    const providerIdStr = String(providerId ?? '')
    const locale = localeOf(store.config)
    // modlens 变体回退本体：变体自身有显式配置时优先（用户可单独改），否则用本体
    // 提供方 id 的配置/内置推断，让变体与本体用量查询完全一致。
    const effectiveId = baseProviderId(providerIdStr)
    const resolvedId = providerOf(providerIdStr) !== undefined ? providerIdStr : effectiveId
    let provider = providerOf(resolvedId)
    // DeepSeek 官方内置：无需配置 provider，自动用 设置→模型 的 Key 查 /user/balance。
    if (provider === undefined && resolvedId === BUILTIN_DEEPSEEK_ID) {
      provider = { enabled: true, preset: 'deepseek', refreshMinutes: 5, apiKey: '' }
    }
    // OpenCode Go 自动识别：未绑定的 opencode 提供方（含装插件前就配好的）直接按
    // Go 订阅查询，无需先在 设置→模型 里保存一次；Key 从凭据库/环境变量/auth.json 回退。
    if (provider === undefined && isOpenCodeGoId(resolvedId)) {
      provider = { enabled: true, preset: 'opencode', refreshMinutes: 15, apiKey: '' }
    }
    if (provider === undefined) {
      return emptyUsage(resolvedId, undefined, 'off', tmsg(locale, 'providerNotConfigured'))
    }
    if (provider.enabled === false) {
      return emptyUsage(resolvedId, provider, 'off', tmsg(locale, 'providerDisabled'))
    }
    const cache = usageCaches.get(resolvedId)
    const interval = Math.max(1, Number(provider.refreshMinutes) || 15) * 60_000
    if (!force && cache !== undefined && Date.now() - cache.fetchedAt < interval) return cache.value
    if (cache !== undefined && cache.inFlight !== undefined) {
      await cache.inFlight
      return cache.value
    }
    const task = (async () => {
      let value
      if (provider.preset === 'deepseek') {
        const balance = await queryBalance(ctx, locale)
        value = resolvedId === BUILTIN_DEEPSEEK_ID
          ? { items: [
            { key: 'balance-total', label: tmsg(locale, 'balanceTotalShort'), kind: 'money', value: balance.totalBalance, resetsAt: null },
          ] }
          : { items: [
            { key: 'balance-total', label: tmsg(locale, 'balanceItemTotal'), kind: 'money', value: balance.totalBalance, resetsAt: null },
            { key: 'balance-granted', label: tmsg(locale, 'balanceItemGranted'), kind: 'money', value: balance.grantedBalance, resetsAt: null },
            { key: 'balance-topped-up', label: tmsg(locale, 'balanceItemToppedUp'), kind: 'money', value: balance.toppedUpBalance, resetsAt: null },
          ] }
      } else if (provider.preset === 'opencode') {
        const quota = await queryGoQuota(ctx, provider, locale)
        const items = []
        const push = (key, window, label) => {
          if (window === null) return
          items.push({ key, label, kind: 'percent', value: window.percent, resetsAt: window.resetsAt })
        }
        push('rolling', quota.rolling, tmsg(locale, 'goRollingLabel'))
        push('weekly', quota.weekly, tmsg(locale, 'goWeeklyLabel'))
        push('monthly', quota.monthly, tmsg(locale, 'goMonthlyLabel'))
        value = { items }
      } else {
        value = await queryCustom(ctx, provider, locale)
      }
      usageCaches.set(resolvedId, { fetchedAt: Date.now(), value: buildProviderUsage(resolvedId, provider, value, 'ok', '', Date.now()) })
    })()

    const prev = usageCaches.get(resolvedId)
    if (prev === undefined) {
      usageCaches.set(resolvedId, { fetchedAt: 0, value: emptyUsage(resolvedId, provider, 'off', ''), inFlight: task })
    } else {
      prev.inFlight = task
    }
    try {
      await task
    } catch (error) {
      const soft = error && error.soft === true
      const entry = usageCaches.get(resolvedId)
      entry.value = buildProviderUsage(
        resolvedId,
        provider,
        { items: [] },
        soft ? 'off' : 'error',
        error instanceof Error ? error.message : String(error),
        Date.now(),
      )
    } finally {
      const entry = usageCaches.get(resolvedId)
      if (entry?.inFlight === task) delete entry.inFlight
    }
    return usageCaches.get(resolvedId).value
  }

  const service = {
    /**
     * 查询指定提供方的用量（缓存命中或按需抓取）。
     * @param providerId - 模型提供方 id。
     * @returns 用量条目与状态。
     */
    async getProviderUsage(providerId) {
      return ensureUsage(String(providerId ?? ''), false)
    },

    /**
     * 强制刷新指定提供方的用量。
     * @param providerId - 模型提供方 id。
     * @returns 刷新后的用量条目与状态。
     */
    async refreshProvider(providerId) {
      return ensureUsage(String(providerId ?? ''), true)
    },

    /** 读取配置（提供方绑定 + 界面语言）。 */
    async getConfig() {
      return store.config
    },

    /**
     * 应用一份配置补丁并持久化；非法补丁整体拒绝并抛出可读错误。
     * @param patch - 配置补丁（{ providers } / { locale }）。
     */
    async updateConfig(patch) {
      const { config, errors } = store.replace(patch)
      if (errors.length > 0) {
        const locale = patch !== null && typeof patch === 'object' && patch.locale === 'en' ? 'en' : localeOf(store.config)
        usageCaches.clear() // 提供方配置可能已变化：清空缓存
        throw new Error(tmsg(locale, 'configRejected', { errors: errors.join(locale === 'zh' ? '；' : '; ') }))
      }
      usageCaches.clear() // 配置变化：下一次按新配置抓取
      return config
    },

    /**
     * 读取设置→模型 的提供方目录（供配置页选择提供方）。
     * @returns { providers: [{ id, name }] }。
     */
    async listProviders() {
      const llm = ctx.get('llm')
      if (llm === undefined || typeof llm.listProviders !== 'function') return { providers: [] }
      const providers = []
      try {
        for (const route of llm.listProviders() ?? []) {
          const id = route?.id
          if (typeof id !== 'string' || id.length === 0) continue
          providers.push({ id, name: typeof route.name === 'string' && route.name.length > 0 ? route.name : id })
        }
      } catch {
        // 目录不可用：返回空列表，客户端保留已配置的提供方。
      }
      return { providers }
    },
  }
  Object.defineProperty(service, 'typertRemote', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: { service, serviceKey: 'usageQuota', namespace: 'usageQuota' },
  })
  return service
}
