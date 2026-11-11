---
name: figma-sync
description: Figma Variables(색·모서리·간격 변수)를 읽어 app/globals.css의 디자인 토큰으로 옮기고, 그리드 밖 값을 표로 알려 준다. "토큰 가져와줘", "Figma 색 옮겨줘", "변수 동기화", "Figma에서 색 바꿨어" 같은 요청에 쓴다. 사용자가 스킬 이름을 말하지 않아도 Figma의 색·간격·모서리 값이 코드에 들어가거나 바뀌어야 하는 상황이면 반드시 이 스킬을 쓴다.
---

# Figma 토큰 가져오기

## 순서

1. **먼저 기록 확인** — `design-system/figma-log.md`에 같은 파일의 최근 기록이 있으면, 다시 부를지 사용자에게 물어요. (MCP 호출 아끼기)
2. **노드 받기** — 사용자에게 Figma 링크를 받아요. 없으면 “Figma에서 변수가 쓰인 프레임 선택 › 우클릭 › Copy link to selection” 안내.
3. **읽기** — Figma MCP의 `get_variable_defs`로 변수를 읽어요. 비어 있으면 `get_design_context`로 대신 읽고, 그 사실을 사용자에게 말해요.
4. **기록** — 읽은 값을 `figma-log.md`에 날짜·fileKey와 함께 표로 적어요.
5. **변환 표 보여주기** — 바꾸기 전에 아래 표를 먼저 보여 주고 확인받아요.

   | Figma 변수 | 값 | 코드 토큰 | 상태 |
   |---|---|---|---|
   | color/primary | #3182F6 | --color-primary | 새로 추가 |
   | radius/sm | 3 | --radius-sm | ⚠ 그리드 밖 |

6. **적용** — `app/globals.css`의 `@theme static` 블록만 고쳐요.
7. **확인** — `npm run check` 실행 → 사용자에게 `/playground`를 새로고침해 보라고 안내.

## 규칙

- 이름: Figma `color/primary/pressed` → `--color-primary-pressed` (슬래시는 하이픈, 소문자).
- 접두어: 색 `--color-`, 모서리 `--radius-`, 간격 `--spacing-`, 글꼴 `--font-`.
- 값은 **Figma hex 그대로**. 반올림·oklch 변환 금지.
- `--color-*: initial;` 줄은 지우지 않아요 (기본 팔레트 끄기).
- **그리드 밖 값(예: 3px)을 발견하면 임의로 4px로 바꾸지 않아요.** 표에 ⚠로 표시하고 “Figma에서 고칠까요, 이대로 둘까요?”라고 물어요. 고치는 곳은 Figma예요.
- Figma에 없는 토큰을 지어내지 않아요. 예시 토큰 중 Figma에 없는 것은 지울지 물어요.
