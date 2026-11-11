import type { ButtonHTMLAttributes } from "react";

/*
 * 예시 컴포넌트예요. Figma의 버튼 컴포넌트를 연결하면
 * build-component 스킬이 이 파일을 Figma 기준으로 다시 맞춰요.
 * 규칙: 토큰 클래스만 사용 (bg-primary, rounded-md …), 임의값([3px]) 금지.
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-pressed active:bg-primary-pressed",
  secondary: "bg-surface-subtle text-fg hover:bg-border active:bg-border",
  ghost: "bg-transparent text-primary hover:bg-surface-subtle active:bg-surface-subtle",
  danger: "bg-danger text-on-primary hover:opacity-90 active:opacity-80",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-sm",
  md: "h-10 px-4 text-base rounded-md",
  lg: "h-12 px-5 text-lg rounded-lg",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant = "primary", size = "md", className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
