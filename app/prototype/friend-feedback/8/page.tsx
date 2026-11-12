import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/7 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/7 (1:1896) — 손 움직임 "가만히 못 있어요" 선택
 * 페이지 구조 글자로 만든 화면이에요 (design_context 미확인).
 */
export default function FriendFeedbackImpression7({ searchParams }: PageProps<"/prototype/friend-feedback/8">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="hands"
      selected={{"gaze":"대체로 맞춰요","face":"밝아요","posture":"자주 몸을 흔들어요","hands":"가만히 못 있어요"}}
      links={{"volume":"/prototype/friend-feedback/9"}}
    />
  );
}
