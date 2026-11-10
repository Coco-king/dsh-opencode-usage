/**
 * dsh-opencode-usage 宿主插件入口。
 *
 * 单一 Loader 行（见 cordis.patch.yml）挂载本模块，职责：
 *  1. 打开配置（$DSH_HOME/storages/dsh-opencode-usage/config.json）；
 *  2. 提供 `usageQuota` 服务（手写 typertRemote 绑定，配合 ./typert 清单走 Typert
 *     网关）：按提供方查询 OpenCode Go 套餐额度 / DeepSeek 官方余额 / 自定义 HTTP 用量，
 *     并读写提供方绑定配置。
 *
 * 具体实现：./queries.js（三类查询）、./service.js（缓存与服务）、./store.js（配置与校验）、
 * ./messages.js（宿主端文案）、./provider-alias.js（modlens 变体归一化）。
 */

import { UsageStore } from './store.js'
import { createUsageService } from './service.js'

export const name = 'opencode-usage'

/**
 * 挂载配置与服务。
 * @param ctx - 宿主插件上下文。
 */
export function apply(ctx) {
  const store = UsageStore.open()
  // 卸载/退出前最终落盘。
  ctx.effect(() => () => store.close(), 'dsh-opencode-usage: config flush')
  // RPC 服务：客户端经 remote.usageQuota.* 调用（./typert 清单由 typert-loader 注册）。
  ctx.provide('usageQuota', createUsageService(ctx, store))
}
