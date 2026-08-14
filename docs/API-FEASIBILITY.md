# API feasibility matrix

Updated: 2026-08-15

## Decision

- **조건부 GO:** `금융위원회 기업기본정보 → OpenDART → 국세청 사업자상태` 3계층을 우선 검증한다.
- **초기 제품 범위:** 대한민국 전체 사업자가 아니라 **공시기업 및 식별 가능한 한국 법인**이다.
- **무료 뉴스:** BIGKinds 신규 OPEN API 신청 중단으로 1차 MVP에서는 NO-GO다.
- **특허·R&D:** KIPRIS Plus·NTIS는 핵심 제품 지표 확인 후 DEFER한다.
- 공식 출처별 상세 조사: [`API-FEASIBILITY-RESEARCH.md`](API-FEASIBILITY-RESEARCH.md)

1차 공개물은 **UI·정보구조 검증용 샘플 MVP**로 한정한다. 아래 P0 데이터의 사용권·정합성·비용이 검증되기 전에는 실제 기업정보 서비스로 표시하지 않는다.

## Candidate matrix

| 영역 | 후보 | 공식 문서 | 인증 | 현재 판단 | 다음 검증 |
|---|---|---|---|---|---|
| 공시기업 식별 | OpenDART 고유번호 | https://opendart.fss.or.kr/guide/main.do?apiGrpCd=DS001 | API 인증키 | GO 후보 | 기업 20개 corp_code 매칭률 |
| 기업 개황 | OpenDART 기업개황 | https://opendart.fss.or.kr/guide/detail.do?apiGrpCd=DS001&apiId=2019002 | API 인증키 | GO 후보 | 대표자·주소·업종 누락률 |
| 공시기업 재무 | OpenDART 단일회사 전체 재무제표 | https://opendart.fss.or.kr/guide/detail.do?apiGrpCd=DS003&apiId=2019020 | API 인증키 | GO 후보 | CFS/OFS, 정정공시, 계정 매핑 |
| 사업자 상태 | 국세청 사업자등록정보 상태조회 | https://www.data.go.kr/data/15081808/openapi.do | 공공데이터포털 키 | HOLD | 저장·캐싱·재공개 범위 확인 |
| 특허 | KIPRIS Plus | https://plus.kipris.or.kr/ | 신청·계약 확인 | P2 HOLD | 비용·재배포권 확인 |
| 국가 R&D | NTIS Open API | https://www.ntis.go.kr/rndgate/eg/un/ra/mng.do | 신청 확인 | P2 HOLD | 기업 식별키·공개 조건 확인 |
| 뉴스 | 정식 뉴스 API | 공급사 비교 필요 | 공급사별 | P1 HOLD | 제목·요약·원문 링크 이용권 |

## Required fields

### Company identity

- `company_id`: 내부 불변 식별자
- `corp_code`: OpenDART 공시기업 식별자, nullable
- `business_number_hash`: 원문 노출 여부 법무 확인 전 해시만 검토
- `name`, `english_name`, `aliases`
- `status`, `industry`, `address`, `founded_at`, `website`

### Financial record

- `company_id`
- `fiscal_year`
- `report_code`
- `statement_type`: CFS/OFS
- `account_code`, `account_name`
- `amount`, `currency`, `unit`
- `source_url`, `source_id`
- `fetched_at`, `corrected_at`
- `is_estimated`

## Sample verification

검증 표본은 다음을 섞어 최소 20개로 구성한다.

- KOSPI·KOSDAQ·KONEX
- 최근 상장·상장폐지·합병
- 연결재무와 별도재무 모두 존재
- 당기 적자·매출 0·재무 누락
- 법인명 변경·동명 기업
- 12월 결산 외 기업

## GO gate

- 기업 식별 성공률 ≥ 90%
- 핵심 재무 필드 커버리지 ≥ 80%
- 원천 대조 정확도 ≥ 98%
- 연결·별도 혼합 0건
- 0원·정보 없음 오표기 0건
- 공개 표시·캐싱·재사용 가능 근거 확보
- 1,000개 기업 기준 월비용 승인 범위
- 대체 공급처 또는 실패 시 축소안 존재

## HOLD / PIVOT / STOP

- **HOLD:** 기술적으로 가능하지만 약관·비용·재배포권 미확인
- **PIVOT:** 전체 비상장 커버리지가 불가하면 공시기업부터 출시
- **STOP:** 핵심 재무의 적법한 공개권을 확보할 수 없거나 운영비가 실험가치를 초과

## Secrets

- 키는 서버 환경변수에서만 읽는다.
- 브라우저 번들·Git·로그에 값을 남기지 않는다.
- `.env.example`에는 변수명만 기록한다.
