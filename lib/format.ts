export function formatKoreanCurrency(value: number | null): string {
  if (value === null) return "정보 없음"
  if (value === 0) return "0원"

  const eok = value / 100_000_000
  return `${new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(eok)}억원`
}

export function formatYearOverYear(current: number | null, previous: number | null): string {
  if (current === null || previous === null || previous === 0) return "—"

  const rate = ((current - previous) / Math.abs(previous)) * 100
  const sign = rate > 0 ? "+" : ""
  return `${sign}${rate.toFixed(1)}%`
}
