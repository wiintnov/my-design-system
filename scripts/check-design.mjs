#!/usr/bin/env node
/*
 * 디자인 규칙 자동 검사 (사람 판단 없이 기계적으로 잡는 것만)
 *
 *   npm run check           → 프로젝트 전체 검사, 표로 출력
 *   node scripts/check-design.mjs --hook
 *                           → Claude Code가 파일을 고칠 때마다 그 파일만 검사
 *                             (.claude/settings.json의 PostToolUse 훅)
 *
 * 규칙
 *   E1 색 직접 입력      : .tsx/.ts 안의 #hex, rgb(), hsl()      → 오류 (토큰을 써야 해요)
 *   E2 그리드 밖 임의값  : className의 -[3px] 처럼 2의 배수도 아닌 값 → 오류
 *   W1 임의값           : -[6px] 처럼 2의 배수지만 4의 배수가 아닌 값 → 경고 (작은 요소만 허용)
 *   W2 임의값           : -[24px] 처럼 4의 배수인 임의값          → 경고 (기본 스케일/토큰으로 바꿀 수 있어요)
 *   E3 토큰 값          : globals.css의 --radius-*, --spacing-* 가 2의 배수가 아님 → 오류
 *   W3 토큰 값          : 같은 토큰이 4의 배수가 아님                         → 경고
 *
 * 오류가 나면 코드에서 우회하지 말고, 먼저 Figma 값이 맞는지 확인해요.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname, sep } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components"];
const CODE_EXT = new Set([".tsx", ".ts", ".jsx", ".js"]);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function checkCode(file, text) {
  const findings = [];
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;

    for (const m of line.matchAll(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g)) {
      findings.push({ level: "오류", rule: "E1", file, line: i + 1, found: m[0], hint: "색을 직접 썼어요. 토큰 클래스(bg-primary 등)를 써 주세요" });
    }
    for (const m of line.matchAll(/[\w:-]+-\[(-?\d*\.?\d+)px\]/g)) {
      const n = Math.abs(Number(m[1]));
      if (n % 2 !== 0) findings.push({ level: "오류", rule: "E2", file, line: i + 1, found: m[0], hint: `${n}px은 4px 그리드(작은 요소 2px) 밖이에요. Figma 값을 먼저 확인해요` });
      else if (n % 4 !== 0) findings.push({ level: "경고", rule: "W1", file, line: i + 1, found: m[0], hint: `${n}px은 2px 단위예요. 작은 요소가 아니면 4px 단위로` });
      else findings.push({ level: "경고", rule: "W2", file, line: i + 1, found: m[0], hint: "임의값이에요. 기본 스케일(p-4 = 16px)이나 토큰으로 바꿀 수 있어요" });
    }
  });
  return findings;
}

function checkCss(file, text) {
  const findings = [];
  text.split("\n").forEach((line, i) => {
    const m = line.match(/^\s*(--(?:radius|spacing)-[\w-]+)\s*:\s*(-?\d*\.?\d+)px/);
    if (!m) return;
    const n = Math.abs(Number(m[2]));
    if (n >= 999) return; // pill(완전히 둥근 모서리) 같은 특수값은 검사하지 않아요
    if (n % 2 !== 0) findings.push({ level: "오류", rule: "E3", file, line: i + 1, found: `${m[1]}: ${n}px`, hint: "토큰 값이 그리드 밖이에요. Figma Variables를 고친 뒤 다시 sync해요" });
    else if (n % 4 !== 0) findings.push({ level: "경고", rule: "W3", file, line: i + 1, found: `${m[1]}: ${n}px`, hint: "2px 단위 토큰이에요. 작은 요소 전용인지 확인해요" });
  });
  return findings;
}

function checkFile(abs) {
  const rel = relative(ROOT, abs).split(sep).join("/");
  if (!SCAN_DIRS.some((d) => rel === d || rel.startsWith(d + "/"))) return [];
  const ext = extname(abs);
  let text;
  try {
    text = readFileSync(abs, "utf8");
  } catch {
    return [];
  }
  if (ext === ".css") return checkCss(rel, text);
  if (CODE_EXT.has(ext)) return checkCode(rel, text);
  return [];
}

function print(findings, stream) {
  for (const f of findings) {
    stream.write(`[${f.level} ${f.rule}] ${f.file}:${f.line}  ${f.found}\n    → ${f.hint}\n`);
  }
}

if (process.argv.includes("--hook")) {
  // Claude Code PostToolUse 훅: stdin으로 {"tool_input":{"file_path":...}} 를 받아요
  let input = "";
  process.stdin.on("data", (c) => (input += c));
  process.stdin.on("end", () => {
    let filePath;
    try {
      filePath = JSON.parse(input)?.tool_input?.file_path;
    } catch {
      process.exit(0);
    }
    // 파일 경로를 알 수 없는 도구(예: Codex의 패치 적용)는 프로젝트 전체를 검사해요
    const targets = filePath ? [filePath] : SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
    const errors = targets.flatMap(checkFile).filter((f) => f.level === "오류");
    if (errors.length === 0) process.exit(0);
    process.stderr.write("디자인 규칙 검사에서 오류가 나왔어요. 코드에서 우회하지 말고, 사용자에게 쉬운 말로 알려 주고 Figma 값부터 확인하세요.\n");
    print(errors, process.stderr);
    process.exit(2);
  });
} else {
  const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
  const findings = files.flatMap(checkFile);
  const errors = findings.filter((f) => f.level === "오류").length;
  const warnings = findings.length - errors;
  if (findings.length === 0) {
    console.log("✓ 디자인 규칙 검사 통과: 오류 0, 경고 0");
  } else {
    print(findings, process.stdout);
    console.log(`\n오류 ${errors}개, 경고 ${warnings}개`);
  }
  process.exit(errors > 0 ? 1 : 0);
}
