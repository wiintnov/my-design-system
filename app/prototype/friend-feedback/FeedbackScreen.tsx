/* eslint-disable @next/next/no-img-element -- Figma에서 받은 SVG를 원래 크기 그대로 보여 줘요 */
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { feedbackData, getFeedbackCase, type FeedbackCase, type FeedbackData } from "@/mocks/friend-feedback";
import { AutoAdvance } from "./AutoAdvance";
import { ScrollArea } from "./ScrollArea";

/*
 * 지인 피드백 화면 공통 틀 (Figma: Hilit - maze › 지인 피드백 - 메인 1:41, 인상평가/1~ )
 * 화면마다 다른 것: 어떤 카드가 펼쳐졌는지(open), 무엇을 골랐는지(selected), 어디로 가는지(links)
 * 데이터는 mocks/friend-feedback.ts — 주소 끝 ?data=long|empty|many 로 경계 케이스를 볼 수 있어요.
 * 그리드 밖 값은 가장 가까운 4px 값으로 만들었어요 (design-system/figma-log.md 참고).
 */
const ICON = "/prototype/friend-feedback";

type Props = {
  /** 페이지가 받은 주소 뒤 값 (?data=…) */
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  /** 선택지가 펼쳐진 인상 항목 key. 나머지는 접혀 있고, 고른 답은 오른쪽 파란 태그로 보여요 */
  open?: string;
  /** 인상 항목 key → 고른 선택지. 예: { gaze: "대체로맞춰요" } */
  selected?: Record<string, string>;
  /**
   * 누르면 이동할 곳. Figma 프로토타입에 연결된 곳만 넣어요.
   * "항목key:선택지" = 선택지 칸, "항목key" = 접힌 카드
   */
  links?: Record<string, string>;
  /** 화면이 열리고 잠시 뒤 자동으로 넘어갈 곳 (Figma "After delay") */
  autoNext?: string;
};

/**
 * 주소 뒤 값(?data=)은 화면을 열 때만 알 수 있어서 Suspense로 감싸요.
 * (이 Next.js 버전은 미리 그릴 수 있는 부분은 미리 그려 두는데, 주소 값은 미리 알 수 없어요)
 */
export function FeedbackScreen({ searchParams, autoNext, ...rest }: Props) {
  // 기다리는 동안에도 빈 화면 대신 기본 데이터로 "완성된 화면"을 먼저 보여 줘요.
  // 기본 데이터면 그대로 이어져서 화면 사이에 공백이 없어요.
  return (
    <Suspense fallback={<ScreenBody dataCase="default" {...rest} />}>
      <FeedbackScreenContent searchParams={searchParams} autoNext={autoNext} {...rest} />
    </Suspense>
  );
}

async function FeedbackScreenContent({ searchParams, ...rest }: Props) {
  const dataCase = getFeedbackCase((await searchParams).data);
  return <ScreenBody dataCase={dataCase} {...rest} />;
}

type BodyProps = Omit<Props, "searchParams"> & { dataCase: FeedbackCase };

function ScreenBody({ dataCase, open = "gaze", selected = {}, links = {}, autoNext }: BodyProps) {
  const data = feedbackData[dataCase];
  const { interviewee, video, impressions } = data;
  // 다음 화면으로 가도 같은 데이터 케이스를 유지해요
  const to = (href?: string) => (href && dataCase !== "default" ? `${href}?data=${dataCase}` : href);

  return (
    <div className="flex min-h-dvh justify-center bg-surface-subtle">
      <div className="relative flex h-dvh w-full max-w-93.75 flex-col bg-surface text-fg">
        <StatusBar />

        {/* 스크롤 영역 */}
        <ScrollArea className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-6 pb-7">
          {/* 1. 영상 + 장면 고르기 */}
          <section className="flex flex-col gap-5">
            <h1 className="text-xl font-semibold tracking-tight">
              {interviewee.name}님의 면접관이 되어
              <br />
              피드백을 남겨주세요!
            </h1>
            <div className="relative h-46 w-full rounded-lg bg-media">
              <img src={`${ICON}/play.svg`} alt="재생" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <span className="absolute right-3 bottom-3 rounded-md bg-primary px-2 py-1 text-xs font-medium tracking-tight text-on-primary">
                {video.duration}
              </span>
            </div>
            <ChapterPicker data={data} />
          </section>

          <img src={`${ICON}/divider.svg`} alt="" className="h-px w-full" />

          {/* 2. 인상 평가 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight">
              {interviewee.name}님의 면접에서
              <br />
              어떤 인상을 받았나요?
            </h2>
            <ul className="flex flex-col gap-3">
              {impressions.map((item) => {
                const isOpen = item.key === open && item.options;
                const answer = selected[item.key];
                const header = (
                  <span className="flex w-full items-center gap-1 tracking-tight">
                    <span className="text-sm font-semibold whitespace-nowrap">{item.title}</span>
                    <span className="min-w-0 flex-1 text-xs text-fg-subtle">{item.question}</span>
                    {!isOpen && answer && (
                      <span className="shrink-0 rounded-lg bg-accent-subtle px-3 py-1 text-xs font-medium whitespace-nowrap text-accent">
                        {answer}
                      </span>
                    )}
                  </span>
                );
                const cardClass = "flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2";

                // 열린 카드: 선택지 4개
                if (isOpen) {
                  return (
                    <li key={item.key} className={cardClass}>
                      {header}
                      <span className="flex w-full gap-2">
                        {item.options!.map((option) => (
                          <Option
                            key={option}
                            label={option}
                            selected={answer === option}
                            href={to(links[`${item.key}:${option}`])}
                          />
                        ))}
                      </span>
                    </li>
                  );
                }
                // 닫힌 카드: Figma에서 링크가 걸린 카드만 누를 수 있어요
                const href = to(links[item.key]);
                return (
                  <li key={item.key}>
                    {href ? (
                      <Link href={href} className={cardClass}>
                        {header}
                      </Link>
                    ) : (
                      <div className={cardClass}>{header}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <img src={`${ICON}/divider.svg`} alt="" className="h-px w-full" />

          {/* 3. 기억에 남는 장면 (선택) */}
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <span className="self-start rounded-md bg-surface-subtle px-2 py-1 text-xs font-semibold tracking-tight text-fg-subtle">
                선택
              </span>
              <h2 className="text-xl font-semibold tracking-tight">
                {interviewee.name}님의 면접에서
                <br />
                기억에 남는 순간이 있다면 남겨주세요
              </h2>
            </div>
            <SceneComment label="가장 좋았던 장면" defaultValue={data.draft?.bestComment} />
            <SceneComment label="가장 아쉬웠던 장면" defaultValue={data.draft?.worstComment} />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold tracking-tight">{interviewee.name}님에게 자유롭게 조언해주세요</p>
              <textarea
                placeholder="응원이나 조언을 자유롭게 적어주세요"
                defaultValue={data.draft?.advice}
                className="h-27 w-full resize-none rounded-lg bg-surface-subtle p-3 text-xs font-medium tracking-tight placeholder:text-fg-subtle"
              />
            </div>
          </section>
        </ScrollArea>

        {/* 하단 고정: 제출 */}
        <footer className="flex flex-col gap-3 px-6 pb-7">
          <Button size="lg" className="w-full">
            피드백 제출
          </Button>
          <p className="text-center text-xs tracking-tight text-fg-subtle">6개의 항목을 모두 선택하면 제출할 수 있어요</p>
        </footer>

        <HomeIndicator />
        {autoNext && <AutoAdvance href={to(autoNext)!} />}
      </div>
    </div>
  );
}

