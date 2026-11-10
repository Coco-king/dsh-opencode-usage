# Changelog / 变更日志

## [0.1.0] - 2026-11-10

### 中文 (Chinese)

- **新增（Added）**：会话输入区右侧的用量图标，点开浮层面板查看当前会话所用提供方的额度；设置页「用量」一节可绑定、编辑、移除提供方，界面随宿主语言在中英文之间切换
- **新增（Added）**：三类提供方——DeepSeek 官方余额、OpenCode Go 套餐（5 小时、本周、本月三档百分比与重置时间）、任意 JSON 用量接口（按条目配置取值路径、上限与重置时间字段，缺失路径的条目自动跳过）
- **新增（Added）**：OpenCode Go 的密钥按「设置→用量 → DSH 凭据 → 环境变量 → 本机 opencode 授权文件」的顺序解析；DeepSeek 官方余额的密钥只发往 `api.deepseek.com`

### English

- **Added**: A usage icon beside the session input opens a floating panel with the current provider's quota; the Usage section in Settings binds, edits and removes providers, and the UI follows the host language between Chinese and English
- **Added**: Three provider kinds — DeepSeek official balance, OpenCode Go (5-hour, weekly and monthly percentages with reset times), and any JSON usage endpoint (per-entry dot paths, maximums and reset-time fields; entries whose path is missing in the response are skipped)
- **Added**: The OpenCode Go key is resolved from Settings, then DSH credentials, then environment variables, then the local opencode auth file; the official balance key is only sent to `api.deepseek.com`
