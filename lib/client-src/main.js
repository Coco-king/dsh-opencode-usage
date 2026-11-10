/**
 * dsh-opencode-usage 浏览器端 bundle 入口（esbuild 打包入口，见 scripts/build-client.mjs）。
 *
 * 装载契约：构建脚本把本文件（及被内联的模块）整体包进
 * `window.__ModuleLoader__.load({ id:'@codecrab/dsh-opencode-usage', factory:(require)=>… })`，
 * 因此 `require('react')` 等外部依赖在运行时绑定到 loader 传入的 require。
 *
 * 两处界面：
 *  - conversation.input.right：会话输入区右侧的用量图标 + 悬浮面板；
 *  - settings.section：设置页「用量」分节，绑定/编辑/移除提供方用量查询。
 *
 * 数据通道：remote.usageQuota.*（Typert RPC）→ 用量与配置。
 */

const { injectStyles } = require('./styles.js')
const { MESSAGES, makeT, resolveLocale } = require('./i18n.js')
const { CONTRIBUTION } = require('./codecs.js')
const { UsageButton } = require('./panel.js')
const { UsageSettingsSection } = require('./settings.js')
const { baseProviderId } = require('../provider-alias.js')

// 样式注入（模块加载即注入，幂等去重）。
injectStyles()

/** 极简外部 store：供 hooks 走 useSyncExternalStore。 */
function makeStore(initial) {
  let snapshot = initial
  const listeners = new Set()
  return {
    getSnapshot: () => snapshot,
    subscribe: fn => {
      listeners.add(fn)
      return () => { listeners.delete(fn) }
    },
    set: next => {
      if (next === snapshot) return
      snapshot = next
      for (const fn of [...listeners]) fn()
    },
  }
}

const inject = ['remote']

/** 构建标记：构建脚本按产物内容注入（用于确认热更是否生效）。 */
const BUILD_TAG = typeof __DSH_BUILD_TAG__ === 'string' ? __DSH_BUILD_TAG__ : 'dev'

