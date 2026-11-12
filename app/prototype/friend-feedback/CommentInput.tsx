"use client";

import { useEffect, useState, type ReactNode } from "react";
import { readDraft, writeDraft, type DraftField } from "./draftStore";

/**
 * 입력한 글을 탭에 임시 보관해서, 다음 화면·제출 완료 화면에서도 이어지게 해요.
 * 보관된 글이 있으면 그걸, 없으면 데이터 케이스의 기본 글(defaultValue)을 써요.
 */
function useDraftText(field: DraftField, defaultValue?: string) {
  const [text, setText] = useState(defaultValue ?? "");
  useEffect(() => {
    const saved = readDraft()[field];
    // 화면이 열린 뒤에만 탭 저장소를 읽을 수 있어서 effect에서 맞춰요
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved !== undefined) setText(saved);
    else if (defaultValue) writeDraft({ [field]: defaultValue });
  }, [field, defaultValue]);
  const update = (value: string) => {
    setText(value);
    writeDraft({ [field]: value });
  };
  return [text, update] as const;
}

/** 디자이너 결정(2026-11-12): 코멘트·자유 조언은 100자 이내 */
export const COMMENT_MAX = 100;

/**
 * 100자를 넘기면 보이는 경고 (문구·빨간색은 Figma에 없어서 임시로 정함 — 2026-11-12 디자이너 요청)
 * 빨간색은 키트 예시 토큰 danger(#f04452) — Figma에 경고 색이 생기면 바꿔요.
 */
const OVER_MESSAGE = `${COMMENT_MAX}자 이내로 적어 주세요`;

function OverWarning() {
  return (
    <p role="alert" className="text-2xs tracking-tight text-danger">
      {OVER_MESSAGE}
    </p>
  );
}

/**
 * 구간 + 한 줄 코멘트 줄. children 자리에 구간 드롭다운이 들어가요.
 * 오른쪽에 "0/100" 글자 수, 100자를 넘으면 숫자·테두리가 빨갛게 되고 아래에 경고 문구.
 */
export function CommentRow({
  children,
  field,
  defaultValue,
}: {
  children: ReactNode;
  field: DraftField;
  defaultValue?: string;
}) {
  const [text, setText] = useDraftText(field, defaultValue);
  const length = text.length;
  const over = length > COMMENT_MAX;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-2">
        {children}
        <label
          className={`flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg bg-surface-subtle px-3 ${over ? "ring-1 ring-danger" : ""}`}
        >
          <input
            placeholder="한 줄 코멘트를 남겨 주세요"
            value={text}
            aria-invalid={over}
            onChange={(e) => setText(e.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-xs font-medium tracking-tight outline-none placeholder:text-fg-subtle"
          />
          <span className={`shrink-0 text-2xs tracking-tight ${over ? "text-danger" : "text-fg-muted"}`}>
            {length}/{COMMENT_MAX}
          </span>
        </label>
      </div>
      {over && <OverWarning />}
    </div>
  );
}

/** 자유 조언 입력칸. 100자를 넘으면 테두리가 빨갛게 되고 아래에 경고 문구. */
export function AdviceInput({ defaultValue }: { defaultValue?: string }) {
  const [text, setText] = useDraftText("advice", defaultValue);
  const over = text.length > COMMENT_MAX;
  return (
    <div className="flex flex-col gap-2">
      <textarea
        placeholder="응원이나 조언을 자유롭게 적어 주세요"
        value={text}
        aria-invalid={over}
        onChange={(e) => setText(e.target.value)}
        className={`h-27 w-full resize-none rounded-lg bg-surface-subtle p-3 text-xs font-medium tracking-tight outline-none placeholder:text-fg-subtle ${over ? "ring-1 ring-danger" : ""}`}
      />
      {over && <OverWarning />}
    </div>
  );
}
