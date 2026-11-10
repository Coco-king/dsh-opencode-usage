# dsh-opencode-usage

[English](README.md) | 中文

DeepSeek Harness 提供方用量查询：会话输入区右侧的用量图标，点开即可看到当前会话所用提供方的额度。

- **OpenCode Go** —— 5 小时、本周、本月三档额度百分比与重置时间。
- **DeepSeek 官方** —— 官方 `/user/balance` 余额接口，API Key 只发往 `api.deepseek.com`。
- **自定义 HTTP** —— 任意返回 JSON 的接口，按条目配置取值路径、上限与重置时间字段。

本插件只做用量查询与展示：不含会话账本、价格表与费用统计。

## 安装

```sh
dsh plugin --profile web add <本仓库路径>
```

（发布后可用 `dsh plugin --profile web add @codecrab/dsh-opencode-usage`。）装完重启 profile 生效。bundle 声明了 `engines.dsh: ">=0.2.0 <0.3.0"`。

安装时从本机 npm 源解析 `@deepseek-ai/*` 依赖：若该源是尚未同步这些包的镜像，请先切到 `https://registry.npmjs.org/`。

## 配置

DeepSeek 官方与 OpenCode 提供方无需配置：按提供方 id 自动识别（`deepseek-official` → 官方余额，id 含 `opencode` → Go 套餐）。OpenCode 的 Key 解析顺序：设置→用量 中填写的值 → DSH 凭据库（`OPENCODE_GO_API_KEY`）→ 环境变量 `OPENCODE_GO_API_KEY` / `OPENCODE_API_KEY` → `~/.local/share/opencode/auth.json`。

在 **设置→用量** 中绑定、编辑或移除提供方。自定义接口需要填写地址、请求头（`{apiKey}` 会替换为填写好的 Key）与展示条目：

| 字段 | 含义 |
| --- | --- |
| `key` | 条目列表内的唯一键。 |
| `label` | 面板上显示的名称。 |
| `kind` | `percent`（进度条）、`number`、`money`、`text`。 |
| `path` | 取值的 JSON 点路径，例如 `usage.rolling.percent`。 |
| `maxPath` | 固定数字或取上限的点路径；给了上限就按百分比展示。 |
| `resetsAtPath` | 重置时间的点路径。 |

响应里缺失的条目会被跳过而不报错，因此一个接口可以同时服务多个提供方。

绑定配置保存在 `$DSH_HOME/storages/dsh-opencode-usage/config.json`。

## 开发

```sh
npm install
npm test             # node --test：查询、配置、服务、客户端接线
npm run build:client # esbuild → lib/client.js（给 window.__ModuleLoader__ 的惰性 CJS 工厂）
```

宿主半是纯 ESM（`lib/index.js`），导出 `apply(ctx)` 并提供 `usageQuota` 服务；浏览器半是 `lib/client.js`，由 `lib/client-src/` 构建而来，经 `window.__ModuleLoader__.load` 注册，并通过 Typert 贡献清单（`lib/typert.host.js`）调用宿主。

## 许可

MIT
