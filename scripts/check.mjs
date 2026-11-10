import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()

// 1. Typert manifest
const { TYPERT } = await import('../lib/typert.host.js')
console.log('typert package:', TYPERT.package)
console.log('invocations:', TYPERT.invocations.map(invocation => invocation.id).join(', '))
for (const invocation of TYPERT.invocations) {
  if (invocation.result.mode !== 'strict' || typeof invocation.result.create !== 'function') throw new Error('bad result codec ' + invocation.id)
  const schema = invocation.result.create()
  if (typeof schema.safeParse !== 'function') throw new Error('codec does not return a zod schema: ' + invocation.id)
}
console.log('typert codecs ok')

// 2. JSON manifests parse
for (const file of ['package.json', 'locale/en.json', 'locale/zh.json']) JSON.parse(readFileSync(join(root, file), 'utf8'))
console.log('json ok')

// 3. Chinese punctuation: no half-width , ; : right after a Chinese character
const files = []
const walk = dir => {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue
    const path = join(dir, name)
    const stat = statSync(path)
    if (stat.isDirectory()) walk(path)
    else if (/\.(js|mjs|json|md)$/.test(name)) files.push(path)
  }
}
walk(root)
let findings = 0
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, index) => {
    if (/[\u4e00-\u9fa5][,;:]/.test(line)) {
      findings++
      console.log(file.replace(root + '\\', '') + ':' + (index + 1) + ': ' + line.trim().slice(0, 140))
    }
  })
}
console.log(findings === 0 ? 'zh punctuation ok' : 'zh punctuation findings: ' + findings)
