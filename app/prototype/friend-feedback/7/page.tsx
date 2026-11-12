import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/6 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/6 (1:1784) — 손 움직임 펼침
 * 페이지 구조 글자로 만든 화면이에요 (design_context 미확인).
 */
export default function FriendFeedbackImpression6({ searchParams }: PageProps<"/prototype/friend-feedback/7">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="hands"
      selected={{"gaze":"대체로맞춰요","face":"밝아요","posture":"자주 몸흔듦"}}
      links={{"hands:가만히못있음":"/prototype/friend-feedback/8"}}
    />
  );
}
