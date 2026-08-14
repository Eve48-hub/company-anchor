import { describe, expect, it } from "vitest"

import type { FinancialRecord } from "@/lib/companies/types"
import { convertFinancialValue, getRevenueBarHeight, selectFinancialRecords } from "./presentation"

const records: FinancialRecord[] = [
  { year: 2025, revenue: 12_000_000_000, operatingIncome: 1_000_000_000, netIncome: 700_000_000, assets: 9_000_000_000, liabilities: 3_000_000_000, equity: 6_000_000_000, statementType: "샘플" },
  { year: 2024, revenue: 10_000_000_000, operatingIncome: 800_000_000, netIncome: 500_000_000, assets: 8_000_000_000, liabilities: 3_000_000_000, equity: 5_000_000_000, statementType: "샘플" },
  { year: 2023, revenue: null, operatingIncome: -100_000_000, netIncome: -200_000_000, assets: 7_000_000_000, liabilities: 3_000_000_000, equity: 4_000_000_000, statementType: "샘플" },
]

describe("selectFinancialRecords", () => {
  it("최신 연도순으로 요청 개수만 반환한다", () => {
    expect(selectFinancialRecords(records, 2).map((record) => record.year)).toEqual([2025, 2024])
  })

  it("원본 배열 순서를 변경하지 않는다", () => {
    const unsorted = [records[1], records[0]]
    selectFinancialRecords(unsorted, 2)
    expect(unsorted.map((record) => record.year)).toEqual([2024, 2025])
  })
})

describe("convertFinancialValue", () => {
  it("원·백만원·억원 단위를 정확히 변환한다", () => {
    expect(convertFinancialValue(100_000_000, "원")).toBe(100_000_000)
    expect(convertFinancialValue(100_000_000, "백만원")).toBe(100)
    expect(convertFinancialValue(100_000_000, "억원")).toBe(1)
  })

  it("정보 없음과 0원을 구분한다", () => {
    expect(convertFinancialValue(null, "억원")).toBeNull()
    expect(convertFinancialValue(0, "억원")).toBe(0)
  })
})

describe("getRevenueBarHeight", () => {
  it("정보 없음·0·음수 매출을 양수 막대로 왜곡하지 않는다", () => {
    expect(getRevenueBarHeight(null, 100)).toBeNull()
    expect(getRevenueBarHeight(0, 100)).toBe(0)
    expect(getRevenueBarHeight(-10, 100)).toBe(0)
    expect(getRevenueBarHeight(25, 100)).toBe(25)
    expect(getRevenueBarHeight(25, 0)).toBe(0)
  })
})
