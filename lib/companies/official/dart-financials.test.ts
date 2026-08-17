import { describe, expect, it } from "vitest"

import { mapDartFinancials, parseDartAmount } from "./dart-financials"

const rows = [
  { account_nm: "수익(매출액)", thstrm_amount: "1,200", frmtrm_amount: "1,000", bfefrmtrm_amount: "800" },
  { account_nm: "영업이익", thstrm_amount: "(100)", frmtrm_amount: "50", bfefrmtrm_amount: "-20" },
  { account_nm: "당기순이익(손실)", thstrm_amount: "90", frmtrm_amount: "40", bfefrmtrm_amount: "" },
  { account_nm: "자산총계", thstrm_amount: "5,000", frmtrm_amount: "4,500", bfefrmtrm_amount: "4,000" },
  { account_nm: "부채총계", thstrm_amount: "2,000", frmtrm_amount: "1,900", bfefrmtrm_amount: "1,800" },
  { account_nm: "자본총계", thstrm_amount: "3,000", frmtrm_amount: "2,600", bfefrmtrm_amount: "2,200" },
]

describe("OpenDART 재무 어댑터", () => {
  it("쉼표·괄호 음수·빈 값을 정확히 해석한다", () => {
    expect(parseDartAmount("1,234")).toBe(1234)
    expect(parseDartAmount("(1,234)")).toBe(-1234)
    expect(parseDartAmount("-")).toBeNull()
    expect(parseDartAmount("")).toBeNull()
  })

  it("계정명 변형을 최근 3개년 연결 재무로 매핑한다", () => {
    expect(mapDartFinancials({ rows, businessYear: 2025, statementType: "연결" })).toEqual([
      { year: 2025, revenue: 1200, operatingIncome: -100, netIncome: 90, assets: 5000, liabilities: 2000, equity: 3000, statementType: "연결" },
      { year: 2024, revenue: 1000, operatingIncome: 50, netIncome: 40, assets: 4500, liabilities: 1900, equity: 2600, statementType: "연결" },
      { year: 2023, revenue: 800, operatingIncome: -20, netIncome: null, assets: 4000, liabilities: 1800, equity: 2200, statementType: "연결" },
    ])
  })

  it("모든 핵심 값이 비어 있는 기간은 노출하지 않는다", () => {
    const empty = rows.map((row) => ({ ...row, thstrm_amount: "", frmtrm_amount: "", bfefrmtrm_amount: "" }))
    expect(mapDartFinancials({ rows: empty, businessYear: 2025, statementType: "별도" })).toEqual([])
  })
})
