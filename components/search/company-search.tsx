"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, Buildings, MagnifyingGlass } from "@phosphor-icons/react"

import { formatKoreanCurrency } from "@/lib/format"
import { searchCompanies } from "@/lib/companies/repository"
import { sampleCompanies } from "@/lib/companies/sample-data"

export function CompanySearch() {
  const [query, setQuery] = useState("")
  const results = useMemo(() => searchCompanies(sampleCompanies, query), [query])

  return <div>
    <label htmlFor="company-search" className="sr-only">기업명 검색</label>
    <div className="relative"><MagnifyingGlass className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-keppel-400)]" /><input id="company-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="기업명 또는 영문명을 입력하세요" className="h-16 w-full rounded-2xl border border-[var(--color-baltic-sea-700)] bg-[var(--color-baltic-sea-900)] pl-14 pr-5 text-base outline-none transition focus:border-[var(--color-keppel-600)] focus:ring-4 focus:ring-[var(--color-keppel-950)]" /></div>
    <div className="mt-8 flex items-center justify-between"><p className="text-sm text-[var(--color-baltic-sea-400)]"><strong className="text-[var(--color-baltic-sea-100)]">{results.length}</strong>개 기업</p><span className="rounded-full border border-amber-800/60 bg-amber-950/40 px-3 py-1 text-xs text-amber-300">전체 샘플 데이터</span></div>
    <div className="mt-4 space-y-3">
      {results.map((company) => {
        const latest = company.financials[0]
        return <Link key={company.slug} href={`/company/${company.slug}`} className="group grid gap-5 rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-keppel-800)] md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-baltic-sea-800)]"><Buildings weight="duotone" className="h-6 w-6 text-[var(--color-keppel-400)]" /></span><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-semibold">{company.name}</h2><span className="rounded-full border border-[var(--color-keppel-900)] bg-[var(--color-keppel-950)] px-2 py-0.5 text-[11px] text-[var(--color-keppel-300)]">{company.status}</span></div><p className="mt-1 text-sm text-[var(--color-baltic-sea-400)]">{company.industry} · {company.location}</p></div></div>
          <div className="flex items-center gap-8 pl-16 md:pl-0"><div><p className="text-xs text-[var(--color-baltic-sea-500)]">{latest?.year ?? "—"} 매출</p><p className="mt-1 font-mono text-sm">{formatKoreanCurrency(latest?.revenue ?? null)}</p></div><ArrowRight className="h-5 w-5 text-[var(--color-baltic-sea-500)] transition group-hover:translate-x-1 group-hover:text-[var(--color-keppel-400)]" /></div>
        </Link>
      })}
      {results.length === 0 && <div className="rounded-2xl border border-dashed border-[var(--color-baltic-sea-700)] py-20 text-center text-[var(--color-baltic-sea-400)]">일치하는 샘플 기업이 없습니다.</div>}
    </div>
  </div>
}
