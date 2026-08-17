"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, Buildings, MagnifyingGlass } from "@phosphor-icons/react"

import { formatKoreanCurrency } from "@/lib/format"
import { allCompanies } from "@/lib/companies/data"
import { selectFinancialRecords } from "@/lib/financials/presentation"
import { searchCompanies } from "@/lib/companies/repository"

export function CompanySearch() {
  const [query, setQuery] = useState("")
  const results = useMemo(() => searchCompanies(allCompanies, query), [query])

  return <div>
    <label htmlFor="company-search" className="sr-only">기업명 검색</label>
    <div className="relative"><MagnifyingGlass className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--foreground-muted)]" /><input id="company-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="기업명 또는 영문명을 입력하세요" className="h-14 w-full rounded-lg border border-[var(--border-strong)] bg-white pl-14 pr-5 text-base outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]" /></div>
    <div className="mt-8 flex items-center justify-between"><p className="text-sm text-[var(--color-baltic-sea-400)]"><strong className="text-[var(--color-baltic-sea-100)]">{results.length}</strong>개 기업</p><span className="rounded-full border border-[var(--color-baltic-sea-700)] px-3 py-1 text-xs text-[var(--color-baltic-sea-400)]">공식·샘플 데이터 구분 표시</span></div>
    <div className="mt-4 space-y-3">
      {results.map((company) => {
        const latest = selectFinancialRecords(company.financials, 1)[0]
        return <Link key={company.slug} href={`/company/${company.slug}`} className="group grid gap-5 rounded-lg border border-[var(--border-subtle)] bg-white p-6 transition-colors hover:border-[var(--border-strong)] md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--surface-subtle)]"><Buildings className="h-6 w-6 text-[var(--foreground)]" /></span><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-medium">{company.name}</h2><span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] text-[var(--accent-foreground)]">{company.status}</span><span className={`rounded-full border px-2 py-0.5 text-[11px] ${company.source.isSample ? "border-amber-200 bg-amber-50 text-amber-800" : "border-sky-200 bg-sky-50 text-sky-800"}`}>{company.source.isSample ? "샘플" : "공식"}</span></div><p className="mt-1 text-sm text-[var(--foreground-secondary)]">{company.industry} · {company.location}</p></div></div>
          <div className="flex items-center gap-8 pl-16 md:pl-0"><div><p className="text-xs text-[var(--color-baltic-sea-500)]">{latest?.year ?? "—"} 매출</p><p className="mt-1 font-mono text-sm">{formatKoreanCurrency(latest?.revenue ?? null)}</p></div><ArrowRight className="h-5 w-5 text-[var(--color-baltic-sea-500)] transition group-hover:translate-x-1 group-hover:text-[var(--color-keppel-400)]" /></div>
        </Link>
      })}
      {results.length === 0 && <div className="rounded-lg border border-dashed border-[var(--border-strong)] py-20 text-center text-[var(--foreground-secondary)]">일치하는 기업이 없습니다.</div>}
    </div>
  </div>
}
