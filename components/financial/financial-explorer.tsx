"use client"

import { useMemo, useState } from "react"

import type { Company, FinancialRecord } from "@/lib/companies/types"
import { convertFinancialValue, getRevenueBarHeight, selectFinancialRecords, type FinancialUnit } from "@/lib/financials/presentation"

const ACCOUNT_ROWS = [
  ["매출", "revenue", "손익계산서"],
  ["영업이익", "operatingIncome", "손익계산서"],
  ["당기순이익", "netIncome", "손익계산서"],
  ["자산", "assets", "재무상태표"],
  ["부채", "liabilities", "재무상태표"],
  ["자본", "equity", "재무상태표"],
] as const

type StatementFilter = "전체" | "손익계산서" | "재무상태표"
type FinancialKey = keyof Pick<FinancialRecord, "revenue" | "operatingIncome" | "netIncome" | "assets" | "liabilities" | "equity">

function formatConvertedValue(value: number | null, unit: FinancialUnit): string {
  const converted = convertFinancialValue(value, unit)
  if (converted === null) return "정보 없음"
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: unit === "원" ? 0 : 1 }).format(converted)
}

export function FinancialExplorer({ company }: { company: Company }) {
  const [filter, setFilter] = useState<StatementFilter>("전체")
  const [unit, setUnit] = useState<FinancialUnit>("억원")
  const records = useMemo(() => selectFinancialRecords(company.financials, 5), [company.financials])
  const rows = ACCOUNT_ROWS.filter(([, , statement]) => filter === "전체" || statement === filter)
  const maximumPositiveRevenue = Math.max(...records.map((record) => Math.max(record.revenue ?? 0, 0)), 0)

  return <div className="space-y-6">
    <section className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-5 sm:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="text-sm text-[var(--color-keppel-400)]">재무 탐색</p><h1 className="mt-2 text-3xl font-semibold">{company.name} 재무정보</h1><p className="mt-3 text-sm text-[var(--color-baltic-sea-400)]">최근 {records.length}개년 핵심 계정을 같은 재무 구분으로 비교합니다.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <fieldset className="flex rounded-full border border-[var(--color-baltic-sea-700)] p-1"><legend className="sr-only">재무제표 종류</legend>{(["전체", "손익계산서", "재무상태표"] as const).map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-2 text-xs transition ${filter === item ? "bg-[var(--color-keppel-900)] text-[var(--color-keppel-200)]" : "text-[var(--color-baltic-sea-400)]"}`}>{item}</button>)}</fieldset>
          <label className="flex items-center gap-2 text-xs text-[var(--color-baltic-sea-400)]">단위<select value={unit} onChange={(event) => setUnit(event.target.value as FinancialUnit)} className="rounded-full border border-[var(--color-baltic-sea-700)] bg-[var(--color-baltic-sea-900)] px-3 py-2 text-[var(--color-baltic-sea-100)]"><option>원</option><option>백만원</option><option>억원</option></select></label>
        </div>
      </div>
    </section>

    <section className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-5 sm:p-7">
      <div className="flex items-center justify-between"><div><p className="text-sm text-[var(--color-keppel-400)]">CHART</p><h2 className="mt-1 text-xl font-semibold">매출 추이</h2></div><span className="rounded-full border border-amber-800/60 bg-amber-950/40 px-3 py-1 text-xs text-amber-300">화면 검증용 샘플</span></div>
      <p id="revenue-chart-summary" className="sr-only">{records.map((record) => `${record.year}년 매출 ${formatConvertedValue(record.revenue, unit)}${record.revenue === null ? "" : ` ${unit}`}${record.revenue !== null && record.revenue < 0 ? " 음수" : ""}`).join(", ")}</p>
      <div className="mt-8 overflow-x-auto" role="img" aria-label="연도별 매출 막대 차트" aria-describedby="revenue-chart-summary">
        <div
          aria-hidden="true"
          className="grid h-56 min-w-[640px] items-end gap-5 border-b border-[var(--color-baltic-sea-700)] px-3"
          style={{ gridTemplateColumns: `repeat(${Math.max(records.length, 1)}, minmax(0, 1fr))` }}
        >
          {records.map((record) => {
            const height = getRevenueBarHeight(record.revenue, maximumPositiveRevenue)
            const negative = record.revenue !== null && record.revenue < 0
            return <div key={record.year} className="flex h-full flex-col justify-end text-center">
              <span className={`mb-2 font-mono text-xs ${negative ? "text-rose-400" : "text-[var(--color-baltic-sea-300)]"}`}>{formatConvertedValue(record.revenue, unit)}</span>
              <div
                aria-hidden="true"
                className={`mx-auto w-full max-w-24 rounded-t-xl ${height === null || height === 0 ? "border-t border-dashed border-[var(--color-baltic-sea-600)]" : "bg-gradient-to-t from-[var(--color-keppel-800)] to-[var(--color-keppel-400)]"}`}
                style={{ height: height === null ? 0 : `${height}%` }}
              />
              <span className="py-3 font-mono text-xs text-[var(--color-baltic-sea-400)]">{record.year}</span>
            </div>
          })}
        </div>
      </div>
    </section>

    <section className="overflow-hidden rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)]"><div className="border-b border-[var(--color-baltic-sea-800)] p-6"><h2 className="text-xl font-semibold">계정과목별 재무표</h2><p className="mt-2 text-xs text-[var(--color-baltic-sea-500)]">단위: {unit} · {records[0]?.statementType ?? "정보 없음"}</p></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><caption className="sr-only">{company.name} 계정과목별 연도 재무표</caption><thead><tr className="border-b border-[var(--color-baltic-sea-800)] text-left text-xs text-[var(--color-baltic-sea-500)]"><th scope="col" className="px-6 py-4">계정과목</th>{records.map((record) => <th scope="col" key={record.year} className="px-6 py-4 text-right">{record.year}</th>)}</tr></thead><tbody>{rows.map(([label, key]) => <tr key={key} className="border-b border-[var(--color-baltic-sea-800)] last:border-0"><th scope="row" className="px-6 py-4 text-left font-medium">{label}</th>{records.map((record) => <td key={record.year} className={`px-6 py-4 text-right font-mono ${record[key as FinancialKey] !== null && (record[key as FinancialKey] as number) < 0 ? "text-rose-400" : ""}`}>{formatConvertedValue(record[key as FinancialKey], unit)}</td>)}</tr>)}</tbody></table></div></section>

    <section className="rounded-2xl border border-[var(--color-keppel-900)] bg-[var(--color-keppel-950)] p-5 text-sm"><strong className="text-[var(--color-keppel-200)]">데이터 안내</strong><p className="mt-2 leading-relaxed text-[var(--color-baltic-sea-400)]">{company.source.label}이며 실제 기업 재무가 아닙니다. 출처: {company.source.label} · 기준일: {company.source.asOf} · 재무 구분: 샘플</p></section>
  </div>
}
