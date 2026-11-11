# AI Native Designer Kit

**Figma에서 끝나던 디자이너의 일을, 코드에서 확인되는 순간까지 데려가는 출발점.**

AI 네이티브하게 일한다는 건 AI에게 결과물을 시키는 게 아니라,
**내 판단 기준을 AI가 매번 지키도록 만들어 두는 것**이에요.
이 레포는 그 기준을 담을 그릇이에요. 처음엔 우리가 넣어 둔 기준으로 시작하고,
쓰면서 내 기준으로 바꿔 가다 보면 결국 **나만의 템플릿**이 돼요.

## 이 키트로 도달할 두 가지 목표

1. **팀 Figma(디자인 시스템 + 프로토타입 + 유저플로우)를 바탕으로, 배포된 링크에서 유저플로우를 직접 테스트한다.** (더미데이터 포함)
2. **스킬·서브에이전트를 이해하고 고쳐 보며, 내 업무 과정에서 무엇을 바꿀 수 있을지 찾는다.**

> 에디터는 **VS Code 또는 Cursor** 중 가진 걸 쓰면 돼요.

> 코드를 몰라도 돼요. VS Code의 **Claude Code** 또는 **Codex** 패널에 **“시작하자”** 라고 보내면 AI가 순서대로 안내해요.
> 두 도구 모두 지원해요. 규칙·스킬은 하나로 관리되고 양쪽에서 똑같이 쓰여요.

---

## 왜 이 레포에서 시작하나요

| 지금까지 | 이 레포로 |
|---|---|
| Figma에서 넘기고, 코드는 개발자가 옮겨요 | 내가 AI와 대화하며 직접 코드로 옮겨요 |
| 3px 같은 어긋남을 개발 단계에서 늦게 발견해요 | AI가 파일을 고칠 때마다 자동 검사가 바로 알려 줘요 |
| 구현된 화면은 배포돼야 볼 수 있어요 | `/playground`에서 내 컴포넌트를 바로 눌러 봐요 |
| 같은 피드백을 매번 말로 반복해요 | 반복되는 부탁은 **스킬**로 굳혀 다음부터 한 마디로 |
| 노하우가 내 머릿속에만 있어요 | 스킬·규칙이 레포에 남아 팀과 다음 프로젝트로 이어져요 |

## 이 레포로 할 수 있는 것

1. **Figma Variables → 코드 토큰** 가져오기
2. **Figma 컴포넌트 → 코드 컴포넌트** 만들기 (버튼부터 하나씩)
3. **`/playground`** 에서 모든 상태를 눌러 보고 Figma와 대조하기
4. **4px 그리드·토큰 규칙**을 자동으로 지키기 (어긋나면 고치는 곳은 Figma)
5. **Vercel**로 배포해서 팀에게 주소로 공유하기
6. 반복되는 일을 **스킬·서브에이전트**로 만들어 **나만의 템플릿**으로 키우기

## 시작하기

1. 이 페이지 오른쪽 위 **Use this template › Create a new repository** → 내 계정에 레포 만들기
2. 내 레포 화면에서 초록색 **Code** 버튼 › HTTPS 주소 복사
3. VS Code에서 빈 작업 폴더를 열고 Claude Code(또는 Codex) 패널에:
   `이 레포를 여기에 클론하고 VS Code로 열어줘: [붙여넣기]`
4. 클론된 폴더를 연 뒤 같은 패널에: **`시작하자`**

준비물(VS Code, Git, Node.js, 그리고 Claude Code 확장 + Claude 구독 **또는** Codex 확장 + ChatGPT 계정)은 함께 받은 가이드 장표를 따라 설치해요. 장표는 Claude Code 편과 Codex 편이 따로 있어요.

## Claude Code와 Codex

| | Claude Code | Codex |
|---|---|---|
| 사내 규정 | `CLAUDE.md` → `AGENTS.md` | `AGENTS.md` |
| 스킬 | `.claude/skills/` (원본) | `.agents/skills/` (자동 복사본) |
| 서브에이전트 | `.claude/agents/*.md` (원본) | `.codex/agents/*.toml` (자동 생성) |
| 스킬 부르기 | `/스킬이름` | `$스킬이름` |
| Figma 연결 | `.mcp.json` → `/mcp`에서 로그인 | `.codex/config.toml` → `codex mcp login figma` |
| 자동 검사 훅 | `.claude/settings.json` | `.codex/hooks.json` (처음에 `/hooks`에서 신뢰) |

