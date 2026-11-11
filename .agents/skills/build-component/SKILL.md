---
name: build-component
description: Figma 컴포넌트(버튼, 인풋, 칩, 카드 등)를 components/ui의 코드 컴포넌트로 만들거나 Figma 기준으로 다시 맞추고, /playground에 확인 섹션을 추가한다. "이 버튼 만들어줘", "컴포넌트로 옮겨줘", "Figma랑 똑같이 맞춰줘" 같은 요청에 쓴다. 사용자가 Figma 링크와 함께 UI 조각을 코드로 만들어 달라고 하면 스킬 이름을 말하지 않아도 반드시 이 스킬을 쓴다.
---

# 컴포넌트 만들기

## 순서

1. **한 번에 하나만.** 사용자가 여러 개를 말하면 순서를 정해 하나씩 해요.
2. **Figma 읽기** — 컴포넌트 세트(모든 variant가 모인 프레임) 링크를 받아 `get_design_context`로 읽어요. `figma-log.md`를 먼저 확인해요.
3. **스펙 표 보여주기** — 만들기 전에 확인받아요.

   | 속성(Figma variant) | 값들 | 코드 prop |
   |---|---|---|
   | Type | Primary, Secondary | variant |
   | Size | S, M, L | size |
   | State | Default, Hover, Pressed, Disabled | (CSS 상태) |

4. **만들기** — `components/ui/<이름>.tsx` 한 파일. `components/ui/Button.tsx`의 구조(variants·sizes 객체)를 따라요.
5. **playground에 추가** — `app/playground/`에 `<이름>Playground.tsx`를 만들고 `page.tsx`에 섹션을 추가해요.
   - 위: 직접 조작해 보는 영역 (prop을 바꾸는 컨트롤 + 실제 클릭)
   - 아래: 모든 variant × size × state 조합 표
6. **검사** — `npm run check` → 오류 0을 확인하고, 사용자에게 `/playground`에서 눌러 보라고 안내.

## 규칙

- 토큰 클래스만 써요 (`bg-primary`, `rounded-md`, `p-4`). **#hex·rgb·임의값(`h-[42px]`) 금지.**
- Figma 값이 토큰이나 4px 스케일에 없으면, 우회하지 말고 사용자에게 알리고 “Figma를 고칠지, 토큰을 추가할지” 물어요. 토큰 추가는 `figma-sync`로.
- Hover·Pressed·Disabled·Focus 상태를 빠뜨리지 않아요. Figma에 없는 상태는 사용자에게 물어요.
- 새 라이브러리(Radix, shadcn 등)는 설치하지 않아요. 필요해 보이면 이유와 함께 제안만 해요.
