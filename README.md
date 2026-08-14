# 기업앵커 (Company Anchor)

> 기업을 읽는 가장 빠른 기준점

무료 기업 기본정보와 재무정보를 기반으로 기업 사용자가 검색하고, 관심기업을 저장하고, 다시 방문할 수 있는 B2B 자체 채널 실험입니다.

## 1차 배포

- Demo: https://eve48-hub.github.io/company-anchor/
- 상태: UI·정보구조 검증용 샘플 MVP
- 데이터: 모든 기업·재무 수치는 화면 검증용 샘플이며 실제 API 데이터가 아닙니다.

## 구현 범위

- v0 [Anchor Landing Page](https://v0.app/templates/anchor-landing-page-IKQcK2VoySl) 시각 시스템 기반 랜딩
- 기업 검색
- 기업 상세 대시보드
- 재무 요약·최근 3년 표
- 데이터 출처·샘플 상태 표시
- 정적 생성과 GitHub Pages 배포

## 아직 구현하지 않은 범위

- OpenDART·공공데이터 실제 API
- 회원가입·관심기업 저장
- 알림·뉴스레터
- 기업 소속 인증
- 실제 SEO 대량 페이지

실제 API 개발은 [`docs/API-FEASIBILITY.md`](docs/API-FEASIBILITY.md)의 GO 조건을 통과한 뒤 시작합니다. 공식 출처별 상세 조사와 호출·권리 조건은 [`docs/API-FEASIBILITY-RESEARCH.md`](docs/API-FEASIBILITY-RESEARCH.md)에 있습니다.

## 기술

- Next.js 16.3.1
- React 19
- TypeScript strict
- Tailwind CSS 4
- Vitest
- GitHub Pages

## 로컬 실행

```bash
npm install
npm test
npm run lint
npm run dev
```

## 검증

```bash
npm test
npm run lint
npm run build
```

## 디렉터리

```text
app/                 routes and metadata
components/          landing, search, company and shared UI
lib/companies/       company domain types, sample data and repository
lib/format.ts        financial presentation rules
docs/                API gates, decisions, template provenance
.github/workflows/   test, build and GitHub Pages deploy
```

## 데이터 원칙

- `0원`, `적자`, `정보 없음`, `미수집`, `비공개`를 섞지 않습니다.
- 출처·기준일·연결/별도 여부가 없는 실제 수치는 공개하지 않습니다.
- API 키와 외부 원문 개인정보를 저장소·로그에 남기지 않습니다.

## Template provenance

See [`docs/TEMPLATE-SOURCE.md`](docs/TEMPLATE-SOURCE.md). Product copy, company data, and information architecture are independently authored.