원본은 `.claude/` 하나예요. `npm run sync`가 Codex용 복사본을 만들고, 파일을 고치면 훅이 자동으로 맞춰요.

## 성장 경로

이 키트는 **쓰는 것**에서 끝나지 않고 **내 것으로 바꾸는 것**까지가 목표예요.

| 단계 | 하는 일 | 다 됐다는 신호 |
|---|---|---|
| Lv.1 따라 하기 | “시작하자”로 1~10단계 완주 | 배포 링크에서 유저플로우를 테스트했어요 |
| Lv.2 규칙 고치기 | `AGENTS.md`를 내 팀 기준으로 수정 | 같은 지적을 두 번 하지 않아요 |
| Lv.3 스킬 만들기 | 반복 부탁 하나를 스킬로 | `/내스킬`(Codex는 `$내스킬`) 한 마디에 끝나요 |
| Lv.4 동료 만들기 | 검토 일을 서브에이전트로 | 결과 보고만 받아요 |
| Lv.5 내 템플릿 | 내 레포를 템플릿으로 공개 | 동료가 내 레포에서 시작해요 |

자세한 방법은 [`docs/`](docs)에 있어요.
- [스킬 만들기 가이드](docs/1-skill-guide.md)
- [서브에이전트 만들기 가이드](docs/2-subagent-guide.md)
- [나만의 템플릿으로 키우기](docs/3-my-template.md)

## 들어 있는 것

| 위치 | 무엇 |
|---|---|
| `AGENTS.md` | AI(팀장)가 항상 먼저 읽는 사내 규정 (진행 순서, 디자인 규칙, 안전 규칙). Claude Code는 `CLAUDE.md`가 이 파일을 불러와요 |
| `app/globals.css` | 디자인 토큰 (Figma Variables가 들어갈 곳) |
| `components/ui/Button.tsx` | 예시 컴포넌트 |
| `app/playground/` | `/playground` 디자인 시스템 확인 페이지 |
| `app/prototype/` | `/prototype` 유저플로우 테스트 페이지 |
| `mocks/` | 더미데이터 |
| `.claude/skills/` | 스킬 10개 원본 (아래 표) · Codex용 복사본은 `.agents/skills/` |
| `.claude/agents/figma-reviewer.md` | Figma 대조 검수 서브에이전트 (읽기 전용) · Codex용은 `.codex/agents/` |
| `.claude/settings.json`, `.codex/hooks.json` | AI가 파일을 고칠 때마다 4px·색 규칙 검사 + 동기화하는 훅 |
| `.mcp.json`, `.codex/config.toml` | Figma MCP 서버 연결 설정 |
| `scripts/check-design.mjs` | 규칙 검사 스크립트 (`npm run check`) |
| `design-system/PROGRESS.md` | 진행 체크리스트 |
| `docs/` | 스킬·서브에이전트·템플릿 가이드, 스킬 아이디어 메모 |

### 처음부터 들어 있는 스킬과 서브에이전트

| 이름 | 한 마디로 |
|---|---|
| `figma-sync` | Figma 변수를 코드 토큰으로 |
| `build-component` | Figma 컴포넌트를 코드 컴포넌트로 |
| `grid-check` | 4px 그리드·토큰 규칙 검사 |
| `playground-polish` | /playground를 보기 편하게 |
| `ship` | 커밋·푸시·Vercel 배포 |
| `new-skill` | 반복되는 부탁을 새 스킬·서브에이전트로 |
| `build-screen` | Figma 화면을 프로토타입으로 만들고 유저플로우대로 연결 |
| `dummy-data` | 화면을 채울 더미데이터 |
| `flow-check` | 배포 링크에서 유저플로우 테스트·결과 정리 |
| `my-template` | 이 레포를 나만의 템플릿으로 정리 |
| `figma-reviewer` (서브에이전트) | Figma와 나란히 대조 검수 |

## 규칙 한 줄 요약

토큰만 쓰고, 4px 그리드를 지키고, **Figma와 다르면 고치는 곳은 항상 Figma**.

## 명령어 (AI가 대신 실행해요)

```bash
npm install      # 처음 한 번
npm run dev      # 미리보기: http://localhost:3000/playground
npm run check    # 4px 그리드·색 규칙 검사
npm run check:skills  # 스킬·서브에이전트 규격 검사 (Agent Skills 표준)
npm run sync     # Claude Code ↔ Codex 스킬·서브에이전트 동기화
npm run build    # 배포 전 확인
```
