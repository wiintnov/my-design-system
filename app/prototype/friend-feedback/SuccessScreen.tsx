/* eslint-disable @next/next/no-img-element -- Figma에서 받은 SVG를 원래 크기 그대로 보여 줘요 */
import { Suspense } from "react";
import { feedbackData, getFeedbackCase, type FeedbackCase } from "@/mocks/friend-feedback";
import { HomeIndicator, StatusBar } from "./FeedbackScreen";
import { MyNotes } from "./MyNotes";
import { NavButton } from "./NavButton";

/*
 * ⚠ 임시 초안 — Figma에 아직 없는 화면이에요 (2026-11-12, 디자이너 요청으로 코드에서 먼저 그림).
 * 지인 피드백 화면과 같은 토큰·글자 크기·카드 모양만 썼어요. Figma로 옮긴 뒤엔 Figma 기준으로 다시 맞춰요.
 */

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  /** 인상 항목 key → 고른 답 */
  answers: Record<string, string>;
};

export function SuccessScreen({ searchParams, answers }: Props) {
  return (
    <Suspense fallback={<SuccessBody dataCase="default" answers={answers} />}>
      <SuccessContent searchParams={searchParams} answers={answers} />
    </Suspense>
  );
}

async function SuccessContent({ searchParams, answers }: Props) {
  const dataCase = getFeedbackCase((await searchParams).data);
  return <SuccessBody dataCase={dataCase} answers={answers} />;
}

function SuccessBody({ dataCase, answers }: { dataCase: FeedbackCase; answers: Record<string, string> }) {
  const { interviewee, impressions, draft } = feedbackData[dataCase];
  const home = `/prototype/friend-feedback/1${dataCase !== "default" ? `?data=${dataCase}` : ""}`;

  return (
    <div className="flex min-h-dvh justify-center bg-surface-subtle">
      {/* 화면 전체가 길게 이어져요 (안쪽 스크롤 없음 → Figma 캡처 때도 아래까지 다 담겨요). id = 캡처 범위 */}
      <div id="figma-capture-root" className="relative flex min-h-dvh w-full max-w-93.75 flex-col bg-surface text-fg">
        <StatusBar />

        {/* Figma: AI TEST › 제출 완료 (2974:464) — Main Content 패딩 24/24/36, 간격 24 */}
        <main className="flex flex-1 flex-col gap-6 px-6 pt-6 pb-9">
          {/* 1. 완료 안내 (2974:474) — 아이콘·제목·설명 간격 8 */}
          <section className="flex flex-col gap-2">
            {/* 성공 아이콘 (2974:476) — 36 원 + 18 체크 */}
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-on-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12.5L10 17.5L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h1 className="text-xl font-semibold tracking-tight">
              {interviewee.name}님에게
              <br />
              피드백을 보냈어요!
            </h1>
            <p className="text-xs tracking-tight text-fg-subtle">
              남겨 주신 피드백은 {interviewee.name}님의 다음 면접 준비에 쓰여요.
            </p>
          </section>

          <img src="/prototype/friend-feedback/divider.svg" alt="" className="h-px w-full" />

          {/* 2·3. 인상 + 코멘트 묶음 (Frame 1, 2974:549) — Figma 간격 33 → 그리드에 맞춰 32 */}
          <div className="flex flex-col gap-8">
          {/* 2. 내가 남긴 인상 요약 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold tracking-tight">내가 남긴 인상</h2>
            <ul className="flex flex-col gap-3">
              {impressions.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2 tracking-tight"
                >
                  <span className="flex-1 text-sm font-semibold">{item.title}</span>
                  {answers[item.key] && (
                    <span className="shrink-0 rounded-lg bg-accent-subtle px-3 py-1 text-xs font-medium whitespace-nowrap text-accent">
                      {answers[item.key]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* 3. 내가 남긴 코멘트 (선택 문항) */}
          <MyNotes fallback={draft} />
          </div>
        </main>

        <footer className="flex flex-col gap-3 px-6 pb-7">
          <NavButton href={home} resetScroll resetDraft size="lg" className="w-full">
            처음으로
          </NavButton>
        </footer>

        <HomeIndicator />
      </div>
    </div>
  );
}
