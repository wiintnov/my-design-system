/*
 * 지인 피드백 플로우 데이터 · 화면: app/prototype/friend-feedback/
 *
 * 주소 끝에 ?data=<케이스> 를 붙이면 바꿔 볼 수 있어요.
 *   (없음)  default  Figma "Hilit - maze" 글자 그대로
 *   ?data=long       아주 긴 글 (긴 이름·장면 이름·질문·선택지, 입력칸에 긴 조언)
 *   ?data=empty      빈 목록 (장면 0개, 영상 0:00)
 *   ?data=many       많은 목록 (짧은 장면 8개 → 장면 이름이 겹치는지)
 *
 * 이름은 모두 예시용이에요. 실존 인물과 관계없어요.
 */

export type Chapter = {
  title: string;
  time: string;
  /** 진행 바에서 차지하는 폭 비율 (Figma 막대 폭 기준) */
  weight: number;
};

export type Impression = {
  key: string;
  title: string;
  question: string;
  options?: string[];
};

export type FeedbackData = {
  interviewee: { name: string };
  video: { duration: string };
  chapters: Chapter[];
  /** 지금 재생 위치: 몇 번째 장면(-1 = 없음)의 몇 % 지점인지 */
  playback: { chapterIndex: number; progress: number };
  impressions: Impression[];
  /** 입력칸에 미리 채워 둘 글 (경계 케이스 확인용) */
  draft?: { bestComment?: string; worstComment?: string; advice?: string };
};

export const FEEDBACK_CASES = ["default", "long", "empty", "many"] as const;
export type FeedbackCase = (typeof FEEDBACK_CASES)[number];

// ── 기본 (Figma 글자 그대로) ─────────────────────────────
// 자세·손 움직임·목소리·말투 선택지는 페이지 구조(get_metadata) 글자에서 가져왔어요.
// ⚠ 화면 파일들이 선택지 글자로 "고른 답"과 "링크"를 정해요. 고른 답 글자는 모든 케이스에서 같게 둬요.
const impressions: Impression[] = [
  { key: "gaze", title: "시선", question: "재원님은 눈을 잘 마주치나요?", options: ["잘 맞춰요", "대체로맞춰요", "가끔 피해요", "자주 피해요"] },
  { key: "face", title: "표정", question: "재원님은 얼마나 밝고 자연스러운가요?", options: ["밝아요", "대체로밝아요", "가끔 굳어요", "자주 굳어요"] },
  { key: "posture", title: "자세", question: "긴장감 없이 안정적인가요?", options: ["대체로 반듯", "가끔 구부정", "가끔 몸흔듦", "자주 몸흔듦"] },
  { key: "hands", title: "손 움직임", question: "긴장감 없이 차분한가요?", options: ["차분해요", "가끔 만지작", "자주 만지작", "가만히못있음"] },
  { key: "volume", title: "목소리 크기", question: "또렷하고 자신감있게 들리나요?", options: ["또렷해요", "대체로들려요", "가끔안들려요", "자주안들려요"] },
  { key: "tone", title: "말투 톤", question: "생기가 있나요?", options: ["생동감있어요", "조금밋밋해요", "많이밋밋해요", "많이굳었어요"] },
];

const base: FeedbackData = {
  interviewee: { name: "재원" },
  video: { duration: "10:02" },
  chapters: [
    { title: "자기소개", time: "0:00", weight: 54 },
    { title: "프로젝트 경험", time: "1:40", weight: 107 },
    { title: "트러블슈팅", time: "4:10", weight: 78 },
    { title: "기술 스택", time: "6:30", weight: 78 },
  ],
  playback: { chapterIndex: 1, progress: 0.65 },
  impressions,
};

/** 질문 글의 이름을 바꿔 끼워요 ("재원님은 …" → "<이름>님은 …") */
const withName = (name: string, list: Impression[]) =>
  list.map((q) => ({ ...q, question: q.question.replace("재원님", `${name}님`) }));

