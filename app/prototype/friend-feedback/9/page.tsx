import type { Metadata } from "next";
import { FeedbackScreen } from "../FeedbackScreen";

export const metadata: Metadata = { title: "지인 피드백 - 인상평가/9 · Prototype" };

/*
 * Figma: 지인 피드백 - 인상평가/9 (1:2008) — 목소리 크기 펼침
 * 페이지 구조 글자로 만든 화면이에요 (design_context 미확인).
 */
export default function FriendFeedbackImpression9({ searchParams }: PageProps<"/prototype/friend-feedback/9">) {
  return (
    <FeedbackScreen searchParams={searchParams}
      open="volume"
      selected={{"gaze":"대체로맞춰요","face":"밝아요","posture":"자주 몸흔듦","hands":"가만히못있음"}}
      links={{"volume:대체로들려요":"/prototype/friend-feedback/10"}}
    />
  );
}
