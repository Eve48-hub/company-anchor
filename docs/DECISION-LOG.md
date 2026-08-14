# Decision log

## 2026-08-15 — Service name

- Decision: `기업앵커` / `Company Anchor`
- Tagline: `기업을 읽는 가장 빠른 기준점`
- Repository: `company-anchor`
- Status: 가칭. 상표·도메인 정식 검토 전 MVP에 사용.

## 2026-08-15 — UI source

- Decision: v0 Anchor Landing Page의 시각 시스템을 사용한다.
- Source: https://v0.app/templates/anchor-landing-page-IKQcK2VoySl
- Preserve: dark Baltic Sea palette, Keppel accent, grid hero, terminal-style panel, bento cards, motion.
- Replace: third-party copy, logos, testimonials, CLI product concepts.

## 2026-08-15 — Information architecture

- Decision: 기업 상세의 위치·순서는 더VC 사용자 경험을 고충실도로 벤치마킹한다.
- Constraint: 더VC 브랜드, 문구, 데이터, 이미지, 코드, 고유 그래픽은 사용하지 않는다.

## 2026-08-15 — First release scope

- Decision: 실제 API 없이 샘플 MVP를 먼저 배포한다.
- Reason: UI와 정보구조를 검증하되, API feasibility gate를 우회하지 않기 위함.
- Label: 모든 샘플 재무 수치를 `샘플 데이터`로 표시.

## 2026-08-15 — Deployment

- Decision: Stage 1은 GitHub Pages 정적 배포.
- Reason: 서버 비밀키·DB가 없는 샘플 MVP를 저비용으로 검증.
- Migration: Stage 2 공식 API 연동 시 서버 런타임으로 전환.
