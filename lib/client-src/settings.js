/**
 * 设置页「用量」分节：列出已绑定的提供方，支持添加/编辑/移除绑定，
 * 并说明哪些提供方按 id 自动识别、无需配置。
 */

const { createElement: el, useState, useEffect } = require('react')
const { ProviderForm } = require('./provider-form.js')
const { makeT, resolveLocale } = require('./i18n.js')

/** DeepSeek 官方内置 provider id。 */
const BUILTIN_DEEPSEEK = 'deepseek-official'

/** 是否按 id 自动识别（与服务端 ensureUsage 同口径）。 */
function autoPresetOf(id) {
  if (id === BUILTIN_DEEPSEEK) return 'deepseek'
  if (typeof id === 'string' && /opencode/i.test(id)) return 'opencode'
  return undefined
}

/**
 * 用量设置分节。
 * @param props.api - RPC 助手（getProviderUsage / refreshProvider / updateConfig / listProviders）。
 * @param props.useUsage - 配置 store 的 hook。
 */
function UsageSettingsSection(props) {
  const { api, useUsage } = props
  const snap = useUsage ? useUsage(s => s) : {}
  const config = snap.config
  const t = makeT(snap.locale ?? resolveLocale(config?.locale))
  const [catalog, setCatalog] = useState({ providers: [] })
  const [editing, setEditing] = useState(null) // { id } | { id: undefined } | null
  const [notice, setNotice] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    api.listProviders().then(
      list => { if (!cancelled) setCatalog(list) },
      () => { if (!cancelled) setCatalog({ providers: [] }) },
    )
    return () => { cancelled = true }
  }, [api])

  const configured = config?.providers ?? {}
  const nameOf = id => {
    const hit = catalog.providers.find(provider => provider.id === id)
    return hit !== undefined ? hit.name : id
  }
  const presetLabel = preset => preset === 'deepseek' ? t('presetDeepseek') : preset === 'opencode' ? t('presetOpencode') : t('presetCustom')

  /** 写回整份 providers（客户端提交完整结构，服务端按替换语义持久化）。 */
  const write = async (providers, okNote) => {
    setBusy(true)
    setNotice(null)
    try {
      await api.updateConfig({ providers })
      setNotice({ kind: 'ok', text: okNote })
      setEditing(null)
    } catch (error) {
      setNotice({ kind: 'err', text: t('saveFailed', { message: error?.message ?? String(error) }) })
    } finally {
      setBusy(false)
    }
  }

  const save = draft => {
    const providers = { ...configured }
    const { provider, ...body } = draft
    providers[provider] = body
    void write(providers, t('savedNote'))
  }
  const remove = id => {
    const providers = { ...configured }
    delete providers[id]
    void write(providers, t('removeNote'))
  }

  const configuredIds = Object.keys(configured)
  const addOptions = catalog.providers
    .filter(provider => configured[provider.id] === undefined)
    .map(provider => ({ value: provider.id, label: nameOf(provider.id) }))
  const autoIds = catalog.providers
    .filter(provider => configured[provider.id] === undefined && autoPresetOf(provider.id) !== undefined)
    .map(provider => provider.id)

  const card = id => {
    const provider = configured[id]
    return el('li', { key: id, className: 'dou-card' },
      el('div', { className: 'dou-card-head' },
        el('span', { className: 'dou-card-name', title: id }, nameOf(id)),
        el('span', { className: 'dou-tag' }, presetLabel(provider.preset)),
        el('span', { className: 'dou-tag' }, provider.enabled === false ? t('statusDisabled') : t('statusEnabled')),
        el('div', { className: 'dou-card-actions' },
          el('button', { type: 'button', className: 'dou-btn ghost small', onClick: () => setEditing({ id }) }, t('edit')),
          el('button', { type: 'button', className: 'dou-btn ghost danger small', disabled: busy, onClick: () => remove(id) }, t('remove')))),
      el('p', { className: 'dou-card-meta' }, t('refreshMeta', { n: provider.refreshMinutes ?? 15 })))
  }

  const renderedEditing = editing !== null
    ? el('div', { className: 'dou-add-block' },
      el('p', { className: 'dou-editor-title' }, editing.id !== undefined ? t('editTitle') : t('addTitle')),
      el(ProviderForm, {
        initial: editing.id !== undefined ? { ...configured[editing.id], provider: editing.id } : undefined,
        options: editing.id !== undefined
          ? [{ value: editing.id, label: nameOf(editing.id) }]
          : (addOptions.length > 0 ? addOptions : undefined),
        onSave: save,
        onCancel: () => setEditing(null),
        t,
        busy,
      }))
    : null

  return el('div', { className: 'dou-section' },
    el('div', { className: 'dou-subsection' },
      el('h3', { className: 'dou-h' }, t('settingsTitle')),
      el('p', { className: 'dou-intro' }, t('settingsIntro')),
      el('p', { className: 'dou-note' }, t('autoHint'))),
    notice !== null && el('p', { className: 'dou-notice ' + (notice.kind === 'err' ? 'err' : 'ok') }, notice.text),
    el('div', { className: 'dou-subsection' },
      el('div', { className: 'dou-toolbar' },
        el('span', { className: 'dou-field-caption' }, el('label', null, t('configuredList'))),
        el('button', {
          type: 'button', className: 'dou-btn small', disabled: busy,
          onClick: () => setEditing({ id: undefined }),
        }, t('addProvider'))),
      configuredIds.length === 0
        ? el('p', { className: 'dou-note' }, t('emptyList'))
        : el('ul', { className: 'dou-list' }, configuredIds.map(card))),
    autoIds.length > 0 && el('div', { className: 'dou-subsection' },
      el('ul', { className: 'dou-list' }, autoIds.map(id => el('li', { key: id, className: 'dou-card' },
        el('div', { className: 'dou-card-head' },
          el('span', { className: 'dou-card-name', title: id }, nameOf(id)),
          el('span', { className: 'dou-tag' }, presetLabel(autoPresetOf(id))),
          el('span', { className: 'dou-tag' }, t('autoTag'))))))),
    renderedEditing)
}

module.exports = { UsageSettingsSection }
