import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      <p className="text-sm font-semibold text-primary">AI Native Designer Kit</p>
      <h1 className="text-4xl font-bold leading-tight">
        Figma에서 만든 디자인 시스템을
        <br />
        코드로 옮기고 직접 눌러 보세요
      </h1>
      <p className="text-lg leading-8 text-fg-subtle">
        VS Code의 Claude 패널에 <b className="text-fg">“시작하자”</b>라고 보내면 Claude가 다음 할 일을 안내해요.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/prototype"
          className="inline-flex h-12 items-center rounded-md bg-primary px-5 font-semibold text-on-primary hover:bg-primary-pressed"
        >
          프로토타입 테스트
        </Link>
        <Link
          href="/playground"
          className="inline-flex h-12 items-center rounded-md bg-surface-subtle px-5 font-semibold text-fg hover:bg-border"
        >
          디자인 시스템 보기
        </Link>
      </div>
    </main>
  );
}
