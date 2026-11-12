"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Figma 프로토타입의 "After delay"(시간이 지나면 자동으로 다음 화면) 흉내.
 * 화면이 열리고 delay(ms)가 지나면 href로 넘어가요.
 */
export function AutoAdvance({ href, delay = 800 }: { href: string; delay?: number }) {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => router.push(href), delay);
    return () => clearTimeout(timer);
  }, [href, delay, router]);
  return null;
}
