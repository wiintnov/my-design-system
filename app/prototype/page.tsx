import Link from "next/link";
import type { Metadata } from "next";
import { screens } from "@/prototype/screens";

export const metadata: Metadata = { title: "Prototype · AI Native Designer Kit" };

/* 유저플로우별 화면 목록. 배포 링크에서 이 페이지부터 테스트를 시작해요. */
export default function PrototypeIndex() {
  const flows = Array.from(new Set(screens.map((s) => s.flow)));
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-primary">Prototype</p>
        <h1 className="text-3xl font-bold">유저플로우 테스트</h1>
        <p className="text-fg-subtle">플로우의 첫 화면부터 눌러 보며 끝까지 가 보세요.</p>
      </header>
      {flows.length === 0 ? (
        <p className="rounded-lg border border-border p-6 text-fg-subtle">
          아직 화면이 없어요. AI에게 “[Figma 프레임 링크] 이 화면 만들어줘”라고 해 보세요.
        </p>
      ) : (
        flows.map((flow) => (
          <section key={flow} className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">{flow}</h2>
            <ol className="flex flex-col gap-2">
              {screens
                .filter((s) => s.flow === flow)
                .sort((a, b) => a.step - b.step)
                .map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="flex items-center gap-3 rounded-md border border-border p-4 hover:bg-surface-subtle">
                      <span className="text-sm font-semibold text-primary">{s.step}</span>
                      <span>{s.title}</span>
                    </Link>
                  </li>
                ))}
            </ol>
          </section>
        ))
      )}
    </main>
  );
}
