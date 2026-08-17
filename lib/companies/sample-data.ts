import type { Company } from "./types"

const sampleSource = {
  label: "화면 검증용 샘플 데이터",
  provider: "기업앵커",
  url: "https://eve48-hub.github.io/company-anchor/",
  asOf: "2026-08-15",
  retrievedAt: "2026-08-15T00:00:00.000Z",
  isSample: true,
  indexingApproved: false,
} as const

export const sampleCompanies: Company[] = [
  {
    slug: "doitnow",
    name: "주식회사 두잇나우",
    englishName: "DoITNow Inc.",
    aliases: ["두잇나우", "DoITNow"],
    status: "영업중",
    industry: "AI·소프트웨어",
    location: "경기도",
    foundedAt: "2020-08-07",
    website: "https://doitnow.ai.kr",
    description: "기업의 업무 전환과 콘텐츠 산업의 생산성을 높이는 AI 솔루션을 만드는 기업입니다.",
    source: sampleSource,
    financials: [
      { year: 2025, revenue: 5_420_000_000, operatingIncome: 310_000_000, netIncome: 245_000_000, assets: 3_180_000_000, liabilities: 1_120_000_000, equity: 2_060_000_000, statementType: "샘플" },
      { year: 2024, revenue: 3_860_000_000, operatingIncome: 120_000_000, netIncome: 96_000_000, assets: 2_410_000_000, liabilities: 980_000_000, equity: 1_430_000_000, statementType: "샘플" },
      { year: 2023, revenue: 2_610_000_000, operatingIncome: -80_000_000, netIncome: -105_000_000, assets: 1_820_000_000, liabilities: 740_000_000, equity: 1_080_000_000, statementType: "샘플" },
    ],
  },
  {
    slug: "anchor-labs",
    name: "앵커랩스",
    englishName: "Anchor Labs",
    aliases: ["앵커 랩스", "Anchor"],
    status: "영업중",
    industry: "데이터 인프라",
    location: "서울특별시",
    foundedAt: "2021-03-15",
    website: "https://example.com",
    description: "기업 데이터의 수집·정규화·품질 검증을 돕는 샘플 기업입니다.",
    source: sampleSource,
    financials: [
      { year: 2025, revenue: 8_120_000_000, operatingIncome: 640_000_000, netIncome: 510_000_000, assets: 5_200_000_000, liabilities: 1_760_000_000, equity: 3_440_000_000, statementType: "샘플" },
      { year: 2024, revenue: 6_480_000_000, operatingIncome: 420_000_000, netIncome: 330_000_000, assets: 4_310_000_000, liabilities: 1_550_000_000, equity: 2_760_000_000, statementType: "샘플" },
    ],
  },
  {
    slug: "green-wave",
    name: "그린웨이브",
    englishName: "Green Wave Corp.",
    aliases: ["GreenWave"],
    status: "영업중",
    industry: "에너지·환경",
    location: "대전광역시",
    foundedAt: "2018-11-02",
    website: "https://example.com",
    description: "에너지 관리 소프트웨어를 제공하는 화면 검증용 샘플 기업입니다.",
    source: sampleSource,
    financials: [
      { year: 2025, revenue: 12_700_000_000, operatingIncome: 820_000_000, netIncome: 610_000_000, assets: 9_800_000_000, liabilities: 4_100_000_000, equity: 5_700_000_000, statementType: "샘플" },
    ],
  },
]
