/**
 * 提供方用量绑定表单：查询方式（DeepSeek 余额 / OpenCode Go / 自定义 HTTP）、
 * 刷新间隔、启用开关；自定义方式额外编辑地址、请求头与展示条目。
 */

const { createElement: el, useState } = require('react')
const { Tooltip } = require('@deepseek-ai/dsh-client-ui-primitives')

/** 问号图标：悬浮显示字段含义。 */
function FieldHint({ text }) {
  return el(Tooltip, { label: text, side: 'top', delayMs: 400 },
    el('span', { className: 'dou-hint', role: 'img', 'aria-label': text, tabIndex: 0 }, '?'))
}

/** 按提供方 id 推导默认查询方式（与服务端自动识别同口径）。 */
function derivePreset(id) {
  const s = String(id ?? '').trim().toLowerCase()
  if (s === 'deepseek-official' || s === 'deepseek') return 'deepseek'
  if (s.includes('opencode')) return 'opencode'
  return 'custom'
}

/**
 * 绑定表单。
 * @param props.initial - 现有配置（含 provider id）；新增时为 undefined。
 * @param props.options - 提供方可选项 [{ value, label }]；编辑时固定当前项。
 * @param props.onSave - (draft) => Promise 或 void。
 * @param props.onCancel - 取消回调。
 * @param props.t - 取词助手。
 * @param props.busy - 保存中。
 */
