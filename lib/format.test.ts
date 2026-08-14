import { describe, expect, it } from "vitest"

import { formatKoreanCurrency, formatYearOverYear } from "./format"

describe("formatKoreanCurrency", () => {
  it("null을 정보 없음으로 표시한다", () => {
    expect(formatKoreanCurrency(null)).toBe("정보 없음")
  })

  it("0원을 정보 없음과 구분한다", () => {
    expect(formatKoreanCurrency(0)).toBe("0원")
  })

  it("억원 단위 금액을 읽기 쉽게 표시한다", () => {
    expect(formatKoreanCurrency(5_420_000_000)).toBe("54.2억원")
  })

  it("음수 금액을 적자로 표시한다", () => {
    expect(formatKoreanCurrency(-80_000_000)).toBe("-0.8억원")
  })
})

describe("formatYearOverYear", () => {
  it("기준값이 없거나 0이면 계산하지 않는다", () => {
    expect(formatYearOverYear(100, 0)).toBe("—")
    expect(formatYearOverYear(null, 100)).toBe("—")
  })

  it("전년 대비 증감률을 표시한다", () => {
    expect(formatYearOverYear(150, 100)).toBe("+50.0%")
    expect(formatYearOverYear(80, 100)).toBe("-20.0%")
  })
})
