import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/4 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/4 (1:1564) — 자세 펼침
 * 페이지 구조 글자로 만든 화면이에요 (design_context 미확인).
 */
export default function FriendFeedbackImpression4({ searchParams }: PageProps<"/prototype/friend-feedback/5">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="posture"
      selected={{"gaze":"대체로 맞춰요","face":"밝아요"}}
      links={{"posture:자주 몸을 흔들어요":"/prototype/friend-feedback/6"}}
    />
  );
}
