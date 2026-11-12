import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/3 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/3 (1:1456) — 표정 "밝아요" 선택
 * 다음: 자세 카드(1:1519) → 인상평가/4
 */
export default function FriendFeedbackImpression3({ searchParams }: PageProps<"/prototype/friend-feedback/4">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="face"
      selected={{ gaze: "대체로맞춰요", face: "밝아요" }}
      links={{ posture: "/prototype/friend-feedback/5" }}
    />
  );
}
