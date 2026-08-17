import { describe, expect, it } from "vitest"

import {
  buildFscCompanyUrl,
  mapFscCompany,
  parseFscCompanyResponse,
} from "./fsc-company"

const officialItem = {
  basDt: "20260814",
  crno: "1101110000000",
  corpNm: "삼성전자 주식회사",
  corpEnsnNm: "Samsung Electronics Co., Ltd.",
  enpRprFnm: "홍길동",
  corpRegMrktDcdNm: "유가증권시장",
  enpBsadr: "경기도 수원시 영통구",
  enpDtadr: "삼성로 129",
  enpHmpgUrl: "https://www.samsung.com/sec",
  sicNm: "통신 및 방송 장비 제조업",
  enpEstbDt: "19690113",
  enpEmpeCnt: "123456",
  enpMainBizNm: "전자제품 제조",
  enpStacMm: "12",
  fssCorpUnqNo: "00126380",
}

describe("금융위원회 기업기본정보 어댑터", () => {
  it("인코딩 여부가 다른 인증키를 한 번만 인코딩한다", () => {
    const raw = buildFscCompanyUrl({ serviceKey: "abc+/=", corpName: "삼성전자" })
    const encoded = buildFscCompanyUrl({ serviceKey: "abc%2B%2F%3D", corpName: "삼성전자" })

    expect(raw).toBe(encoded)
    expect(raw).toContain("ServiceKey=abc%2B%2F%3D")
    expect(raw).toContain("corpNm=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90")
    expect(raw).not.toContain("%252B")
  })

  it("공공데이터포털의 래핑된 배열 응답을 파싱한다", () => {
    const parsed = parseFscCompanyResponse({
      response: {
        header: { resultCode: "00", resultMsg: "NORMAL SERVICE." },
        body: { totalCount: 1, items: { item: [officialItem] } },
      },
    })

    expect(parsed).toEqual([officialItem])
  })

  it("단일 객체 응답도 배열로 정규화하고 API 오류는 거부한다", () => {
    expect(parseFscCompanyResponse({
      header: { resultCode: "00", resultMsg: "NORMAL SERVICE." },
      body: { items: { item: officialItem } },
    })).toEqual([officialItem])

    expect(() => parseFscCompanyResponse({
      response: { header: { resultCode: "30", resultMsg: "SERVICE KEY IS NOT REGISTERED" } },
    })).toThrow("SERVICE KEY IS NOT REGISTERED")
  })

  it("공식 응답을 공개 가능한 기업 모델로 변환하되 기본 noindex로 둔다", () => {
    const company = mapFscCompany({
      item: officialItem,
      slug: "samsung-electronics",
      retrievedAt: "2026-08-15T02:00:00.000Z",
    })

    expect(company).toMatchObject({
      slug: "samsung-electronics",
      name: "삼성전자 주식회사",
      englishName: "Samsung Electronics Co., Ltd.",
      representative: "홍길동",
      employeeCount: 123456,
      market: "유가증권시장",
      location: "경기도 수원시 영통구 삼성로 129",
      foundedAt: "1969-01-13",
      source: {
        provider: "금융위원회",
        isSample: false,
        indexingApproved: false,
        asOf: "2026-08-14",
      },
    })
    expect(company.financials).toEqual([])
    expect(JSON.stringify(company)).not.toContain("1101110000000")
  })
})
