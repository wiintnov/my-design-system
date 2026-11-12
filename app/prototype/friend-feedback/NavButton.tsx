"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { clearDraft } from "./draftStore";
import { SCROLL_KEY } from "./ScrollArea";

/**
 * 누르면 다른 화면으로 넘어가는 Button (Button 컴포넌트를 그대로 써요).
 * resetScroll: 넘어간 화면을 맨 위부터 보여 줘요 (예: "처음으로").
 */
export function NavButton({
  href,
  resetScroll,
  resetDraft,
  ...props
}: ButtonProps & { href: string; resetScroll?: boolean; resetDraft?: boolean }) {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={() => {
        if (resetDraft) clearDraft(); // 입력한 코멘트·조언을 지우고 새로 시작
        if (resetScroll) {
          try {
            sessionStorage.removeItem(SCROLL_KEY);
          } catch {
            /* 무시 */
          }
        }
        router.push(href);
      }}
    />
  );
}
