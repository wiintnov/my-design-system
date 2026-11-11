---
name: ship
description: 작업한 내용을 검사 → 커밋 → 푸시 → PR 순서로 안전하게 올리고, Vercel 배포·미리보기 주소를 안내한다. "저장해줘", "올려줘", "배포해줘", "팀한테 보여주고 싶어", "PR 만들어줘", "주소 알려줘" 같은 요청에 쓴다. git 명령(커밋, 푸시, 브랜치)이 필요한 모든 상황에서 반드시 이 스킬을 쓴다.
---

# 저장하고 배포하기

## 매번 하는 것

1. **브랜치 확인** — `main`이면 먼저 `design/<작업이름>` 브랜치를 만들어요.
2. **검사** — `npm run check`와 `npm run build`. 실패하면 멈추고 쉬운 말로 이유를 설명해요.
3. **커밋** — 바뀐 내용을 화면 기준으로 요약해 보여 주고, 확인받고 커밋해요. 메시지는 한국어. 예: `버튼: Figma 기준으로 padding 16px, 모서리 8px로 맞춤`
4. **푸시** — `git push -u origin <브랜치>`.
5. **PR (원할 때)** — `gh pr create`로 만들고, 본문에 바뀐 화면 설명과 /playground 확인 방법을 적어요.
6. Vercel이 연결돼 있으면 PR마다 **미리보기 주소**가 생겨요. `gh pr checks` 또는 PR 화면에서 주소를 찾아 알려줘요.
7. **머지 (원할 때)** — 사용자가 “합쳐줘/머지해줘”라고 하면, 바뀐 화면을 한 번 더 요약해 확인받고 `gh pr merge --squash --delete-branch`. 머지해야 Vercel 기본 주소(main)에 반영된다는 것도 알려줘요.

## 처음 한 번: Vercel 연결 (사용자가 브라우저에서 직접)

AI는 계정 생성·로그인을 대신하지 않아요. 아래를 안내만 해요.

1. vercel.com → **Continue with GitHub**로 가입 (Hobby 무료 플랜)
2. **Add New… › Project** → 이 레포 옆 **Import** (목록에 레포가 없으면 **Adjust GitHub App Permissions** › 이 레포 선택)
3. 설정은 그대로 두고 **Deploy**
4. 끝나면 `https://<프로젝트>.vercel.app/playground` 주소를 `design-system/PROGRESS.md` 메모에 적어요.

이후로는 `main`에 머지될 때마다 자동으로 다시 배포돼요.

## 규칙

- `git push --force`, `git reset --hard`는 쓰지 않아요. 필요해 보이면 이유를 설명하고 확인받아요.
- `main`에 직접 푸시하지 않아요.
