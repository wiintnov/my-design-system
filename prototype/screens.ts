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

export const screens: Screen[] = [];
