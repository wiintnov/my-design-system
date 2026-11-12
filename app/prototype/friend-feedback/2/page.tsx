import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/1 · Prototype" };

/* Figma: 지인 피드백 - 인상평가/1 (1:1242) — 시선 "대체로맞춰요" 선택, 표정 카드를 누르면 다음 */
export default function FriendFeedbackImpression1({ searchParams }: PageProps<"/prototype/friend-feedback/2">) {
  return <FeedbackScreen searchParams={searchParams} selected={{ gaze: "대체로맞춰요" }} links={{ face: "/prototype/friend-feedback/3" }} />;
}
