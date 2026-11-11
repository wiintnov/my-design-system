import type { Metadata } from "next";
import { ButtonPlayground } from "./ButtonPlayground";
import { ColorSwatches, RadiusSwatches } from "./TokenSwatches";

export const metadata: Metadata = { title: "Playground · AI Native Designer Kit" };

/*
 * /playground — 내가 만든 디자인 시스템을 눈으로 확인하고 눌러 보는 곳.
 * 새 컴포넌트를 만들면 build-component 스킬이 여기에 섹션을 추가해요.
 * 섹션 순서: 토큰(색 → 모서리) → 컴포넌트(만든 순서대로)
 */
export default function PlaygroundPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-primary">Playground</p>
        <h1 className="text-3xl font-bold">내 디자인 시스템</h1>
        <p className="text-fg-subtle">Figma 값과 다르게 보이는 곳이 있으면 Claude에게 “이 부분 Figma랑 비교해줘”라고 말해 보세요.</p>
      </header>

      <Section title="Color" note="globals.css의 --color-* 토큰을 자동으로 읽어 와요">
        <ColorSwatches />
      </Section>

      <Section title="Radius" note="모서리 값은 4px 그리드를 따라요">
        <RadiusSwatches />
      </Section>

      <Section title="Button" note="오른쪽에서 바꿔 가며 눌러 보세요">
        <ButtonPlayground />
      </Section>
    </main>
  );
}

function Section({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-border pb-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-fg-subtle">{note}</p>
      </div>
      {children}
    </section>
  );
}
