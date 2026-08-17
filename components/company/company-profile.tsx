import { ArrowSquareOut, Buildings, Info, TrendDown, TrendUp, UsersThree } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

import { CompanyHeader } from "@/components/company/company-header"
import type { Company } from "@/lib/companies/types"
import { selectFinancialRecords } from "@/lib/financials/presentation"
import { formatKoreanCurrency, formatYearOverYear } from "@/lib/format"

function display(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "정보 없음"
  return typeof value === "number" ? new Intl.NumberFormat("ko-KR").format(value) : value
}

export function CompanyProfile({ company }: { company: Company }) {
  const records = selectFinancialRecords(company.financials, 5)
  const latest = records[0]
  const previous = records[1]
  const metrics = [
    ["매출", latest?.revenue ?? null, previous?.revenue ?? null],
    ["영업이익", latest?.operatingIncome ?? null, previous?.operatingIncome ?? null],
    ["당기순이익", latest?.netIncome ?? null, previous?.netIncome ?? null],
    ["자산", latest?.assets ?? null, previous?.assets ?? null],
    ["부채", latest?.liabilities ?? null, previous?.liabilities ?? null],
    ["자본", latest?.equity ?? null, previous?.equity ?? null],
  ] as const
  const financialSource = company.financialSource ?? company.source

  return <>
    <CompanyHeader company={company} activeTab="dashboard" />

    <div className="mx-auto grid max-w-[1184px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <main id="main-content" className="min-w-0 space-y-6">
        <section className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-6">
          <p className="text-sm text-[var(--color-keppel-400)]">기업 개요</p>
          <h2 className="mt-3 text-2xl font-semibold">{company.name}</h2>
          <p className="mt-4 leading-relaxed text-[var(--color-baltic-sea-400)]">{company.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[["대표자", company.representative], ["임직원", company.employeeCount === null || company.employeeCount === undefined ? null : `${display(company.employeeCount)}명`], ["상장시장", company.market]].map(([label, value]) => <div key={label} className="rounded-xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)] p-4"><p className="text-xs text-[var(--color-baltic-sea-500)]">{label}</p><p className="mt-2 text-sm text-[var(--color-baltic-sea-200)]">{display(value)}</p></div>)}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-6">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-keppel-950)] text-[var(--color-keppel-300)]"><Buildings className="h-5 w-5" /></span><div><p className="text-sm text-[var(--color-keppel-400)]">주요 사업</p><h2 className="mt-1 text-xl font-semibold">제품·서비스 개요</h2></div></div>
          <p className="mt-5 leading-relaxed text-[var(--color-baltic-sea-300)]">{display(company.mainBusiness ?? company.description)}</p>
          {company.website && <a href={company.website} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-keppel-300)] hover:underline">공식 홈페이지 확인 <ArrowSquareOut className="h-4 w-4" /></a>}
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between"><div><p className="text-sm text-[var(--color-keppel-400)]">주요 정보</p><h2 className="mt-1 text-2xl font-semibold">{latest?.year ?? "최근"}년 재무 요약</h2></div><span className="text-xs text-[var(--color-baltic-sea-500)]">단위: 원 · {latest?.statementType ?? "미수집"}</span></div>
          {records.length > 0 ? <div className="grid grid-cols-2 gap-3 md:grid-cols-3">{metrics.map(([label, value, prior]) => { const change = formatYearOverYear(value, prior); const up = change.startsWith("+"); return <article key={label} className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-5"><p className="text-xs text-[var(--color-baltic-sea-500)]">{label}</p><p className="mt-3 font-mono text-lg font-semibold">{formatKoreanCurrency(value)}</p><p className={`mt-2 flex items-center gap-1 text-xs ${up ? "text-[var(--color-keppel-400)]" : change.startsWith("-") ? "text-rose-400" : "text-[var(--color-baltic-sea-500)]"}`}>{up ? <TrendUp className="h-3.5 w-3.5" /> : change.startsWith("-") ? <TrendDown className="h-3.5 w-3.5" /> : null}{change} 전년 대비</p></article>})}</div> : <div className="rounded-2xl border border-dashed border-[var(--color-baltic-sea-700)] p-8 text-center"><p className="text-sm text-[var(--color-baltic-sea-400)]">공식 재무정보를 아직 수집하지 못했습니다.</p></div>}
        </section>

        {records.length > 0 && <section className="overflow-hidden rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)]"><div className="flex flex-col gap-3 border-b border-[var(--color-baltic-sea-800)] p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-[var(--color-keppel-400)]">재무</p><h2 className="mt-1 text-2xl font-semibold">최근 재무 추이</h2></div><Link href={`/company/${company.slug}/financials`} className="rounded-full border border-[var(--color-keppel-800)] px-4 py-2 text-center text-xs text-[var(--color-keppel-300)] transition hover:bg-[var(--color-keppel-950)]">상세 재무 보기</Link></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><caption className="sr-only">최근 재무 정보</caption><thead><tr className="border-b border-[var(--color-baltic-sea-800)] text-left text-xs text-[var(--color-baltic-sea-500)]"><th scope="col" className="px-6 py-4">연도</th><th scope="col" className="px-6 py-4">매출</th><th scope="col" className="px-6 py-4">영업이익</th><th scope="col" className="px-6 py-4">당기순이익</th><th scope="col" className="px-6 py-4">구분</th></tr></thead><tbody>{records.map((record) => <tr key={record.year} className="border-b border-[var(--color-baltic-sea-800)] last:border-0"><th scope="row" className="px-6 py-4 text-left font-mono">{record.year}</th><td className="px-6 py-4 font-mono">{formatKoreanCurrency(record.revenue)}</td><td className="px-6 py-4 font-mono">{formatKoreanCurrency(record.operatingIncome)}</td><td className="px-6 py-4 font-mono">{formatKoreanCurrency(record.netIncome)}</td><td className="px-6 py-4 text-[var(--color-baltic-sea-300)]">{record.statementType}</td></tr>)}</tbody></table></div></section>}

        <section className="grid gap-4 sm:grid-cols-2"><article className="rounded-2xl border border-dashed border-[var(--color-baltic-sea-700)] p-6"><h2 className="font-medium">최근 뉴스</h2><p className="mt-3 text-sm leading-relaxed text-[var(--color-baltic-sea-500)]">재배포 권리가 확인된 뉴스 공급원을 확보한 뒤 같은 위치에 제공합니다.</p></article><article className="rounded-2xl border border-dashed border-[var(--color-baltic-sea-700)] p-6"><h2 className="font-medium">투자 유치</h2><p className="mt-3 text-sm leading-relaxed text-[var(--color-baltic-sea-500)]">공식 출처와 기업 식별이 검증된 투자 데이터만 제공합니다.</p></article></section>
      </main>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <section className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-5"><h2 className="font-semibold">기업 기본정보</h2><dl className="mt-5 space-y-4 text-sm">{[["대표자", company.representative], ["설립일", company.foundedAt], ["업종", company.industry], ["지역", company.location], ["임직원", company.employeeCount === null || company.employeeCount === undefined ? null : `${display(company.employeeCount)}명`], ["결산월", company.fiscalMonth ? `${company.fiscalMonth}월` : null]].map(([term, value]) => <div key={term}><dt className="text-xs text-[var(--color-baltic-sea-500)]">{term}</dt><dd className="mt-1 break-all text-[var(--color-baltic-sea-200)]">{display(value)}</dd></div>)}</dl></section>
        <section className="rounded-2xl border border-[var(--color-keppel-900)] bg-[var(--color-keppel-950)] p-5"><div className="flex items-center gap-2 text-[var(--color-keppel-300)]"><Info className="h-4 w-4" /><h2 className="text-sm font-medium">데이터 출처</h2></div><dl className="mt-4 space-y-3 text-xs"><div><dt className="text-[var(--color-baltic-sea-500)]">기업 개요</dt><dd className="mt-1"><a href={company.source.url} target="_blank" rel="noreferrer" className="text-[var(--color-keppel-300)] hover:underline">{company.source.provider}</a></dd></div><div><dt className="text-[var(--color-baltic-sea-500)]">재무</dt><dd className="mt-1"><a href={financialSource.url} target="_blank" rel="noreferrer" className="text-[var(--color-keppel-300)] hover:underline">{financialSource.provider}</a></dd></div><div className="flex justify-between gap-4"><dt className="text-[var(--color-baltic-sea-500)]">기준일</dt><dd>{company.source.asOf}</dd></div><div className="flex justify-between gap-4"><dt className="text-[var(--color-baltic-sea-500)]">수집 상태</dt><dd>{company.source.isSample ? "샘플" : "공식 API"}</dd></div><div className="flex justify-between gap-4"><dt className="text-[var(--color-baltic-sea-500)]">검색 색인</dt><dd>{company.source.indexingApproved ? "승인" : "검수 전"}</dd></div></dl></section>
        <Link href="/search" className="block rounded-xl border border-[var(--color-baltic-sea-700)] p-4 text-center text-sm transition hover:border-[var(--color-keppel-700)]"><UsersThree className="mr-2 inline h-4 w-4" />다른 기업 검색</Link>
      </aside>
    </div>
  </>
}
