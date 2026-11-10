/**
 * 配置存储：$DSH_HOME/storages/dsh-opencode-usage/config.json。
 *
 * 只管「哪个提供方用哪种用量查询」这一件事：providers 记录 + 界面语言。
 * 配置改动走 applyConfigPatch 的整份校验（非法补丁整体不落盘），写盘防抖 + 原子替换。
 */

import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { resolveDshHome } from '@deepseek-ai/dsh-home-paths'
import { tmsg } from './messages.js'

/** 配置结构版本（仅用于未来迁移，当前只校验存在）。 */
const CONFIG_VERSION = 1

/** 写盘防抖窗口（毫秒）。 */
const WRITE_DEBOUNCE_MS = 200

/** 默认配置：不绑定任何提供方（deepseek / opencode 由 id 自动识别，无需配置）。 */
export function defaultConfig() {
  return { version: CONFIG_VERSION, locale: 'auto', providers: {} }
}

const CONFIG_KEYS = Object.keys(defaultConfig())

/** 深合并（对象逐层合并，数组与标量整体替换）。 */
function mergeDeep(base, patch) {
  const out = Array.isArray(base) ? [...base] : { ...base }
  for (const [key, value] of Object.entries(patch ?? {})) {
    const prev = out[key]
    out[key] = value !== null && typeof value === 'object' && !Array.isArray(value)
      && prev !== null && typeof prev === 'object' && !Array.isArray(prev)
      ? mergeDeep(prev, value)
      : value
  }
  return out
}

/** 本次补丁的目标语言（补丁自带 locale 时按补丁，否则沿用当前配置）。 */
function patchLocale(current, patch) {
  const raw = patch?.locale
  if (raw === 'en') return 'en'
  if (raw === 'zh' || raw === 'auto') return 'zh'
  return current?.locale === 'en' ? 'en' : 'zh'
}

/**
 * 校验自定义条目的 JSON 路径与展示类型。
 * @param id - 提供方 id（用于报错定位）。
 * @param items - custom.items。
 * @param locale - 报错语言。
 * @param errors - 错误收集数组。
 */
function validateCustomItems(id, items, locale, errors) {
  if (!Array.isArray(items) || items.length === 0) {
    errors.push(tmsg(locale, 'customItems', { id }))
    return
  }
  items.forEach((item, i) => {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
      errors.push(tmsg(locale, 'itemObject', { id, i }))
      return
    }
    if (typeof item.key !== 'string' || item.key.length === 0) errors.push(tmsg(locale, 'itemKey', { id, i }))
    if (typeof item.label !== 'string' || item.label.length === 0) errors.push(tmsg(locale, 'itemLabel', { id, i }))
    if (!['percent', 'number', 'money', 'text'].includes(item.kind)) errors.push(tmsg(locale, 'itemKind', { id, i }))
    if (typeof item.path !== 'string' || item.path.length === 0) errors.push(tmsg(locale, 'itemPath', { id, i }))
    const maxPath = item.maxPath
    if (!(maxPath === undefined || maxPath === null
      || typeof maxPath === 'string' || typeof maxPath === 'number')) {
      errors.push(tmsg(locale, 'itemMaxPath', { id, i }))
    }
    const resets = item.resetsAtPath
    if (!(resets === undefined || resets === null || typeof resets === 'string')) {
      errors.push(tmsg(locale, 'itemResetsAtPath', { id, i }))
    }
  })
}

/**
 * 校验并应用一份配置补丁，返回 { config, errors }。
 * 未知键、非法值都会报错且整体不落盘；合法补丁深合并后持久化。
 * providers 是「提供方 id → 配置」记录：补丁提交完整结构时按替换语义处理，
 * 否则 mergeDeep 会把已删除的旧条目合并回来。
 * @param current - 当前配置。
 * @param patch - 客户端提交的补丁（JSON）。
 */
