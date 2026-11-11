#!/usr/bin/env node
/*
 * 스킬·서브에이전트 규격 검사 (npm run check:skills)
 * 기준: Agent Skills 표준 (https://agentskills.io/specification)
 *
 * 스킬 (.claude/skills/<이름>/SKILL.md)
 *   - name: 필수. 1~64자, 소문자·숫자·하이픈만, 하이픈으로 시작/끝 X, -- X, 폴더 이름과 같아야 함
 *   - description: 필수. 1~1024자. "무엇을 하는지 + 언제 쓰는지"
 *   - 본문: 500줄 이하 권장 (길면 references/ 로 나누기)
 *   - 본문에서 가리키는 references/·scripts/·assets/ 파일이 실제로 있어야 함
 * 서브에이전트 (.claude/agents/<이름>.md)
 *   - name, description 필수. name은 파일 이름과 같아야 함
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const results = [];
const add = (level, where, msg) => results.push({ level, where, msg });

function parse(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return { fm, body: m[2] };
}

function checkName(where, name, expected) {
  if (!name) return add("오류", where, "name이 없어요");
  if (name.length > 64) add("오류", where, `name이 64자를 넘어요 (${name.length}자)`);
  if (!NAME_RE.test(name)) add("오류", where, `name "${name}"은 소문자·숫자·하이픈만 써야 해요 (예: handoff-check)`);
  if (expected && name !== expected) add("오류", where, `name "${name}"이 폴더/파일 이름 "${expected}"과 달라요`);
}

function checkDescription(where, desc) {
  if (!desc) return add("오류", where, "description이 없어요. Claude가 언제 꺼낼지 판단할 수 없어요");
  if (desc.length > 1024) add("오류", where, `description이 1024자를 넘어요 (${desc.length}자)`);
  if (desc.length < 40) add("경고", where, "description이 너무 짧아요. '무엇을 하는지 + 언제 쓰는지 + 사용자가 할 말 예시'를 넣어요");
  if (!/(때|요청|경우|when)/i.test(desc)) add("경고", where, "description에 '언제 쓰는지'가 안 보여요");
}

const skillsDir = join(ROOT, ".claude/skills");
if (existsSync(skillsDir)) {
  for (const dir of readdirSync(skillsDir)) {
    const base = join(skillsDir, dir);
    if (!statSync(base).isDirectory()) continue;
    const where = `skills/${dir}`;
    const file = join(base, "SKILL.md");
    if (!existsSync(file)) {
      add("오류", where, "SKILL.md 파일이 없어요");
      continue;
    }
    const parsed = parse(readFileSync(file, "utf8"));
    if (!parsed) {
      add("오류", where, "맨 위에 --- 로 감싼 name/description 머리말이 없어요");
      continue;
    }
    checkName(where, parsed.fm.name, dir);
    checkDescription(where, parsed.fm.description);
    const lines = parsed.body.split("\n").length;
    if (lines > 500) add("경고", where, `본문이 ${lines}줄이에요. 500줄 이하로 줄이고 자세한 내용은 references/로 옮겨요`);
    for (const ref of parsed.body.matchAll(/`((?:references|scripts|assets)\/[^`\s]+)`/g)) {
      if (!existsSync(join(base, ref[1]))) add("오류", where, `본문이 가리키는 ${ref[1]} 파일이 없어요`);
    }
  }
}

const agentsDir = join(ROOT, ".claude/agents");
if (existsSync(agentsDir)) {
  for (const f of readdirSync(agentsDir).filter((f) => f.endsWith(".md"))) {
    const where = `agents/${f}`;
    const parsed = parse(readFileSync(join(agentsDir, f), "utf8"));
    if (!parsed) {
      add("오류", where, "맨 위에 --- 로 감싼 name/description 머리말이 없어요");
      continue;
    }
    checkName(where, parsed.fm.name, f.replace(/\.md$/, ""));
    checkDescription(where, parsed.fm.description);
  }
}

if (results.length === 0) {
  console.log("✓ 스킬·서브에이전트 규격 검사 통과");
} else {
  for (const r of results) console.log(`[${r.level}] ${r.where}  ${r.msg}`);
  const errors = results.filter((r) => r.level === "오류").length;
  console.log(`\n오류 ${errors}개, 경고 ${results.length - errors}개`);
  process.exit(errors > 0 ? 1 : 0);
}
