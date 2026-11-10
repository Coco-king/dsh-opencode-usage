/**
 * 客户端：用量图标（模型切换器左侧）→ 悬浮用量面板。
 * 面板内容由宿主 `usageQuota.getProviderUsage` 决定：OpenCode Go 三档百分比、
 * DeepSeek 余额条目、或自定义接口的逐条数值。
 */

const { createElement: el, Fragment, useState, useEffect, useRef } = require('react')
const { Tooltip } = require('@deepseek-ai/dsh-client-ui-primitives')
const { makeT, resolveLocale } = require('./i18n.js')

/** DeepSeek 官方内置 provider id（与 dsh 模型目录一致）。 */
const BUILTIN_DEEPSEEK = 'deepseek-official'

/** 百分位仪表盘图标。 */
function GaugeIcon({ size = 16 }) {
  return el('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true },
    el('path', { d: 'M1.5 10.4A6.5 6.5 0 1 1 14.5 10.4', stroke: 'currentColor', strokeWidth: '1.7', strokeLinecap: 'round' }),
    el('path', { d: 'M8 10.4V4.2', stroke: 'currentColor', strokeWidth: '1.7', strokeLinecap: 'round' }),
    el('circle', { cx: '8', cy: '10.4', r: '1.4', fill: 'currentColor' }))
}

