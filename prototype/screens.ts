/*
 * 프로토타입 화면 목록 (유저플로우 순서대로)
 * build-screen 스킬이 화면을 만들 때마다 여기에 한 줄씩 추가해요.
 * /prototype 페이지가 이 목록을 보여 줘요.
 */
export type Screen = {
  flow: string; // 유저플로우 이름 (예: "회원가입")
  step: number; // 플로우 안에서의 순서 (1부터)
  title: string; // 화면 이름 (Figma 프레임 이름)
  href: string; // 주소 (예: "/prototype/signup/1")
  figma?: string; // Figma 프레임 링크 (있으면)
};

export const screens: Screen[] = [
  {
    flow: "지인 피드백",
    step: 1,
    title: "지인 피드백 - 메인",
    href: "/prototype/friend-feedback/1",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-41",
  },
  {
    flow: "지인 피드백",
    step: 2,
    title: "지인 피드백 - 인상평가/1",
    href: "/prototype/friend-feedback/2",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-1242",
  },
  {
    flow: "지인 피드백",
    step: 3,
    title: "지인 피드백 - 인상평가/2",
    href: "/prototype/friend-feedback/3",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-1348",
  },
  {
    flow: "지인 피드백",
    step: 4,
    title: "지인 피드백 - 인상평가/3",
    href: "/prototype/friend-feedback/4",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-1456",
  },
  {
    flow: "지인 피드백",
    step: 5,
    title: "지인 피드백 - 인상평가/4",
    href: "/prototype/friend-feedback/5",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-1564",
  },
  {
    flow: "지인 피드백",
    step: 6,
    title: "지인 피드백 - 인상평가/5",
    href: "/prototype/friend-feedback/6",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-1674",
  },
  {
    flow: "지인 피드백",
    step: 7,
    title: "지인 피드백 - 인상평가/6",
    href: "/prototype/friend-feedback/7",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-1784",
  },
  {
    flow: "지인 피드백",
    step: 8,
    title: "지인 피드백 - 인상평가/7",
    href: "/prototype/friend-feedback/8",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-1896",
  },
  {
    flow: "지인 피드백",
    step: 9,
    title: "지인 피드백 - 인상평가/9",
    href: "/prototype/friend-feedback/9",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-2008",
  },
  {
    flow: "지인 피드백",
    step: 10,
    title: "지인 피드백 - 인상평가/10",
    href: "/prototype/friend-feedback/10",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-2122",
  },
  {
    flow: "지인 피드백",
    step: 11,
    title: "지인 피드백 - 인상평가/12",
    href: "/prototype/friend-feedback/11",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-2236",
  },
  {
    flow: "지인 피드백",
    step: 12,
    title: "지인 피드백 - 인상평가/13",
    href: "/prototype/friend-feedback/12",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-2352",
  },
  {
    flow: "지인 피드백",
    step: 13,
    title: "지인 피드백 - 인상평가/14",
    href: "/prototype/friend-feedback/13",
    figma: "https://www.figma.com/design/lEcmDJcLQOI020XL6qJJVO/Hilit---maze?node-id=1-2468",
  },
  {
    flow: "지인 피드백",
    step: 14,
    title: "지인 피드백 - 제출 완료 (임시 초안 · Figma 없음)",
    href: "/prototype/friend-feedback/14",
  },
];
