import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/2 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/2 (1:1348) — 시선은 접혀서 답이 태그로, 표정이 펼쳐짐
 * Figma 링크: "밝아요"(1:1403) → 인상평가/3, 시선 카드(1:1392) → 연결 대상 확인 필요
 */
export default function FriendFeedbackImpression2({ searchParams }: PageProps<"/prototype/friend-feedback/3">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="face"
      selected={{ gaze: "대체로 맞춰요" }}
      links={{ "face:밝아요": "/prototype/friend-feedback/4" }}
    />
  );
}
