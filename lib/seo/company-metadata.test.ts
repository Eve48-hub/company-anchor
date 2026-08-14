import { describe, expect, it } from "vitest"

import type { Company } from "@/lib/companies/types"
import { buildCompanyMetadata, getCompanyIndexability } from "./company-metadata"

const company: Company = {
  slug: "test-company",
  name: "테스트기업",
  englishName: "Test Company",
  aliases: [],
  status: "영업중",
  industry: "소프트웨어",
  location: "서울특별시",
  foundedAt: "2021-01-01",
  website: "https://example.com",
  description: "테스트 기업 설명입니다.",
  source: { label: "화면 검증용 샘플 데이터", asOf: "2026-08-15", isSample: true, indexingApproved: false },
  financials: [{ year: 2025, revenue: 1, operatingIncome: 0, netIncome: null, assets: 1, liabilities: 0, equity: 1, statementType: "샘플" }],
}

describe("company SEO", () => {
  it("샘플 또는 명시적 승인이 없는 기업은 색인을 차단한다", () => {
    expect(getCompanyIndexability(company)).toEqual({ index: false, follow: false })
    expect(buildCompanyMetadata(company, "profile").robots).toEqual({ index: false, follow: false })
    const realButUnapproved = { ...company, source: { ...company.source, isSample: false } }
    expect(getCompanyIndexability(realButUnapproved)).toEqual({ index: false, follow: false })
    const approved = { ...realButUnapproved, source: { ...realButUnapproved.source, indexingApproved: true } }
    expect(getCompanyIndexability(approved)).toEqual({ index: true, follow: true })
  })

  it("기업·재무 페이지에 서로 다른 제목과 canonical을 만든다", () => {
    const profile = buildCompanyMetadata(company, "profile")
    const financials = buildCompanyMetadata(company, "financials")

    expect(profile.title).toContain("기업정보")
    expect(profile.alternates?.canonical).toBe("https://eve48-hub.github.io/company-anchor/company/test-company/")
    const unsorted = { ...company, financials: [{ ...company.financials[0], year: 2023 }, { ...company.financials[0], year: 2025 }] }
    expect(buildCompanyMetadata(unsorted, "financials").title).toContain("2025년 재무")
    expect(financials.title).toContain("2025년 재무")
    expect(financials.alternates?.canonical).toBe("https://eve48-hub.github.io/company-anchor/company/test-company/financials/")
  })
})
