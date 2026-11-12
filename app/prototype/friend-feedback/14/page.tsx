import type { Metadata } from "next";
import { SuccessScreen } from "../SuccessScreen";

export const metadata: Metadata = { title: "지인 피드백 - 제출 완료 · Prototype" };

/*
 * Figma: AI TEST › 제출 완료 (2974:464) — 코드 초안을 캡처한 뒤 디자이너가 Figma에서 다듬은 버전
 * 13번 "피드백 보내기" → 이 화면 → "처음으로" → 1번
 */
export default function FriendFeedbackSubmitted({ searchParams }: PageProps<"/prototype/friend-feedback/14">) {
  return (
    <SuccessScreen
      searchParams={searchParams}
      answers={{ gaze: "대체로 맞춰요", face: "밝아요", posture: "자주 몸을 흔들어요", hands: "가만히 못 있어요", volume: "대체로 들려요", tone: "생동감 있어요" }}
    />
  );
}
