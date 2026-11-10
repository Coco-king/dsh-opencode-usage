/**
 * 客户端 bundle 装载冒烟：在虚拟机里加载 lib/client.js，用桩 ctx 跑 apply，
 * 断言两处插槽注册（会话输入区用量图标、设置页用量分节）与远端贡献清单形状。
 * 目的不是渲染校验，而是防止接线回归（插槽 id / inject 形状 / 注册时机）。
 */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import vm from 'node:vm'

const here = dirname(fileURLToPath(import.meta.url))
const bundlePath = join(here, '..', 'lib', 'client.js')

/** 桩 React：createElement 只记录元素形状，不渲染。 */
const ReactStub = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  Fragment: Symbol('Fragment'),
  useState: initial => [initial, () => {}],
  useEffect: () => {},
  useRef: initial => ({ current: initial }),
  useCallback: fn => fn,
}

/** 加载 bundle 并返回其模块导出。 */
function loadBundle() {
  const code = readFileSync(bundlePath, 'utf8')
  let record = null
  const noop = () => {}
  const document = {
    querySelector: () => null,
    createElement: () => ({ setAttribute: noop, remove: noop, textContent: '', appendChild: noop }),
    head: { appendChild: noop },
    hidden: false,
    visibilityState: 'visible',
    addEventListener: noop,
    removeEventListener: noop,
  }
  const sandbox = {
    console: { log: noop, warn: noop, error: noop },
    window: { __ModuleLoader__: { load: rec => { record = rec } } },
    document,
    navigator: { language: 'zh-CN' },
    setTimeout: () => 0,
    clearTimeout: noop,
    setInterval: () => 0,
    clearInterval: noop,
    Symbol, Object, Array, String, Number, Boolean, Math, Date, JSON, Map, Set, Promise,
  }
  sandbox.globalThis = sandbox
  vm.createContext(sandbox)
  vm.runInContext(code, sandbox, { filename: 'lib/client.js' })
  assert.ok(record !== null, 'module-loader record')
  assert.equal(record.id, '@codecrab/dsh-opencode-usage')
  const moduleStub = new Proxy({}, { get: (target, key) => (key === Symbol.toStringTag ? 'Module' : noop) })
  return record.factory(spec => {
    if (spec.startsWith('react')) return ReactStub
    if (spec === '@deepseek-ai/dsh-client-ui-primitives') return { Tooltip: 'Tooltip' }
    throw new Error('unexpected external require: ' + spec)
  })
}

/** 记录在用插槽注册的 slots 桩：注册返回 disposer 时从在用集合移除。 */
function slotsStub(live) {
  return {
    inject: (_name, callback) => {
      const disposer = callback()
      return typeof disposer === 'function' ? disposer : () => {}
    },
    register: (options, component) => {
      const entry = { options, component }
      live.push(entry)
      return () => {
        const index = live.indexOf(entry)
        if (index >= 0) live.splice(index, 1)
      }
    },
  }
}

const flush = () => new Promise(resolve => setTimeout(resolve, 0))

test('the client bundle registers the usage icon and the settings section', async () => {
  const moduleExports = loadBundle()
  assert.equal(moduleExports.inject.join(','), 'remote')
  assert.equal(typeof moduleExports.apply, 'function')

  const live = []
  const contribution = { current: null }
  const usageQuota = {
    getProviderUsage: async () => ({ ok: true, value: { provider: 'opencode-go', preset: 'opencode', status: 'ok', fetchedAt: Date.now(), message: '', items: [] } }),
    refreshProvider: async () => ({ ok: true, value: { provider: 'opencode-go', preset: 'opencode', status: 'ok', fetchedAt: Date.now(), message: '', items: [] } }),
    getConfig: async () => ({ ok: true, value: { version: 1, locale: 'zh', providers: {} } }),
    updateConfig: async () => ({ ok: true, value: { version: 1, locale: 'zh', providers: {} } }),
    listProviders: async () => ({ ok: true, value: { providers: [{ id: 'opencode-go', name: 'OpenCode Go' }] } }),
  }
  const services = {
    'remote.usageQuota': usageQuota,
    slots: slotsStub(live),
    locale: { getLocale: () => ({ active: 'zh' }), subscribe: () => () => {} },
    modelDirectories: { directoryFor: () => ({ store: { getSnapshot: () => ({ current: { provider: 'opencode-go' } }) } }) },
  }
  const ctx = {
    remote: { $mount: async value => { contribution.current = value; return async () => {} } },
    get: name => services[name],
    on: () => () => {},
    effect: fn => { const disposer = fn(); return typeof disposer === 'function' ? disposer : () => {} },
  }

  const cleanup = await moduleExports.apply(ctx)
  await flush()
  assert.equal(typeof cleanup, 'function')
  assert.ok(Array.isArray(contribution.current.descriptors) && contribution.current.descriptors.length === 5)

  const icon = live.find(entry => entry.options.name === 'conversation.input.right')
  assert.ok(icon !== undefined, 'usage icon registered')
  assert.equal(icon.options.id, 'dsh-opencode-usage-icon')
  const injected = icon.options.inject('session-1')
  assert.equal(injected.sessionId, 'session-1')
  assert.equal(injected.providerOf('session-1'), 'opencode-go')
  assert.equal(typeof injected.hooks.usage.getSnapshot, 'function')
  assert.deepEqual(injected.hooks.usage.getSnapshot().config.providers, {})

  const section = live.find(entry => entry.options.name === 'settings.section')
  assert.ok(section !== undefined, 'settings section registered')
  assert.equal(typeof section.options.inject, 'function')
  assert.equal(typeof section.options.inject().api.updateConfig, 'function')

  cleanup()
})

test('the settings section label follows the host locale', async () => {
  const live = []
  const moduleExports = loadBundle()
  const localeListeners = new Set()
  let active = 'en'
  const services = {
    'remote.usageQuota': {
      getConfig: async () => ({ ok: true, value: { version: 1, locale: 'en', providers: {} } }),
      updateConfig: async patch => ({ ok: true, value: { version: 1, locale: patch.locale ?? 'en', providers: {} } }),
      listProviders: async () => ({ ok: true, value: { providers: [] } }),
    },
    slots: slotsStub(live),
    locale: { getLocale: () => ({ active }), subscribe: fn => { localeListeners.add(fn); return () => localeListeners.delete(fn) } },
    modelDirectories: { directoryFor: () => undefined },
  }
  const ctx = {
    remote: { $mount: async () => async () => {} },
    get: name => services[name],
    on: () => () => {},
    effect: fn => { const disposer = fn(); return typeof disposer === 'function' ? disposer : () => {} },
  }
  await moduleExports.apply(ctx)
  await flush()
  const labels = () => live.filter(entry => entry.options.name === 'settings.section').map(entry => entry.options.label)
  assert.deepEqual(labels(), ['Usage'])
  active = 'zh'
  for (const listener of [...localeListeners]) listener()
  await flush()
  assert.deepEqual(labels(), ['用量'])
})
