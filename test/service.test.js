import test from 'node:test'
import assert from 'node:assert/strict'
import { createUsageService } from '../lib/service.js'

/** 宿主上下文桩：只有 credentials / settings / llm 按需返回。 */
function ctxStub(services = {}) {
  return { get: name => services[name] }
}

/** 配置存储桩。 */
function storeStub(config) {
  return {
    config,
    replace(patch) {
      if (patch.providers !== undefined) this.config = { ...this.config, providers: patch.providers }
      return { config: this.config, errors: [] }
    },
  }
}

/** 让 fetch 返回给定 JSON，并记录调用次数。 */
function stubFetch(body, status = 200) {
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init })
    return new Response(JSON.stringify(body), { status })
  }
  return calls
}

test('an unknown provider reports the not-configured status', async () => {
  const service = createUsageService(ctxStub(), storeStub({ locale: 'zh', providers: {} }))
  const usage = await service.getProviderUsage('someone-else')
  assert.equal(usage.status, 'off')
  assert.match(usage.message, /尚未配置/)
})

test('a disabled provider reports the disabled status', async () => {
  const service = createUsageService(ctxStub(), storeStub({ locale: 'zh', providers: { p: { enabled: false, preset: 'opencode', refreshMinutes: 15, apiKey: '' } } }))
  const usage = await service.getProviderUsage('p')
  assert.equal(usage.status, 'off')
  assert.match(usage.message, /已停用/)
})

test('an opencode provider is detected by id and queried without configuration', async () => {
  const calls = stubFetch({ usage: { rolling: { percent: 10 }, weekly: { percent: 20 }, monthly: { percent: 30 } } })
  const ctx = ctxStub({ credentials: undefined })
  const service = createUsageService(ctx, storeStub({ locale: 'zh', providers: {} }))
  const usage = await service.getProviderUsage('opencode-go')
  assert.equal(usage.status, 'ok')
  assert.deepEqual(usage.items.map(item => item.key), ['rolling', 'weekly', 'monthly'])
  assert.equal(calls[0].url, 'https://opencode.ai/zen/go/v1/usage')
})

test('the provider usage is cached until refresh', async () => {
  const calls = stubFetch({ usage: { rolling: { percent: 10 } } })
  const service = createUsageService(ctxStub(), storeStub({ locale: 'zh', providers: { p: { enabled: true, preset: 'opencode', refreshMinutes: 15, apiKey: 'k' } } }))
  await service.getProviderUsage('p')
  await service.getProviderUsage('p')
  assert.equal(calls.length, 1)
  await service.refreshProvider('p')
  assert.equal(calls.length, 2)
})

test('a failing query is reported as an error status', async () => {
  stubFetch({}, 500)
  const service = createUsageService(ctxStub(), storeStub({ locale: 'en', providers: { p: { enabled: true, preset: 'opencode', refreshMinutes: 15, apiKey: 'k' } } }))
  const usage = await service.getProviderUsage('p')
  assert.equal(usage.status, 'error')
  assert.match(usage.message, /HTTP 500/)
})

test('getConfig returns the stored config and listProviders reads the llm catalog', async () => {
  const config = { locale: 'zh', providers: {} }
  const ctx = ctxStub({ llm: { listProviders: () => [{ id: 'deepseek-official', name: 'DeepSeek' }, { name: 'no-id' }] } })
  const service = createUsageService(ctx, storeStub(config))
  assert.equal(await service.getConfig(), config)
  assert.deepEqual(await service.listProviders(), { providers: [{ id: 'deepseek-official', name: 'DeepSeek' }] })
})
