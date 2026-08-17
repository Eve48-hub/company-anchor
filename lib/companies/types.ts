export type CompanyStatus = "영업중" | "휴업" | "폐업" | "정보 없음"

export interface DataSource {
  label: string
  provider: string
  url: string
  asOf: string
  retrievedAt: string
  isSample: boolean
  indexingApproved: boolean
}

export interface FinancialRecord {
  year: number
  revenue: number | null
  operatingIncome: number | null
  netIncome: number | null
  assets: number | null
  liabilities: number | null
  equity: number | null
  statementType: "연결" | "별도" | "샘플"
}

export interface Company {
  slug: string
  name: string
  englishName: string
  aliases: string[]
  status: CompanyStatus
  industry: string
  location: string
  foundedAt: string
  website: string
  description: string
  representative?: string
  employeeCount?: number | null
  market?: string
  mainBusiness?: string
  fiscalMonth?: number | null
  source: DataSource
  financialSource?: DataSource
  financials: FinancialRecord[]
}