function ProviderForm(props) {
  const { initial, options, onSave, onCancel, t, busy } = props
  const [provider, setProvider] = useState(initial?.provider ?? '')
  const [enabled, setEnabled] = useState(initial?.enabled !== false)
  const [refreshMinutes, setRefreshMinutes] = useState(String(initial?.refreshMinutes ?? 15))
  const [apiKey, setApiKey] = useState(initial?.apiKey ?? '')
  const [url, setUrl] = useState(initial?.custom?.url ?? '')
  const [headerPairs, setHeaderPairs] = useState(() => {
    const headers = initial?.custom?.headers ?? {}
    const entries = Object.keys(headers).map(key => ({ key, value: String(headers[key] ?? '') }))
    return entries.length > 0 ? entries : [{ key: '', value: '' }]
  })
  const [items, setItems] = useState(
    initial?.custom?.items && initial.custom.items.length > 0
      ? initial.custom.items.map(it => ({ ...it, maxPath: it.maxPath ?? '', resetsAtPath: it.resetsAtPath ?? '' }))
      : [{ key: '', label: '', kind: 'percent', path: '', maxPath: '', resetsAtPath: '' }],
  )
  const [preset, setPreset] = useState(initial?.preset ?? derivePreset(provider))

  const updateItem = (index, field, value) => setItems(list => list.map((it, i) => (i === index ? { ...it, [field]: value } : it)))
  const updateHeader = (index, field, value) => setHeaderPairs(list => list.map((pair, i) => (i === index ? { ...pair, [field]: value } : pair)))

  // OpenCode Go 额度接口的示例窗口：仅用于输入框引导。
  const GO_EXAMPLES = [
    { key: 'rolling', labelKey: 'exampleRolling' },
    { key: 'weekly', labelKey: 'exampleWeekly' },
    { key: 'monthly', labelKey: 'exampleMonthly' },
  ]
  const goExample = index => GO_EXAMPLES[index] ?? GO_EXAMPLES[GO_EXAMPLES.length - 1]
  const tItem = field => t('item' + field[0].toUpperCase() + field.slice(1))

  const submit = () => {
    const headers = {}
    for (const pair of headerPairs) {
      const key = String(pair?.key ?? '').trim()
      if (key.length > 0) headers[key] = String(pair?.value ?? '')
    }
    const cleanItems = items
      .filter(it => typeof it.path === 'string' && it.path.trim().length > 0)
      .map(it => ({
        key: (it.key || it.path).trim(),
        label: (it.label || it.key || it.path).trim(),
        kind: ['percent', 'number', 'money', 'text'].includes(it.kind) ? it.kind : 'number',
        path: it.path.trim(),
        maxPath: typeof it.maxPath === 'string' && it.maxPath.trim().length > 0 ? it.maxPath.trim() : (typeof it.maxPath === 'number' ? it.maxPath : null),
        resetsAtPath: typeof it.resetsAtPath === 'string' && it.resetsAtPath.trim().length > 0 ? it.resetsAtPath.trim() : null,
      }))
    onSave({
      provider: provider.trim(),
      preset,
      enabled,
      refreshMinutes: Math.max(1, Math.min(1440, Number(refreshMinutes) || 15)),
      apiKey: apiKey.trim(),
      ...(preset === 'custom' ? { custom: { url: url.trim(), headers, items: cleanItems } } : {}),
    })
  }

  const field = (label, control, hint) => el('div', { className: 'dou-field' },
    el('span', { className: 'dou-field-caption' },
      el('label', null, label),
      hint !== undefined ? el(FieldHint, { text: hint }) : null),
    control)

  const providerOptions = options ?? []
  const disabled = busy === true || provider.trim().length === 0 || (preset === 'custom' && url.trim().length === 0)

  return el('div', { className: 'dou-editor' },
    el('div', { className: 'dou-grid2' },
      field(t('providerId'), providerOptions.length > 0
        ? el('select', {
          className: 'dou-input',
          value: provider,
          disabled: initial !== undefined,
          onChange: e => { setProvider(e.target.value); if (initial === undefined) setPreset(derivePreset(e.target.value)) },
        },
        el('option', { value: '', disabled: true }, t('providerIdPlaceholder')),
        providerOptions.map(o => el('option', { key: o.value, value: o.value }, o.label)))
        : el('input', {
          className: 'dou-input', type: 'text', value: provider,
          placeholder: t('providerIdPlaceholder'),
          onChange: e => { setProvider(e.target.value); if (initial === undefined) setPreset(derivePreset(e.target.value)) },
        })),
      field(t('refreshMinutes'), el('input', {
        className: 'dou-input', type: 'number', min: '1', max: '1440',
        value: refreshMinutes,
        onChange: e => setRefreshMinutes(e.target.value),
      }))),
    field(t('preset'), el('select', { className: 'dou-input', value: preset, onChange: e => setPreset(e.target.value) },
      el('option', { value: 'deepseek' }, t('presetOptDeepseek')),
      el('option', { value: 'opencode' }, t('presetOptOpencode')),
      el('option', { value: 'custom' }, t('presetOptCustom')))),
    el('label', { className: 'dou-switch', style: { width: 'fit-content' } },
      el('input', { type: 'checkbox', checked: enabled, onChange: e => setEnabled(e.target.checked) }),
      el('span', { className: 'dou-switch-ui' }), t('enabled')),
    preset === 'deepseek' && el('p', { className: 'dou-note' }, t('deepseekHint')),
    preset === 'opencode' && el('div', { className: 'dou-field' },
      field(t('apiKey'), el('input', {
        className: 'dou-input', type: 'password',
        value: apiKey,
        placeholder: t('apiKeyPlaceholder'),
        onChange: e => setApiKey(e.target.value),
      })),
      el('p', { className: 'dou-note' }, t('opencodeHint'))),
    preset === 'custom' && el('div', { className: 'dou-field' },
      el('p', { className: 'dou-note dou-custom-intro' }, t('customIntro')),
      field(t('customUrl'), el('input', { className: 'dou-input', type: 'text', value: url, onChange: e => setUrl(e.target.value) }), t('customUrlHint')),
      field(t('customHeaders'), el('div', { className: 'dou-header-list' },
        headerPairs.map((pair, i) => el('div', { key: i, className: 'dou-header-row' },
          el('input', { className: 'dou-input', 'aria-label': t('headerKey'), placeholder: 'Authorization', value: pair.key, onChange: e => updateHeader(i, 'key', e.target.value) }),
          el('input', { className: 'dou-input', 'aria-label': t('headerValue'), placeholder: 'Bearer {apiKey}', value: pair.value, onChange: e => updateHeader(i, 'value', e.target.value) }),
          el('button', {
            type: 'button', className: 'dou-icon-btn danger', 'aria-label': t('remove'),
            onClick: () => setHeaderPairs(list => list.filter((_, j) => j !== i)),
          }, '\u00d7'))),
        el('button', { type: 'button', className: 'dou-btn ghost small', style: { justifySelf: 'start' }, onClick: () => setHeaderPairs(list => [...list, { key: '', value: '' }]) }, t('addHeader')),
        el('p', { className: 'dou-note' }, t('customHeadersNote'))), t('customHeadersHint')),
      el('div', { className: 'dou-field' },
        el('label', null, t('customItems')),
        el('div', { className: 'dou-item-list' },
          items.map((it, i) => el('div', { key: i, className: 'dou-item' },
            el('div', { className: 'dou-item-head' },
              el('span', { className: 'dou-item-title' }, t('itemField') + ' ' + String(i + 1)),
              el('button', {
                type: 'button', className: 'dou-icon-btn danger', 'aria-label': t('remove'),
                onClick: () => setItems(list => list.filter((_, j) => j !== i)),
              }, '\u00d7')),
            el('div', { className: 'dou-grid2' },
              field(tItem('key'), el('input', { className: 'dou-input', type: 'text', placeholder: goExample(i).key, value: it.key, onChange: e => updateItem(i, 'key', e.target.value) }), t('itemKeyHint')),
              field(tItem('label'), el('input', { className: 'dou-input', type: 'text', placeholder: t(goExample(i).labelKey), value: it.label, onChange: e => updateItem(i, 'label', e.target.value) }), t('itemLabelHint'))),
            el('div', { className: 'dou-grid2' },
              field(tItem('kind'), el('select', { className: 'dou-input', value: it.kind, onChange: e => updateItem(i, 'kind', e.target.value) },
                el('option', { value: 'percent' }, t('kindPercent')),
                el('option', { value: 'number' }, t('kindNumber')),
                el('option', { value: 'money' }, t('kindMoney')),
                el('option', { value: 'text' }, t('kindText'))), t('itemKindHint')),
              field(tItem('path'), el('input', { className: 'dou-input', type: 'text', placeholder: 'usage.' + goExample(i).key + '.percent', value: it.path, onChange: e => updateItem(i, 'path', e.target.value) }), t('itemPathHint'))),
            el('div', { className: 'dou-grid2' },
              field(tItem('maxPath'), el('input', { className: 'dou-input', type: 'text', placeholder: '1000000', value: String(it.maxPath ?? ''), onChange: e => updateItem(i, 'maxPath', e.target.value) }), t('itemMaxPathHint')),
              field(tItem('resetsAt'), el('input', { className: 'dou-input', type: 'text', placeholder: 'usage.' + goExample(i).key + '.resetsAt', value: String(it.resetsAtPath ?? ''), onChange: e => updateItem(i, 'resetsAtPath', e.target.value) }), t('itemResetsAtHint')))))),
        el('button', { type: 'button', className: 'dou-btn ghost small', style: { alignSelf: 'flex-start' }, onClick: () => setItems(list => [...list, { key: '', label: '', kind: 'percent', path: '', maxPath: '', resetsAtPath: '' }]) }, t('addItem'))),
        el('details', { className: 'dou-custom-explain' },
          el('summary', null, t('customItemsExplainTitle')),
          el('p', { className: 'dou-note' }, t('customItemsExplain')))),
    el('div', { className: 'dou-row-actions end' },
      el('button', { type: 'button', className: 'dou-btn ghost', onClick: onCancel }, t('cancel')),
      el('button', { type: 'button', className: 'dou-btn', onClick: submit, disabled }, t('save'))))
}

module.exports = { ProviderForm }
