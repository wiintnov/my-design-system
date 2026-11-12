/*
 * 지인 피드백 입력값 임시 보관 (프로토타입 흉내 — 서버 저장 아님)
 * 이 브라우저 탭에만 남고, 탭을 닫거나 "처음으로"를 누르면 지워져요.
 */
const KEY = "friend-feedback:draft";

export type DraftField = "bestSection" | "bestComment" | "worstSection" | "worstComment" | "advice";
export type Draft = Partial<Record<DraftField, string>>;

export function readDraft(): Draft {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Draft;
  } catch {
    return {};
  }
}

export function writeDraft(patch: Draft) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ ...readDraft(), ...patch }));
  } catch {
    /* 저장소를 못 쓰는 브라우저면 넘어가요 */
  }
}

export function clearDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* 무시 */
  }
}
