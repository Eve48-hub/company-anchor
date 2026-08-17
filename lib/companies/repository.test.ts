import { describe, expect, it } from "vitest"

import { getCompanyBySlug, searchCompanies } from "./repository"

const repository = [
  {
    slug: "doitnow",
    name: "주식회사 두잇나우",
    englishName: "DoITNow Inc.",
    aliases: ["두잇나우", "DoITNow"],
    status: "영업중" as const,
    industry: "AI·소프트웨어",
    location: "경기도",
    foundedAt: "2020-08-07",
    website: "https://doitnow.ai.kr",
    description: "기업의 업무 전환을 돕는 AI 솔루션 기업",
    source: { label: "샘플 데이터", provider: "기업앵커", url: "https://example.com", asOf: "2026-08-15", retrievedAt: "2026-08-15T00:00:00.000Z", isSample: true, indexingApproved: false },
    financials: [],
  },
]

describe("searchCompanies", () => {
  it("회사명 일부 검색을 지원한다", () => {
    expect(searchCompanies(repository, "두잇")).toHaveLength(1)
  })

  it("영문명과 별칭을 대소문자와 무관하게 검색한다", () => {
    expect(searchCompanies(repository, "doitnow")[0]?.slug).toBe("doitnow")
  })

  it("빈 검색어는 전체 목록을 반환한다", () => {
    expect(searchCompanies(repository, "")).toEqual(repository)
  })
})

describe("getCompanyBySlug", () => {
  it("slug가 일치하는 회사를 반환한다", () => {
    expect(getCompanyBySlug(repository, "doitnow")?.name).toBe("주식회사 두잇나우")
  })

  it("없는 slug에는 undefined를 반환한다", () => {
    expect(getCompanyBySlug(repository, "missing")).toBeUndefined()
  })
})