// ── 아주 긴 글 ──────────────────────────────────────────
const longName = "남궁가나다라마바사아";
const long: FeedbackData = {
  interviewee: { name: longName },
  video: { duration: "1:02:15" },
  chapters: [
    { title: "자기소개", time: "0:00", weight: 54 },
    { title: "대규모 트래픽에서 캐시가 무너졌을 때 DB 커넥션 풀을 지킨 트러블슈팅 경험", time: "12:40", weight: 107 },
    { title: "기술 스택", time: "38:10", weight: 78 },
    { title: "마지막으로 하고 싶은 말과 회사에 궁금한 점", time: "55:30", weight: 78 },
  ],
  playback: { chapterIndex: 1, progress: 0.65 },
  impressions: withName(longName, impressions).map((q) => {
    switch (q.key) {
      case "gaze":
        // 고른 답(대체로맞춰요)은 그대로, 나머지 선택지 하나를 아주 길게
        return {
          ...q,
          question: `${longName}님은 질문을 듣고 답할 때 면접관의 눈을 자연스럽게 잘 마주치고, 생각할 때도 시선이 크게 흔들리지 않나요?`,
          options: ["잘 맞춰요", "대체로맞춰요", "가끔 피해요", "면접관 눈을 거의 보지 않고 화면 아래만 봐요"],
        };
      case "hands":
        return { ...q, options: ["차분해요", "펜을 계속 돌리거나 머리를 자주 만져요", "자주 만지작", "가만히못있음"] };
      default:
        return q;
    }
  }),
  draft: {
    bestComment:
      "프로젝트 경험을 설명할 때 숫자로 근거를 대면서도 여유 있게 농담까지 섞어서, 듣는 사람이 편안하게 집중할 수 있었던 점이 정말 인상 깊었어요",
    worstComment: "트러블슈팅 부분에서 원인과 해결 순서가 섞여서 조금 헷갈렸어요. 원인 → 시도 → 결과 순서로 말하면 더 좋을 것 같아요",
    advice:
      "전체적으로 정말 잘하셨어요! 처음에는 조금 긴장한 것 같았는데 프로젝트 경험을 이야기할 때부터 목소리에 힘이 생기고 표정도 훨씬 밝아졌어요.\n\n" +
      "다만 질문을 끝까지 듣기 전에 답을 시작하는 순간이 두세 번 있었어요. 한 박자 쉬고 질문을 다시 정리한 다음 답하면 훨씬 차분해 보일 것 같아요.\n\n" +
      "그리고 손을 자주 움직이는 습관이 있는데, 테이블 위에 가볍게 올려 두는 연습을 해 보면 좋겠어요. 기술 스택 설명은 깔끔했으니 자신감 가지세요. 다음 면접도 꼭 잘 될 거예요. 응원합니다! 화이팅 화이팅 화이팅!",
  },
};

// ── 빈 목록 ────────────────────────────────────────────
const empty: FeedbackData = {
  interviewee: { name: "하나" },
  video: { duration: "0:00" },
  chapters: [],
  playback: { chapterIndex: -1, progress: 0 },
  impressions: withName("하나", impressions),
};

// ── 많은 목록 ──────────────────────────────────────────
const many: FeedbackData = {
  interviewee: { name: "지우" },
  video: { duration: "12:40" },
  chapters: [
    { title: "자기소개", time: "0:00", weight: 40 },
    { title: "지원 동기", time: "1:05", weight: 40 },
    { title: "프로젝트 경험", time: "2:30", weight: 40 },
    { title: "협업", time: "4:10", weight: 40 },
    { title: "트러블슈팅", time: "5:50", weight: 40 },
    { title: "기술 스택", time: "7:40", weight: 40 },
    { title: "성장 계획", time: "9:20", weight: 40 },
    { title: "질의응답", time: "11:00", weight: 40 },
  ],
  playback: { chapterIndex: 4, progress: 0.3 },
  impressions: withName("지우", impressions),
};

export const feedbackData: Record<FeedbackCase, FeedbackData> = { default: base, long, empty, many };

/** 주소의 ?data= 값으로 케이스를 골라요. 모르는 값이면 기본. */
export function getFeedbackCase(value: string | string[] | undefined): FeedbackCase {
  const v = Array.isArray(value) ? value[0] : value;
  return FEEDBACK_CASES.includes(v as FeedbackCase) ? (v as FeedbackCase) : "default";
}
