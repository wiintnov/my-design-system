/* eslint-disable @next/next/no-img-element -- Figma에서 받은 SVG를 원래 크기 그대로 보여 줘요 */
"use client";

import { useEffect, useRef, useState } from "react";
import { readDraft, writeDraft, type DraftField } from "./draftStore";

/*
 * 구간 드롭다운 — 디자인은 Figma "[모달] 선택"(1:1233) 기준.
 * 흰 배경·모서리 12·사이 선 #F4F4F4·그림자는 Figma, 아래는 디자이너 요청(2026-11-12):
 *   버튼과 4px 간격 / 폭은 가장 긴 항목에 맞춤 / 항목 여백 상하좌우 8px / 글자는 "구간"과 같은 12px Medium
 * 항목은 인상 항목(시선 ~ 말투 톤) — 디자이너 요청(2026-11-12). Figma는 장면 목록이라 다름.
 */
export function SectionSelect({ label, options, field }: { label: string; options: string[]; field: DraftField }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();
  const ref = useRef<HTMLDivElement>(null);

  // 앞 화면에서 고른 구간을 이어서 보여 줘요 (탭 임시 보관)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(readDraft()[field]);
  }, [field]);

  // 바깥을 누르거나 Esc를 누르면 닫혀요
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label} 구간`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 min-w-19 items-center gap-2 rounded-lg bg-surface-subtle p-3"
      >
        <span className={`flex-1 text-left text-xs font-medium tracking-tight whitespace-nowrap ${value ? "text-fg" : "text-fg-subtle"}`}>
          {value ?? "구간"}
        </span>
        <img src="/prototype/friend-feedback/chevron-down.svg" alt="" className={open ? "rotate-180" : undefined} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 z-10 mt-1 w-max min-w-full divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-dropdown"
        >
          {options.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button
                type="button"
                onClick={() => {
                  setValue(o);
                  writeDraft({ [field]: o });
                  setOpen(false);
                }}
                className={`w-full p-2 text-left text-xs font-medium tracking-tight whitespace-nowrap active:bg-surface-subtle ${o === value ? "font-semibold text-accent" : "text-fg"}`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
