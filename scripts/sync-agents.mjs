#!/usr/bin/env node
/*
 * Claude Code ↔ Codex 스킬·서브에이전트 동기화 (npm run sync)
 *
 *   원본(사람이 고치는 곳)          Codex용 복사본(자동 생성, 직접 고치지 않음)
 *   .claude/skills/<이름>/      →   .agents/skills/<이름>/
 *   .claude/agents/<이름>.md    →   .codex/agents/<이름>.toml
 *
 * Codex에서 .agents/skills/에 새로 만든 스킬은 원본(.claude/skills/)으로 먼저 가져와요.
 * 같은 스킬이 양쪽에서 다르면 더 최근에 고친 쪽을 원본으로 삼아요.
 *
 *   --quiet  바뀐 게 없으면 아무것도 출력하지 않아요 (훅용)
 *   --check  복사본이 원본과 다르면 오류로 끝나요 (검사용, 파일은 안 바꿔요)
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const CHECK = process.argv.includes("--check");
const CLAUDE_SKILLS = join(ROOT, ".claude/skills");
const AGENT_SKILLS = join(ROOT, ".agents/skills");
const CLAUDE_AGENTS = join(ROOT, ".claude/agents");
const CODEX_AGENTS = join(ROOT, ".codex/agents");
const GEN_HEADER = "# 자동 생성 파일 — 직접 고치지 마세요. 원본: .claude/agents/";

const log = [];
const dirs = (p) => (existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : []);

function files(dir, base = dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) files(p, base, out);
    else out.push(p.slice(base.length + 1));
  }
  return out.sort();
}
function snapshot(dir) {
  if (!existsSync(dir)) return null;
  return files(dir).map((f) => f + "\n" + readFileSync(join(dir, f), "utf8")).join("\n\0");
}
function newest(dir) {
  return Math.max(0, ...files(dir).map((f) => statSync(join(dir, f)).mtimeMs));
}
function copyDir(from, to) {
  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

// 1) 스킬
for (const name of dirs(AGENT_SKILLS)) {
  const src = join(CLAUDE_SKILLS, name);
  const copy = join(AGENT_SKILLS, name);
  if (!existsSync(src)) {
    log.push(`가져옴: .agents/skills/${name} → .claude/skills/${name} (Codex에서 만든 스킬)`);
    if (!CHECK) copyDir(copy, src);
  } else if (snapshot(src) !== snapshot(copy) && newest(copy) > newest(src)) {
    log.push(`가져옴: .agents/skills/${name} → .claude/skills/${name} (Codex 쪽이 더 최근에 고쳐짐)`);
    if (!CHECK) copyDir(copy, src);
  }
}
for (const name of dirs(CLAUDE_SKILLS)) {
  const src = join(CLAUDE_SKILLS, name);
  const copy = join(AGENT_SKILLS, name);
  if (snapshot(src) !== snapshot(copy)) {
    log.push(`복사: .claude/skills/${name} → .agents/skills/${name}`);
    if (!CHECK) copyDir(src, copy);
  }
}

// 2) 서브에이전트
const toml = (s) => `"""\n${s.replaceAll("\\", "\\\\").replaceAll('"""', '\\"\\"\\"')}\n"""`;
function parse(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return { fm, body: m[2].trim() };
}
const made = new Set();
if (existsSync(CLAUDE_AGENTS)) {
  for (const f of readdirSync(CLAUDE_AGENTS).filter((f) => f.endsWith(".md"))) {
    const parsed = parse(readFileSync(join(CLAUDE_AGENTS, f), "utf8"));
    if (!parsed?.fm.name) {
      log.push(`건너뜀: .claude/agents/${f} (name 머리말 없음)`);
      continue;
    }
    const out = [
      `${GEN_HEADER}${f} (npm run sync)`,
      `name = ${JSON.stringify(parsed.fm.name)}`,
      `description = ${toml(parsed.fm.description ?? "")}`,
      `developer_instructions = ${toml(parsed.body)}`,
      "",
    ].join("\n");
    const target = join(CODEX_AGENTS, `${parsed.fm.name}.toml`);
    made.add(`${parsed.fm.name}.toml`);
    if (!existsSync(target) || readFileSync(target, "utf8") !== out) {
      log.push(`생성: .claude/agents/${f} → .codex/agents/${parsed.fm.name}.toml`);
      if (!CHECK) {
        mkdirSync(CODEX_AGENTS, { recursive: true });
        writeFileSync(target, out);
      }
    }
  }
}
if (existsSync(CODEX_AGENTS)) {
  for (const f of readdirSync(CODEX_AGENTS).filter((f) => f.endsWith(".toml") && !made.has(f))) {
    if (readFileSync(join(CODEX_AGENTS, f), "utf8").startsWith(GEN_HEADER)) {
      log.push(`삭제: .codex/agents/${f} (원본이 없어짐)`);
      if (!CHECK) rmSync(join(CODEX_AGENTS, f));
    }
  }
}

if (log.length === 0) {
  if (!QUIET) console.log("✓ Claude Code ↔ Codex 동기화: 바뀐 것 없음");
} else {
  console.log(log.join("\n"));
  if (CHECK) {
    console.log("\nCodex용 복사본이 원본과 달라요. npm run sync 를 실행해 주세요.");
    process.exit(1);
  }
}
