"use client";

import { useSyncExternalStore } from "react";
import { readDraft, type Draft } from "./draftStore";

/*
 * 제출 완료 화면의 "내가 남긴 코멘트" — Figma: AI TEST › 제출 완료 › MyNotes (2974:518)
 * 흰 카드·연회색 테두리·모서리 12, 패딩 12/16, 제목 14 SemiBold + 구간 파란 태그(제목 바로 옆), 글 12 Regular.
 * 비워 둔 칸은 회색 "남기지 않았어요".
 */
const noop = () => () => {};

/** fallback: 이 탭에서 입력한 게 없을 때 보여 줄 데이터 케이스의 예시 (예: ?data=filled) */
export function MyNotes({ fallback }: { fallback?: Draft }) {
  // 탭 저장소는 화면이 열린 뒤에만 읽을 수 있어요
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  if (!isClient) return null;
  const stored = readDraft();
  const draft = Object.keys(stored).length > 0 ? stored : (fallback ?? {});

  // gap: 제목 ↔ 글 간격. Figma(2974:522·530)는 8, 자유 조언(2974:538)만 4
  const notes = [
    { title: "가장 좋았던 장면", section: draft.bestSection, text: draft.bestComment, gap: "gap-2" },
    { title: "가장 아쉬웠던 장면", section: draft.worstSection, text: draft.worstComment, gap: "gap-2" },
    { title: "자유 조언", text: draft.advice, gap: "gap-1" },
  ];

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold tracking-tight">내가 남긴 코멘트</h2>
      <ul className="flex flex-col gap-3">
        {notes.map((n) => (
          <li key={n.title} className={`flex flex-col ${n.gap} rounded-lg border border-border bg-surface px-3 py-4 tracking-tight`}>
            {/* 제목 + 구간 태그를 나란히 (태그는 제목 바로 옆 4px) */}
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{n.title}</span>
              {n.section && (
                <span className="shrink-0 rounded-lg bg-accent-subtle px-3 py-1 text-xs font-medium whitespace-nowrap text-accent">
                  {n.section}
                </span>
              )}
            </div>
            <p className={`text-xs break-words whitespace-pre-wrap ${n.text ? "text-fg" : "text-fg-subtle"}`}>
              {n.text || "남기지 않았어요"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