/** 刷新图标（refreshing 时旋转）。 */
function RefreshIcon({ size = 14, spin }) {
  return el('svg', { width: size, height: size, className: spin ? 'dou-spin' : undefined, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': true },
    el('path', {
      d: 'M13.5 8A5.5 5.5 0 1 1 8 2.5M8 2.5v3M8 2.5h3',
      stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round',
    }))
}

/** 数值显示：整数原样，其余保留两位。 */
function formatNumber(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
  return Number.isInteger(value) ? String(value) : value.toFixed(2)
}

/** 条目百分比（优先服务端算好的 percent，其次 kind=percent 的 value）。 */
function percentOf(item) {
  if (typeof item.percent === 'number' && Number.isFinite(item.percent)) return Math.max(0, Math.min(100, item.percent))
  if (item.kind === 'percent') return Math.max(0, Math.min(100, item.value))
  return null
}

/** 单条用量：标签 + 进度条/数值 + 上限与重置时间。 */
function UsageItemRow({ item, t }) {
  const pct = percentOf(item)
  let valueText
  if (item.kind === 'money') valueText = formatNumber(item.value)
  else if (item.kind === 'text') valueText = String(item.value ?? '')
  else if (pct !== null) valueText = Math.round(pct) + '%'
  else valueText = formatNumber(item.value)
  const showMax = typeof item.max === 'number' && Number.isFinite(item.max) && item.max > 0 && item.kind !== 'percent'
  const fillClass = pct !== null ? (pct >= 100 ? ' dou-fill-over' : pct >= 80 ? ' dou-fill-warn' : '') : ''
  const rows = []
  rows.push(el('div', { key: 'r', className: 'dou-row' },
    el('div', { className: 'dou-label', title: item.label }, item.label),
    pct !== null
      ? el(Fragment, null,
        el('div', { className: 'dou-bar' }, el('div', { className: 'dou-fill' + fillClass, style: { width: pct + '%' } })),
        el('div', { className: 'dou-num' }, valueText))
      : el('div', { className: 'dou-num' }, valueText)))
  if (showMax) {
    rows.push(el('div', { key: 'max', className: 'dou-reset' }, t('maxLine', { label: item.label, value: formatNumber(item.value), max: formatNumber(item.max) })))
  }
  if (item.resetsAt) {
    rows.push(el('div', { key: 'reset', className: 'dou-reset' }, t('resetsAt', { time: new Date(item.resetsAt).toLocaleString() })))
  }
  return el('div', null, rows)
}

/** 悬浮面板：头部（提供方 + 查询方式 + 刷新）、正文（条目或提示）、页脚（更新时间）。 */
function UsagePanel(props) {
  const { providerId, usage, loading, refreshing, error, onRefresh, config, t } = props
  const configured = config?.providers?.[providerId]
  const isBuiltinDeepseek = providerId === BUILTIN_DEEPSEEK
  const isBuiltinOpencode = typeof providerId === 'string' && /opencode/i.test(providerId)
  const preset = configured?.preset ?? (isBuiltinDeepseek ? 'deepseek' : isBuiltinOpencode ? 'opencode' : undefined)
  const presetLabel = preset === 'deepseek' ? t('presetDeepseek') : preset === 'opencode' ? t('presetOpencode') : preset === 'custom' ? t('presetCustom') : null
  let body
  if (loading) {
    body = el('div', { className: 'dou-msg off' }, t('loading'))
  } else if (!configured && !isBuiltinDeepseek && !isBuiltinOpencode) {
    body = el('div', { className: 'dou-empty' }, t('notConfiguredHint'))
  } else if (error) {
    body = el('div', { className: 'dou-msg err' }, error)
  } else if (usage !== null && (usage.status === 'error' || (usage.status === 'off' && usage.message.length > 0))) {
    body = el('div', { className: 'dou-msg ' + (usage.status === 'error' ? 'err' : 'off') }, usage.message)
  } else if (usage !== null && usage.items.length === 0) {
    body = el('div', { className: 'dou-empty' }, t('noUsageItems'))
  } else {
    // 打开面板首帧 effect 尚未把 loading 置真：此时 usage 仍为 null，兜底显示加载中。
    body = usage === null
      ? el('div', { className: 'dou-msg off' }, t('loading'))
      : el('div', { className: 'dou-items' }, usage.items.map(item => el(UsageItemRow, { key: item.key, item, t })))
  }
  return el('div', { className: 'dou-panel', role: 'dialog' },
    el('div', { className: 'dou-panel-head' },
      el('div', { className: 'dou-panel-title', title: providerId || undefined }, providerId || t('unknownProvider')),
      presetLabel !== null && el('span', { className: 'dou-preset' }, presetLabel),
      el('button', { type: 'button', className: 'dou-icon-btn', 'aria-label': t('refresh'), disabled: refreshing || loading, onClick: onRefresh }, RefreshIcon({ size: 14, spin: refreshing }))),
    body,
    usage !== null && usage.fetchedAt > 0 && el('div', { className: 'dou-panel-foot' },
      el('span', null, t('updatedAt', { time: new Date(usage.fetchedAt).toLocaleTimeString() }))))
}

/** 会话输入区右侧的用量图标 + 悬浮面板。 */
function UsageButton(props) {
  const { sessionId, api, providerOf, useUsage } = props
  const snap = useUsage ? useUsage(s => s) : {}
  const config = snap.config
  // 生效语言实时取 store（宿主切换语言会写回 store，useUsage 触发重渲染）。
  const t = makeT(snap.locale ?? resolveLocale(config?.locale))
  const [open, setOpen] = useState(false)
  const [usage, setUsage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const wrapRef = useRef(null)

  const close = () => setOpen(false)
  useEffect(() => {
    if (!open) return undefined
    const onDown = e => {
      if (wrapRef.current !== null && !wrapRef.current.contains(e.target)) close()
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])
  useEffect(() => {
    if (!open) return undefined
    let cancelled = false
    setLoading(true)
    const providerId = providerOf(sessionId)
    if (providerId === undefined) {
      setUsage(null); setError(null); setLoading(false)
      return () => { cancelled = true }
    }
    api.getProviderUsage(providerId).then(
      v => { if (!cancelled) { setUsage(v); setError(null) } },
      err => { if (!cancelled) { setUsage(null); setError(err?.message ?? String(err)) } },
    ).finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [open, sessionId, api, providerOf])

  const doRefresh = () => {
    const providerId = providerOf(sessionId)
    if (providerId === undefined) return
    setRefreshing(true)
    api.refreshProvider(providerId).then(
      v => { setUsage(v); setError(null) },
      err => setError(err?.message ?? String(err)),
    ).finally(() => setRefreshing(false))
  }

  return el('div', { className: 'dou-dock', ref: wrapRef },
    el(Tooltip, { label: t('panelTitle'), side: 'top', delayMs: 500 },
      el('button', {
        type: 'button',
        className: 'dou-icon-btn' + (open ? ' dou-icon-btn-open' : ''),
        'aria-label': t('panelTitle'),
        'aria-expanded': open,
        onClick: () => setOpen(v => !v),
      }, GaugeIcon({ size: 16 }))),
    open && el(UsagePanel, {
      providerId: providerOf(sessionId),
      usage, loading, refreshing, error,
      onRefresh: doRefresh,
      config, t,
    }))
}

module.exports = { UsageButton }
