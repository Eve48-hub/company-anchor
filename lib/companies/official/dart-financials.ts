import type { FinancialRecord } from "../types"

export interface DartFinancialRow {
  account_nm?: string
  thstrm_amount?: string
  frmtrm_amount?: string
  bfefrmtrm_amount?: string
  [key: string]: unknown
}

type StatementType = "연결" | "별도"
type Metric = Exclude<keyof FinancialRecord, "year" | "statementType">
type AmountField = "thstrm_amount" | "frmtrm_amount" | "bfefrmtrm_amount"

const ACCOUNT_PATTERNS: Record<Metric, RegExp[]> = {
  revenue: [/^매출액$/, /^수익\(매출액\)$/, /^영업수익$/, /^매출$/],
  operatingIncome: [/^영업이익(?:\(손실\))?$/, /^영업손익$/],
  netIncome: [/^당기순이익(?:\(손실\))?$/, /^당기순손익$/, /^연결당기순이익(?:\(손실\))?$/],
  assets: [/^자산총계$/],
  liabilities: [/^부채총계$/],
  equity: [/^자본총계$/],
}

export function parseDartAmount(value: string | undefined): number | null {
  const raw = value?.trim()
  if (!raw || raw === "-") return null
  const negative = raw.startsWith("(") && raw.endsWith(")")
  const normalized = raw.replace(/[(),\s]/g, "")
  const parsed = Number(normalized)
  if (!Number.isFinite(parsed)) return null
  return negative ? -Math.abs(parsed) : parsed
}

function normalizeAccountName(value: string | undefined) {
  return value?.replace(/\s+/g, "").trim() ?? ""
}

function valueFor(rows: DartFinancialRow[], metric: Metric, field: AmountField) {
  for (const pattern of ACCOUNT_PATTERNS[metric]) {
    const row = rows.find((candidate) => pattern.test(normalizeAccountName(candidate.account_nm)))
    const value = parseDartAmount(row?.[field])
    if (value !== null) return value
  }
  return null
}

export function mapDartFinancials({
  rows,
  businessYear,
  statementType,
}: {
  rows: DartFinancialRow[]
  businessYear: number
  statementType: StatementType
}): FinancialRecord[] {
  const periods: Array<{ year: number; field: AmountField }> = [
    { year: businessYear, field: "thstrm_amount" },
    { year: businessYear - 1, field: "frmtrm_amount" },
    { year: businessYear - 2, field: "bfefrmtrm_amount" },
  ]

  return periods.flatMap(({ year, field }) => {
    const record: FinancialRecord = {
      year,
      revenue: valueFor(rows, "revenue", field),
      operatingIncome: valueFor(rows, "operatingIncome", field),
      netIncome: valueFor(rows, "netIncome", field),
      assets: valueFor(rows, "assets", field),
      liabilities: valueFor(rows, "liabilities", field),
      equity: valueFor(rows, "equity", field),
      statementType,
    }
    const values = [record.revenue, record.operatingIncome, record.netIncome, record.assets, record.liabilities, record.equity]
    return values.every((value) => value === null) ? [] : [record]
  })
}
