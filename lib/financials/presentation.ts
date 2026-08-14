import type { FinancialRecord } from "@/lib/companies/types"

export type FinancialUnit = "원" | "백만원" | "억원"

const UNIT_DIVISORS: Record<FinancialUnit, number> = {
  원: 1,
  백만원: 1_000_000,
  억원: 100_000_000,
}

export function getRevenueBarHeight(value: number | null, maximumPositiveValue: number): number | null {
  if (value === null) return null
  if (value <= 0 || maximumPositiveValue <= 0) return 0
  return Math.min(100, (value / maximumPositiveValue) * 100)
}

export function selectFinancialRecords(records: FinancialRecord[], limit: number): FinancialRecord[] {
  return [...records].sort((left, right) => right.year - left.year).slice(0, Math.max(0, limit))
}

export function convertFinancialValue(value: number | null, unit: FinancialUnit): number | null {
  if (value === null) return null
  return value / UNIT_DIVISORS[unit]
}