/** 인상 선택지 한 칸. 선택되면 연한 파랑 배경 + 파란 글자 */
function Option({ label, selected, href }: { label: string; selected: boolean; href?: string }) {
  const className =
    "flex min-w-0 flex-1 items-center justify-center rounded-lg p-3 text-2xs font-semibold tracking-tight whitespace-nowrap " +
    (selected ? "bg-accent-subtle text-accent" : "bg-surface-subtle text-fg-subtle");
  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return <span className={className}>{label}</span>;
}

/** 원하는 장면 골라보기: 진행 바 + 장면 이름. 장면이 0개면 빈 바만 보여요 */
function ChapterPicker({ data }: { data: FeedbackData }) {
  const { chapters, playback, video } = data;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium tracking-tight">원하는 장면 골라보기</p>
      <div className="flex flex-col">
        <div className="flex h-3 w-full gap-0.5 rounded-lg bg-surface-subtle p-0.5">
          {chapters.map((c, i) => (
            <div key={c.title} className="relative h-full basis-0 rounded-lg bg-track" style={{ flexGrow: c.weight }}>
              {i < playback.chapterIndex && <div className="h-full w-full rounded-lg bg-accent" />}
              {i === playback.chapterIndex && (
                <>
                  <div className="h-full rounded-l-lg bg-accent" style={{ width: `${playback.progress * 100}%` }} />
                  <div
                    className="absolute -inset-y-0.5 w-0.5 rounded-lg bg-media"
                    style={{ left: `${playback.progress * 100}%` }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-3xs font-medium tracking-tight text-fg-muted">
          <span>0:00</span>
          <span>{video.duration}</span>
        </div>
        {chapters.length > 0 && (
          <div className="flex items-end gap-0.5 px-0.5">
            {chapters.map((c, i) => {
              const isCurrent = i === playback.chapterIndex;
              return (
                <button key={c.title} type="button" className="flex min-w-0 basis-0 flex-col text-left tracking-tight" style={{ flexGrow: c.weight }}>
                  <span className={isCurrent ? "text-xs font-semibold whitespace-nowrap text-accent" : "text-2xs font-medium whitespace-nowrap text-fg-faint"}>
                    {c.title}
                  </span>
                  <span className="text-2xs text-track">{c.time}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/** 장면 + 한 줄 코멘트 */
function SceneComment({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold tracking-tight">{label}</p>
      <div className="flex w-full gap-2">
        <button type="button" className="flex h-11 w-19 shrink-0 items-center gap-2 rounded-lg bg-surface-subtle p-3">
          <span className="flex-1 text-left text-xs font-medium tracking-tight text-fg-subtle">구간</span>
          <img src={`${ICON}/chevron-down.svg`} alt="" />
        </button>
        <input
          placeholder="한 줄 코멘트를 남겨주세요"
          defaultValue={defaultValue}
          className="h-11 min-w-0 flex-1 rounded-lg bg-surface-subtle px-3 text-xs font-medium tracking-tight placeholder:text-fg-subtle"
        />
      </div>
    </div>
  );
}

/** iPhone 상태바 (Figma iOS 키트) */
function StatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-center bg-surface pt-5.5">
      <div className="flex flex-1 justify-center pr-1.5 pl-4 text-ios font-semibold">9:41</div>
      <div className="h-2.5 w-31 shrink-0" />
      <div className="flex flex-1 items-center justify-center gap-2 pr-4 pl-1.5">
        <img src={`${ICON}/status-cellular.svg`} alt="" />
        <img src={`${ICON}/status-wifi.svg`} alt="" />
        <img src={`${ICON}/status-battery.svg`} alt="" />
      </div>
    </div>
  );
}

/** iPhone 홈 인디케이터 */
function HomeIndicator() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8.5">
      <div className="absolute bottom-2 left-1/2 h-1 w-36 -translate-x-1/2 rounded-full bg-primary" />
    </div>
  );
}
