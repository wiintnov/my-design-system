@AGENTS.md

# Claude Code 전용 메모

규칙은 모두 위 `AGENTS.md`에 있어요 (Codex와 같이 써요). 여기에는 Claude Code에만 해당하는 것만 적어요.

- 스킬은 `/스킬이름`으로 부르거나, 스킬 설명과 맞는 부탁을 하면 자동으로 꺼내져요.
- Figma 연결: `.mcp.json`에 등록돼 있어요. `/mcp` › figma › Authenticate.
- 자동 검사 훅: `.claude/settings.json` (파일을 고칠 때마다 규칙 검사 + Codex용 복사본 sync).
- 사용자가 “앞으로는 이렇게 해”라고 하면 이 파일이 아니라 `AGENTS.md`에 추가해요.
