window.__ModuleLoader__.load({ id: "@codecrab/dsh-opencode-usage", factory: (require) => {
var module = { exports: {} };
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/client-src/styles.js
var require_styles = __commonJS({
  "lib/client-src/styles.js"(exports2, module2) {
    var CSS = [
      "/* dsh-opencode-usage: usage icon, floating panel, settings section */",
      // ── 图标按钮 ─────────────────────────────────────────────────────────
      ".dou-icon-btn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;flex:none}",
      ".dou-icon-btn:hover{background:var(--dsw-alias-interactive-bg-hover)}",
      ".dou-icon-btn:disabled{opacity:.5;cursor:default}",
      ".dou-icon-btn-open{background:var(--dsw-alias-interactive-bg-hover)}",
      ".dou-icon-btn.danger{width:22px;height:22px;font-size:15px;line-height:1}",
      ".dou-icon-btn.danger:hover{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover-danger)}",
      ".dou-icon-btn .dou-spin{animation:dou-spin 1s linear infinite}",
      "@keyframes dou-spin{to{transform:rotate(360deg)}}",
      // ── 悬浮面板 ─────────────────────────────────────────────────────────
      ".dou-dock{position:relative;display:inline-flex;align-items:center}",
      ".dou-panel{position:absolute;right:0;bottom:calc(100% + 8px);z-index:60;width:320px;max-width:calc(100vw - 32px);box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2-darkmode-thin);border-radius:12px;background:var(--dsw-specific-input-major);box-shadow:var(--dsw-shadow-lv2);padding:12px;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary)}",
      ".dou-panel-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}",
      ".dou-panel-title{flex:1;min-width:0;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".dou-preset{flex:none;font-size:12px;font-weight:500;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border-radius:6px;padding:0 6px;height:18px;line-height:18px}",
      ".dou-items{display:flex;flex-direction:column;gap:10px}",
      ".dou-row{display:flex;align-items:center;gap:8px;font-size:13px}",
      ".dou-label{flex:none;width:auto;min-width:40px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".dou-bar{flex:1;height:6px;border-radius:3px;background:var(--dsw-alias-interactive-bg-hover);overflow:hidden}",
      ".dou-fill{height:100%;border-radius:3px;background:var(--dsw-alias-brand-primary)}",
      ".dou-fill-warn{background:var(--dsw-alias-state-warn-primary)}",
      ".dou-fill-over{background:var(--dsw-alias-state-error-primary)}",
      ".dou-num{flex:none;min-width:52px;text-align:right;font-weight:600;font-variant-numeric:tabular-nums}",
      ".dou-reset{font-size:12px;color:var(--dsw-alias-label-tertiary);padding-left:48px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".dou-msg{font-size:13px;line-height:20px;border-radius:8px;padding:8px 10px;margin-bottom:8px}",
      ".dou-msg.err{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover-danger)}",
      ".dou-msg.off,.dou-empty{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover);border-radius:8px;padding:8px 10px;font-size:13px}",
      ".dou-panel-foot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:10px;font-size:12px;color:var(--dsw-alias-label-tertiary);border-top:1px solid var(--dsw-alias-border-l1);padding-top:8px}",
      // ── 设置页骨架 ───────────────────────────────────────────────────────
      ".dou-section{max-width:720px;display:flex;flex-direction:column;gap:20px;color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px}",
      ".dou-subsection{display:flex;flex-direction:column;gap:12px;min-width:0}",
      ".dou-h{margin:0;font-size:16px;line-height:24px;font-weight:500;color:var(--dsw-alias-label-primary)}",
      ".dou-intro{margin:0;font-size:14px;line-height:22px;color:var(--dsw-alias-label-tertiary)}",
      ".dou-note{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}",
      ".dou-custom-intro{color:var(--dsw-alias-label-secondary)}",
      ".dou-notice{margin:0;font-size:12px;line-height:18px}",
      ".dou-notice.err{color:var(--dsw-alias-state-error-primary)}",
      ".dou-notice.ok{color:var(--dsw-alias-state-success-primary)}",
      ".dou-toolbar{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}",
      // ── 提供方列表 ────────────────────────────────────────────────────────
      ".dou-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}",
      ".dou-card{border:1px solid var(--dsw-alias-border-l2);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:6px;background:transparent}",
      ".dou-card-head{display:flex;align-items:center;gap:8px}",
      ".dou-card-name{flex:1;min-width:0;font-size:14px;line-height:22px;font-weight:500;color:var(--dsw-alias-label-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".dou-tag{flex:none;padding:1px 6px;border:1px solid var(--dsw-alias-border-l3);border-radius:4px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary)}",
      ".dou-card-meta{margin:0;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);overflow-wrap:anywhere}",
      ".dou-card-actions{display:inline-flex;align-items:center;gap:4px;margin-left:auto;flex:none}",
      ".dou-add-block{display:flex;flex-direction:column;gap:12px}",
      // ── 表单 ─────────────────────────────────────────────────────────────
      ".dou-editor{border-radius:12px;background:var(--dsw-alias-bg-module-platform);padding:14px 16px;display:flex;flex-direction:column;gap:14px}",
      ".dou-editor-title{font-size:14px;line-height:22px;font-weight:500;color:var(--dsw-alias-label-primary);margin:0}",
      ".dou-field{display:flex;flex-direction:column;gap:6px;min-width:0}",
      ".dou-field>label,.dou-field-caption>label{font-size:12px;line-height:18px;font-weight:500;color:var(--dsw-alias-label-secondary)}",
      ".dou-field-caption{display:inline-flex;align-items:center;gap:4px;min-width:0}",
      ".dou-hint{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);font-size:10px;line-height:1;cursor:help;flex:none;user-select:none}",
      ".dou-hint:hover{color:var(--dsw-alias-label-secondary);border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover)}",
      // 输入框取宿主设置页同款：不透明 layer-1 底 + 0.5px l4 边框。透明底会让原生下拉弹层
      // 退回白底，而文字色是主题近白，暗色主题下整张下拉菜单读不出来。
      ".dou-input{box-sizing:border-box;width:100%;height:32px;padding:0 10px;border:0.5px solid var(--dsw-alias-border-l4);border-radius:var(--dsw-radius-md);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:14px;line-height:22px;font-family:inherit}",
      ".dou-input:focus{outline:none;border-color:var(--dsw-alias-state-business-primary)}",
      ".dou-input:disabled{opacity:.6;cursor:default}",
      // 下拉：去掉 OS 箭头（暗色主题下与底色同色），换固定灰 chevron；弹层选项显式给底色与文字色。
      `select.dou-input{appearance:none;max-width:240px;padding-right:32px;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2381858C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;background-size:12px 12px}`,
      ".dou-input option{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}",
      ".dou-grid2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}",
      ".dou-switch{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--dsw-alias-label-primary);cursor:pointer}",
      ".dou-switch input{position:absolute;opacity:0;width:0;height:0}",
      ".dou-switch-ui{position:relative;width:32px;height:18px;border-radius:999px;background:var(--dsw-alias-interactive-bg-hover);transition:background .15s}",
      '.dou-switch-ui::after{content:"";position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:var(--dsw-alias-label-tertiary);transition:transform .15s}',
      ".dou-switch input:checked+.dou-switch-ui{background:var(--dsw-alias-button-primary-fill)}",
      ".dou-switch input:checked+.dou-switch-ui::after{transform:translateX(14px);background:var(--dsw-alias-label-primary-foreground)}",
      // 主按钮取宿主的 button-primary-fill / label-primary-foreground 成对 token：
      // 亮色主题填充近黑、文字近白，暗色主题填充近白、文字近黑（不能用固定 #fff）。
      ".dou-btn{display:inline-flex;align-items:center;justify-content:center;gap:4px;height:32px;padding:0 14px;border:none;border-radius:16px;background:var(--dsw-alias-button-primary-fill);color:var(--dsw-alias-label-primary-foreground);font-size:13px;line-height:20px;font-weight:500;font-family:inherit;cursor:pointer}",
      ".dou-btn:hover:not(:disabled){background:var(--dsw-alias-button-primary-hover)}",
      ".dou-btn:disabled{opacity:.4;cursor:default}",
      ".dou-btn.ghost{background:transparent;color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l2)}",
      ".dou-btn.ghost:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}",
      ".dou-btn.danger{color:var(--dsw-alias-state-error-primary)}",
      ".dou-btn.danger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-danger)}",
      ".dou-btn.small{height:28px;padding:0 10px;border-radius:14px;font-size:12px;line-height:18px}",
      ".dou-btn:focus-visible{outline:none;box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}",
      ".dou-row-actions{display:flex;align-items:center;gap:8px}",
      ".dou-row-actions.end{justify-content:flex-end}",
      ".dou-header-list{display:flex;flex-direction:column;gap:6px}",
      ".dou-header-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr) auto;gap:6px;align-items:center}",
      ".dou-item-list{display:flex;flex-direction:column;gap:10px}",
      ".dou-item{border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:10px 12px;display:flex;flex-direction:column;gap:10px}",
      ".dou-item-head{display:flex;align-items:center;gap:8px}",
      ".dou-item-title{flex:1;font-size:12px;line-height:18px;font-weight:500;color:var(--dsw-alias-label-secondary)}",
      ".dou-custom-explain{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}",
      ".dou-custom-explain summary{cursor:pointer}"
    ];
    function injectStyles2() {
      const MARK = "data-dsh-opencode-usage";
      if (typeof document === "undefined") return () => {
      };
      if (document.querySelector("style[" + MARK + "]") !== null) return () => {
      };
      const style = document.createElement("style");
      style.setAttribute(MARK, "");
      style.textContent = CSS.join("\n");
      document.head.appendChild(style);
      return () => {
        style.remove();
      };
    }
    module2.exports = { injectStyles: injectStyles2 };
  }
});

// lib/client-src/i18n.js
var require_i18n = __commonJS({
  "lib/client-src/i18n.js"(exports2, module2) {
    var MESSAGES2 = {
      zh: {
        // ── 用量面板 ──────────────────────────────────────────────────────────
        panelTitle: "\u7528\u91CF\u67E5\u8BE2",
        refresh: "\u5237\u65B0",
        resetsAt: "\u91CD\u7F6E\u65F6\u95F4\uFF1A{time}",
        updatedAt: "\u66F4\u65B0\u4E8E {time}",
        maxLine: "{label}\uFF1A{value} / {max}",
        loading: "\u52A0\u8F7D\u4E2D\u2026",
        noUsageItems: "\u7528\u91CF\u63A5\u53E3\u6CA1\u6709\u8FD4\u56DE\u53EF\u5C55\u793A\u7684\u6761\u76EE",
        notConfiguredHint: "\u8BE5\u63D0\u4F9B\u65B9\u5C1A\u672A\u914D\u7F6E\u7528\u91CF\u67E5\u8BE2\uFF0C\u53EF\u5728 \u8BBE\u7F6E\u2192\u7528\u91CF \u4E2D\u7ED1\u5B9A",
        unknownProvider: "\u5F53\u524D\u4F1A\u8BDD",
        presetDeepseek: "DeepSeek \u4F59\u989D",
        presetOpencode: "OpenCode Go",
        presetCustom: "\u81EA\u5B9A\u4E49\u63A5\u53E3",
        // ── 设置页 ────────────────────────────────────────────────────────────
        sectionLabel: "\u7528\u91CF",
        settingsTitle: "\u63D0\u4F9B\u65B9\u7528\u91CF\u67E5\u8BE2",
        settingsIntro: "\u4E3A\u6A21\u578B\u63D0\u4F9B\u65B9\u7ED1\u5B9A\u7528\u91CF\u67E5\u8BE2\uFF1AOpenCode Go \u5957\u9910\u3001DeepSeek \u5B98\u65B9\u4F59\u989D\uFF0C\u6216\u81EA\u5B9A\u4E49 HTTP \u7528\u91CF\u63A5\u53E3\u3002DeepSeek \u5B98\u65B9\u4E0E OpenCode \u6309\u63D0\u4F9B\u65B9 id \u81EA\u52A8\u8BC6\u522B\uFF0C\u65E0\u9700\u914D\u7F6E\u3002",
        autoHint: "\u672A\u7ED1\u5B9A\u7684\u63D0\u4F9B\u65B9\u6309 id \u81EA\u52A8\u8BC6\u522B\uFF1Adeepseek-official \u67E5\u5B98\u65B9\u4F59\u989D\uFF0Cid \u542B opencode \u7684\u6309 Go \u5957\u9910\u67E5\u8BE2\u3002",
        addProvider: "\u6DFB\u52A0\u63D0\u4F9B\u65B9",
        addTitle: "\u7ED1\u5B9A\u7528\u91CF\u67E5\u8BE2",
        editTitle: "\u7F16\u8F91\u7528\u91CF\u67E5\u8BE2",
        noProviderOption: "\u6CA1\u6709\u66F4\u591A\u53EF\u6DFB\u52A0\u7684\u63D0\u4F9B\u65B9",
        configuredList: "\u5DF2\u7ED1\u5B9A",
        emptyList: "\u8FD8\u6CA1\u6709\u7ED1\u5B9A\u4EFB\u4F55\u63D0\u4F9B\u65B9\u3002",
        presetColumn: "\u67E5\u8BE2\u65B9\u5F0F",
        refreshColumn: "\u5237\u65B0\u95F4\u9694",
        statusEnabled: "\u5DF2\u542F\u7528",
        statusDisabled: "\u5DF2\u505C\u7528",
        edit: "\u7F16\u8F91",
        remove: "\u79FB\u9664",
        removeNote: "\u5DF2\u79FB\u9664\u8BE5\u63D0\u4F9B\u65B9\u7684\u7528\u91CF\u7ED1\u5B9A",
        savedNote: "\u5DF2\u4FDD\u5B58\u8BE5\u63D0\u4F9B\u65B9\u7684\u7528\u91CF\u7ED1\u5B9A",
        saveFailed: "\u4FDD\u5B58\u5931\u8D25\uFF1A{message}",
        refreshMeta: "\u5237\u65B0\u95F4\u9694\uFF1A{n} \u5206\u949F",
        autoTag: "\u81EA\u52A8\u8BC6\u522B",
        // ── 绑定表单 ──────────────────────────────────────────────────────────
        providerId: "\u63D0\u4F9B\u65B9",
        providerIdPlaceholder: "\u9009\u62E9\u63D0\u4F9B\u65B9",
        refreshMinutes: "\u5237\u65B0\u95F4\u9694\uFF08\u5206\u949F\uFF09",
        preset: "\u67E5\u8BE2\u65B9\u5F0F",
        presetOptDeepseek: "DeepSeek \u5B98\u65B9\u4F59\u989D",
        presetOptOpencode: "OpenCode Go \u5957\u9910",
        presetOptCustom: "\u81EA\u5B9A\u4E49 HTTP \u63A5\u53E3",
        enabled: "\u542F\u7528\u7528\u91CF\u67E5\u8BE2",
        deepseekHint: "\u590D\u7528 \u8BBE\u7F6E\u2192\u6A21\u578B \u4E2D DeepSeek \u7684 API Key \u67E5\u8BE2\u5B98\u65B9\u4F59\u989D\uFF0CKey \u53EA\u53D1\u5F80 api.deepseek.com\u3002",
        opencodeHint: "Key \u89E3\u6790\u987A\u5E8F\uFF1A\u6B64\u5904\u586B\u5199 \u2192 DSH \u51ED\u636E\u5E93\uFF08OPENCODE_GO_API_KEY\uFF09\u2192 \u73AF\u5883\u53D8\u91CF \u2192 opencode auth.json\u3002\u7559\u7A7A\u5373\u81EA\u52A8\u53D1\u73B0\u3002",
        apiKey: "API Key\uFF08\u53EF\u7559\u7A7A\uFF09",
        apiKeyPlaceholder: "\u7559\u7A7A\u81EA\u52A8\u53D1\u73B0",
        customIntro: "\u81EA\u5B9A\u4E49\u63A5\u53E3\u9700\u53EF\u533F\u540D\u6216\u901A\u8FC7\u8BF7\u6C42\u5934\u9274\u6743\u8BBF\u95EE\uFF0C\u8FD4\u56DE JSON\uFF1B\u6BCF\u4E2A\u6761\u76EE\u6309 JSON \u70B9\u8DEF\u5F84\u53D6\u503C\u3002",
        customUrl: "\u63A5\u53E3\u5730\u5740",
        customUrlHint: "\u5B8C\u6574\u7684 GET \u5730\u5740\uFF0C\u4F8B\u5982 https://example.com/api/usage",
        customHeaders: "\u8BF7\u6C42\u5934",
        headerKey: "\u5934\u540D",
        headerValue: "\u5934\u503C",
        addHeader: "\u6DFB\u52A0\u8BF7\u6C42\u5934",
        customHeadersNote: "\u503C\u91CC\u53EF\u7528 {apiKey} \u5360\u4F4D\uFF0C\u586B\u5165\u4E0A\u9762\u7684 API Key\u3002",
        customItems: "\u5C55\u793A\u6761\u76EE",
        itemField: "\u6761\u76EE",
        itemKey: "\u952E\u540D",
        itemLabel: "\u663E\u793A\u540D",
        itemKind: "\u7C7B\u578B",
        itemPath: "\u53D6\u503C\u8DEF\u5F84",
        itemMaxPath: "\u4E0A\u9650\uFF08\u6570\u503C\u6216\u8DEF\u5F84\uFF09",
        itemResetsAt: "\u91CD\u7F6E\u65F6\u95F4\u8DEF\u5F84",
        addItem: "\u6DFB\u52A0\u6761\u76EE",
        kindPercent: "\u767E\u5206\u6BD4",
        kindNumber: "\u6570\u503C",
        kindMoney: "\u91D1\u989D",
        kindText: "\u6587\u672C",
        itemKeyHint: "\u540C\u4E00\u6761\u76EE\u5217\u8868\u91CC\u7684\u552F\u4E00\u952E\uFF0C\u4F8B\u5982 rolling\u3002",
        itemLabelHint: "\u9762\u677F\u4E0A\u663E\u793A\u7684\u7A97\u53E3\u540D\u79F0\uFF0C\u4F8B\u5982 5 \u5C0F\u65F6\u3002",
        itemKindHint: "\u767E\u5206\u6BD4\u753B\u8FDB\u5EA6\u6761\uFF1B\u6570\u503C\u53EF\u914D\u4E0A\u9650\u6362\u7B97\u767E\u5206\u6BD4\uFF1B\u91D1\u989D\u6309\u4E24\u4F4D\u5C0F\u6570\u663E\u793A\u3002",
        itemPathHint: "\u54CD\u5E94 JSON \u7684\u70B9\u8DEF\u5F84\uFF0C\u4F8B\u5982 usage.rolling.percent\u3002",
        itemMaxPathHint: "\u586B\u6570\u5B57\uFF08\u56FA\u5B9A\u4E0A\u9650\uFF09\u6216 JSON \u8DEF\u5F84\uFF08\u4ECE\u54CD\u5E94\u53D6\u4E0A\u9650\uFF09\u3002",
        itemResetsAtHint: "\u54CD\u5E94\u91CC\u91CD\u7F6E\u65F6\u95F4\u7684\u70B9\u8DEF\u5F84\uFF0C\u4F8B\u5982 usage.rolling.resetsAt\u3002",
        exampleRolling: "5 \u5C0F\u65F6",
        exampleWeekly: "\u672C\u5468",
        exampleMonthly: "\u672C\u6708",
        customItemsExplain: "\u6761\u76EE\u7F3A\u5931\u65F6\u8DF3\u8FC7\u800C\u4E0D\u62A5\u9519\uFF1A\u53EF\u4EE5\u53EA\u914D\u672C\u5468\u3001\u672C\u6708\u4E24\u4E2A\u7A97\u53E3\u3002",
        customItemsExplainTitle: "\u53D6\u503C\u8BF4\u660E",
        cancel: "\u53D6\u6D88",
        save: "\u4FDD\u5B58",
        providerRequired: "\u8BF7\u9009\u62E9\u63D0\u4F9B\u65B9",
        urlRequired: "\u81EA\u5B9A\u4E49\u63A5\u53E3\u9700\u8981\u586B\u5199\u5730\u5740"
      },
      en: {
        panelTitle: "Usage",
        refresh: "Refresh",
        resetsAt: "Resets at {time}",
        updatedAt: "Updated {time}",
        maxLine: "{label}: {value} / {max}",
        loading: "Loading\u2026",
        noUsageItems: "The usage endpoint returned no displayable entries",
        notConfiguredHint: "No usage query is configured for this provider; bind one in Settings \u2192 Usage",
        unknownProvider: "This session",
        presetDeepseek: "DeepSeek balance",
        presetOpencode: "OpenCode Go",
        presetCustom: "Custom endpoint",
        sectionLabel: "Usage",
        settingsTitle: "Provider usage queries",
        settingsIntro: "Bind a usage query to a model provider: OpenCode Go quota, DeepSeek official balance, or a custom HTTP endpoint. DeepSeek official and OpenCode providers are detected by id and need no configuration.",
        autoHint: "Unbound providers are detected by id: deepseek-official reads the official balance, and any id containing opencode is read as Go quota.",
        addProvider: "Add provider",
        addTitle: "Bind a usage query",
        editTitle: "Edit usage query",
        noProviderOption: "No more providers to add",
        configuredList: "Bound providers",
        emptyList: "No provider is bound yet.",
        presetColumn: "Query",
        refreshColumn: "Refresh",
        statusEnabled: "Enabled",
        statusDisabled: "Disabled",
        edit: "Edit",
        remove: "Remove",
        removeNote: "Removed the usage binding for this provider",
        savedNote: "Saved the usage binding for this provider",
        saveFailed: "Save failed: {message}",
        refreshMeta: "Refreshes every {n} min",
        autoTag: "Detected",
        providerId: "Provider",
        providerIdPlaceholder: "Choose a provider",
        refreshMinutes: "Refresh interval (minutes)",
        preset: "Query",
        presetOptDeepseek: "DeepSeek official balance",
        presetOptOpencode: "OpenCode Go quota",
        presetOptCustom: "Custom HTTP endpoint",
        enabled: "Enable the usage query",
        deepseekHint: "Reuses the DeepSeek API key from Settings \u2192 Models to read the official balance; the key is only sent to api.deepseek.com.",
        opencodeHint: "Key lookup order: the value here \u2192 DSH credentials (OPENCODE_GO_API_KEY) \u2192 environment variables \u2192 opencode auth.json. Leave it empty to discover automatically.",
        apiKey: "API key (optional)",
        apiKeyPlaceholder: "Empty: discover automatically",
        customIntro: "The custom endpoint must return JSON, reachable anonymously or through request headers; each entry reads a JSON dot path.",
        customUrl: "Endpoint URL",
        customUrlHint: "A full GET URL, for example https://example.com/api/usage",
        customHeaders: "Request headers",
        headerKey: "Header",
        headerValue: "Value",
        addHeader: "Add header",
        customHeadersNote: "Use the {apiKey} placeholder to inject the API key above.",
        customItems: "Displayed entries",
        itemField: "Entry",
        itemKey: "Key",
        itemLabel: "Label",
        itemKind: "Kind",
        itemPath: "Value path",
        itemMaxPath: "Maximum (number or path)",
        itemResetsAt: "Reset time path",
        addItem: "Add entry",
        kindPercent: "Percentage",
        kindNumber: "Number",
        kindMoney: "Money",
        kindText: "Text",
        itemKeyHint: "A unique key within this list, for example rolling.",
        itemLabelHint: "The window name shown in the panel, for example 5 hours.",
        itemKindHint: "Percentage draws a progress bar; a number with a maximum becomes a percentage; money shows two decimals.",
        itemPathHint: "JSON dot path in the response, for example usage.rolling.percent.",
        itemMaxPathHint: "A fixed number, or a JSON path that reads the maximum from the response.",
        itemResetsAtHint: "Dot path of the reset time, for example usage.rolling.resetsAt.",
        exampleRolling: "5 hours",
        exampleWeekly: "This week",
        exampleMonthly: "This month",
        customItemsExplain: "Missing entries are skipped instead of failing, so you may configure only the windows you need.",
        customItemsExplainTitle: "How values are read",
        cancel: "Cancel",
        save: "Save",
        providerRequired: "Choose a provider",
        urlRequired: "A custom endpoint needs a URL"
      }
    };
    function makeT2(locale) {
      const dict = locale === "en" ? MESSAGES2.en : MESSAGES2.zh;
      return (key, vars) => {
        let text = dict[key] ?? MESSAGES2.zh[key] ?? key;
        if (vars) for (const name of Object.keys(vars)) text = text.split("{" + name + "}").join(String(vars[name]));
        return text;
      };
    }
    function resolveLocale2(configLocale) {
      if (configLocale === "zh" || configLocale === "en") return configLocale;
      const nav = typeof navigator === "undefined" ? "" : String(navigator.language ?? "");
      return nav.toLowerCase().startsWith("zh") ? "zh" : "en";
    }
    module2.exports = { MESSAGES: MESSAGES2, makeT: makeT2, resolveLocale: resolveLocale2 };
  }
});

// lib/client-src/codecs.js
var require_codecs = __commonJS({
  "lib/client-src/codecs.js"(exports2, module2) {
    function fail(path, expect) {
      throw new Error("dsh-opencode-usage: \u670D\u52A1\u7AEF\u6570\u636E\u975E\u6CD5 (" + path + ": " + expect + ")");
    }
    function needNum(v, path) {
      if (typeof v !== "number" || !Number.isFinite(v)) fail(path, "number");
      return v;
    }
    function needStr(v, path) {
      if (typeof v !== "string") fail(path, "string");
      return v;
    }
    var KINDS = ["percent", "number", "money", "text"];
    var PRESETS = ["deepseek", "opencode", "custom"];
    function parseUsageItem(v, path) {
      if (v === null || typeof v !== "object" || Array.isArray(v)) fail(path, "object");
      const out = {
        key: needStr(v.key, path + ".key"),
        label: needStr(v.label, path + ".label"),
        kind: KINDS.includes(v.kind) ? v.kind : "number",
        value: needNum(v.value, path + ".value"),
        resetsAt: typeof v.resetsAt === "string" ? v.resetsAt : null
      };
      if (typeof v.max === "number" && Number.isFinite(v.max)) out.max = v.max;
      if (typeof v.percent === "number" && Number.isFinite(v.percent)) out.percent = v.percent;
      return out;
    }
    function usageCodec(v, path) {
      if (v === null || typeof v !== "object" || Array.isArray(v)) fail(path, "object");
      return {
        provider: needStr(v.provider, path + ".provider"),
        preset: PRESETS.includes(v.preset) ? v.preset : "custom",
        status: v.status === "ok" || v.status === "error" || v.status === "off" ? v.status : "off",
        fetchedAt: needNum(v.fetchedAt, path + ".fetchedAt"),
        message: typeof v.message === "string" ? v.message : "",
        items: Array.isArray(v.items) ? v.items.map((item, i) => parseUsageItem(item, path + ".items[" + i + "]")) : []
      };
    }
    function parseCustomItem(v, path) {
      if (v === null || typeof v !== "object" || Array.isArray(v)) fail(path, "object");
      return {
        key: needStr(v.key, path + ".key"),
        label: needStr(v.label, path + ".label"),
        kind: KINDS.includes(v.kind) ? v.kind : "number",
        path: needStr(v.path, path + ".path"),
        maxPath: v.maxPath === null || v.maxPath === void 0 ? null : typeof v.maxPath === "string" || typeof v.maxPath === "number" ? v.maxPath : null,
        resetsAtPath: v.resetsAtPath === null || v.resetsAtPath === void 0 ? null : needStr(v.resetsAtPath, path + ".resetsAtPath")
      };
    }
    function parseProvider(v, path) {
      if (v === null || typeof v !== "object" || Array.isArray(v)) fail(path, "object");
      const out = {
        enabled: v.enabled !== false,
        preset: PRESETS.includes(v.preset) ? v.preset : "custom",
        refreshMinutes: typeof v.refreshMinutes === "number" && Number.isFinite(v.refreshMinutes) ? v.refreshMinutes : 15,
        apiKey: typeof v.apiKey === "string" ? v.apiKey : ""
      };
      if (v.custom !== void 0 && v.custom !== null) {
        if (typeof v.custom !== "object" || Array.isArray(v.custom)) fail(path + ".custom", "object");
        out.custom = {
          url: needStr(v.custom.url, path + ".custom.url"),
          headers: typeof v.custom.headers === "object" && v.custom.headers !== null && !Array.isArray(v.custom.headers) ? v.custom.headers : {},
          items: Array.isArray(v.custom.items) ? v.custom.items.map((it, i) => parseCustomItem(it, path + ".custom.items[" + i + "]")) : []
        };
      }
      return out;
    }
    function configCodec(v, path) {
      if (v === null || typeof v !== "object" || Array.isArray(v)) fail(path, "object");
      const providers = {};
      if (v.providers !== null && typeof v.providers === "object" && !Array.isArray(v.providers)) {
        for (const id of Object.keys(v.providers)) providers[id] = parseProvider(v.providers[id], path + ".providers." + id);
      }
      return {
        version: typeof v.version === "number" ? v.version : 1,
        locale: v.locale === "zh" || v.locale === "en" || v.locale === "auto" ? v.locale : "auto",
        providers
      };
    }
    function providerListCodec(v, path) {
      if (v === null || typeof v !== "object" || Array.isArray(v)) fail(path, "object");
      return {
        providers: Array.isArray(v.providers) ? v.providers.map((p, i) => ({
          id: needStr(p?.id, path + ".providers[" + i + "].id"),
          name: typeof p?.name === "string" && p.name.length > 0 ? p.name : needStr(p?.id, path + ".providers[" + i + "].name")
        })) : []
      };
    }
    function patchCodec(v, path) {
      if (v === null || typeof v !== "object" || Array.isArray(v)) fail(path, "object");
      return v;
    }
    function strictCodec(typeSymbol, parse) {
      return { mode: "strict", typeSymbol, create: () => parse };
    }
    var stringCodec = (v) => {
      if (typeof v !== "string") throw new Error("dsh-opencode-usage: \u671F\u671B\u5B57\u7B26\u4E32");
      return v;
    };
    var PKG = "@codecrab/dsh-opencode-usage";
    var CONTRIBUTION2 = {
      package: PKG,
      descriptors: [
        {
          id: PKG + "#usageQuota/getProviderUsage",
          service: "usageQuota",
          namespace: "usageQuota",
          method: "getProviderUsage",
          invocation: { kind: "direct" },
          parameters: [{ name: "providerId", wire: "providerId", source: "json", codec: strictCodec("string", stringCodec) }],
          result: strictCodec(PKG + "#ProviderUsage", usageCodec)
        },
        {
          id: PKG + "#usageQuota/refreshProvider",
          service: "usageQuota",
          namespace: "usageQuota",
          method: "refreshProvider",
          invocation: { kind: "direct" },
          parameters: [{ name: "providerId", wire: "providerId", source: "json", codec: strictCodec("string", stringCodec) }],
          result: strictCodec(PKG + "#ProviderUsage", usageCodec)
        },
        {
          id: PKG + "#usageQuota/getConfig",
          service: "usageQuota",
          namespace: "usageQuota",
          method: "getConfig",
          invocation: { kind: "direct" },
          parameters: [],
          result: strictCodec(PKG + "#UsageConfig", configCodec)
        },
        {
          id: PKG + "#usageQuota/updateConfig",
          service: "usageQuota",
          namespace: "usageQuota",
          method: "updateConfig",
          invocation: { kind: "direct" },
          parameters: [{ name: "patch", wire: "patch", source: "json", codec: strictCodec(PKG + "#ConfigPatch", patchCodec) }],
          result: strictCodec(PKG + "#UsageConfig", configCodec)
        },
        {
          id: PKG + "#usageQuota/listProviders",
          service: "usageQuota",
          namespace: "usageQuota",
          method: "listProviders",
          invocation: { kind: "direct" },
          parameters: [],
          result: strictCodec(PKG + "#ProviderList", providerListCodec)
        }
      ]
    };
    module2.exports = { CONTRIBUTION: CONTRIBUTION2 };
  }
});

// lib/client-src/panel.js
var require_panel = __commonJS({
  "lib/client-src/panel.js"(exports2, module2) {
    var { createElement: el, Fragment, useState, useEffect, useRef } = require("react");
    var { Tooltip } = require("@deepseek-ai/dsh-client-ui-primitives");
    var { makeT: makeT2, resolveLocale: resolveLocale2 } = require_i18n();
    var BUILTIN_DEEPSEEK = "deepseek-official";
    function GaugeIcon({ size = 16 }) {
      return el(
        "svg",
        { width: size, height: size, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true },
        el("path", { d: "M1.5 10.4A6.5 6.5 0 1 1 14.5 10.4", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" }),
        el("path", { d: "M8 10.4V4.2", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" }),
        el("circle", { cx: "8", cy: "10.4", r: "1.4", fill: "currentColor" })
      );
    }
    function RefreshIcon({ size = 14, spin }) {
      return el(
        "svg",
        { width: size, height: size, className: spin ? "dou-spin" : void 0, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true },
        el("path", {
          d: "M13.5 8A5.5 5.5 0 1 1 8 2.5M8 2.5v3M8 2.5h3",
          stroke: "currentColor",
          strokeWidth: "1.6",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      );
    }
    function formatNumber(value) {
      if (typeof value !== "number" || !Number.isFinite(value)) return "\u2014";
      return Number.isInteger(value) ? String(value) : value.toFixed(2);
    }
    function percentOf(item) {
      if (typeof item.percent === "number" && Number.isFinite(item.percent)) return Math.max(0, Math.min(100, item.percent));
      if (item.kind === "percent") return Math.max(0, Math.min(100, item.value));
      return null;
    }
    function UsageItemRow({ item, t }) {
      const pct = percentOf(item);
      let valueText;
      if (item.kind === "money") valueText = formatNumber(item.value);
      else if (item.kind === "text") valueText = String(item.value ?? "");
      else if (pct !== null) valueText = Math.round(pct) + "%";
      else valueText = formatNumber(item.value);
      const showMax = typeof item.max === "number" && Number.isFinite(item.max) && item.max > 0 && item.kind !== "percent";
      const fillClass = pct !== null ? pct >= 100 ? " dou-fill-over" : pct >= 80 ? " dou-fill-warn" : "" : "";
      const rows = [];
      rows.push(el(
        "div",
        { key: "r", className: "dou-row" },
        el("div", { className: "dou-label", title: item.label }, item.label),
        pct !== null ? el(
          Fragment,
          null,
          el("div", { className: "dou-bar" }, el("div", { className: "dou-fill" + fillClass, style: { width: pct + "%" } })),
          el("div", { className: "dou-num" }, valueText)
        ) : el("div", { className: "dou-num" }, valueText)
      ));
      if (showMax) {
        rows.push(el("div", { key: "max", className: "dou-reset" }, t("maxLine", { label: item.label, value: formatNumber(item.value), max: formatNumber(item.max) })));
      }
      if (item.resetsAt) {
        rows.push(el("div", { key: "reset", className: "dou-reset" }, t("resetsAt", { time: new Date(item.resetsAt).toLocaleString() })));
      }
      return el("div", null, rows);
    }
    function UsagePanel(props) {
      const { providerId, usage, loading, refreshing, error, onRefresh, config, t } = props;
      const configured = config?.providers?.[providerId];
      const isBuiltinDeepseek = providerId === BUILTIN_DEEPSEEK;
      const isBuiltinOpencode = typeof providerId === "string" && /opencode/i.test(providerId);
      const preset = configured?.preset ?? (isBuiltinDeepseek ? "deepseek" : isBuiltinOpencode ? "opencode" : void 0);
      const presetLabel = preset === "deepseek" ? t("presetDeepseek") : preset === "opencode" ? t("presetOpencode") : preset === "custom" ? t("presetCustom") : null;
      let body;
      if (loading) {
        body = el("div", { className: "dou-msg off" }, t("loading"));
      } else if (!configured && !isBuiltinDeepseek && !isBuiltinOpencode) {
        body = el("div", { className: "dou-empty" }, t("notConfiguredHint"));
      } else if (error) {
        body = el("div", { className: "dou-msg err" }, error);
      } else if (usage !== null && (usage.status === "error" || usage.status === "off" && usage.message.length > 0)) {
        body = el("div", { className: "dou-msg " + (usage.status === "error" ? "err" : "off") }, usage.message);
      } else if (usage !== null && usage.items.length === 0) {
        body = el("div", { className: "dou-empty" }, t("noUsageItems"));
      } else {
        body = usage === null ? el("div", { className: "dou-msg off" }, t("loading")) : el("div", { className: "dou-items" }, usage.items.map((item) => el(UsageItemRow, { key: item.key, item, t })));
      }
      return el(
        "div",
        { className: "dou-panel", role: "dialog" },
        el(
          "div",
          { className: "dou-panel-head" },
          el("div", { className: "dou-panel-title", title: providerId || void 0 }, providerId || t("unknownProvider")),
          presetLabel !== null && el("span", { className: "dou-preset" }, presetLabel),
          el("button", { type: "button", className: "dou-icon-btn", "aria-label": t("refresh"), disabled: refreshing || loading, onClick: onRefresh }, RefreshIcon({ size: 14, spin: refreshing }))
        ),
        body,
        usage !== null && usage.fetchedAt > 0 && el(
          "div",
          { className: "dou-panel-foot" },
          el("span", null, t("updatedAt", { time: new Date(usage.fetchedAt).toLocaleTimeString() }))
        )
      );
    }
    function UsageButton2(props) {
      const { sessionId, api, providerOf, useUsage } = props;
      const snap = useUsage ? useUsage((s) => s) : {};
      const config = snap.config;
      const t = makeT2(snap.locale ?? resolveLocale2(config?.locale));
      const [open, setOpen] = useState(false);
      const [usage, setUsage] = useState(null);
      const [loading, setLoading] = useState(false);
      const [refreshing, setRefreshing] = useState(false);
      const [error, setError] = useState(null);
      const wrapRef = useRef(null);
      const close = () => setOpen(false);
      useEffect(() => {
        if (!open) return void 0;
        const onDown = (e) => {
          if (wrapRef.current !== null && !wrapRef.current.contains(e.target)) close();
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
      }, [open]);
      useEffect(() => {
        if (!open) return void 0;
        let cancelled = false;
        setLoading(true);
        const providerId = providerOf(sessionId);
        if (providerId === void 0) {
          setUsage(null);
          setError(null);
          setLoading(false);
          return () => {
            cancelled = true;
          };
        }
        api.getProviderUsage(providerId).then(
          (v) => {
            if (!cancelled) {
              setUsage(v);
              setError(null);
            }
          },
          (err) => {
            if (!cancelled) {
              setUsage(null);
              setError(err?.message ?? String(err));
            }
          }
        ).finally(() => {
          if (!cancelled) setLoading(false);
        });
        return () => {
          cancelled = true;
        };
      }, [open, sessionId, api, providerOf]);
      const doRefresh = () => {
        const providerId = providerOf(sessionId);
        if (providerId === void 0) return;
        setRefreshing(true);
        api.refreshProvider(providerId).then(
          (v) => {
            setUsage(v);
            setError(null);
          },
          (err) => setError(err?.message ?? String(err))
        ).finally(() => setRefreshing(false));
      };
      return el(
        "div",
        { className: "dou-dock", ref: wrapRef },
        el(
          Tooltip,
          { label: t("panelTitle"), side: "top", delayMs: 500 },
          el("button", {
            type: "button",
            className: "dou-icon-btn" + (open ? " dou-icon-btn-open" : ""),
            "aria-label": t("panelTitle"),
            "aria-expanded": open,
            onClick: () => setOpen((v) => !v)
          }, GaugeIcon({ size: 16 }))
        ),
        open && el(UsagePanel, {
          providerId: providerOf(sessionId),
          usage,
          loading,
          refreshing,
          error,
          onRefresh: doRefresh,
          config,
          t
        })
      );
    }
    module2.exports = { UsageButton: UsageButton2 };
  }
});

// lib/client-src/provider-form.js
var require_provider_form = __commonJS({
  "lib/client-src/provider-form.js"(exports2, module2) {
    var { createElement: el, useState } = require("react");
    var { Tooltip } = require("@deepseek-ai/dsh-client-ui-primitives");
    function FieldHint({ text }) {
      return el(
        Tooltip,
        { label: text, side: "top", delayMs: 400 },
        el("span", { className: "dou-hint", role: "img", "aria-label": text, tabIndex: 0 }, "?")
      );
    }
    function derivePreset(id) {
      const s = String(id ?? "").trim().toLowerCase();
      if (s === "deepseek-official" || s === "deepseek") return "deepseek";
      if (s.includes("opencode")) return "opencode";
      return "custom";
    }
    function ProviderForm(props) {
      const { initial, options, onSave, onCancel, t, busy } = props;
      const [provider, setProvider] = useState(initial?.provider ?? "");
      const [enabled, setEnabled] = useState(initial?.enabled !== false);
      const [refreshMinutes, setRefreshMinutes] = useState(String(initial?.refreshMinutes ?? 15));
      const [apiKey, setApiKey] = useState(initial?.apiKey ?? "");
      const [url, setUrl] = useState(initial?.custom?.url ?? "");
      const [headerPairs, setHeaderPairs] = useState(() => {
        const headers = initial?.custom?.headers ?? {};
        const entries = Object.keys(headers).map((key) => ({ key, value: String(headers[key] ?? "") }));
        return entries.length > 0 ? entries : [{ key: "", value: "" }];
      });
      const [items, setItems] = useState(
        initial?.custom?.items && initial.custom.items.length > 0 ? initial.custom.items.map((it) => ({ ...it, maxPath: it.maxPath ?? "", resetsAtPath: it.resetsAtPath ?? "" })) : [{ key: "", label: "", kind: "percent", path: "", maxPath: "", resetsAtPath: "" }]
      );
      const [preset, setPreset] = useState(initial?.preset ?? derivePreset(provider));
      const updateItem = (index, field2, value) => setItems((list) => list.map((it, i) => i === index ? { ...it, [field2]: value } : it));
      const updateHeader = (index, field2, value) => setHeaderPairs((list) => list.map((pair, i) => i === index ? { ...pair, [field2]: value } : pair));
      const GO_EXAMPLES = [
        { key: "rolling", labelKey: "exampleRolling" },
        { key: "weekly", labelKey: "exampleWeekly" },
        { key: "monthly", labelKey: "exampleMonthly" }
      ];
      const goExample = (index) => GO_EXAMPLES[index] ?? GO_EXAMPLES[GO_EXAMPLES.length - 1];
      const tItem = (field2) => t("item" + field2[0].toUpperCase() + field2.slice(1));
      const submit = () => {
        const headers = {};
        for (const pair of headerPairs) {
          const key = String(pair?.key ?? "").trim();
          if (key.length > 0) headers[key] = String(pair?.value ?? "");
        }
        const cleanItems = items.filter((it) => typeof it.path === "string" && it.path.trim().length > 0).map((it) => ({
          key: (it.key || it.path).trim(),
          label: (it.label || it.key || it.path).trim(),
          kind: ["percent", "number", "money", "text"].includes(it.kind) ? it.kind : "number",
          path: it.path.trim(),
          maxPath: typeof it.maxPath === "string" && it.maxPath.trim().length > 0 ? it.maxPath.trim() : typeof it.maxPath === "number" ? it.maxPath : null,
          resetsAtPath: typeof it.resetsAtPath === "string" && it.resetsAtPath.trim().length > 0 ? it.resetsAtPath.trim() : null
        }));
        onSave({
          provider: provider.trim(),
          preset,
          enabled,
          refreshMinutes: Math.max(1, Math.min(1440, Number(refreshMinutes) || 15)),
          apiKey: apiKey.trim(),
          ...preset === "custom" ? { custom: { url: url.trim(), headers, items: cleanItems } } : {}
        });
      };
      const field = (label, control, hint) => el(
        "div",
        { className: "dou-field" },
        el(
          "span",
          { className: "dou-field-caption" },
          el("label", null, label),
          hint !== void 0 ? el(FieldHint, { text: hint }) : null
        ),
        control
      );
      const providerOptions = options ?? [];
      const disabled = busy === true || provider.trim().length === 0 || preset === "custom" && url.trim().length === 0;
      return el(
        "div",
        { className: "dou-editor" },
        el(
          "div",
          { className: "dou-grid2" },
          field(t("providerId"), providerOptions.length > 0 ? el(
            "select",
            {
              className: "dou-input",
              value: provider,
              disabled: initial !== void 0,
              onChange: (e) => {
                setProvider(e.target.value);
                if (initial === void 0) setPreset(derivePreset(e.target.value));
              }
            },
            el("option", { value: "", disabled: true }, t("providerIdPlaceholder")),
            providerOptions.map((o) => el("option", { key: o.value, value: o.value }, o.label))
          ) : el("input", {
            className: "dou-input",
            type: "text",
            value: provider,
            placeholder: t("providerIdPlaceholder"),
            onChange: (e) => {
              setProvider(e.target.value);
              if (initial === void 0) setPreset(derivePreset(e.target.value));
            }
          })),
          field(t("refreshMinutes"), el("input", {
            className: "dou-input",
            type: "number",
            min: "1",
            max: "1440",
            value: refreshMinutes,
            onChange: (e) => setRefreshMinutes(e.target.value)
          }))
        ),
        field(t("preset"), el(
          "select",
          { className: "dou-input", value: preset, onChange: (e) => setPreset(e.target.value) },
          el("option", { value: "deepseek" }, t("presetOptDeepseek")),
          el("option", { value: "opencode" }, t("presetOptOpencode")),
          el("option", { value: "custom" }, t("presetOptCustom"))
        )),
        el(
          "label",
          { className: "dou-switch", style: { width: "fit-content" } },
          el("input", { type: "checkbox", checked: enabled, onChange: (e) => setEnabled(e.target.checked) }),
          el("span", { className: "dou-switch-ui" }),
          t("enabled")
        ),
        preset === "deepseek" && el("p", { className: "dou-note" }, t("deepseekHint")),
        preset === "opencode" && el(
          "div",
          { className: "dou-field" },
          field(t("apiKey"), el("input", {
            className: "dou-input",
            type: "password",
            value: apiKey,
            placeholder: t("apiKeyPlaceholder"),
            onChange: (e) => setApiKey(e.target.value)
          })),
          el("p", { className: "dou-note" }, t("opencodeHint"))
        ),
        preset === "custom" && el(
          "div",
          { className: "dou-field" },
          el("p", { className: "dou-note dou-custom-intro" }, t("customIntro")),
          field(t("customUrl"), el("input", { className: "dou-input", type: "text", value: url, onChange: (e) => setUrl(e.target.value) }), t("customUrlHint")),
          field(t("customHeaders"), el(
            "div",
            { className: "dou-header-list" },
            headerPairs.map((pair, i) => el(
              "div",
              { key: i, className: "dou-header-row" },
              el("input", { className: "dou-input", "aria-label": t("headerKey"), placeholder: "Authorization", value: pair.key, onChange: (e) => updateHeader(i, "key", e.target.value) }),
              el("input", { className: "dou-input", "aria-label": t("headerValue"), placeholder: "Bearer {apiKey}", value: pair.value, onChange: (e) => updateHeader(i, "value", e.target.value) }),
              el("button", {
                type: "button",
                className: "dou-icon-btn danger",
                "aria-label": t("remove"),
                onClick: () => setHeaderPairs((list) => list.filter((_, j) => j !== i))
              }, "\xD7")
            )),
            el("button", { type: "button", className: "dou-btn ghost small", style: { justifySelf: "start" }, onClick: () => setHeaderPairs((list) => [...list, { key: "", value: "" }]) }, t("addHeader")),
            el("p", { className: "dou-note" }, t("customHeadersNote"))
          ), t("customHeadersHint")),
          el(
            "div",
            { className: "dou-field" },
            el("label", null, t("customItems")),
            el(
              "div",
              { className: "dou-item-list" },
              items.map((it, i) => el(
                "div",
                { key: i, className: "dou-item" },
                el(
                  "div",
                  { className: "dou-item-head" },
                  el("span", { className: "dou-item-title" }, t("itemField") + " " + String(i + 1)),
                  el("button", {
                    type: "button",
                    className: "dou-icon-btn danger",
                    "aria-label": t("remove"),
                    onClick: () => setItems((list) => list.filter((_, j) => j !== i))
                  }, "\xD7")
                ),
                el(
                  "div",
                  { className: "dou-grid2" },
                  field(tItem("key"), el("input", { className: "dou-input", type: "text", placeholder: goExample(i).key, value: it.key, onChange: (e) => updateItem(i, "key", e.target.value) }), t("itemKeyHint")),
                  field(tItem("label"), el("input", { className: "dou-input", type: "text", placeholder: t(goExample(i).labelKey), value: it.label, onChange: (e) => updateItem(i, "label", e.target.value) }), t("itemLabelHint"))
                ),
                el(
                  "div",
                  { className: "dou-grid2" },
                  field(tItem("kind"), el(
                    "select",
                    { className: "dou-input", value: it.kind, onChange: (e) => updateItem(i, "kind", e.target.value) },
                    el("option", { value: "percent" }, t("kindPercent")),
                    el("option", { value: "number" }, t("kindNumber")),
                    el("option", { value: "money" }, t("kindMoney")),
                    el("option", { value: "text" }, t("kindText"))
                  ), t("itemKindHint")),
                  field(tItem("path"), el("input", { className: "dou-input", type: "text", placeholder: "usage." + goExample(i).key + ".percent", value: it.path, onChange: (e) => updateItem(i, "path", e.target.value) }), t("itemPathHint"))
                ),
                el(
                  "div",
                  { className: "dou-grid2" },
                  field(tItem("maxPath"), el("input", { className: "dou-input", type: "text", placeholder: "1000000", value: String(it.maxPath ?? ""), onChange: (e) => updateItem(i, "maxPath", e.target.value) }), t("itemMaxPathHint")),
                  field(tItem("resetsAt"), el("input", { className: "dou-input", type: "text", placeholder: "usage." + goExample(i).key + ".resetsAt", value: String(it.resetsAtPath ?? ""), onChange: (e) => updateItem(i, "resetsAtPath", e.target.value) }), t("itemResetsAtHint"))
                )
              ))
            ),
            el("button", { type: "button", className: "dou-btn ghost small", style: { alignSelf: "flex-start" }, onClick: () => setItems((list) => [...list, { key: "", label: "", kind: "percent", path: "", maxPath: "", resetsAtPath: "" }]) }, t("addItem"))
          ),
          el(
            "details",
            { className: "dou-custom-explain" },
            el("summary", null, t("customItemsExplainTitle")),
            el("p", { className: "dou-note" }, t("customItemsExplain"))
          )
        ),
        el(
          "div",
          { className: "dou-row-actions end" },
          el("button", { type: "button", className: "dou-btn ghost", onClick: onCancel }, t("cancel")),
          el("button", { type: "button", className: "dou-btn", onClick: submit, disabled }, t("save"))
        )
      );
    }
    module2.exports = { ProviderForm };
  }
});

// lib/client-src/settings.js
var require_settings = __commonJS({
  "lib/client-src/settings.js"(exports2, module2) {
    var { createElement: el, useState, useEffect } = require("react");
    var { ProviderForm } = require_provider_form();
    var { makeT: makeT2, resolveLocale: resolveLocale2 } = require_i18n();
    var BUILTIN_DEEPSEEK = "deepseek-official";
    function autoPresetOf(id) {
      if (id === BUILTIN_DEEPSEEK) return "deepseek";
      if (typeof id === "string" && /opencode/i.test(id)) return "opencode";
      return void 0;
    }
    function UsageSettingsSection2(props) {
      const { api, useUsage } = props;
      const snap = useUsage ? useUsage((s) => s) : {};
      const config = snap.config;
      const t = makeT2(snap.locale ?? resolveLocale2(config?.locale));
      const [catalog, setCatalog] = useState({ providers: [] });
      const [editing, setEditing] = useState(null);
      const [notice, setNotice] = useState(null);
      const [busy, setBusy] = useState(false);
      useEffect(() => {
        let cancelled = false;
        api.listProviders().then(
          (list) => {
            if (!cancelled) setCatalog(list);
          },
          () => {
            if (!cancelled) setCatalog({ providers: [] });
          }
        );
        return () => {
          cancelled = true;
        };
      }, [api]);
      const configured = config?.providers ?? {};
      const nameOf = (id) => {
        const hit = catalog.providers.find((provider) => provider.id === id);
        return hit !== void 0 ? hit.name : id;
      };
      const presetLabel = (preset) => preset === "deepseek" ? t("presetDeepseek") : preset === "opencode" ? t("presetOpencode") : t("presetCustom");
      const write = async (providers, okNote) => {
        setBusy(true);
        setNotice(null);
        try {
          await api.updateConfig({ providers });
          setNotice({ kind: "ok", text: okNote });
          setEditing(null);
        } catch (error) {
          setNotice({ kind: "err", text: t("saveFailed", { message: error?.message ?? String(error) }) });
        } finally {
          setBusy(false);
        }
      };
      const save = (draft) => {
        const providers = { ...configured };
        const { provider, ...body } = draft;
        providers[provider] = body;
        void write(providers, t("savedNote"));
      };
      const remove = (id) => {
        const providers = { ...configured };
        delete providers[id];
        void write(providers, t("removeNote"));
      };
      const configuredIds = Object.keys(configured);
      const addOptions = catalog.providers.filter((provider) => configured[provider.id] === void 0).map((provider) => ({ value: provider.id, label: nameOf(provider.id) }));
      const autoIds = catalog.providers.filter((provider) => configured[provider.id] === void 0 && autoPresetOf(provider.id) !== void 0).map((provider) => provider.id);
      const card = (id) => {
        const provider = configured[id];
        return el(
          "li",
          { key: id, className: "dou-card" },
          el(
            "div",
            { className: "dou-card-head" },
            el("span", { className: "dou-card-name", title: id }, nameOf(id)),
            el("span", { className: "dou-tag" }, presetLabel(provider.preset)),
            el("span", { className: "dou-tag" }, provider.enabled === false ? t("statusDisabled") : t("statusEnabled")),
            el(
              "div",
              { className: "dou-card-actions" },
              el("button", { type: "button", className: "dou-btn ghost small", onClick: () => setEditing({ id }) }, t("edit")),
              el("button", { type: "button", className: "dou-btn ghost danger small", disabled: busy, onClick: () => remove(id) }, t("remove"))
            )
          ),
          el("p", { className: "dou-card-meta" }, t("refreshMeta", { n: provider.refreshMinutes ?? 15 }))
        );
      };
      const renderedEditing = editing !== null ? el(
        "div",
        { className: "dou-add-block" },
        el("p", { className: "dou-editor-title" }, editing.id !== void 0 ? t("editTitle") : t("addTitle")),
        el(ProviderForm, {
          initial: editing.id !== void 0 ? { ...configured[editing.id], provider: editing.id } : void 0,
          options: editing.id !== void 0 ? [{ value: editing.id, label: nameOf(editing.id) }] : addOptions.length > 0 ? addOptions : void 0,
          onSave: save,
          onCancel: () => setEditing(null),
          t,
          busy
        })
      ) : null;
      return el(
        "div",
        { className: "dou-section" },
        el(
          "div",
          { className: "dou-subsection" },
          el("h3", { className: "dou-h" }, t("settingsTitle")),
          el("p", { className: "dou-intro" }, t("settingsIntro")),
          el("p", { className: "dou-note" }, t("autoHint"))
        ),
        notice !== null && el("p", { className: "dou-notice " + (notice.kind === "err" ? "err" : "ok") }, notice.text),
        el(
          "div",
          { className: "dou-subsection" },
          el(
            "div",
            { className: "dou-toolbar" },
            el("span", { className: "dou-field-caption" }, el("label", null, t("configuredList"))),
            el("button", {
              type: "button",
              className: "dou-btn small",
              disabled: busy,
              onClick: () => setEditing({ id: void 0 })
            }, t("addProvider"))
          ),
          configuredIds.length === 0 ? el("p", { className: "dou-note" }, t("emptyList")) : el("ul", { className: "dou-list" }, configuredIds.map(card))
        ),
        autoIds.length > 0 && el(
          "div",
          { className: "dou-subsection" },
          el("ul", { className: "dou-list" }, autoIds.map((id) => el(
            "li",
            { key: id, className: "dou-card" },
            el(
              "div",
              { className: "dou-card-head" },
              el("span", { className: "dou-card-name", title: id }, nameOf(id)),
              el("span", { className: "dou-tag" }, presetLabel(autoPresetOf(id))),
              el("span", { className: "dou-tag" }, t("autoTag"))
            )
          )))
        ),
        renderedEditing
      );
    }
    module2.exports = { UsageSettingsSection: UsageSettingsSection2 };
  }
});

// lib/provider-alias.js
var provider_alias_exports = {};
__export(provider_alias_exports, {
  baseProviderId: () => baseProviderId
});
function baseProviderId(providerId) {
  if (providerId === "deepseek-modlens") return "deepseek-official";
  if (typeof providerId === "string" && providerId.startsWith("modlens-")) {
    return providerId.slice("modlens-".length);
  }
  return providerId;
}
var init_provider_alias = __esm({
  "lib/provider-alias.js"() {
  }
});

// lib/client-src/main.js
var { injectStyles } = require_styles();
var { MESSAGES, makeT, resolveLocale } = require_i18n();
var { CONTRIBUTION } = require_codecs();
var { UsageButton } = require_panel();
var { UsageSettingsSection } = require_settings();
var { baseProviderId: baseProviderId2 } = (init_provider_alias(), __toCommonJS(provider_alias_exports));
injectStyles();
function makeStore(initial) {
  let snapshot = initial;
  const listeners = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => snapshot,
    subscribe: (fn) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    set: (next) => {
      if (next === snapshot) return;
      snapshot = next;
      for (const fn of [...listeners]) fn();
    }
  };
}
var inject = ["remote"];
var BUILD_TAG = true ? "8f730cc" : "dev";
async function apply(ctx) {
  console.log("[dsh-opencode-usage] client build " + BUILD_TAG);
  const remote = ctx.remote;
  if (remote === void 0 || typeof remote.$mount !== "function") return;
  const unmount = await remote.$mount(CONTRIBUTION);
  ctx.effect(() => () => {
    unmount();
  }, "dsh-opencode-usage: remote contribution");
  const service = ctx.get("remote.usageQuota");
  if (service === void 0) return;
  const store = makeStore({ status: "loading", error: null, config: null, locale: "zh" });
  const hostLocale = ctx.get("locale");
  const hostActive = () => {
    if (hostLocale !== void 0 && typeof hostLocale.getLocale === "function") {
      const active = hostLocale.getLocale()?.active;
      if (active === "zh" || active === "en") return active;
    }
    return void 0;
  };
  const effectiveLocale = () => {
    const host = hostActive();
    if (host !== void 0) return host;
    return resolveLocale(store.getSnapshot().config?.locale);
  };
  const refreshStoreLocale = () => {
    const snap = store.getSnapshot();
    const next = effectiveLocale();
    if (next !== snap.locale) {
      store.set({ ...snap, locale: next });
      return true;
    }
    return false;
  };
  const call = async (method, args) => {
    const result = await service[method](...args ?? []);
    if (result === null || typeof result !== "object" || result.ok !== true) {
      throw new Error(result?.error?.message ?? "usageQuota." + method + " failed");
    }
    return result.value;
  };
  let reloading = false;
  const setReady = (config) => {
    store.set({ status: "ready", error: null, config, locale: effectiveLocale() });
  };
  const reload = async () => {
    if (reloading) return;
    reloading = true;
    const prev = store.getSnapshot();
    try {
      setReady(await call("getConfig"));
    } catch (error) {
      store.set({ status: "error", error: error?.message ?? String(error), config: prev.config, locale: prev.locale });
    } finally {
      reloading = false;
    }
  };
  const syncBackLocale = async () => {
    const snap = store.getSnapshot();
    const host = hostActive();
    if (host !== void 0 && snap.config?.locale !== host) {
      try {
        const config = await call("updateConfig", [{ locale: host }]);
        if (config !== void 0) setReady(config);
      } catch {
      }
    }
  };
  ctx.effect(() => ctx.on("connection/reset", () => {
    void reload();
  }), "dsh-opencode-usage: reconnect reload");
  const pollTimer = setInterval(() => {
    if (!document.hidden) void reload();
  }, 6e4);
  ctx.effect(() => () => {
    clearInterval(pollTimer);
  }, "dsh-opencode-usage: poll timer");
  const onVisible = () => {
    if (document.visibilityState === "visible") void reload();
  };
  document.addEventListener("visibilitychange", onVisible);
  ctx.effect(() => () => {
    document.removeEventListener("visibilitychange", onVisible);
  }, "dsh-opencode-usage: visibility reload");
  const api = {
    reload,
    updateConfig: async (patch) => {
      const config = await call("updateConfig", [patch]);
      setReady(config);
      return config;
    },
    getProviderUsage: async (providerId) => call("getProviderUsage", [providerId]),
    refreshProvider: async (providerId) => call("refreshProvider", [providerId]),
    listProviders: async () => call("listProviders")
  };
  void reload();
  void syncBackLocale();
  const slots = ctx.get("slots");
  if (slots === void 0) return;
  const providerOf = (sessionId) => {
    const dirs = ctx.get("modelDirectories");
    if (dirs === void 0 || typeof dirs.directoryFor !== "function") return void 0;
    try {
      const directory = dirs.directoryFor(sessionId);
      const snapshot = typeof directory?.store?.getSnapshot === "function" ? directory.store.getSnapshot() : void 0;
      const raw = snapshot?.current?.provider;
      const configured = store.getSnapshot().config?.providers?.[raw] !== void 0;
      return configured ? raw : baseProviderId2(raw);
    } catch {
      return void 0;
    }
  };
  slots.inject("conversation.input.right", () => slots.register({
    name: "conversation.input.right",
    id: "dsh-opencode-usage-icon",
    order: 0,
    inject: (sessionId) => ({ sessionId, api, providerOf, hooks: { usage: store } })
  }, UsageButton));
  const sectionActive = { gen: 0, dispose: null };
  const registerSection = (locale) => {
    if (sectionActive.dispose !== null) {
      sectionActive.dispose();
      sectionActive.dispose = null;
    }
    sectionActive.gen += 1;
    const gen = sectionActive.gen;
    slots.inject("settings.section", () => {
      if (sectionActive.gen !== gen) return void 0;
      const dispose = slots.register({
        name: "settings.section",
        id: "dsh-opencode-usage-" + locale,
        order: 32,
        label: MESSAGES[locale].sectionLabel,
        inject: () => ({ api, hooks: { usage: store } })
      }, UsageSettingsSection);
      if (sectionActive.gen !== gen) {
        dispose();
        return void 0;
      }
      sectionActive.dispose = dispose;
      return () => {
        if (sectionActive.dispose === dispose) sectionActive.dispose = null;
        dispose();
      };
    });
  };
  let lastSectionLocale = null;
  const sync = () => {
    const locale = store.getSnapshot().locale;
    if (locale !== lastSectionLocale) {
      registerSection(locale);
      lastSectionLocale = locale;
    }
  };
  sync();
  const stopSync = store.subscribe(sync);
  let stopLocaleWatch = null;
  if (hostLocale !== void 0 && typeof hostLocale.subscribe === "function") {
    stopLocaleWatch = ctx.effect(() => hostLocale.subscribe(() => {
      const changed = refreshStoreLocale();
      if (changed) sync();
      void syncBackLocale();
    }), "dsh-opencode-usage: host locale watch");
  }
  return () => {
    stopSync();
    if (stopLocaleWatch !== null) stopLocaleWatch();
  };
}
module.exports = { apply, inject };

Object.defineProperty(module.exports, Symbol.toStringTag, { value: 'Module' });
return module.exports;
}});
