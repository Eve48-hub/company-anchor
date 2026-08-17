import { describe, expect, it } from "vitest"

import type { Company } from "./types"
import { mergeCompanyCatalog } from "./catalog"

const company = (slug: string, isSample: boolean): Company => ({
  slug,
  name: slug,
  englishName: slug,
  aliases: [],
  status: "영업중",
  industry: "정보 없음",
  location: "정보 없음",
  foundedAt: "정보 없음",
  website: "",
  description: "",
  source: {
    label: isSample ? "샘플" : "공식",
    provider: isSample ? "기업앵커" : "금융위원회",
    url: "https://example.com",
    asOf: "2026-08-15",
    retrievedAt: "2026-08-15T00:00:00.000Z",
    isSample,
    indexingApproved: false,
  },
  financials: [],
})

describe("기업 카탈로그", () => {
  it("같은 slug에서는 공식 데이터를 우선하고 공식 기업을 먼저 정렬한다", () => {
    const result = mergeCompanyCatalog({
      official: [company("same", false), company("official", false)],
      sample: [company("same", true), company("sample", true)],
    })

    expect(result.map((item) => [item.slug, item.source.isSample])).toEqual([
      ["same", false],
      ["official", false],
      ["sample", true],
    ])
  })
})