export function applyConfigPatch(current, patch) {
  const locale = patchLocale(current, patch)
  if (patch === null || typeof patch !== 'object' || Array.isArray(patch)) {
    return { config: current, errors: [tmsg(locale, 'configPatchObject')] }
  }
  const errors = []
  for (const key of Object.keys(patch)) {
    if (!CONFIG_KEYS.includes(key)) errors.push(tmsg(locale, 'configUnknownKey', { key }))
  }
  if (errors.length > 0) return { config: current, errors }

  const candidate = mergeDeep(current, patch)
  candidate.version = CONFIG_VERSION
  if (patch.providers !== null && typeof patch.providers === 'object' && !Array.isArray(patch.providers)) {
    candidate.providers = {}
    for (const [id, raw] of Object.entries(patch.providers)) {
      candidate.providers[id] = raw !== null && typeof raw === 'object' && !Array.isArray(raw) ? { ...raw } : raw
    }
  }

  if (!['auto', 'zh', 'en'].includes(candidate.locale)) errors.push(tmsg(locale, 'configLocale'))
  const providers = candidate.providers
  if (providers === null || typeof providers !== 'object' || Array.isArray(providers)) {
    errors.push(tmsg(locale, 'configProviders'))
  } else {
    for (const [id, provider] of Object.entries(providers)) {
      if (provider === null || typeof provider !== 'object' || Array.isArray(provider)) {
        errors.push(tmsg(locale, 'providerObject', { id }))
        continue
      }
      if (typeof provider.enabled !== 'boolean') provider.enabled = true // 缺省视为启用
      if (!['deepseek', 'opencode', 'custom'].includes(provider.preset)) {
        errors.push(tmsg(locale, 'providerPreset', { id }))
      }
      const refresh = Number(provider.refreshMinutes)
      if (!Number.isInteger(refresh) || refresh < 1 || refresh > 1440) errors.push(tmsg(locale, 'providerRefresh', { id }))
      else provider.refreshMinutes = refresh
      if (typeof provider.apiKey !== 'string') {
        if (provider.apiKey === undefined || provider.apiKey === null) provider.apiKey = ''
        else errors.push(tmsg(locale, 'providerKey', { id }))
      }
      if (provider.preset === 'custom') {
        const custom = provider.custom
        if (custom === null || typeof custom !== 'object' || Array.isArray(custom)) {
          errors.push(tmsg(locale, 'providerCustomRequired', { id }))
        } else {
          if (typeof custom.url !== 'string' || custom.url.length === 0) errors.push(tmsg(locale, 'customUrl', { id }))
          const headers = custom.headers
          if (headers === null || typeof headers !== 'object' || Array.isArray(headers)
            || Object.values(headers).some(value => typeof value !== 'string')) {
            errors.push(tmsg(locale, 'customHeaders', { id }))
          }
          validateCustomItems(id, custom.items, locale, errors)
        }
      }
    }
  }
  if (errors.length > 0) return { config: current, errors }
  return { config: candidate, errors: [] }
}

/** 配置读写：内存快照 + 防抖原子写盘。 */
export class UsageStore {
  /**
   * 在 $DSH_HOME 下打开配置（文件不存在时按默认配置启动）。
   */
  static open() {
    const root = join(resolveDshHome(), 'storages', 'dsh-opencode-usage')
    return UsageStore.openAt({ root, configPath: join(root, 'config.json') })
  }

  /**
   * 显式路径打开（测试用）。
   * @param opts - { root, configPath }。
   */
  static openAt({ root, configPath }) {
    mkdirSync(root, { recursive: true })
    return new UsageStore(UsageStore.readConfig(configPath), configPath)
  }

  /**
   * 读取并迁移配置；文件缺失或损坏时回退默认配置。
   * @param configPath - config.json 路径。
   */
  static readConfig(configPath) {
    try {
      const parsed = JSON.parse(readFileSync(configPath, 'utf8'))
      const raw = parsed !== null && typeof parsed === 'object' && parsed.config !== null && typeof parsed.config === 'object'
        ? parsed.config
        : parsed
      if (raw !== null && typeof raw === 'object' && !Array.isArray(raw)) {
        return mergeDeep(defaultConfig(), raw)
      }
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        console.warn(`[dsh-opencode-usage] 配置读取失败，按默认配置启动：${String(error?.message ?? error)}`)
      }
    }
    return defaultConfig()
  }

  /**
   * @param config - 初始配置。
   * @param configPath - config.json 路径。
   */
  constructor(config, configPath) {
    this.config = config
    this.configPath = configPath
    this.writeTimer = null
  }

  /**
   * 应用一份配置补丁；非法补丁不落盘。
   * @param patch - 配置补丁。
   * @returns { config, errors }（错误以当前语言的可读文案给出）。
   */
  replace(patch) {
    const { config, errors } = applyConfigPatch(this.config, patch)
    if (errors.length > 0) return { config: this.config, errors }
    this.config = config
    this.scheduleWrite()
    return { config, errors: [] }
  }

  /** 防抖写盘（多次改动合并为一次）。 */
  scheduleWrite() {
    if (this.writeTimer !== null) return
    this.writeTimer = setTimeout(() => {
      this.writeTimer = null
      try { this.flush() } catch (error) {
        console.warn(`[dsh-opencode-usage] 配置写盘失败：${String(error?.message ?? error)}`)
      }
    }, WRITE_DEBOUNCE_MS)
    this.writeTimer.unref?.()
  }

  /** 立即落盘（原子替换：先写临时文件再 rename）。 */
  flush() {
    mkdirSync(dirname(this.configPath), { recursive: true })
    const tmp = `${this.configPath}.tmp`
    writeFileSync(tmp, `${JSON.stringify({ config: this.config }, null, 2)}\n`, 'utf8')
    renameSync(tmp, this.configPath)
  }

  /** 关闭前落盘并清掉待写定时器。 */
  close() {
    if (this.writeTimer !== null) {
      clearTimeout(this.writeTimer)
      this.writeTimer = null
    }
    this.flush()
  }
}
