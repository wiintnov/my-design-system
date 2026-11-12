import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/13 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/13 (1:2352) — 말투 톤 "생동감있어요" 선택 — 다음(/14)으로 가는 조건 확인 필요
 * 페이지 구조 글자로 만든 화면이에요 (design_context 미확인).
 */
export default function FriendFeedbackImpression13({ searchParams }: PageProps<"/prototype/friend-feedback/12">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="tone"
      selected={{"gaze":"대체로맞춰요","face":"밝아요","posture":"자주 몸흔듦","hands":"가만히못있음","volume":"대체로들려요","tone":"생동감있어요"}}
    />
  );
}
