import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

test('apply provides the usageQuota service and flushes the config on dispose', async () => {
  const home = mkdtempSync(join(tmpdir(), 'dou-home-'))
  const previous = process.env.DSH_HOME
  process.env.DSH_HOME = home
  try {
    const { apply, name } = await import('../lib/index.js')
    assert.equal(name, 'opencode-usage')
    const provided = []
    const disposers = []
    const ctx = {
      get: () => undefined,
      provide: (key, value) => { provided.push({ key, value }) },
      effect: fn => { disposers.push(fn()); return () => {} },
    }
    apply(ctx)
    assert.equal(provided.length, 1)
    assert.equal(provided[0].key, 'usageQuota')

    const service = provided[0].value
    assert.deepEqual(Object.keys(service.typertRemote), ['service', 'serviceKey', 'namespace'])
    assert.equal(service.typertRemote.namespace, 'usageQuota')
    for (const method of ['getProviderUsage', 'refreshProvider', 'getConfig', 'updateConfig', 'listProviders']) {
      assert.equal(typeof service[method], 'function', method)
    }

    for (const dispose of disposers) dispose()
    const written = JSON.parse(readFileSync(join(home, 'storages', 'dsh-opencode-usage', 'config.json'), 'utf8'))
    assert.equal(written.config.version, 1)
    assert.deepEqual(written.config.providers, {})
  } finally {
    if (previous === undefined) delete process.env.DSH_HOME
    else process.env.DSH_HOME = previous
  }
})
