import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 메인 · Prototype" };

/* Figma: 지인 피드백 - 메인 (1:41) — 아무것도 고르지 않은 상태 */
export default function FriendFeedbackMain({ searchParams }: PageProps<"/prototype/friend-feedback/1">) {
  return <FeedbackScreen searchParams={searchParams} links={{ "gaze:대체로맞춰요": "/prototype/friend-feedback/2" }} />;
}
