# AGENTS.md — dsh-opencode-usage 项目约定

供后续开发（含 AI 代理）遵循。

## 工程约定

- 宿主半是纯 ESM（`lib/*.js`），不引入构建步骤；客户端源码在 `lib/client-src/`（CommonJS，见其中的 `package.json`）。
- 改完 `lib/client-src/` 必须 `npm run build:client` 重建 `lib/client.js`，产物必须保持单个文件、外层包 `window.__ModuleLoader__.load({ id: '@codecrab/dsh-opencode-usage', factory })`。
- 提交前跑 `npm run check` 与 `npm test`，全绿再提交。
- 只做外科手术式改动：不顺手重构无关代码；改动产生的孤儿函数、导入、文案键要清理。

## 文案

- 中文界面描述一律使用中文标点（全角）：逗号 `，`、句号 `。`、冒号 `：`、分号 `；`、括号 `（）`、顿号 `、`。
- 例外：英文单词、程序标识、URL、占位符（如 `{time}`）、JSON 点路径（如 `usage.weekly.percent`）保持原样。
- 中英双语成对维护：宿主文案在 `lib/messages.js`，客户端文案在 `lib/client-src/i18n.js`，插件展示信息在 `locale/{zh,en}.json`。

## 运行时契约（与宿主 DSH 对齐）

- 服务：`ctx.provide('usageQuota', …)`，服务对象带 `typertRemote = { service, serviceKey: 'usageQuota', namespace: 'usageQuota' }`；`./typert` 清单由 typert-loader 自动注册，invocations 的 codec 必须是 `{ mode: 'strict', create() }`。
- 客户端：`ctx.remote.$mount(CONTRIBUTION)` 之后用 `ctx.get('remote.usageQuota')`；两处插槽 `conversation.input.right`（会话作用域 list）与 `settings.section`（root list）。
- 配置：`$DSH_HOME/storages/dsh-opencode-usage/config.json`，结构 `{ config: { version, locale, providers } }`；写盘防抖 + 原子替换。
- 提供方识别：`deepseek-official` → 官方余额；id 含 `opencode` → Go 套餐；其余未绑定 → 未配置。客户端与服务端必须同口径（`lib/provider-alias.js` 共用）。

## 发版

仅当用户明确要求时改版本号、打 tag 或推送。
