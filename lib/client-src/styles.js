/**
 * 客户端样式：全部经 --dsw-* 主题变量，跟随全局亮/暗主题。
 * 两段：用量图标/悬浮面板沿用 dsh 会话输入区的紧凑尺寸；设置页对齐 DSH
 * 设置→模型/通用设置 的设计语言（14/22 正文、12/18 说明、16/500 标题、
 * 胶囊按钮、border-l2 卡片、bg-module-platform 编辑面）。
 */

const CSS = [
  '/* dsh-opencode-usage: usage icon, floating panel, settings section */',

  // ── 图标按钮 ─────────────────────────────────────────────────────────
  '.dou-icon-btn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;flex:none}',
  '.dou-icon-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}',
  '.dou-icon-btn:disabled{opacity:.5;cursor:default}',
  '.dou-icon-btn-open{background:var(--dsw-alias-interactive-bg-hover)}',
  '.dou-icon-btn.danger{width:22px;height:22px;font-size:15px;line-height:1}',
  '.dou-icon-btn.danger:hover{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover-danger)}',
  '.dou-icon-btn .dou-spin{animation:dou-spin 1s linear infinite}',
  '@keyframes dou-spin{to{transform:rotate(360deg)}}',

  // ── 悬浮面板 ─────────────────────────────────────────────────────────
  '.dou-dock{position:relative;display:inline-flex;align-items:center}',
  '.dou-panel{position:absolute;right:0;bottom:calc(100% + 8px);z-index:60;width:320px;max-width:calc(100vw - 32px);box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2-darkmode-thin);border-radius:12px;background:var(--dsw-specific-input-major);box-shadow:var(--dsw-shadow-lv2);padding:12px;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary)}',
  '.dou-panel-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}',
  '.dou-panel-title{flex:1;min-width:0;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  '.dou-preset{flex:none;font-size:12px;font-weight:500;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-radius:6px;padding:0 6px;height:18px;line-height:18px}',
  '.dou-items{display:flex;flex-direction:column;gap:10px}',
  '.dou-row{display:flex;align-items:center;gap:8px;font-size:13px}',
  '.dou-label{flex:none;width:auto;min-width:40px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  '.dou-bar{flex:1;height:6px;border-radius:3px;background:var(--dsw-alias-interactive-bg-hover);overflow:hidden}',
  '.dou-fill{height:100%;border-radius:3px;background:var(--dsw-alias-brand-primary)}',
  '.dou-fill-warn{background:var(--dsw-alias-state-warn-primary)}',
  '.dou-fill-over{background:var(--dsw-alias-state-error-primary)}',
  '.dou-num{flex:none;min-width:52px;text-align:right;font-weight:600;font-variant-numeric:tabular-nums}',
  '.dou-reset{font-size:12px;color:var(--dsw-alias-label-tertiary);padding-left:48px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  '.dou-msg{font-size:13px;line-height:20px;border-radius:8px;padding:8px 10px;margin-bottom:8px}',
  '.dou-msg.err{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover-danger)}',
  '.dou-msg.off,.dou-empty{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover);border-radius:8px;padding:8px 10px;font-size:13px}',
  '.dou-panel-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:10px;font-size:12px;color:var(--dsw-alias-label-tertiary);border-top:1px solid var(--dsw-alias-border-l1);padding-top:8px}',

  // ── 设置页骨架 ───────────────────────────────────────────────────────
  '.dou-section{max-width:720px;display:flex;flex-direction:column;gap:20px;color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px}',
  '.dou-subsection{display:flex;flex-direction:column;gap:12px;min-width:0}',
  '.dou-h{margin:0;font-size:16px;line-height:24px;font-weight:500;color:var(--dsw-alias-label-primary)}',
  '.dou-intro{margin:0;font-size:14px;line-height:22px;color:var(--dsw-alias-label-tertiary)}',
  '.dou-note{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}',
  '.dou-custom-intro{color:var(--dsw-alias-label-secondary)}',
  '.dou-notice{margin:0;font-size:12px;line-height:18px}',
  '.dou-notice.err{color:var(--dsw-alias-state-error-primary)}',
  '.dou-notice.ok{color:var(--dsw-alias-state-success-primary)}',
  '.dou-toolbar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}',

  // ── 提供方列表 ────────────────────────────────────────────────────────
  '.dou-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}',
  '.dou-card{border:1px solid var(--dsw-alias-border-l2);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:6px;background:transparent}',
  '.dou-card-head{display:flex;align-items:center;gap:8px}',
  '.dou-card-name{flex:1;min-width:0;font-size:14px;line-height:22px;font-weight:500;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  '.dou-tag{flex:none;padding:1px 6px;border:1px solid var(--dsw-alias-border-l3);border-radius:4px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary)}',
  '.dou-card-meta{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);overflow-wrap:anywhere}',
  '.dou-card-actions{display:inline-flex;align-items:center;gap:4px;margin-left:auto;flex:none}',
  '.dou-add-block{display:flex;flex-direction:column;gap:12px}',

  // ── 表单 ─────────────────────────────────────────────────────────────
  '.dou-editor{border-radius:12px;background:var(--dsw-alias-bg-module-platform);padding:14px 16px;display:flex;flex-direction:column;gap:14px}',
  '.dou-editor-title{font-size:14px;line-height:22px;font-weight:500;color:var(--dsw-alias-label-primary);margin:0}',
  '.dou-field{display:flex;flex-direction:column;gap:6px;min-width:0}',
  '.dou-field>label,.dou-field-caption>label{font-size:12px;line-height:18px;font-weight:500;color:var(--dsw-alias-label-secondary)}',
  '.dou-field-caption{display:inline-flex;align-items:center;gap:4px;min-width:0}',
  '.dou-hint{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1;cursor:help;flex:none;user-select:none}',
  '.dou-hint:hover{color:var(--dsw-alias-label-secondary);border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover)}',
  // 输入框取宿主设置页同款：不透明 layer-1 底 + 0.5px l4 边框。透明底会让原生下拉弹层
  // 退回白底，而文字色是主题近白，暗色主题下整张下拉菜单读不出来。
  '.dou-input{box-sizing:border-box;width:100%;height:32px;padding:0 10px;border:0.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px;font-family:inherit}',
  '.dou-input:focus{outline:none;border-color:var(--dsw-alias-state-business-primary)}',
  '.dou-input:disabled{opacity:.6;cursor:default}',
  // 下拉：去掉 OS 箭头（暗色主题下与底色同色），换固定灰 chevron；弹层选项显式给底色与文字色。
  "select.dou-input{appearance:none;max-width:240px;padding-right:32px;cursor:pointer;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 12px center;background-size:12px 12px}",
  '.dou-input option{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}',
  '.dou-grid2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}',
  '.dou-switch{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--dsw-alias-label-primary);cursor:pointer}',
  '.dou-switch input{position:absolute;opacity:0;width:0;height:0}',
  '.dou-switch-ui{position:relative;width:32px;height:18px;border-radius:999px;background:var(--dsw-alias-interactive-bg-hover);transition:background .15s}',
  '.dou-switch-ui::after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:var(--dsw-alias-label-tertiary);transition:transform .15s}',
  '.dou-switch input:checked+.dou-switch-ui{background:var(--dsw-alias-button-primary-fill)}',
  '.dou-switch input:checked+.dou-switch-ui::after{transform:translateX(14px);background:var(--dsw-alias-label-primary-foreground)}',
  // 主按钮取宿主的 button-primary-fill / label-primary-foreground 成对 token：
  // 亮色主题填充近黑、文字近白，暗色主题填充近白、文字近黑（不能用固定 #fff）。
  '.dou-btn{display:inline-flex;align-items:center;justify-content:center;gap:4px;height:32px;padding:0 14px;border:none;border-radius:16px;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);font-size:13px;line-height:20px;font-weight:500;font-family:inherit;cursor:pointer}',
  '.dou-btn:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}',
  '.dou-btn:disabled{opacity:.4;cursor:default}',
  '.dou-btn.ghost{background:transparent;color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2)}',
  '.dou-btn.ghost:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}',
  '.dou-btn.danger{color:var(--dsw-alias-state-error-primary)}',
  '.dou-btn.danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}',
  '.dou-btn.small{height:28px;padding:0 10px;border-radius:14px;font-size:12px;line-height:18px}',
  '.dou-btn:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}',
  '.dou-row-actions{display:flex;align-items:center;gap:8px}',
  '.dou-row-actions.end{justify-content:flex-end}',
  '.dou-header-list{display:flex;flex-direction:column;gap:6px}',
  '.dou-header-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr) auto;gap:6px;align-items:center}',
  '.dou-item-list{display:flex;flex-direction:column;gap:10px}',
  '.dou-item{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:10px}',
  '.dou-item-head{display:flex;align-items:center;gap:8px}',
  '.dou-item-title{flex:1;font-size:12px;line-height:18px;font-weight:500;color:var(--dsw-alias-label-secondary)}',
  '.dou-custom-explain{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}',
  '.dou-custom-explain summary{cursor:pointer}',
]

/**
 * 注入本插件的样式（幂等：按 data 标记去重）。
 * @returns 清理函数。
 */
function injectStyles() {
  const MARK = 'data-dsh-opencode-usage'
  if (typeof document === 'undefined') return () => {}
  if (document.querySelector('style[' + MARK + ']') !== null) return () => {}
  const style = document.createElement('style')
  style.setAttribute(MARK, '')
  style.textContent = CSS.join('\n')
  document.head.appendChild(style)
  return () => { style.remove() }
}

module.exports = { injectStyles }
