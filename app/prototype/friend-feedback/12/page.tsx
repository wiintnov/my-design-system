import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/13 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/13 (1:2352) — 말투 톤 "생동감있어요" 선택 (design_context 확인함)
 * 다음: 누를 곳 없이 인상평가/14로 넘어가요 → Figma "After delay"로 보고 0.8초 뒤 자동 이동
 */
export default function FriendFeedbackImpression13({ searchParams }: PageProps<"/prototype/friend-feedback/12">) {
  return (
    <FeedbackScreen
      searchParams={searchParams}
      open="tone"
      selected={{ gaze: "대체로맞춰요", face: "밝아요", posture: "자주 몸흔듦", hands: "가만히못있음", volume: "대체로들려요", tone: "생동감있어요" }}
      autoNext="/prototype/friend-feedback/13"
    />
  );
}
