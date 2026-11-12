import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/14 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/14 (1:2468) — 6개 모두 선택, 전부 접힘 (design_context 확인함)
 * 다음: "피드백 보내기" → 14 제출 완료 (임시 초안, Figma 없음)
 */
export default function FriendFeedbackImpression14({ searchParams }: PageProps<"/prototype/friend-feedback/13">) {
  return (
    <FeedbackScreen
      searchParams={searchParams}
      open="none"
      selected={{ gaze: "대체로 맞춰요", face: "밝아요", posture: "자주 몸을 흔들어요", hands: "가만히 못 있어요", volume: "대체로 들려요", tone: "생동감 있어요" }}
      submitHref="/prototype/friend-feedback/14"
    />
  );
}
