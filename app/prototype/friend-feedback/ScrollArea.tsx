"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/*
 * 화면 사이를 넘어가도 스크롤 위치를 유지하는 스크롤 영역.
 * Figma 프로토타입의 "Preserve scroll position"과 같아요.
 * 위치는 이 브라우저 탭에만 잠깐 기억해요 (sessionStorage).
 */
export const SCROLL_KEY = "friend-feedback:scroll";
const KEY = SCROLL_KEY;

export function ScrollArea({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved && ref.current) ref.current.scrollTop = Number(saved);
    } catch {
      /* 저장소를 못 쓰는 브라우저면 맨 위에서 시작해요 */
    }
  }, []);

  return (
    <main
      ref={ref}
      className={className}
      onScroll={(e) => {
        try {
          sessionStorage.setItem(KEY, String(e.currentTarget.scrollTop));
        } catch {
          /* 무시 */
        }
      }}
    >
      {children}
    </main>
  );
}
