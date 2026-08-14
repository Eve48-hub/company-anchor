export type CompanyStatus = "영업중" | "휴업" | "폐업"

export interface DataSource {
  label: string
  asOf: string
  isSample: boolean
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
  source: DataSource
  financials: FinancialRecord[]
}
