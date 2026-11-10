import test from 'node:test'
import assert from 'node:assert/strict'
import { jsonByPath, queryBalance, queryCustom, queryGoQuota, resolveGoKey } from '../lib/queries.js'

/** 只实现 get() 的宿主上下文桩。 */
function ctxStub(services = {}) {
  return { get: name => services[name] }
}

/** 让 fetch 返回给定 JSON/状态，并记录调用。 */
function stubFetch(body, status = 200) {
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init })
    return new Response(typeof body === 'string' ? body : JSON.stringify(body), { status })
  }
  return calls
}

test('queryGoQuota normalizes the three windows', async () => {
  stubFetch({ usage: { rolling: { percent: 12, resetsAt: '2026-01-01T00:00:00Z' }, weekly: { percent: 40 }, monthly: null } })
  const quota = await queryGoQuota(ctxStub(), { apiKey: 'k' }, 'zh')
  assert.equal(quota.rolling.percent, 12)
  assert.equal(quota.rolling.resetsAt, '2026-01-01T00:00:00Z')
  assert.equal(quota.weekly.resetsAt, '')
  assert.equal(quota.monthly, null)
})

test('queryGoQuota marks a 401 as a soft error', async () => {
  stubFetch('', 401)
  await assert.rejects(() => queryGoQuota(ctxStub(), { apiKey: 'k' }, 'zh'), error => error.soft === true)
})

test('queryGoQuota reports a missing key', async () => {
  const previous = { go: process.env.OPENCODE_GO_API_KEY, old: process.env.OPENCODE_API_KEY }
  delete process.env.OPENCODE_GO_API_KEY
  delete process.env.OPENCODE_API_KEY
  try {
    await assert.rejects(() => queryGoQuota(ctxStub(), {}, 'zh'), error => error.soft === true)
  } finally {
    if (previous.go !== undefined) process.env.OPENCODE_GO_API_KEY = previous.go
    if (previous.old !== undefined) process.env.OPENCODE_API_KEY = previous.old
  }
})

test('resolveGoKey prefers the configured key', async () => {
  assert.equal(await resolveGoKey(ctxStub(), { apiKey: ' explicit ' }), 'explicit')
})

test('queryCustom extracts items, skips missing paths and computes percentages', async () => {
  stubFetch({ usage: { weekly: { percent: 25, resetsAt: '2026-01-01T00:00:00Z' } }, balance: { used: 30 } })
  const provider = {
    apiKey: 'secret',
    custom: {
      url: 'https://example.test/usage',
      headers: { authorization: 'Bearer {apiKey}' },
      items: [
        { key: 'weekly', label: '本周', kind: 'percent', path: 'usage.weekly.percent', maxPath: null, resetsAtPath: 'usage.weekly.resetsAt' },
        { key: 'used', label: '已用', kind: 'number', path: 'balance.used', maxPath: 60, resetsAtPath: null },
        { key: 'missing', label: '缺', kind: 'number', path: 'nope', maxPath: null, resetsAtPath: null },
      ],
    },
  }
  const result = await queryCustom(ctxStub(), provider, 'zh')
  assert.equal(result.items.length, 2)
  assert.equal(result.items[0].resetsAt, '2026-01-01T00:00:00Z')
  assert.equal(result.items[1].percent, 50)
})

test('queryCustom substitutes the api key placeholder in headers', async () => {
  const calls = stubFetch({ a: 1 })
  await queryCustom(ctxStub(), {
    apiKey: 'secret',
    custom: { url: 'https://example.test/usage', headers: { authorization: 'Bearer {apiKey}' }, items: [{ key: 'a', label: 'A', kind: 'number', path: 'a', maxPath: null, resetsAtPath: null }] },
  }, 'zh')
  assert.equal(calls[0].init.headers.authorization, 'Bearer secret')
})

test('queryBalance refuses a non-official endpoint', async () => {
  process.env.DEEPSEEK_API_KEY = 'test-key'
  try {
    const ctx = ctxStub({ settings: { get: () => ({ baseURL: 'https://evil.test' }) } })
    await assert.rejects(() => queryBalance(ctx, 'zh'), /api\.deepseek\.com/)
  } finally {
    delete process.env.DEEPSEEK_API_KEY
  }
})

test('queryBalance reads the official balance payload', async () => {
  process.env.DEEPSEEK_API_KEY = 'test-key'
  const calls = stubFetch({ balance_infos: [{ currency: 'USD', total_balance: '12.50', granted_balance: '2', topped_up_balance: '10.5' }] })
  try {
    const ctx = ctxStub({ settings: { get: () => ({ baseURL: 'https://api.deepseek.com/v1' }) } })
    const balance = await queryBalance(ctx, 'zh')
    assert.equal(balance.totalBalance, 12.5)
    assert.equal(balance.toppedUpBalance, 10.5)
    assert.equal(calls[0].url, 'https://api.deepseek.com/user/balance')
  } finally {
    delete process.env.DEEPSEEK_API_KEY
  }
})

test('jsonByPath walks dot paths', () => {
  assert.equal(jsonByPath({ usage: { weekly: { percent: 40 } } }, 'usage.weekly.percent'), 40)
  assert.equal(jsonByPath({}, 'usage.weekly'), undefined)
  assert.equal(jsonByPath({ a: 1 }, ''), undefined)
})
