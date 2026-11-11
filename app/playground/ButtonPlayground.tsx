"use client";

import { useState } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];

export function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [size, setSize] = useState<ButtonSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("확인");
  const [clicks, setClicks] = useState(0);

  return (
    <div className="flex flex-col gap-8">
      {/* 1. 조작해 보기 */}
      <div className="flex flex-col gap-6 rounded-xl border border-border p-6 lg:flex-row">
        <div className="flex flex-1 items-center justify-center rounded-lg bg-surface-subtle p-12">
          <Button variant={variant} size={size} disabled={disabled} onClick={() => setClicks((c) => c + 1)}>
            {label}
          </Button>
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-72">
          <Field label="variant">
            <Segment options={VARIANTS} value={variant} onChange={setVariant} />
          </Field>
          <Field label="size">
            <Segment options={SIZES} value={size} onChange={setSize} />
          </Field>
          <Field label="label">
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="h-10 rounded-md border border-border px-3 text-base"
            />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
            disabled
          </label>
          <p className="text-sm text-fg-subtle">클릭 {clicks}회</p>
        </div>
      </div>

      {/* 2. 전체 조합 한눈에 보기 */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-subtle text-fg-subtle">
            <tr>
              <th className="p-3 font-semibold">variant \ size</th>
              {SIZES.map((s) => (
                <th key={s} className="p-3 font-semibold">
                  {s}
                </th>
              ))}
              <th className="p-3 font-semibold">disabled</th>
            </tr>
          </thead>
          <tbody>
            {VARIANTS.map((v) => (
              <tr key={v} className="border-t border-border">
                <td className="p-3 font-semibold">{v}</td>
                {SIZES.map((s) => (
                  <td key={s} className="p-3">
                    <Button variant={v} size={s}>
                      버튼
                    </Button>
                  </td>
                ))}
                <td className="p-3">
                  <Button variant={v} disabled>
                    버튼
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase text-fg-subtle">{label}</span>
      {children}
    </div>
  );
}

function Segment<T extends string>({ options, value, onChange }: { options: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-md bg-surface-subtle p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-sm px-3 py-1 text-sm ${o === value ? "bg-surface font-semibold text-fg" : "text-fg-subtle"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
