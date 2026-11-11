"use client";

import { useMemo, useSyncExternalStore } from "react";

type Token = { name: string; value: string };

/*
 * globals.css의 @theme 블록에서 토큰을 "자동으로" 읽어 와요.
 * 그래서 figma-sync로 토큰이 바뀌면 이 화면도 저절로 바뀌어요.
 */
const noop = () => () => {};
/** 브라우저에서만 true (서버에서 그릴 땐 document가 없어요) */
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

function collectTokens(prefix: string): Token[] {
  const found = new Map<string, string>();
  const walk = (rules: CSSRuleList) => {
    for (const rule of Array.from(rules)) {
      if ("cssRules" in rule && (rule as CSSGroupingRule).cssRules) walk((rule as CSSGroupingRule).cssRules);
      if (rule instanceof CSSStyleRule && rule.selectorText.includes(":root")) {
        for (const prop of Array.from(rule.style)) {
          if (prop.startsWith(prefix)) found.set(prop, rule.style.getPropertyValue(prop).trim());
        }
      }
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walk(sheet.cssRules);
    } catch {
      /* 다른 출처 스타일시트는 읽을 수 없어요 */
    }
  }
  return Array.from(found, ([name, value]) => ({ name, value: toFigmaHex(value) }));
}

/** 배포 빌드는 #ffffff를 #fff로 줄여요. Figma와 대조하기 쉽게 #FFFFFF 형태로 되돌려 보여줘요. */
function toFigmaHex(value: string) {
  const short = value.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (short) return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`.toUpperCase();
  return /^#[0-9a-f]{6,8}$/i.test(value) ? value.toUpperCase() : value;
}

export function ColorSwatches() {
  const isClient = useIsClient();
  const tokens = useMemo(
    () => (isClient ? collectTokens("--color-").filter((t) => t.value !== "transparent") : []),
    [isClient],
  );

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {tokens.map((t) => (
        <div key={t.name} className="overflow-hidden rounded-lg border border-border">
          <div className="h-20" style={{ background: `var(${t.name})` }} />
          <div className="flex flex-col gap-1 p-3">
            <code className="text-sm font-semibold">{t.name.replace("--color-", "")}</code>
            <code className="text-xs text-fg-subtle">{t.value}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RadiusSwatches() {
  const isClient = useIsClient();
  const tokens = useMemo(() => (isClient ? collectTokens("--radius-") : []), [isClient]);

  return (
    <div className="flex flex-wrap gap-6">
      {tokens.map((t) => (
        <div key={t.name} className="flex flex-col items-center gap-2">
          <div className="size-20 border-2 border-primary bg-surface-subtle" style={{ borderRadius: `var(${t.name})` }} />
          <code className="text-sm font-semibold">{t.name.replace("--radius-", "")}</code>
          <code className="text-xs text-fg-subtle">{t.value}</code>
        </div>
      ))}
    </div>
  );
}