async function apply(ctx) {
  console.log('[dsh-opencode-usage] client build ' + BUILD_TAG)
  const remote = ctx.remote
  if (remote === undefined || typeof remote.$mount !== 'function') return
  const unmount = await remote.$mount(CONTRIBUTION)
  ctx.effect(() => () => { unmount() }, 'dsh-opencode-usage: remote contribution')
  const service = ctx.get('remote.usageQuota')
  if (service === undefined) return

  const store = makeStore({ status: 'loading', error: null, config: null, locale: 'zh' })

  // ── 生效语言 ──────────────────────────────────────────────────────────
  // 宿主 DSH 的全局语言（LocaleRuntime）是「设置→语言」的权威来源；
  // 不可用时回退到浏览器探测。
  const hostLocale = ctx.get('locale')
  const hostActive = () => {
    if (hostLocale !== undefined && typeof hostLocale.getLocale === 'function') {
      const active = hostLocale.getLocale()?.active
      if (active === 'zh' || active === 'en') return active
    }
    return undefined
  }
  const effectiveLocale = () => {
    const host = hostActive()
    if (host !== undefined) return host
    return resolveLocale(store.getSnapshot().config?.locale)
  }
  const refreshStoreLocale = () => {
    const snap = store.getSnapshot()
    const next = effectiveLocale()
    if (next !== snap.locale) {
      store.set({ ...snap, locale: next })
      return true
    }
    return false
  }

  const call = async (method, args) => {
    const result = await service[method](...(args ?? []))
    if (result === null || typeof result !== 'object' || result.ok !== true) {
      throw new Error(result?.error?.message ?? ('usageQuota.' + method + ' failed'))
    }
    return result.value
  }

  let reloading = false
  const setReady = config => {
    store.set({ status: 'ready', error: null, config, locale: effectiveLocale() })
  }
  const reload = async () => {
    if (reloading) return // 并发防抖：轮询/手动刷新/重连不叠加 getConfig，避免乱序覆盖
    reloading = true
    const prev = store.getSnapshot()
    try {
      setReady(await call('getConfig'))
    } catch (error) {
      store.set({ status: 'error', error: error?.message ?? String(error), config: prev.config, locale: prev.locale })
    } finally {
      reloading = false
    }
  }
  // 把宿主语言写回配置，服务端文案与配置语言保持一致（幂等：相等不写）。
  const syncBackLocale = async () => {
    const snap = store.getSnapshot()
    const host = hostActive()
    if (host !== undefined && snap.config?.locale !== host) {
      try {
        const config = await call('updateConfig', [{ locale: host }])
        if (config !== undefined) setReady(config)
      } catch {
        // 写回失败不阻塞界面。
      }
    }
  }

  ctx.effect(() => ctx.on('connection/reset', () => { void reload() }), 'dsh-opencode-usage: reconnect reload')
  // 配置轮询：页面隐藏时跳过，重新可见立即刷新。
  const pollTimer = setInterval(() => { if (!document.hidden) void reload() }, 60_000)
  ctx.effect(() => () => { clearInterval(pollTimer) }, 'dsh-opencode-usage: poll timer')
  const onVisible = () => { if (document.visibilityState === 'visible') void reload() }
  document.addEventListener('visibilitychange', onVisible)
  ctx.effect(() => () => { document.removeEventListener('visibilitychange', onVisible) }, 'dsh-opencode-usage: visibility reload')

  const api = {
    reload,
    updateConfig: async patch => {
      const config = await call('updateConfig', [patch])
      setReady(config)
      return config
    },
    getProviderUsage: async providerId => call('getProviderUsage', [providerId]),
    refreshProvider: async providerId => call('refreshProvider', [providerId]),
    listProviders: async () => call('listProviders'),
  }

  void reload()
  void syncBackLocale()

  const slots = ctx.get('slots')
  if (slots === undefined) return

  /**
   * 解析当前会话的模型提供方 id（读模型切换器自己的 service，不自己猜）。
   * modlens 变体归一化回本体；变体自身有显式配置时尊重配置。
   */
  const providerOf = sessionId => {
    const dirs = ctx.get('modelDirectories')
    if (dirs === undefined || typeof dirs.directoryFor !== 'function') return undefined
    try {
      const directory = dirs.directoryFor(sessionId)
      const snapshot = typeof directory?.store?.getSnapshot === 'function' ? directory.store.getSnapshot() : undefined
      const raw = snapshot?.current?.provider
      const configured = store.getSnapshot().config?.providers?.[raw] !== undefined
      return configured ? raw : baseProviderId(raw)
    } catch {
      return undefined
    }
  }

  // 用量图标：模型切换器左侧（conversation.input.right，list 协议，session 作用域）。
  slots.inject('conversation.input.right', () => slots.register({
    name: 'conversation.input.right',
    id: 'dsh-opencode-usage-icon',
    order: 0,
    inject: sessionId => ({ sessionId, api, providerOf, hooks: { usage: store } }),
  }, UsageButton))

  // 设置页「用量」分节：标签随语言重建。
  const sectionActive = { gen: 0, dispose: null }
  const registerSection = locale => {
    if (sectionActive.dispose !== null) { sectionActive.dispose(); sectionActive.dispose = null }
    sectionActive.gen += 1
    const gen = sectionActive.gen
    slots.inject('settings.section', () => {
      if (sectionActive.gen !== gen) return undefined
      const dispose = slots.register({
        name: 'settings.section',
        id: 'dsh-opencode-usage-' + locale,
        order: 32,
        label: MESSAGES[locale].sectionLabel,
        inject: () => ({ api, hooks: { usage: store } }),
      }, UsageSettingsSection)
      if (sectionActive.gen !== gen) { dispose(); return undefined }
      sectionActive.dispose = dispose
      return () => {
        if (sectionActive.dispose === dispose) sectionActive.dispose = null
        dispose()
      }
    })
  }
  let lastSectionLocale = null
  const sync = () => {
    const locale = store.getSnapshot().locale
    if (locale !== lastSectionLocale) {
      registerSection(locale)
      lastSectionLocale = locale
    }
  }
  sync()
  const stopSync = store.subscribe(sync)

  // 宿主切换语言：刷新生效语言 + 重注册设置分节 + 写回配置语言。
  let stopLocaleWatch = null
  if (hostLocale !== undefined && typeof hostLocale.subscribe === 'function') {
    stopLocaleWatch = ctx.effect(() => hostLocale.subscribe(() => {
      const changed = refreshStoreLocale()
      if (changed) sync()
      void syncBackLocale()
    }), 'dsh-opencode-usage: host locale watch')
  }

  return () => { stopSync(); if (stopLocaleWatch !== null) stopLocaleWatch() }
}

module.exports = { apply, inject }
