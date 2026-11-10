import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { applyConfigPatch, defaultConfig, UsageStore } from '../lib/store.js'

/** 一份合法的自定义提供方配置。 */
function customProvider() {
  return {
    enabled: true,
    preset: 'custom',
    refreshMinutes: 15,
    apiKey: '',
    custom: {
      url: 'https://example.test/usage',
      headers: { authorization: 'Bearer {apiKey}' },
      items: [{ key: 'weekly', label: '本周', kind: 'percent', path: 'usage.weekly.percent', maxPath: null, resetsAtPath: null }],
    },
  }
}

test('accepts a valid provider patch and normalizes defaults', () => {
  const { config, errors } = applyConfigPatch(defaultConfig(), { providers: { 'opencode-go': { preset: 'opencode', refreshMinutes: 5 } } })
  assert.deepEqual(errors, [])
  assert.equal(config.providers['opencode-go'].enabled, true)
  assert.equal(config.providers['opencode-go'].apiKey, '')
  assert.equal(config.providers['opencode-go'].refreshMinutes, 5)
})

test('rejects unknown keys and invalid locale', () => {
  const bad = applyConfigPatch(defaultConfig(), { nope: 1 })
  assert.equal(bad.errors.length, 1)
  const locale = applyConfigPatch(defaultConfig(), { locale: 'fr' })
  assert.equal(locale.errors.length, 1)
})

test('rejects an invalid preset and a custom provider without url', () => {
  assert.equal(applyConfigPatch(defaultConfig(), { providers: { a: { preset: 'nope' } } }).errors.length > 0, true)
  assert.equal(applyConfigPatch(defaultConfig(), { providers: { a: { preset: 'custom' } } }).errors.length > 0, true)
  const provider = customProvider()
  provider.custom.url = ''
  assert.equal(applyConfigPatch(defaultConfig(), { providers: { a: provider } }).errors.length > 0, true)
})

test('reports errors in the patch language', () => {
  const zh = applyConfigPatch(defaultConfig(), { locale: 'zh', providers: { a: { preset: 'nope' } } })
  const en = applyConfigPatch(defaultConfig(), { locale: 'en', providers: { a: { preset: 'nope' } } })
  assert.match(zh.errors[0], /必须是/)
  assert.match(en.errors[0], /must be/)
})

test('providers are replaced, not merged', () => {
  const first = applyConfigPatch(defaultConfig(), { providers: { a: customProvider(), b: customProvider() } })
  const second = applyConfigPatch(first.config, { providers: { a: customProvider() } })
  assert.deepEqual(Object.keys(second.config.providers), ['a'])
})

test('UsageStore persists atomically and reloads', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dou-store-'))
  const store = UsageStore.openAt({ root: dir, configPath: join(dir, 'nested', 'config.json') })
  assert.deepEqual(store.config.providers, {})
  const { errors } = store.replace({ providers: { a: customProvider() } })
  assert.deepEqual(errors, [])
  store.close()
  const written = JSON.parse(readFileSync(join(dir, 'nested', 'config.json'), 'utf8'))
  assert.equal(written.config.providers.a.preset, 'custom')
  const reopened = UsageStore.openAt({ root: dir, configPath: join(dir, 'nested', 'config.json') })
  assert.equal(reopened.config.providers.a.custom.url, 'https://example.test/usage')
})

test('UsageStore keeps the previous config when a patch is rejected', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dou-store-bad-'))
  const store = UsageStore.openAt({ root: dir, configPath: join(dir, 'config.json') })
  store.replace({ providers: { a: customProvider() } })
  const { errors } = store.replace({ providers: { a: { preset: 'nope' } } })
  assert.equal(errors.length > 0, true)
  assert.equal(store.config.providers.a.preset, 'custom')
})
