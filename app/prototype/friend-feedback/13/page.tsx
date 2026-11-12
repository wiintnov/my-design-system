import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/14 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/14 (1:2468) — 6개 모두 선택, 전부 접힘 — 다음은 선택 피드백(아직 없음)
 * 페이지 구조 글자로 만든 화면이에요 (design_context 미확인).
 */
export default function FriendFeedbackImpression14({ searchParams }: PageProps<"/prototype/friend-feedback/13">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="none"
      selected={{"gaze":"대체로맞춰요","face":"밝아요","posture":"자주 몸흔듦","hands":"가만히못있음","volume":"대체로들려요","tone":"생동감있어요"}}
    />
  );
}
