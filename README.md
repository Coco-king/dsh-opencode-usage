# dsh-opencode-usage

English | [中文](README.zh-CN.md)

Provider usage queries for DeepSeek Harness: an icon beside the model switcher shows the current session provider's quota in a floating panel.

- **OpenCode Go** — 5-hour, weekly, and monthly quota percentages with reset times.
- **DeepSeek official** — account balance via the official `/user/balance` endpoint (the API key is only sent to `api.deepseek.com`).
- **Custom HTTP** — any JSON endpoint, with per-entry JSON dot paths, optional maximums, and reset-time fields.

The plugin only queries and displays usage: it keeps no session ledger, pricing table, or cost statistics.

## Install

```sh
dsh plugin --profile web add <path-to-this-checkout>
```

(or `dsh plugin --profile web add @codecrab/dsh-opencode-usage` once published). Restart the profile afterwards. The bundle declares `engines.dsh: ">=0.2.0 <0.3.0"`.

## Configuration

DeepSeek official and OpenCode providers need no configuration: providers are detected by id (`deepseek-official` → official balance, any id containing `opencode` → Go quota). The OpenCode key is resolved in this order: the value in Settings → Usage → DSH credentials (`OPENCODE_GO_API_KEY`) → the `OPENCODE_GO_API_KEY` / `OPENCODE_API_KEY` environment variables → `~/.local/share/opencode/auth.json`.

Bind, edit, or remove a provider in **Settings → Usage**. A custom endpoint takes a URL, request headers (`{apiKey}` is replaced by the configured key), and display entries:

| Field | Meaning |
| --- | --- |
| `key` | Unique key inside the entry list. |
| `label` | Name shown in the panel. |
| `kind` | `percent` (progress bar), `number`, `money`, or `text`. |
| `path` | JSON dot path of the value, for example `usage.rolling.percent`. |
| `maxPath` | A fixed number or a dot path that reads the maximum; with a maximum the value is shown as a percentage. |
| `resetsAtPath` | Dot path of the reset time. |

Entries whose path is missing in the response are skipped, so one endpoint can serve several providers.

Bindings live in `$DSH_HOME/storages/dsh-opencode-usage/config.json`.

## Develop

```sh
npm install
npm test            # node --test: queries, config, service, client bundle wiring
npm run build:client  # esbuild → lib/client.js (lazy-CJS factory for window.__ModuleLoader__)
```

The host half is plain ESM (`lib/index.js`) exporting `apply(ctx)` and providing the `usageQuota` service. The browser half is `lib/client.js`, built from `lib/client-src/`, registered through `window.__ModuleLoader__.load` and calling the host through a Typert contribution (`lib/typert.host.js`).

## License

MIT
