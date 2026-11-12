import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/5 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/5 (1:1674) — 자세 "자주 몸을 흔들어요" 선택
 * 페이지 구조 글자로 만든 화면이에요 (design_context 미확인).
 */
export default function FriendFeedbackImpression5({ searchParams }: PageProps<"/prototype/friend-feedback/6">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="posture"
      selected={{"gaze":"대체로 맞춰요","face":"밝아요","posture":"자주 몸을 흔들어요"}}
      links={{"hands":"/prototype/friend-feedback/7"}}
    />
  );
}
